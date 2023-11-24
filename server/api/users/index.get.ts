import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const { page, size } = getQuery(event);

  const params = new URLSearchParams();
  params.append("page", page as string);
  params.append("pageSize", size as string);

  // get all users
  const fetchRes = await fetchBackend(`/api/users/all?${params.toString()}`);
  const data = await fetchRes.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});
