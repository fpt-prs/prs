import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "~/schema";
import { user } from "~/schema";

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const db = drizzle(connection, { schema, mode: "default" });

export default defineEventHandler(async (event) => {
  const idStr = getRouterParam(event, "id");

  const id = parseInt(idStr || "");

  if (isNaN(id)) {
    return {
      statusCode: 400,
      body: "Invalid id",
    };
  }

  const detail = await db.query.user.findFirst({
    where: eq(user.id, id),
  });

  return {
    statusCode: 200,
    body: JSON.stringify(detail),
  };
});
