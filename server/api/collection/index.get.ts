import { getServerSession } from "#auth";
import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const session = await getServerSession(event);
  const user = session?.user;
  const userId = (user as any)?.id;
  const params = new URLSearchParams({ id: id as string, userId });

  let fetchRes = await fetchBackend(`/api/collections?${params.toString()}`);

  const data = await fetchRes.json();
  const status = fetchRes.status;
  setResponseStatus(event, status);

  if (status !== 200) {
    return {
      statusCode: status,
      body: data.error
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data.value),
  };
});
