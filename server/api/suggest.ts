export type Product = {
  id: number;
  price: number;
  name: string;
  product_id: string;
  url: string;
  description: string;
  image_urls: {
    image_url: string;
  }[];
};

export default defineEventHandler(async (event) => {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:8080";
  const fetchResponse = await fetch(`${backendUrl}/api/products/suggest`, {
    headers: {
      Authorization: `Basic ${process.env.BASIC_AUTH}`,
    },
  });
  if (!fetchResponse.ok) {
    return {
      statusCode: fetchResponse.status,
      body: {
        message: "Failed to fetch products",
      },
    };
  }

  const products = await fetchResponse.json();

  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
});
