import fetchBackend from "~/utils/fetchBackend";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const { collectionId, productId, mode } = JSON.parse(await readBody(event));
  const session = await getServerSession(event);
  const parsedCollectionId = parseInt(collectionId);
  const parsedProductId = parseInt(productId);
  if (mode !== "add" && mode !== "remove") {
    setResponseStatus(event, 400);
    return {
      statusCode: 400,
      body: "Invalid mode",
    };
  }

  let params = new URLSearchParams();
  params.append("collectionId", parsedCollectionId.toString());
  params.append("productId", parsedProductId.toString());
  params.append("userId", (session?.user as any).id.toString());

  let fetchRes;
  if (mode === "add") {
    fetchRes = await fetchBackend(`/api/collections/add?${params.toString()}`, {
      method: "POST",
    });
  } else {
    fetchRes = await fetchBackend(
      `/api/collections/remove?${params.toString()}`,
      {
        method: "POST",
      }
    );
  }

  const status = fetchRes.status;
  setResponseStatus(event, status);

  if (fetchRes.status !== 200) {
    return {
      statusCode: fetchRes.status,
      body: "Something went wrong",
    };
  }

  return {
    statusCode: 200,
    body: "Update successfully",
  };
});
