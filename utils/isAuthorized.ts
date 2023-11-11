export default function isAuthorized(session: any, action: string) {
  const user = session?.user;
  if (!user) {
    return false;
  }
}
