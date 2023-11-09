import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {

  const fetchRes = await fetchBackend(`/api/notifications/all`, {
    method: "GET",
  });

  const data = await fetchRes.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});
