import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const fetchRes = await fetchBackend(`/api/payment/qr`);
  const status = fetchRes.status;

  setResponseStatus(event, status);
  if (status !== 200) {
    return {
      body: "Something went wrong",
    };
  }

  const accounts = await fetchRes.json();

  return {
    body: JSON.stringify(accounts.value),
  };
});
