import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "~/schema";
import { collection, collection_product } from "~/schema";
import { Collection } from "./all";

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
  let products = await db.query.product.findMany({
    with: {
      image_urls: {
        columns: {
          image_url: true,
        },
      },
      collection_products: {
        columns: {
          collection_id: true,
        },
        where: eq(collection_product.collection_id, Number(id)),
      },
    },

    limit: 10,
  });

  console.log(products);

  let collections: Collection[] = await db
    .select()
    .from(collection)
    .where(eq(collection.id, Number(id)))
    .limit(1);

  if (!collections || collections.length < 1) {
    return {
      statusCode: 400,
      body: null,
    };
  }

  let data = {
    products: products,
    collection: collections[0],
  };

  console.log(data);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});
