import mysql from "mysql2/promise";

const connection = mysql.createPool({
  connectionLimit: 10,
  host: "103.161.178.66",
  user: "proresy",
  password: "ProReSy@123",
  database: "productrecomandation",
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
