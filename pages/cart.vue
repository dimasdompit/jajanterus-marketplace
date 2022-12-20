<template>
  <div id="cart">
    <div class="container">

      <Breadcrumbs :crumbs="crumbs" />

      <!-- Cart Section Start -->
      <section class="my-4 lg:my-8">
        <h2 class="text-xl lg:text-3xl font-bold uppercase mb-2 lg:mb-4">My Cart</h2>
        <ClientOnly placeholder="Loading...">
          <div v-if="cartItems?.length" class="relative flex flex-wrap justify-between md:flex-nowrap">
            <div class="w-full h-96 lg:h-[500px] overflow-x-auto">
              <div v-for="(cart, index) in cartItems" :key="index" class="relative overflow-hidden md:mr-2 lg:mr-4">
                <div class="flex w-full relative z-20 bg-white p-4 border border-gray-200 rounded shadow-sm mb-3 transition-all duration-300 ease-in-out" :class="[isActive(cart) ? '-left-20' : 'left-0' ]">
                  <div class="w-44 lg:w-52 h-28 lg:h-36 rounded-md overflow-hidden mr-4">
                    <img :src="cart.thumbnail" :alt="cart.title" class="w-full h-full object-contain object-center">
                  </div>
                  <div class="w-full mr-4">
                    <h3 class="text-sm lg:text-base font-bold lg:hidden">{{ limitWord(cart.title, 30, 30) }}</h3>
                    <h3 class="text-sm lg:text-base font-bold hidden lg:block">{{ cart.title }}</h3>
                    <p class="text-xs lg:text-sm text-gray-400 my-1">{{ cart.brand }}</p>
                    <div class="flex items-center">
                      <p class="text-xs lg:text-sm font-semibold text-gray-500 line-through mr-1">${{ cart.price }}</p>
                      <p class="text-sm lg:text-base font-bold text-primary">${{ calculateDiscount(cart.price, cart.discountPercentage) }}</p>
                    </div>

                    <div class="mt-4 w-28 lg:w-32 flex items-center justify-between">
                      <button
                        @click="subtract(cart)"
                        class="px-3 py-1 font-bold rounded-full shadow-md"
                        :class="[cart.qty > 1 ? 'text-dark bg-white border border-gray-200' : 'text-white bg-gray-300']"
                        type="button"
                      >-</button>
                      <div class="text-sm lg:text-base font-bold text-dark">{{ cart.qty }}</div>
                      <button @click="add(cart)" class="px-3 py-1 font-bold text-dark bg-white border border-gray-200 rounded-full shadow-md" type="button">+</button>
                    </div>
                  </div>
                  <button v-if="!isActive(cart)" @click="openDelete(cart)" type="button" class="w-9 md:w-7">
                    <img src="~/assets/icons/icon-trash.svg" alt="Icon Delete" class="w-full" />
                  </button>
                  <button v-else @click="closeDelete(cart)" type="button" class="w-7 text-xl">
                    <img src="~/assets/icons/icon-arrow-right.svg" alt="Icon Delete" class="w-full" />
                  </button>
                </div>
                <div class="absolute z-10 top-0 bottom-0 right-0 bg-white shadow-sm mb-3 transition duration-300 ease-in-out">
                  <button @click="deleteItem(cart)" class="h-full w-full bg-red-600 px-4 text-center text-white rounded hover:bg-red-700 transition duration-300" type="button">Delete</button>
                </div>
              </div>
            </div>
            <hr class="bg-gray-200 w-full md:hidden" />
            <div class="w-full sticky md:static right-0 bottom-0 md:h-1/2 md:w-1/2 bg-white p-4 border border-gray-200 rounded shadow-sm mb-3 mt-2 md:mt-0">
              <h4 class="text-base md:text-sm lg:text-base font-bold text-primary mb-4">Shopping Summary</h4>
              <div class="flex justify-between items-center mb-4">
                <p class="text-sm lg:text-base text-gray-400">Total Price</p>
                <p class="text-sm lg:text-base font-bold">${{ total }}</p>
              </div>
              <button @click="checkoutProducts(cartItems, total)" class="w-full py-2 lg:py-3 text-sm font-semibold text-white bg-primary rounded-full shadow-md hover:bg-primary/80 transition duration-300">Checkout</button>
            </div>
          </div>
          <div v-else class="flex flex-col items-center justify-center">
            <img src="~/assets/illustrations/illustration-empty-cart.svg" alt="Empty Cart" class="w-full md:w-1/2 h-full mb-4" />
            <p class="mb-4 text-xs text-center text-gray-500 sm:text-base">Your cart may be empty, but your life doesn't have to be! <br> <span class="text-primary font-bold text-sm sm:text-base lg:text-xl">Shop now and save with our daily deals.</span></p>
            <NuxtLink to="/" class="font-medium text-sm lg:text-xl text-white bg-primary px-12 py-2 rounded-lg hover:bg-primary/90 transition duration-300 uppercase">
              Shop Now!
            </NuxtLink>
          </div>
        </ClientOnly>
      </section>

      <!-- Cart Section End -->
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

definePageMeta({
  middleware: 'auth',
})

useHead({
  title: 'Cart',
  titleTemplate: 'Cart | JajanTerus',
  meta: [
    { property: 'og:url', content: `${config.public.frontendUrl}/cart` },
  ]
})

import { storeToRefs } from 'pinia';
import { useCartsStore } from "~/stores/carts";
import { useTransactionStore } from "~/stores/transaction"

const router = useRouter();
const { deleteItem } = useCartsStore()
const { proceedCheckout } = useTransactionStore()
const { cartItems, total } = storeToRefs(useCartsStore());
const { trashItems, add, subtract, isActive, openDelete, closeDelete } = useCarts();

const crumbs = [
  {name: 'Home', link: '/'},
  {name: 'Cart', link: null}
]

const checkoutProducts = (products, total) => {
  const orderId = `JT-${new Date().getTime()}`
  const token = generateToken(60)
  proceedCheckout(orderId, products, total, token);
  router.push(`checkout?p=${token}`);
}
</script>
