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

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});
