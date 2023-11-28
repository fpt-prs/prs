import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const fetchRes = await fetchBackend(`/api/payment/subscriptions`, {
    method: "PUT",
    body: body,
  });

  const data = await fetchRes.json();
  const status = fetchRes.status;
  setResponseStatus(event, status);

  if (status !== 200) {
    return {
      body: data.error,
    };
  }

  return {
    body: data.value,
  };
});
