import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const id = getQuery(event).id;

  const fetchRes = await fetchBackend(`/api/permissions/delete?id=${id}`, {
    method: "DELETE",
  });

  const message = await fetchRes.text();

  return {
    statusCode: 200,
    body: JSON.stringify(message),
  };
});
