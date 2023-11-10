import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const sub = getRouterParam(event, "sub");

  const fetchRes = await fetchBackend(`/api/users/detail?sub=${sub}`);
  console.log(fetchRes.status);
  const detail = await fetchRes.json();

  return {
    statusCode: 200,
    body: JSON.stringify(detail),
  };
});
