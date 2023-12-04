import fetchBackend from "~/utils/fetchBackend";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const user = session?.user;
  const userId = (user as any)?.id;

  const collectionId = getQuery(event).collectionId;

  const requestBody = {
    userId: userId,
    collectionId: collectionId,
  };

  const fetchRes = await fetchBackend("/api/products/export", {
    method: "POST",
    body: JSON.stringify(requestBody),
  });
  const data = await fetchRes.json();
  const status = fetchRes.status;
  setResponseStatus(event, status);

  if (status !== 200) {
    return {
      body: data.error,
    };
  }

  return {
    body: data.value,
  };
});
