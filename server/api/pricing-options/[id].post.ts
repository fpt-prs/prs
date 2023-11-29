import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const rawBody = await readBody(event);

  const body = JSON.parse(rawBody);

  const req = {
    id: parseInt(id as string),
    ...body,
  };

  const fetchRes = await fetchBackend(`/api/payment/subscriptions`, {
    method: "POST",
    body: JSON.stringify(req),
  });

  const status = fetchRes.status;
  const data = await fetchRes.json();
  setResponseStatus(event, status);

  if (status !== 200) {
    return {
      rawBody: data.error,
    };
  }

  return {
    rawBody: data.value,
  };
});
