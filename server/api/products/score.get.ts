import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const { category, criteria } = getQuery(event);

  const escapedCategory = category
    ?.toString()
    .replace(/ /g, "%20")
    .replace(/&/g, "%26");

  const fetchRes = await fetchBackend(
    `/api/products/score-range?category=${escapedCategory}&criteria=${criteria}`
  );
  const status = fetchRes.status;
  setResponseStatus(event, status);
  const data = await fetchRes.json();

  if (status !== 200) {
    return {
      body: data.error,
    };
  }

  return {
    body: JSON.stringify(data.value),
  };
});
