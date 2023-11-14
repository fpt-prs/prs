import { getServerSession } from "#auth";
import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const user = session?.user;
  const sub = (user as any)?.sub;

  const fetchRes = await fetchBackend(`/api/users/detail?sub=${sub}`);
  const detail = await fetchRes.json();

  const status = fetchRes.status;
  setResponseStatus(event, status);

  if (status !== 200) {
    return {
      statusCode: status,
      body: "Failed to fetch user",
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(detail),
  };
});
