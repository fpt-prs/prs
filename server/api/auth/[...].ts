import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";
export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user ? (user as any).access_token || "" : "";
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
