export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();

  nuxtApp.provide('apiAddressProvider', $fetch.create({ baseURL: config.public.apiAddressProvider }));
})