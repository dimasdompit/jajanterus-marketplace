<template>
  <div v-if="data !== undefined" class="p-2 w-1/2 md:w-1/4 inline-block">
    <NuxtLink :to="`/products/${data.id}`" class="transition duration-300 hover:font-semibold">
    <div class="aspect-square">
      <img :src="data.thumbnail" alt="Product" class="h-full w-full object-cover object-center rounded-lg">
    </div>
      <h4 class="text-sm lg:text-lg mt-2 whitespace-normal">{{ limitWord(data.title, 30, 30) }}</h4>
    </NuxtLink>
    <span v-if="data.discountPercentage && data.discountPercentage !== 0" class="inline-block text-[10px] lg:text-xs border-2 border-primary text-primary font-bold px-1 mb-5">{{ data.discountPercentage }}% off</span>
    <div v-if="data.discountPercentage && data.discountPercentage !== 0" class="flex items-center" :class="{'mt-11': !data.discountPercentage && data.discountPercentage === 0 }">
      <p class="text-md line-through lg:text-lg font-medium text-gray-400 mr-1">${{ data.price }}</p>
      <p class="text-lg lg:text-xl font-medium text-primary">${{ discountPrice }}</p>
    </div>
    <p v-else class="text-lg lg:text-xl font-medium text-primary" :class="{'mt-11': !data.discountPercentage && data.discountPercentage === 0 }">${{ data.price }}</p>
    <div class="flex items-end">
      <ClientOnly placeholder="Loading...">
        <star-rating
          :rating="data.rating"
          :show-rating="false"
          :star-size="15"
          :read-only="true"
          :increment="0.01"
        ></star-rating>
      </ClientOnly>
      <span class="text-xs text-gray-500">({{ data.rating }})</span>
    </div>
    <button v-if="isLogin" @click="addToCart" class="text-sm lg:text-base px-7 py-2 border border-slate-600 rounded-full mt-2 hover:bg-primary hover:text-white hover:border-primary transition duration-300 hover:shadow-md" type="button">Add to cart</button>
    <NuxtLink v-else to="/auth/login" class="text-sm lg:text-base px-7 py-2 border border-slate-600 rounded-full mt-2 hover:bg-primary hover:text-white hover:border-primary transition duration-300 hover:shadow-md" type="button">Add to cart</NuxtLink>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

const { isLogin } = useAuthStore()

const discountPrice = computed(() => {
  return calculateDiscount(props.data.price, props.data.discountPercentage);
})

const emit = defineEmits(["addToCart"])

const addToCart = () => {
  emit("addToCart");
}
</script>