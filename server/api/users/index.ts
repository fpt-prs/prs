import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  // get all users
  const fetchRes = await fetchBackend(`/api/users/all`);
  const page = await fetchRes.json();

  return {
    statusCode: 200,
    body: JSON.stringify(page.content),
  };
});
