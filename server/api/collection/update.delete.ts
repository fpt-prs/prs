import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { collection_product } from "~/schema";

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const db = drizzle(connection);

export default defineEventHandler(async (event) => {
  const { collectionId, productId } = await readBody(event);
  await db
    .delete(collection_product)
    .where(
      and(
        eq(collection_product.collection_id, Number(collectionId)),
        eq(collection_product.product_id, Number(productId))
      )
    );
});
