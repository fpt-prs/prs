import { getServerSession } from "#auth";
import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const req = JSON.parse(body);
  const session = await getServerSession(event);
  const userId = (session?.user as any).id;
  const requestBody = {
    userHash: req.userHash,
    amount: req.amount,
    note: req.note,
    verifierId: userId,
  };
  console.log(requestBody);

  const fetchRes = await fetchBackend(`/api/payment/pay`, {
    method: "PUT",
    body: JSON.stringify(requestBody),
  });

  const data = await fetchRes.json();

  return {
    statusCode: fetchRes.status,
    body: JSON.stringify(data),
  };
});
