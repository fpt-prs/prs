import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const account = await fetchBackend(`/api/payment/qr/${id}/image`);

  const arrayBuffer = await account.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  setResponseHeader(event, "Content-Type", "image/png");

  return buffer;
});
