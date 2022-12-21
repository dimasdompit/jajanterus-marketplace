<template>
  <div id="profile">
    <div class="container">

      <Breadcrumbs :crumbs="crumbs" />

      <section class="my-4">
        <div class="flex justify-center items-center mb-6 bg-primary py-2 rounded-lg">
          <button @click="activeTab = 1" type="button" class="w-full mx-2 lg:mx-2 text-sm lg:text-base uppercase py-1 px-6 rounded-md whitespace-nowrap" :class="[activeTab === 1 ? 'text-primary font-bold bg-white' : 'text-white']">Profile</button>
          <button @click="activeTab = 2" type="button" class="w-full mx-2 lg:mx-2 text-sm lg:text-base uppercase py-1 px-6 rounded-md whitespace-nowrap" :class="[activeTab === 2 ? 'text-primary font-bold bg-white' : 'text-white']">My Orders</button>
        </div>
        <div v-if="activeTab === 1" class="flex justify-center">
          <div class="w-full h-full py-8 px-8 lg:py-16 border border-gray-100 rounded-xl shadow mb-4 md:w-2/3 lg:w-1/2 md:mr-4 text-center">
            <h1 class="text-xl font-bold mb-8">Personal Information</h1>
            <ClientOnly>
              <div class="mb-6 flex justify-center">
                <img :src="`https://ui-avatars.com/api/?name=${name}&background=059669&color=fff`" alt="avatar" class="w-32 lg:w-40 h-32 lg:h-40 rounded-full">
              </div>
              <div class="mb-6">
                <p class="text-sm lg:text-base">Full Name :</p>
                <p class="text-sm lg:text-base font-semibold">{{ name }}</p>
              </div>
              <div class="mb-12">
                <p class="text-sm lg:text-base">Email :</p>
                <p class="text-sm lg:text-base font-semibold">{{ email }}</p>
              </div>
              <div class="flex justify-center">
                <button v-if="!isLoadingAuth" @click="logout" type="button" class="w-full md:w-2/3 lg:w-1/2 text-sm lg:text-base font-semibold text-white bg-primary rounded-full shadow-md py-3 px-6 uppercase hover:bg-primary/80 transition duration-300">Logout</button>
                <button v-else type="button" class="w-full flex justify-center md:w-2/3 lg:w-1/2 text-sm lg:text-base font-semibold text-white bg-primary rounded-full shadow-md py-3 px-6 uppercase hover:bg-primary/80 transition duration-300">
                  <img src="~/assets/icons/icon-three-dots.svg" alt="loader">
                </button>
              </div>
            </ClientOnly>
          </div>
        </div>
        <div v-if="activeTab === 2" class="w-full p-4 lg:p-6 border border-gray-100 rounded-lg shadow mb-4">
          <h2 class="text-lg font-bold mb-4">My Orders</h2>
          <div class="overflow-x-auto relative">
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-white uppercase bg-gray-500">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Order ID
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Shipping
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Order Date
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Total Price
                  </th>
                  <th scope="col" class="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody v-if="orders.length">
                <tr v-for="(order, index) in orders" :key="index" class="border-b" :class="[index % 2 !== 0 ? 'bg-gray-100' : 'bg-white']">
                  <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    {{ order.orderId }}
                  </th>
                  <td class="py-4 px-6">
                    {{ `${order.address.address}, ${order.address.city} ${order.address.zipcode}` }}
                  </td>
                  <td class="py-4 px-6">
                    {{ order.orderDate }}
                  </td>
                  <td class="py-4 px-6">
                    ${{ order.total }}
                  </td>
                  <td class="py-4 px-6">
                    <NuxtLink :to="`/profile/order/${order.orderId}`" class="font-medium text-primary hover:underline">See Details</NuxtLink>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr class="border-b bg-white">
                  <td class="py-4 px-6 text-center" colspan="4">-- Empty --</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

    </div>
  </div>
</template>

<script setup>

import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';
import { useTransactionStore } from '~/stores/transaction';

definePageMeta({
  middleware: 'auth'
});

const config = useRuntimeConfig();
const { name, email, isLoadingAuth } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();
const { orders } = storeToRefs(useTransactionStore());

useHead({
  title: 'Profile',
  titleTemplate: 'Profile | JajanTerus',
  meta: [
    { property: 'og:url', content: `${config.public.frontendUrl}/profile` },
  ]
})

const activeTab = ref(1);
const crumbs = ref([
  {name: 'Home', link: '/'},
  {name: 'Profile', link: null}
])
</script>
