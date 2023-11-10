import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  // get body
  const body = await readBody(event);
  const name = body.name;

  const response = await fetchBackend(`/api/roles?name=${name}`, {
    method: "PUT",
  });

  return {
    status: response.status,
    body: await response.text(),
  };
});
