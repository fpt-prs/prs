import { getServerSession } from "#auth";
import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const user = session?.user;
  const userId = user?.id;

  const productCode = getRouterParam(event, "id");

  const params = new URLSearchParams();
  params.append("code", productCode);
  params.append("userId", userId);

  const response = await fetchBackend(`/api/products?${params.toString()}`);
  const productDetail = await response.json();
  const status = response.status;
  setResponseStatus(event, status);

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
