import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const { page, size } = getQuery(event);
  const params = new URLSearchParams();
  params.append("page", page as string);
  params.append("size", size as string);

  const fetchRes = await fetchBackend(`/api/notifications?${params.toString()}`);
  const status = fetchRes.status;
  setResponseStatus(event, status);

  if (status !== 200) {
    return {
      body: "Something went wrong",
    };
  }

  const data = await fetchRes.json();

  return {
    body: JSON.stringify(data),
  };
});
