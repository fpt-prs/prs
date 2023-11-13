import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const reqBodyRaw = await readBody(event);
  const { id, isActive } = JSON.parse(reqBodyRaw);

  let params = new URLSearchParams();
  params.append("id", id);
  params.append("isActive", isActive);
  const fetchRes = await fetchBackend(`/api/products/status?${params.toString()}`, {
    method: "PATCH",
  });

  const status = fetchRes.status;
  const body = await fetchRes.json();

  if (status !== 200) {
    return {
      statusCode: status,
      body: body.error,
    };
  }

  return {
    statusCode: 200,
    body: body.value,
  };
});
