import { getServerSession } from "#auth";
import fetchBackend from "~/utils/fetchBackend";

export type Collection = {
  name: string;
  id: number;
};

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const userId = (session?.user as any).id;

  let fetchRes = await fetchBackend(`/api/collections/list?userId=${userId}`);
  let data = await fetchRes.json();
  const status = fetchRes.status;
  setResponseStatus(event, status);

  return {
    body: JSON.stringify(data),
  };
});
