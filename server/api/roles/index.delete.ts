import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  // get body
  const query = getQuery(event);
  const id = parseInt(query.id as string);
  console.log("id", id);

  const response = await fetchBackend(`/api/roles?id=${id}`, {
    method: "DELETE",
  });
  const status = response.status;
  setResponseStatus(event, status);

  return {
    body: await response.text(),
  };
});
