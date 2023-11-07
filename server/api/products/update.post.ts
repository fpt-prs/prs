export default defineEventHandler(async (event) => {
  // get body
  const body = await readBody(event);

  const backendUrl = process.env.BACKEND_URL || "http://localhost:8080";
  // send req to backend
  const response = await fetch(`${backendUrl}/api/products/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.BASIC_AUTH}`,
    },
    body: body,
  });

  console.log(await response.text());
  const status = response.status;
  console.log(status);

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
    body: {},
  };
});
