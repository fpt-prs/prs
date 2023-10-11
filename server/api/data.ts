import mysql from "mysql2/promise";

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

type Product = {
  id: number;
  price: number;
  name: string;
  product_id: string;
  url: string;
  page: number;
};

type ProductResponse = {
  data: Product[];
  total: number;
};

export default defineEventHandler(async (event) => {
  const { field, order, page: pageParam, pageSize: pageSizeParam, term } = getQuery(event);

  if (!field || !order || !pageParam || !pageSizeParam) {
    return {
      statusCode: 400,
      body: "Missing required parameters",
    };
  }

  const page = parseInt(pageParam as string);
  const pageSize = parseInt(pageSizeParam as string);
  const OFFSET = pageSize * (page - 1);

  let countQuery = await connection.query(
    `SELECT COUNT(*) FROM product WHERE NAME LIKE '%${term}%' ORDER BY ${field} ${order}`
  );
  const [countRows, _] = countQuery;
  const count = (countRows as mysql.RowDataPacket[])[0]["COUNT(*)"];

  let query = await connection.query(
    `SELECT * FROM product WHERE NAME LIKE '%${term}%' ORDER BY ${field} ${order} LIMIT ${pageSize} OFFSET ${OFFSET}`
  );
  const [rows, fields] = query;

  const response = {
    data: rows as Product[],
    total: count,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
});
