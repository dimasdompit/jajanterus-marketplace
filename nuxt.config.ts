// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Jajan Terus',
      titleTemplate: '%s | JajanTerus',
      htmlAttrs: {
        lang: "en"
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: 'JajanTerus, jajan, marketplace, ecommerce' },
        { name: 'description', content: "JajanTerus is the ultimate destination for all your shopping needs. With a vast selection of products ranging from clothing and accessories to home goods and electronics, you'll find everything you need at unbeatable prices." },
        { name: 'robots', content: "Index, Follow" },
        { property: 'og:title', content: "JajanTerus | The best deals are just a click away" },
        { property: 'og:description', content: "JajanTerus is the ultimate destination for all your shopping needs. With a vast selection of products ranging from clothing and accessories to home goods and electronics, you'll find everything you need at unbeatable prices." },
        { property: 'og:url', content: `${process.env.NUXT_FRONTEND_URL}/` },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '~/assets/img/logo.png' },
        { property: 'og:image:secure_url', content: '~/assets/img/logo.png' },
        { property: 'og:site:name', content: 'JajanTerus' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:description', content: "JajanTerus is the ultimate destination for all your shopping needs. With a vast selection of products ranging from clothing and accessories to home goods and electronics, you'll find everything you need at unbeatable prices." },
        { property: 'twitter:image', content: '~/assets/img/logo.png' },
        { property: 'twitter:image:alt', content: 'JajanTerus Logo' },
        { property: 'twitter:site', content: '@JajanTerus' },
        { property: 'twitter:creator', content: '@JajanTerus' },
      ],
      link: [
        { rel: "icon", type: 'image/x-icon', href: '/favicon.ico' },
        { rel: "apple-touch-icon", href: '/favicon.ico' },
        { rel: "canonical", href: `${process.env.NUXT_FRONTEND_URL}/` },
      ]
    }
  },
  runtimeConfig: {
    public: {
      cryptoSecretKey: process.env.NUXT_CRYPTO_SECRET_KEY,
      apiUrl: process.env.NUXT_API_URL,
      frontendUrl: process.env.NUXT_FRONTEND_URL,
      apiAddressProvider: process.env.NUXT_ADDRESS_PROVIDER_API,
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    [
      "@pinia/nuxt", {
        autoImports: [
          ['defineStore', 'definePiniaStore'],
        ]
      }
    ],
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
  ],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage'
  },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
})
