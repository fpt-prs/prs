import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const fetchRes = await fetchBackend(`/api/payment/options/${id}`, {
    method: "DELETE",
  });

  const status = fetchRes.status;
  setResponseStatus(event, status);

  if (status !== 204) {
    return {
      statusCode: status,
      body: "Something went wrong",
    };
  }

  return {
    statusCode: 200,
    body: "OK",
  };
});
