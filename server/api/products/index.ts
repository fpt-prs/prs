import { and, desc, isNotNull, like, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "~/schema";
import { product } from "~/schema";

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const db = drizzle(connection, { schema, mode: "default" });

export default defineEventHandler(async (event) => {
  const { field, order, page, search } = getQuery(event);

  const mapField = new Map();
  mapField.set("id", product.id);
  mapField.set("price", product.price);
  mapField.set("name", product.name);
  mapField.set("product_id", product.product_id);
  mapField.set("url", product.url);

  if (!field || !order) {
    return {
      statusCode: 400,
      body: "Missing required parameters",
    };
  }

  const pageSize = 8;
  const offset = (parseInt(page as string) - 1) * pageSize;
  const searchQuery = `%${search}%`;

  let countQuery = await db
    .select({ count: sql`COUNT(*)` })
    .from(product)
    .where(and(isNotNull(product.description), like(product.name, searchQuery)))
    .execute();
  const countTotal = countQuery[0].count;

  const orderField = mapField.get(field);
  if (!orderField) {
    return {
      statusCode: 400,
      body: "Invalid field",
    };
  }
  const orderCriteria = order === "asc" ? orderField : desc(orderField);

  const products = await db.query.product.findMany({
    orderBy: [orderCriteria],
    with: {
      image_urls: {
        columns: {
          image_url: true,
        },
      },
    },
    limit: pageSize,
    offset: offset,
    where: and(isNotNull(product.description), like(product.name, searchQuery)),
  });

  const response = {
    data: products,
    total: countTotal,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
});
