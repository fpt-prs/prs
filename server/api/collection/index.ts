import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  let fetchRes = await fetchBackend(`/api/collections?id=${id}`);

  const data = await fetchRes.json();

  if (!data) {
    return {
      statusCode: 400,
      body: null,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});
