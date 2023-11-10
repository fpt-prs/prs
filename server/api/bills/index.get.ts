import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const fetchRes = await fetchBackend(`/api/payment/bills`);

  const page = await fetchRes.json();

  return {
    statusCode: fetchRes.status,
    body: JSON.stringify(page),
  };
});
