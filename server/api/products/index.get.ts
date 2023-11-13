export default defineEventHandler(async (event) => {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:8080";
  const { field, order, page, search } = getQuery(event);

  if (!field || !order) {
    return {
      statusCode: 400,
      body: "Missing required parameters",
    };
  }

  const pageSize = 8;

  if (!field) {
    return {
      statusCode: 400,
      body: "Invalid field",
    };
  }

  let params = new URLSearchParams();
  params.append("name", search as string);
  params.append("page", page as string);
  params.append("size", pageSize.toString());
  params.append("sortBy", field as string);
  params.append("sortDirection", order as string);
  const fetchRes = await fetch(
    `${backendUrl}/api/products/search?${params.toString()}`,
    {
      headers: {
        Authorization: `Basic ${process.env.BASIC_AUTH}`,
      },
    }
  );

  const data = await fetchRes.json();

  const { content, totalElements } = data;

  return {
    statusCode: 200,
    body: JSON.stringify({ content, totalElements }),
  };
});
