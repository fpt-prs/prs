import { getServerSession } from "#auth";
import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const user = session?.user;
  const id = (user as any)?.id;
  console.log(id);

  const bodyRaw = await readBody(event);
  const body = JSON.parse(bodyRaw);
  console.log(body);

  const subscriptionId = body.subscriptionId;

  const reqBody = {
    userId: id,
    subscriptionId: subscriptionId,
  };

  console.log(reqBody);

  const fetchRes = await fetchBackend(`/api/users/subscription`, {
    method: "PUT",
    body: JSON.stringify(reqBody),
  });
  const detail = await fetchRes.json();

  const status = fetchRes.status;
  setResponseStatus(event, status);

  return detail;
});
