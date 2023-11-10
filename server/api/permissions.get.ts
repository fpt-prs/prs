import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const fetchRes = await fetchBackend(`/api/permissions/all`);

  const permissions = await fetchRes.json();

  return {
    statusCode: 200,
    body: JSON.stringify(permissions),
  };
});
