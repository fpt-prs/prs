import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const fetchRes = await fetchBackend("/api/products/suggest");
  const data = await fetchRes.json();

  // convert to a file and allow user to download it
  const blob = new File([JSON.stringify(data)], "products.csv", {
    type: "text/csv",
  });

  return {
    statusCode: 200,
    body: blob,
  };
});
