import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

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
  id: number;
  name: string;
  isExist: boolean;
};

const db = drizzle(connection);

export default defineEventHandler(async (event) => {
  const { userId, productOrderRaw: productId } = getQuery(event);
  const productOrderStr = productId as string;

  if (!productOrderStr || isNaN(parseInt(productOrderStr as string))) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "No product_order provided",
      }),
    };
  }

  let params = new URLSearchParams();
  params.append("productId", productOrderStr);
  params.append("userId", userId as string);
  let res = await fetch(
    `http://localhost:8080/api/collection/contains?${params.toString()}`
  );

  let data: any[] = await res.json();

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
