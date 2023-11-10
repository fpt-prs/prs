import fetchBackend from "~/utils/fetchBackend"

export default defineEventHandler(async (event) => {
  const { collectionId, productId } = JSON.parse(await readBody(event));
  const parsedCollectionId = parseInt(collectionId);
  const parsedProductId = parseInt(productId);

  let params = new URLSearchParams();
  params.append("collectionId", parsedCollectionId.toString());
  params.append("productId", parsedProductId.toString());

  const fetchRes = await fetchBackend(`/api/collections/remove?${params.toString()}`, {
    method: "POST",
  })

  if (fetchRes.status !== 200) {
    return {
      statusCode: fetchRes.status,
      body: "Something went wrong"
    }
  }

  return {
    statusCode: 200,
    body: "Deleted successfully"
  }
});
