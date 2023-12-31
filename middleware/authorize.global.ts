const routeAction = {
  "/admin/users": "user.read.all",
  "/admin/roles": "role.read.all",
  "/admin/permissions": "permission.read.all",
  "/admin/notifications/new": "notification.write.all",
  "/admin/notifications/.*": "notification.read.all",
  "/admin/payment": "payment.read.all",
  "/admin/accounts": "payment.read.all",
  "/admin/subscriptions": "payment.read.all",
  "/product/new": "product.write.all",
  "/product/.*/edit": "product.write.all",
  "/user/.*": "user.read.all",
};

export default defineNuxtRouteMiddleware(async (to) => {
  const { getSession } = useAuth();
  const session = await getSession();
  const user = session?.user;
  const router = useRouter();

  const publicPaths = ["/login", "/404", "/", "/about"];
  if (publicPaths.includes(to.path)) {
    return;
  }

  const userRoles = (user as any)?.roles;
  if (!user || !userRoles) {
    return router.push("/login");
  }

  const permissions = userRoles?.reduce((acc: any, role: any) => {
    return [...acc, ...role.permissions];
  }, []);

  const userPermissions = permissions.map((p: any) => p.name);
  const isAdmin = userRoles?.some(
    (role: any) => role.name.toLowerCase() === "admin"
  );

  for (const matcher in routeAction) {
    if (to.path.match(matcher)) {
      const routePermission = routeAction[matcher as keyof typeof routeAction];
      const hasPermission =
        !routePermission || userPermissions.includes(routePermission);

      if (!hasPermission && !isAdmin) {
        return router.push("/404");
      }
    }
  }

  return;
});
