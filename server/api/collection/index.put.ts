import fetchBackend from "~/utils/fetchBackend";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const { name } = JSON.parse(await readBody(event));
  const session = await getServerSession(event);
  const userId = (session?.user as any).id;

  let params = new URLSearchParams();
  params.append("name", name);
  params.append("userId", userId.toString());

  const fetchRes = await fetchBackend(`/api/collections?${params.toString()}`, {
    method: "PUT",
  });
  const data = await fetchRes.json();
  const status = fetchRes.status;
  setResponseStatus(event, status);

  if (fetchRes.status !== 200) {
    return {
      statusCode: fetchRes.status,
      body: data.error,
    };
  }

  return {
    statusCode: 200,
    body: data.value,
  };
});
