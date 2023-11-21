import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const name = getQuery(event).name;

  const fetchRes = await fetchBackend(`/api/permissions/create?name=${name}`, {
    method: "PUT",
  });

  const permissions = await fetchRes.json();

  return {
    statusCode: 200,
    body: JSON.stringify(permissions),
  };
});
