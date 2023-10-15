import { desc, eq, like, sql } from "drizzle-orm";
import { MySqlColumn } from "drizzle-orm/mysql-core";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { collection, collection_product, product } from "~/schema";
import { Collection } from "./collection";

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const db = drizzle(connection);

type Product = {
  id: number;
  price: number;
  name: string;
  product_id: string;
  url: string;
  page: number;
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
    page: pageParam,
    pageSize: pageSizeParam,
    term,
  } = getQuery(event);

  const mapField: Map<string, MySqlColumn> = new Map();
  mapField.set("id", product.id);
  mapField.set("price", product.price);
  mapField.set("name", product.name);
  mapField.set("product_id", product.product_id);
  mapField.set("url", product.url);
  mapField.set("page", product.page);

  if (!field || !order || !pageParam || !pageSizeParam) {
    return {
      statusCode: 400,
      body: "Missing required parameters",
    };
  }

  const page = parseInt(pageParam as string);
  const pageSize = parseInt(pageSizeParam as string);
  const OFFSET = pageSize * (page - 1);

  let countQuery = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(product)
    .where(like(product.name, `%${term}%`))
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
    // .innerJoin(
    //   collection_product,
    //   eq(product.id, collection_product.product_id)
    // )
    // .innerJoin(collection, eq(collection.id, collection_product.collection_id))
    .where(like(product.name, `%${term}%`))
    .orderBy(orderCriteria)
    .limit(pageSize)
    .offset(OFFSET);

  // const aggregate = products.reduce<
  //   Record<number, { product: Product; collections: Collection[] }>
  // >((acc, row) => {
  //   const product = row.product;
  //   const collection = row.collection;

  //   if (!acc[product.id]) {
  //     acc[product.id] = { product, collections: [] };
  //   }

  //   if (collection) {
  //     acc[product.id].collections.push(collection);
  //   }

  //   return acc;
  // }, {});

  const response = {
    data: products as Product[],
    total: countTotal,
  } as ProductResponse;

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
});
