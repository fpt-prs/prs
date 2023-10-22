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
  const { collectionId, productId } = JSON.parse(await readBody(event));
  const parsedCollectionId = parseInt(collectionId);
  const parsedProductId = parseInt(productId);
  console.log(`collectionId: ${parsedCollectionId}, productId: ${parsedProductId}`);

  await db.insert(collection_product).values({
    collection_id: Number(parsedCollectionId),
    product_id: Number(parsedProductId),
    created: new Date(),
  });
});
