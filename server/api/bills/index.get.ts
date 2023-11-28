import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const { page, size } = getQuery(event);

  const params = new URLSearchParams();
  params.append("page", page as string);
  params.append("size", size as string);

  const fetchRes = await fetchBackend(`/api/payment/user-history?${params.toString()}`);

  const data = await fetchRes.json();

  return {
    statusCode: fetchRes.status,
    body: JSON.stringify(data),
  };
});
