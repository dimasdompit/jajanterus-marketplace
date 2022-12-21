<template>
  <div v-if="data?.length" ref="wrapper">
    <div class="flex items-center gap-x-8 relative w-full mb-2">
      <div class="w-full rounded-lg overflow-hidden">
        <div class="flex items-center">
          <div
            v-for="(item, index) in data"
            :key="index"
            class="w-full min-w-full max-w-full h-48 md:h-56 lg:h-72 z-10 transition-all duration-300"
            :style="{ transform: `translateX(${-width * (currentSlide - 1)}px)` }"
          >
            <img :src="item" :alt="item" class="w-full h-full object-contain object-center">
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-auto whitespace-nowrap bg-gray-100">
      <div 
        v-for="(item, index) in data"
        :key="index"
        class="p-2 w-1/3 inline-block cursor-pointer transition-all duration-300"
        @click="currentSlide = index + 1"
      >
          <img :src="item" :alt="item" class="w-full h-24 lg:h-40 object-cover object-center">
      </div>
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
const wrapper = ref(null)
const { width } = useElementSize(wrapper)

onMounted(() => {
  if (currentSlide === props.data.length) {
    currentSlide = 1;
  }
})

</script>
