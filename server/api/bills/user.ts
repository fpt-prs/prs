import { getServerSession } from "#auth";
import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const userId = (session?.user as any).id;

  const fetchRes = await fetchBackend(`/api/payment/user?userId=${userId}`);

  const data = await fetchRes.json();
  return {
    statusCode: fetchRes.status,
    body: JSON.stringify(data),
  };
});
