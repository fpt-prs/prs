import { int, mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

export const product = mysqlTable("product", {
  id: serial("id").primaryKey(),
  product_id: varchar("product_id", { length: 255 }).notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  price: int("price").notNull(),
  page: int("page").notNull(),
  image_url: varchar("image_url", { length: 200 }).notNull(),
});

export const user = mysqlTable("user", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const collection = mysqlTable("collection", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  user_id: int("user_id")
    .notNull()
    .references(() => user.id),
});

export const collection_product = mysqlTable("product_collection", {
  collection_id: int("collection_id")
    .notNull()
    .references(() => collection.id),
  product_id: int("product_id")
    .notNull()
    .references(() => product.id),
  created: timestamp("created").notNull(),
});
