import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const json = JSON.parse(body);
  const id = json.id;
  const name = json.name;

  let params = new URLSearchParams();
  params.append("id", id);
  params.append("name", name);

  const fetchRes = await fetchBackend(
    `/api/permissions/update?${params.toString()}`,
    {
      method: "POST",
    }
  );

  const message = await fetchRes.text();
  const statusCode = fetchRes.status;
  setResponseStatus(event, statusCode);

  return {
    body: message,
  };
});
