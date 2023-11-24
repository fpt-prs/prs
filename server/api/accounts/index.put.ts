import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const body = await readFormData(event);

  const fetchRes = await fetchBackend("/api/payment/qr", {
    method: "PUT",
    body: body as FormData,
    headers: {
      Authorization: `Basic ${process.env.BASIC_AUTH}`,
    },
  });

  const status = fetchRes.status;
  setResponseStatus(event, status);

  if (status !== 200) {
    return {
      body: "Create account failed",
    };
  }

  return {
    body: "Create account success",
  };
});
