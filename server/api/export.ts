import fetchBackend from "~/utils/fetchBackend";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const user = session?.user;
  const id = (user as any)?.id;

  const fetchBalance = await fetchBackend(`/api/users/balance?id=${id}`);
  const detail = await fetchBalance.json();
  const balance = detail.value;

  if (balance <= 0) {
    setResponseStatus(event, 400);
    return {
      body: "Insufficient balance",
    };
  }

  const fetchRes = await fetchBackend("/api/products/suggest");
  const data = await fetchRes.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});
