import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const fetchRes = await fetchBackend(`/api/payment/qr/${id}`, {
    method: "DELETE",
  });

  const status = fetchRes.status;
  setResponseStatus(event, status);

  if (status !== 200) {
    return {
      body: "Delete account failed",
    };
  }

  return {
    body: "Delete account success",
  };
});
