import fetchBackend  from "~/utils/fetchBackend";

export type Product = {
  id: number;
  price: number;
  name: string;
  product_id: string;
  url: string;
  description: string;
  images: {
    imageUrl: string;
  }[];
};

export default defineEventHandler(async (event) => {
  const fetchRes = await fetchBackend("/api/products/suggest");
  const data = await fetchRes.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});
