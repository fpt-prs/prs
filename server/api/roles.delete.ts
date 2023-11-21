import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  // get body
  const idRaw = getQuery(event)
  const id = parseInt(idRaw.id as string);

  const response = await fetchBackend(`/api/roles?id=${id}`, {
    method: "DELETE",
  });

  return {
    status: response.status,
    body: await response.text(),
  };
});
