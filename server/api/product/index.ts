import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { product } from "~/schema";
import * as schema from "~/schema";

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const db = drizzle(connection, { schema, mode: "default" });

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const idString = id as string;

  const productDetail = await db.query.product.findFirst({
    with: {
      image_urls: {
        columns: {
          image_url: true,
        },
      },
    },
    where: eq(product.product_id, idString),
  });

  return {
    statusCode: 200,
    body: JSON.stringify(productDetail),
  };
});
