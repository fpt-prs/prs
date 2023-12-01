import fetchBackend from "~/utils/fetchBackend";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const user = session?.user;
  const userId = (user as any)?.id;

  const body = await readBody(event);
  const { category, criteria, action } = JSON.parse(body);

  const requestBody = {
    userId: userId,
    category: category,
    criteria: criteria,
    actions: action.split(","),
  };

  const fetchRes = await fetchBackend("/api/products/suggest", {
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
    body: "Success",
  };
});
