<template>
  <PartialsHeaderApp />
  <main class="pt-28">
    <slot />
  </main>
  <PartialsFooterApp />
</template>

<script setup>
import 'sweetalert2/dist/sweetalert2.min.css';
import { useAuthStore } from '~/stores/auth'

const { authCheck } = useAuthStore()
const { splashBrowser } = useTerms();

onMounted(() => {
  splashBrowser();
  authCheck()
})
</script>