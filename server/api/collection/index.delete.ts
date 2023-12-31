import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  const fetchRes = await fetchBackend(`/api/collections/${id as string}`, {
    method: "DELETE",
  });

  if (fetchRes.status !== 200) {
    return {
      statusCode: fetchRes.status,
      body: "Something went wrong",
    };
  }

  return {
    statusCode: 200,
    body: "Collection deleted successfully",
  };
});
