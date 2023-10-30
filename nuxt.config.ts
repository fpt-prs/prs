import { NuxtPage } from "nuxt/schema";

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
  css: ["~/assets/css/global.css"],
});
