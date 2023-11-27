import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const fetchRes = await fetchBackend("/api/payment/subscriptions");
  const data = await fetchRes.json();
  const status = fetchRes.status;
  setResponseStatus(event, status);

  return {
    body: JSON.stringify(data),
  };
});
