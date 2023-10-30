import { relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";

export const product = mysqlTable("product", {
  id: serial("id").primaryKey(),
  product_id: varchar("product_id", { length: 255 }).notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  price: int("price").notNull(),
  description: text("description").notNull(),
});

export const user = mysqlTable("user", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  is_active: tinyint("is_active").notNull(),
});

export const collection = mysqlTable("collection", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  user_id: int("user_id")
    .notNull()
    .references(() => user.id),
});

export const productCollectionRelation = relations(product, ({ many }) => ({
  collection_products: many(collection_product),
}));

export const collectionProductRelation = relations(collection, ({ many }) => ({
  collection_products: many(collection_product),
}));

export const collection_product = mysqlTable("product_collection", {
  collection_id: int("collection_id")
    .notNull()
    .references(() => collection.id),
  product_id: int("product_id")
    .notNull()
    .references(() => product.id),
  created: timestamp("created").notNull(),
});

export const productCollectionManyRelation = relations(
  collection_product,
  ({ one }) => ({
    product: one(product, {
      fields: [collection_product.product_id],
      references: [product.id],
    }),
    collection: one(collection, {
      fields: [collection_product.collection_id],
      references: [collection.id],
    }),
  })
);

export const product_image = mysqlTable("product_image", {
  id: serial("id").primaryKey(),
  product_order: int("product_order")
    .notNull()
    .references(() => product.id),
  image_url: varchar("image_url", { length: 255 }).notNull(),
  created: timestamp("created").notNull(),
});

export const productRelation = relations(product, ({ many }) => ({
  image_urls: many(product_image),
}));

export const imageRelation = relations(product_image, ({ one }) => ({
  product: one(product, {
    fields: [product_image.product_order],
    references: [product.id],
  }),
}));

export const role = mysqlTable("role", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const permission = mysqlTable("permission", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const rolesRelation = relations(role, ({ many }) => ({
  rolePermissions: many(rolePermission),
}));

export const permissionsRelation = relations(permission, ({ many }) => ({
  rolePermissions: many(rolePermission),
}));

export const rolePermission = mysqlTable("role_permission", {
  role_id: int("role_id")
    .notNull()
    .references(() => role.id),
  permission_id: int("permission_id")
    .notNull()
    .references(() => permission.id),
});

export const rolePermissionRelation = relations(rolePermission, ({ one }) => ({
  role: one(role, {
    fields: [rolePermission.role_id],
    references: [role.id],
  }),
  permission: one(permission, {
    fields: [rolePermission.permission_id],
    references: [permission.id],
  }),
}))
