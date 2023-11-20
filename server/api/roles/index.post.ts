import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const json = body;

  const req = {
    id: json.id,
    name: json.name,
    permissionIds: json.permissions.map((p: any) => p.id),
  };

  const fetchRes = await fetchBackend(`/api/roles`, {
    method: "POST",
    body: JSON.stringify(req),
  });

  const data = await fetchRes.json();
  const status = fetchRes.status;

  console.log(status);

  if (status !== 200) {
    return {
      statusCode: status,
      body: data.error,
    };
  }

  return {
    statusCode: 200,
    body: data.value,
  };
});
