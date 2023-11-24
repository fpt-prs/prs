const routeAction = {
  "/admin/users": "user.read.all",
  "/admin/notifications/new": "notification.write.all",
  "/admin/notifications/.*": "notification.read.all",
  "/admin/roles": "role.read.all",
  "/admin/accounts": "payment.read.all",
  "/admin/permissions": "permission.read.all",
  "/admin/payment": "payment.read.all",
  "/admin/options": "payment.read.all",
  "/product/new": "product.write.all",
  "/product/.*/edit": "product.write.all",
  "user/.*": "user.read.all",
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

  for (const matcher in routeAction) {
    if (to.path.match(matcher)) {
      const routePermission = routeAction[matcher as keyof typeof routeAction];
      const hasPermission =
        !routePermission || userPermissions.includes(routePermission);

      if (!hasPermission) {
        return router.push("/404");
      }
    }
  }

  return;
});
