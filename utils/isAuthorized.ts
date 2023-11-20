export default async function isAuthorized(session: any, action: string) {
  const user = session?.user;
  if (!user) {
    return false;
  }
  const roles = (user as any)?.roles;
  for (const role of roles) {
    const permissions = role?.permissions;
    if (!permissions) {
      continue;
    }
    const permissionNames = permissions.map((p: any) => p.name);
    if (permissionNames.includes(action)) {
      return true;
    }
  }
  return false;
}
