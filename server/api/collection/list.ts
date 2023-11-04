import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { collection } from "~/schema";

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
  let data: Collection[] = await db
    .select({
      id: collection.id,
      name: collection.name,
    })
    .from(collection);
  // .where(and(eq(collection.user_id, 1)));

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});
