<template>
  <div v-if="data?.length" ref="wrapper">
    <div class="flex items-center gap-x-8 relative w-full">
      <div class="w-full rounded-lg overflow-hidden">
        <div class="flex items-center">
          <NuxtLink
            v-for="(item, index) in data"
            :key="index"
            class="block w-full min-w-full max-w-full h-48 md:h-56 lg:h-72 z-10 transition-all duration-300"
            :style="{ transform: `translateX(${-width * (currentSlide - 1)}px)` }"
            :to="`/products/${item.id}`"
          >
            <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover object-top">
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center gap-x-2 py-3 z-30">
      <button
        type="button"
        v-for="(item, index) in data"
        :key="index"
        class="h-2 lg:h-3 rounded-full transition-all duration-300"
        :class="{
          'bg-gray-300 w-2 lg:w-3': currentSlide !== index + 1,
          'bg-primary w-8 lg:w-12': currentSlide === index + 1
        }"
        @click="currentSlide = index + 1"
      />
    </div>
  </div>
</template>

<script setup>
import { useElementSize } from '@vueuse/core'
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const currentSlide = ref(1)
const theInterval = ref(null);
const wrapper = ref(null)
const { width } = useElementSize(wrapper)

onMounted(() => {
  theInterval.value = setInterval(() => {
    nextSlide()
  }, 3500);
})

onUnmounted(() => {
  clearInterval(theInterval.value);
})

const nextSlide = () => {
  if (currentSlide.value === props.data?.length) {
    currentSlide.value = 1;
  } else {
    currentSlide.value++;
  }
}
</script>
