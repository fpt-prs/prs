import { getServerSession } from "#auth";
import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const user = session?.user;
  const id = (user as any)?.id;

  const fetchRes = await fetchBackend(`/api/users/balance?id=${id}`);
  const detail = await fetchRes.json();

  const status = fetchRes.status;
  setResponseStatus(event, status);

  return detail;
});
