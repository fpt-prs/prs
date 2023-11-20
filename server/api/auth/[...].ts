import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";
import fetchBackend from "~/utils/fetchBackend";

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  session: {
    maxAge: 60 * 60 * 24, // 1 day
  },
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      if (!profile) return false;

      let [dbProfile, _] = await getAccount(profile.sub);

      if (!dbProfile) {
        return true;
      }

      return dbProfile.isActive;
    },
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({ token, account, user }) => {
      // console.log("account", account);
      // console.log("token", token);
      // console.log("user", user);

      const isLoggedIn = !account;
      if (!isLoggedIn) {
        let [profile, _] = await getAccount(token.sub);

        const name = user?.name;

        if (!profile) {
          profile = await registerAccount({
            userCode: token.sub,
            email: token.email,
            name: name,
          });
        }

        token.id = profile.id;
        token.jwt = account?.id_token || "";
        token.roles = profile.roles;
        token.isActive = profile.isActive;
      }

      return Promise.resolve(token);
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({ session, token }) => {
      (session as any).user.sub = token.sub;
      (session as any).user.jwt = token.jwt;
      (session as any).user.id = token.id;
      (session as any).user.country = token.country;
      (session as any).user.roles = token.roles;
      (session as any).user.isActive = token.isActive;
      (session as any).user.gender = token.gender;
      (session as any).user.phoneNumber = token.phoneNumber;
      (session as any).user.dob = token.dob;
      (session as any).user.hash = token.hash;
      return Promise.resolve(session);
    },
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
});

const getAccount = async (sub: string | undefined) => {
  const params = new URLSearchParams();
  params.append("sub", sub || "");
  const res = await fetchBackend(`/api/users/detail?${params.toString()}`);

  const status = res.status;
  if (status !== 200) {
    return [null, status];
  }
  const data = await res.json();
  return [data, status];
};

const registerAccount = async (profile: any) => {
  const res = await fetchBackend(`/api/auth/merge`, {
    method: "POST",
    body: JSON.stringify(profile),
  });
  const status = res.status;
  if (status !== 200) {
    return [null, status];
  }
  const data = await res.json();
  return [data, status];
};
