import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { Product } from "../data";
import { product, collection_product, collection } from "~/schema";
import { Collection } from "./all";

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
  await db.insert(collection_product).values({
    collection_id: Number(collectionId),
    product_id: Number(productId),
    created: new Date(),
  });
});
