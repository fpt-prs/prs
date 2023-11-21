import { getServerSession } from "#auth";

const apiMap: any = {
  "/api/bills": "payment",
  "/api/collection": "collection",
  "/api/notifications": "notification",
  "/api/permissions": "permission",
  "/api/products": "product",
  "/api/roles": "role",
  "/api/users": "user",
};

export default defineEventHandler(async (event) => {
  const route = event.path;
  const includedPaths = Object.keys(apiMap);
  if (!includedPaths.includes(route)) {
    return;
  }

  const session = await getServerSession(event);
  const user = session?.user;
  const roles = (user as any)?.roles;
  const permissions = roles
    .map((r: any) => r?.permissions)
    .flat()
    .map((p: any) => p?.name);

  const method = event.method;
  let actionPer = "";
  switch (method) {
    case "GET":
      actionPer = "read";
      break;
    default:
      actionPer = "write";
      break;
  }
  const neededPermissions = `${apiMap[route]}.${actionPer}.all`;
  const hasPermission = permissions.includes(neededPermissions);

  if (!hasPermission) {
    console.log("403");
    // return sendError(event, createError({ statusCode: 403 }));
  }

  console.log("route", route);
});
