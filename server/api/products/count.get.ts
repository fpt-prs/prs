import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const { category } = getQuery(event);

  const escapedCategory = category
    ?.toString()
    .replace(/ /g, "%20")
    .replace(/&/g, "%26");

  const fetchRes = await fetchBackend(
    `/api/products/count?category=${escapedCategory}`
  );
  const status = fetchRes.status;
  setResponseStatus(event, status);

  if (status !== 200) {
    return {
      body: "Sorry, we cannot find the categories.",
    };
  }

  const data = await fetchRes.json();
  return {
    body: data,
  };
});
