import { getServerSession } from "#auth";
import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const userId = (session?.user as any).id;

  const { page, size } = getQuery(event);
  const params = new URLSearchParams();
  params.set("userId", userId as string);
  params.set("page", page as string);
  params.set("size", size as string);

  const fetchRes = await fetchBackend(`/api/payment/user?${params.toString()}`);

  const data = await fetchRes.json();
  return {
    statusCode: fetchRes.status,
    body: JSON.stringify(data),
  };
});
