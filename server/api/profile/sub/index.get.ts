import { getServerSession } from "#auth";
import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const user = session?.user;
  const userId = (user as any)?.id;

  const fetchRes = await fetchBackend(`/api/users/subscription?userId=${userId}`);
  const detail = await fetchRes.json();

  const status = fetchRes.status;
  setResponseStatus(event, status);

  return detail;
});
