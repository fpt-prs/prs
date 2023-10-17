import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { collection } from "~/schema";
import { eq } from "drizzle-orm";

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

const db = drizzle(connection);

export default defineEventHandler(async (event) => {
  let data: Collection[] = await db
    .select({
      name: collection.name,
      id: collection.id,
    })
    .from(collection)
    .where(eq(collection.user_id, 1));

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: data,
    }),
  };
});
