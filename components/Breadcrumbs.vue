<template>
  <div class="text-xs flex">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li v-for="(crumb, index) in crumbs" :key="index" class="inline-flex items-center">
        <svg v-if="index !== 0" class="w-4 h-4  lg:w-6 lg:h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>

        <NuxtLink v-if="crumb.link !== null" :to="crumb.link" class="inline-flex items-center text-xs lg:text-sm font-medium" :class="[index == crumbs.length - 1 ? 'text-gray-500' : 'text-gray-700 hover:text-gray-900']">
          {{ crumb.name }}
        </NuxtLink>
        <span v-else class="ml-1 text-xs lg:text-sm font-medium md:ml-2" :class="[index == crumbs.length - 1 ? 'text-gray-500' : 'text-gray-700 hover:text-gray-900']">{{ crumb.name }}</span>
      </li>
    </ol>
  </div>
</template>

<script setup>
const props = defineProps({
  crumbs: {
    type: Array,
    default: () => []
  }
})
</script>