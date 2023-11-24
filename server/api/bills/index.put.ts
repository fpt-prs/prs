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

  const fetchRes = await fetchBackend(`/api/payment/pay`, {
    method: "PUT",
    body: JSON.stringify(requestBody),
  });

  setResponseStatus(event, fetchRes.status);

  if (fetchRes.status !== 200) {
    return {
      statusCode: fetchRes.status,
      body: "Something went wrong. Please check your input.",
    };
  }

  return {
    body: "Verified successfully.",
  };
});
