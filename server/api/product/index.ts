import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { product } from "~/schema";

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

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  const productDetail = await db
    .select()
    .from(product)
    .where(eq(product.product_id, id as string))
    .execute();

  if (!productDetail.length) {
    return {
      statusCode: 404,
      body: "Product not found",
    };
  }

  const singleProduct = productDetail[0];

  return {
    statusCode: 200,
    body: JSON.stringify(singleProduct),
  };
});
