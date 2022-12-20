<template>
  <main>
    <slot />
  </main>
</template>

<script setup>
import 'sweetalert2/dist/sweetalert2.min.css';
import { useAuthStore } from '~/stores/auth'

const { authCheck } = useAuthStore()

onMounted(() => {
  authCheck()
})
</script>
