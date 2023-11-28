import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {

  const fetchRes = await fetchBackend(`/api/payment/subscriptions`);
  const pricingOptions = await fetchRes.json();

  return {
    statusCode: 200,
    body: JSON.stringify(pricingOptions),
  }

})
