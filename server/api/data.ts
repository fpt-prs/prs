import { desc, like, sql } from "drizzle-orm";
import { MySqlColumn } from "drizzle-orm/mysql-core";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { product } from "~/schema";
import { Collection } from "./collection/all";

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const db = drizzle(connection);

export type Product = {
  id: number;
  price: number;
  name: string;
  product_id: string;
  url: string;
  page: number;
  image_url: string;
};

type ProductCollection = {
  product: Product;
  collections: Collection[];
};

type ProductResponse = {
  data: Product[];
  total: number;
};

export default defineEventHandler(async (event) => {
  const {
    field,
    order,
  } = getQuery(event);

  const mapField: Map<string, MySqlColumn> = new Map();
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

  let countQuery = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(product)
    .execute();
  const countTotal = countQuery[0].count;

  const orderField = mapField.get(field as string);
  if (!orderField) {
    return {
      statusCode: 400,
      body: "Invalid field",
    };
  }
  const orderCriteria = order === "asc" ? orderField : desc(orderField);

  const products = await db
    .select()
    .from(product)
    .orderBy(orderCriteria)
    .limit(pageSize);

  const response = {
    data: products as Product[],
    total: countTotal,
  } as ProductResponse;

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
});
