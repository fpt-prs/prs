import { getServerSession } from "#auth";
import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const user = session?.user;
  const userId = (user as any)?.id;

  const bodyRaw = await readBody(event);
  const body = JSON.parse(bodyRaw);
  const beRequestBody = {
    userId,
    autoRefresh: body.autoRefresh,
  };

  const fetchRes = await fetchBackend(`/api/users/subscription/auto`, {
    method: "POST",
    body: JSON.stringify(beRequestBody),
  });

  const detail = await fetchRes.json();
  const status = fetchRes.status;
  setResponseStatus(event, status);

  if (status !== 200) {
    return {
      body: detail.error,
    };
  }

  return {
    body: "Success",
  };
});
