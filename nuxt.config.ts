// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@sidebase/nuxt-auth"],
  auth: {
    origin: process.env.AUTH_ORIGIN,
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.svg" }],
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  webpack:{
    optimizeCSS: true,
  },
  runtimeConfig: {
    public: {
      domain: process.env.DOMAIN_NAME,
    },
  },
});
