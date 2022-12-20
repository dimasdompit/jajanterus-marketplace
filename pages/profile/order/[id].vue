<template>
  <div id="profile">
    <div class="container">

      <section class="my-4">
        <!-- <div class="flex justify-center items-center mb-6 border-b-2 pb-4">
          <button type="button" class="mx-8 text-sm lg:text-lg uppercase">Profile</button>
          <button type="button" class="mx-8 text-sm lg:text-lg uppercase">My Orders</button>
        </div> -->
        <div class="flex justify-center">
          <div class="w-full h-full p-6 border border-gray-100 rounded-xl shadow mb-4 md:mr-4">
            <h1 class="text-xl font-bold text-center">Order Details</h1>
            <hr class="my-4" />
            <div v-if="order !== undefined" class="bg-gray-50 p-4">
              <p class="text-center text-xs lg:text-base">Order ID : <span class="text-primary font-semibold">{{ order.orderId }}</span></p>
            </div>
            <div class="my-6 lg:my-8 w-full p-4 border border-gray-300 text-center">
              <h3 class="text-base lg:text-lg mb-4">Delivery Address</h3>
              <p class="text-xs lg:text-sm mb-1">{{ order?.address?.firstName }} {{ order?.address?.lastName }}</p>
              <p class="text-xs lg:text-sm text-gray-500 mb-1">{{ order?.address?.phone }}</p>
              <p class="text-xs lg:text-sm text-gray-500">{{ order?.address?.address }}, {{ order?.address?.city }}, {{ order?.address?.zipcode }}</p>
            </div>
            <div class="mt-8">
              <div v-for="(product, index) in order?.productItems" :key="index" class="mb-4 flex border-b border-gray-300 pb-4">
                <div class="w-2/5 lg:w-1/6 mr-4">
                  <img :src="product.thumbnail" alt="" class="w-full h-full object-cover object-center">
                </div>
                <div class="w-full flex justify-between items-center">
                  <div class="w-full">
                    <h3 class="text-sm lg:text-base font-semibold">{{ product.title }}</h3>
                    <p class="text-xs lg:text-sm text-gray-500 mb-3">{{ product.brand }}</p>
                    <div class="w-full flex justify-between">
                      <p v-if="product.discountPercentage && product.discountPercentage !== 0" class="text-xs lg:text-sm text-gray-500 mb-2">{{ product.qty }} x ${{ calculateDiscount(product.price, product.discountPercentage) }}</p>
                      <p v-else class="text-xs lg:text-sm text-gray-500 mb-2">{{ product.qty }} x ${{ product.price }}</p>
                      <p class="text-xs lg:text-sm whitespace-nowrap">Total : ${{ product.total }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 w-full p-4 lg:p-6 mt-8">
              <p class="text-xs lg:text-sm font-medium mb-1 text-gray-600">Subtotal : ${{ order?.subtotal }}</p>
              <p class="text-xs lg:text-sm font-medium mb-1 text-gray-600">Tax(10%) : ${{ order?.tax }}</p>
              <p class="text-xs lg:text-sm font-medium mb-1 text-gray-600">Coupon Discount : -${{ order?.couponDiscount }}</p>
              <p class="text-xs lg:text-sm font-medium mb-1 text-gray-600">Shipping Cost : -$0</p>
              <hr class="my-4">
              <h4 class="text-sm lg:text-base font-semibold text-primary">Total Order : ${{ order?.total }}</h4>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useTransactionStore } from '~/stores/transaction';

definePageMeta({
  middleware: 'auth'
});

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const { orders } = storeToRefs(useTransactionStore());

useHead({
  title: 'Order Details',
  titleTemplate: 'Order Details | JajanTerus',
  meta: [
    { property: 'og:url', content: `${config.public.frontendUrl}/profile/order/${id}` },
  ]
})

const order = ref({});

const findOrder = () => {
  order.value = orders.value.find(item => item.orderId === id);
}

onMounted(() => {
  findOrder();

  if (order.value === undefined) {
    router.push('/profile');
  }
})
</script>
