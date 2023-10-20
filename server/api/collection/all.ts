import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { collection, collection_product } from "~/schema";
import { and, eq, sql } from "drizzle-orm";

export type Collection = {
  name: string;
  id: number;
};

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export type CollectionContains = {
  name: string;
  id: number;
  isExist: boolean;
};

const db = drizzle(connection);

export default defineEventHandler(async (event) => {
  const { product_order: productOrderRaw } = getQuery(event);
  const product_order_string = productOrderRaw as string;
  const product_order = parseInt(product_order_string);

  if (!product_order || isNaN(product_order)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "No product_order provided",
      }),
    };
  }

  let data: CollectionContains[] = await db
    .select({
      id: collection.id,
      name: collection.name,
      isExist: sql<number>`CASE WHEN ${collection_product.product_id} = ${product_order} THEN 1 ELSE 0 END`,
    })
    .from(collection)
    .leftJoin(
      collection_product,
      eq(collection_product.collection_id, collection.id)
    )
    .where(eq(collection.user_id, 1))
    .then((rows) => rows.map(castType));
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});

const castType = (row: any): CollectionContains => ({
  id: row.id,
  name: row.name,
  isExist: row.isExist === 1,
});
