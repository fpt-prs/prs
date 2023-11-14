import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const fetchRes = await fetchBackend(`/api/payment/options/${id}`);
  const pricingOptions = await fetchRes.json();

  return {
    statusCode: fetchRes.status,
    body: JSON.stringify(pricingOptions),
  };
});
