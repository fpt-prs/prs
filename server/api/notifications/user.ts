import { getServerSession } from "#auth";
import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const userId = (session?.user as any).id;

  const fetchRes = await fetchBackend(
    `/api/notifications/user/${userId.toString()}`
  );

  const data = await fetchRes.json();

  if (fetchRes.status !== 200) {
    return {
      statusCode: fetchRes.status,
      body: data.error,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data.value),
  };
});
