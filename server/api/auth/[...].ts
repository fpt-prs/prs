import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";
export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  session: {
    maxAge: 60 * 60 * 24, // 1 day
  },
  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({ token, account, user }) => {
      const isSignIn = user ? true : false;
      // console.log("account", account);
      // console.log("token", token);
      // console.log("user", user);
      if (isSignIn) {
        token.jwt = account?.id_token || "";
        token.id = user ? user.id || "" : "";
        token.family_name = user ? (user as any).family_name || "" : "";
        token.given_name = user ? (user as any).given_name || "" : "";
      }
      return Promise.resolve(token);
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({ session, token }) => {
      (session as any).user.id = token.sub;
      (session as any).user.family_name = token.family_name;
      (session as any).user.given_name = token.given_name;
      (session as any).user.jwt = token.jwt;
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
