import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const { actions } = getQuery(event);

  const response = await fetchBackend(
    `/api/products/action-price?actions=${actions?.toString()}`
  );
  const data = await response.json();
  const status = response.status;
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
