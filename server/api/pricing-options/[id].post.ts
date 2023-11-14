import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  const fetchRes = await fetchBackend(`/api/payment/options/${id}`, {
    method: "POST",
    body: body,
  });

  const status = fetchRes.status;
  const data = await fetchRes.json();
  setResponseStatus(event, status);

  if (status !== 200) {
    return {
      statusCode: status,
      body: data.error,
    };
  }

  return {
    statusCode: 200,
    body: data.value,
  };
});
