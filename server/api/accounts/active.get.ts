import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const fetchRes = await fetchBackend(`/api/payment/qr/active`);
  const account = await fetchRes.json();

  const status = fetchRes.status;
  setResponseStatus(event, status);
  if (status !== 200) {
    return {
      body: "Something went wrong",
    };
  }

  return {
    body: JSON.stringify(account.value),
  };
});
