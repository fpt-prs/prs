const routeAction = {
  "/admin/users": "users.read.all",
  "/admin/notifications": "notification.read.all",
  "/admin/roles": "role.read.all",
  "/admin/permissions": "permission.read.all",
  "/admin/notifications/new": "notification.write.all",
  "/admin/payment": "payment.read.all",
  "/admin/options": "payment.read.all",
};

export default defineNuxtRouteMiddleware(async (to) => {
  const { getSession } = useAuth();
  const session = await getSession();
  const user = session?.user;
  const router = useRouter();

  const publicPaths = ["/login", "/404", "/"];
  if (publicPaths.includes(to.path)) {
    return;
  }

  const userRoles = (user as any)?.roles;
  const permissions = userRoles?.reduce((acc: any, role: any) => {
    return [...acc, ...role.permissions];
  }, []);

  const userPermissions = permissions.map((p: any) => p.name);
  const routePermission = routeAction[to.path as keyof typeof routeAction];

  const hasPermission =
    !routePermission || userPermissions.includes(routePermission);

  if (!hasPermission) {
    return router.push("/404");
  }

  return;
});
