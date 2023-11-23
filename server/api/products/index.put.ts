import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  // get body
  const body = await readBody(event);

  // send req to backend
  const response = await fetchBackend(`/api/products`, {
    method: "PUT",
    body: body,
  });

  const status = response.status;
  setResponseStatus(event, status);

  if (status !== 200) {
    return {
      statusCode: status,
      body: "Failed to create product",
    };
  }

  return {
    statusCode: 200,
    body: "Product created",
  };
});
