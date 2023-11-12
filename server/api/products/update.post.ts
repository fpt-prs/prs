import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  // get body
  const body = await readBody(event);

  // send req to backend
  const response = await fetchBackend(`/api/products/update`, {
    method: "POST",
    body: body,
  });

  const status = response.status;
  const json = await response.json();

  if (status !== 200) {
    return {
      statusCode: status,
      body: {
        message: "Failed to update product",
      },
    };
  }

  return {
    statusCode: 200,
    body: json.value,
  };
});
