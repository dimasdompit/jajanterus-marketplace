<template>
    <NuxtLink v-if="data !== null || data !== undefined" :to="`/products/category/${data.slug}`" class="bg-white p-3 m-[2px] flex flex-col items-center justify-center transition duration-300 cursor-pointer hover:shadow-md hover:-translate-y-1">
      <img :src="getIcon" :alt="data.title" class="mb-2" />
      <p class="text-xs capitalize text-center w-20 whitespace-normal">{{ data.title }}</p>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  }
});


const getIcon = computed(() => {
  return props.data.icon ? loadAsset(props.data.icon) : null;
})
</script>
