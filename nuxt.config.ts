// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.svg" }],
    },
  },
});
