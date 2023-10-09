import mysql from "mysql2/promise";

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

type product = {
  id: number;
  price: number;
  name: string;
  product_id: string;
  url: string;
  page: number;
};

export default defineEventHandler(async (event) => {
  let query = await connection.query(
    "SELECT * FROM product where page = 1 order by id asc limit 100"
  );
  const [rows, fields] = query;
  return {
    statusCode: 200,
    body: JSON.stringify(rows),
  };
});
