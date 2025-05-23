export default defineNuxtConfig({
  app: {
    head: {
      title: "Sales Dashboard",
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  colorMode: {
    classSuffix: "",
  },
  css: ["~/assets/css/tailwind.css"],
});
