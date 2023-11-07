import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
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
  const id = getRouterParam(event, "id");
  const backendUrl = process.env.BACKEND_URL || "http://localhost:8080";
  const response = await fetch(`${backendUrl}/api/products?code=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.BASIC_AUTH}`,
    },
  });

  const productDetail = await response.json();
  console.log(productDetail);

  return {
    statusCode: 200,
    body: JSON.stringify(productDetail),
  };
});
