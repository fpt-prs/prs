import { getServerSession } from "#auth";
import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const user = session?.user;

  const reqBodyRaw = await readBody(event);

  const profileUpdateRequest = {
    ...reqBodyRaw,
    id: (user as any)?.id,
  };

  const fetchRes = await fetchBackend(`/api/users/update`, {
    method: "POST",
    body: JSON.stringify(profileUpdateRequest),
  });

  const status = fetchRes.status;
  const body = await fetchRes.json();
  setResponseStatus(event, status);

  if (status !== 200) {
    return {
      statusCode: status,
      body: body.error,
    };
  }
  return {
    statusCode: 200,
    body: body.value,
  };
});
