import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const reqBodyRaw = await readBody(event);

  const fetchRes = await fetchBackend(`/api/users/update/admin`, {
    method: "POST",
    body: reqBodyRaw,
  });

  const status = fetchRes.status;

  setResponseStatus(event, status);

  return status;
});
