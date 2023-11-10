import fetchBackend from "~/utils/fetchBackend";

export default defineEventHandler(async (event) => {
  const idStr = getRouterParam(event, "id");

  const id = parseInt(idStr || "");

  if (isNaN(id)) {
    return {
      statusCode: 400,
      body: "Invalid id",
    };
  }

  const detail = await fetchBackend(`/api/users?id=${id}`);
  const data = await detail.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
});
