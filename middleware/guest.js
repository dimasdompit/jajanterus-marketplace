import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const { isLogin } = useAuthStore()

  if (process.client) {
    if (isLogin) {
      window.location.pathname = '/';
    }
  }
})