<template>
  <div id="auth-login">
    <div class="">
      <div class="flex flex-wrap md:flex-nowrap">
        <div class="w-full h-screen flex flex-col items-center justify-center">
          <div class="w-full md:px-4 lg:px-40">
            <div class="w-full flex items-center justify-center">
              <div class="w-36">
                <NuxtLink to="/">
                  <img src="~/assets/img/logo.svg" alt="Logo" class="w-full h-full">
                </NuxtLink>
              </div>
            </div>
            <div class="w-full flex flex-col items-center">
              <h1 class="text-sm lg:text-base font-bold pt-8 text-primary">Welcome Back!</h1>
              <p class="pb-8 pt-1 text-xs lg:text-sm text-gray-500">Login to shop.</p>
              <div class="px-6 w-full">
                <form @keyup.enter="submitLogin">
                  <div class="w-full mb-4">
                    <label for="email" class="text-xs lg:text-sm font-semibold after:content-['*'] after:text-red-600">Email</label>
                    <input type="email" id="email" name="email" class="text-xs lg:text-sm w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-2 focus:border-gray-300" placeholder="Enter email" autocomplete="off" v-model="data.email">
                    <p v-if="dataErrors.email" class="text-xs text-red-600 mt-2">{{ dataErrors.email }}</p>
                  </div>
                  <div class="w-full mb-16">
                    <label for="password" class="text-xs lg:text-sm font-semibold after:content-['*'] after:text-red-600">Password</label>
                    <input type="password" id="password" name="password" class="text-xs lg:text-sm w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-2 focus:border-gray-300" placeholder="Enter password" autocomplete="off" v-model="data.password">
                    <p v-if="dataErrors.password" class="text-xs text-red-600 mt-2">{{ dataErrors.password }}</p>
                  </div>
                  <div class="w-full mx-auto flex flex-col justify-center">
                    <button v-if="!isLoadingAuth" @click="submitLogin" type="button" class="text-sm font-bold text-white bg-primary rounded-full shadow-lg py-3 px-6 uppercase hover:bg-primary/80 transition duration-300">Login</button>
                    <button v-else type="button" class="flex justify-center text-sm font-bold text-white bg-primary rounded-full shadow-lg py-3 px-6 uppercase hover:bg-primary/80 transition duration-300">
                      <img src="~/assets/icons/icon-three-dots.svg" alt="loader">
                    </button>
                  </div>
                </form>
              </div>
              <div class="mt-10">
                <p class="text-xs lg:text-sm text-gray-500">Don't have an account? <NuxtLink to="/auth/register" class="font-semibold underline text-primary">Register</NuxtLink></p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-screen order-2 hidden md:block">
          <img src="~/assets/img/image-login.jpg" alt="Image" class="w-full h-full object-cover object-center">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const config = useRuntimeConfig();
const { isLoadingAuth } = storeToRefs(useAuthStore());
const { submitLogin, data, dataErrors } = useAuth();

const submit = () => {
  console.log('kontil')
}

useHead({
  title: 'Login',
  titleTemplate: 'Login | JajanTerus',
  meta: [
    { property: 'og:url', content: `${config.public.frontendUrl}/login` },
    { property: 'og:title', content: 'Login | JajanTerus' },
  ]
})
</script>
