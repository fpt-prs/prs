import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const response = await fetchBackend(`/api/products/categories`);
  const data = await response.json();
  const status = response.status;
  setResponseStatus(event, status);

  if (status !== 200) {
    return {
      body: "Sorry, we cannot find the categories.",
    };
  }

  return {
    body: JSON.stringify(data),
  };
});
