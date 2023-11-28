import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {

  const fetchRes = await fetchBackend(`/api/notifications`);

  if (fetchRes.status !== 200) {
    return {
      statusCode: fetchRes.status,
      body: "Something went wrong",
    };
  }

  const data = await fetchRes.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});
