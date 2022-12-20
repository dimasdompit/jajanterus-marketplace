import CryptoJS from 'crypto-js';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('cryptoJs', CryptoJS);
})