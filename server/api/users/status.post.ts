import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const reqBodyRaw = await readBody(event);

  let reqBody: any = reqBodyRaw;

  if (typeof reqBodyRaw === "object") {
    reqBody = JSON.stringify(reqBodyRaw);
  }

  console.log("reqBody", typeof reqBody);

  const fetchRes = await fetchBackend(`/api/users/update/admin`, {
    method: "POST",
    body: reqBody,
  });

  const status = fetchRes.status;

  setResponseStatus(event, status);

  return status;
});
