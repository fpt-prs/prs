import { getServerSession } from "#auth";
import fetchBackend from "~/utils/fetchBackend";

export type Collection = {
  name: string;
  id: number;
};

export default defineEventHandler(async (event) => {
  const { productId: productOrderRaw } = getQuery(event);
  const session = await getServerSession(event);
  const userId = (session?.user as any).id;
  const productOrderStr = productOrderRaw as string;

  if (!productOrderStr || isNaN(parseInt(productOrderStr as string))) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "No product_order provided",
      }),
    };
  }

  let params = new URLSearchParams();
  params.append("productId", productOrderStr);
  params.append("userId", userId as string);
  let res = await fetchBackend(`/api/collections/all?${params.toString()}`);
  let data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});
