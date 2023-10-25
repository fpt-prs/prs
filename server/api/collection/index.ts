import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { Product } from "../data";
import { product, collection_product, collection } from "~/schema";
import { Collection } from "./all";
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
  let products = await db.query.product.findMany({
    with: {
      image_urls: {
        columns: {
          image_url: true,
        },
      },
      // collection_products: true,
    },
    // where: eq(collection_product.collection_id, Number(id)),
  });

  // .select({
  //   id: product.id,
  //   product_id: product.product_id,
  //   price: product.price,
  //   name: product.name,
  //   url: product.url,
  //   page: product.page,
  //   image_urls: {
  //     image_url: product.
  //   },
  // })

  // .from(collection_product)
  // .innerJoin(product, eq(product.id, collection_product.product_id))
  // .where(eq(collection_product.collection_id, Number(id)));

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

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});
