import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const response = await fetchBackend(`/api/products?code=${id}`);
  const productDetail = await response.json();
  const status = response.status;

  if (status === 404) {
    return {
      statusCode: 404,
      body: "Not found",
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(productDetail),
  };
});
