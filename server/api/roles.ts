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
  const roles = await db.query.role.findMany({
    with: {
      rolePermissions: {
        columns: {},
        with: {
          permission: true,
        },
      },
    },
  });

  const parsed = roles.map((role) => {
    return {
      id: role.id,
      name: role.name,
      permissions: role.rolePermissions.map((rolePermission) => {
        return rolePermission.permission;
      }),
    };
  });

  return {
    statusCode: 200,
    body: JSON.stringify(parsed),
  };
});
