<template>
  <div id="checkout-page" class="relative">
    <div class="container">

      <!-- Checkout Section Start -->
      <Breadcrumbs :crumbs="crumbs" />

      <section class="my-4">
        <ClientOnly>
          <div class="flex flex-wrap md:flex-nowrap justify-between">
            <div class="w-full md:mr-4 mb-4">
              <div class="p-4 lg:p-6 border border-gray-100 rounded-lg shadow mb-4">
                <h2 class="text-xl lg:text-2xl font-semibold mb-4">Review Item And Shipping</h2>
                <div :class="{'h-80 overflow-x-auto pr-2 md:pr-4': productItems.length > 4}">
                  <div v-for="(product, index) in productItems" :key="index" class="flex mb-4">
                    <div class="w-28 h-16 lg:w-48 lg:h-28 mr-4">
                      <img :src="product.thumbnail" :alt="product.title" class="w-full h-full object-contain object-center">
                    </div>
                    <div class="flex flex-col w-full">
                      <h3 class="text-sm lg:text-base mb-2">{{ product.title }}</h3>
                      <div class="mr-4 w-full flex items-center justify-between">
                        <p class="text-sm lg:text-base font-semibold text-gray-500">${{ calculateDiscount(product.price, product.discountPercentage)}}</p>
                        <p class="text-xs lg:text-base text-gray-500 font-semibold mb-1">Quantity: {{ product.qty }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-4 lg:p-6 border border-gray-100 rounded-lg shadow">
                <h3 class="text-xl lg:text-2xl font-semibold">Delivery Information</h3>
                
                <div class="mt-2">
                  <form>
                    <div class="flex flex-col md:flex-row gap-2">
                      <div class="my-2 w-full">
                          <label for="firstName" class="text-xs lg:text-sm font-semibold after:content-['*'] after:text-red-600">First Name</label>
                          <input type="text" id="firstName" name="firstName" class="text-xs lg:text-sm w-full p-2 border border-gray-200 rounded-sm focus:outline-none focus:border-2 focus:border-gray-300" placeholder="Enter first name" autocomplete="off" v-model="address.firstName">
                          <p v-if="addressErrors.firstName" class="text-xs text-red-600 mt-2">{{ addressErrors.firstName }}</p>
                      </div>
                      <div class="my-2 w-full">
                          <label for="lastName" class="text-xs lg:text-sm font-semibold after:content-['*'] after:text-red-600">Last Name</label>
                          <input type="text" id="lastName" name="lastName" class="text-xs lg:text-sm w-full p-2 border border-gray-200 rounded-sm focus:outline-none focus:border-2 focus:border-gray-300" placeholder="Enter last name" autocomplete="off" v-model="address.lastName">
                          <p v-if="addressErrors.lastName" class="text-xs text-red-600 mt-2">{{ addressErrors.lastName }}</p>
                      </div>
                    </div>
                    <div class="my-2 w-full">
                      <label for="address" class="text-xs lg:text-sm font-semibold after:content-['*'] after:text-red-600">Address</label>
                      <textarea type="text" id="address" name="address" class="text-xs lg:text-sm w-full p-2 border border-gray-200 rounded-sm focus:outline-none focus:border-2 focus:border-gray-300" placeholder="Enter address" v-model="address.address"></textarea>
                      <p v-if="addressErrors.address" class="text-xs text-red-600 mt-2">{{ addressErrors.address }}</p>
                    </div>
                    <div class="flex flex-col md:flex-row gap-2">
                      <div class="my-2 w-full">
                          <label for="city" class="text-xs lg:text-sm font-semibold after:content-['*'] after:text-red-600">City/Town</label>
                          <input type="text" id="city" name="city" class="text-xs lg:text-sm w-full p-2 border border-gray-200 rounded-sm focus:outline-none focus:border-2 focus:border-gray-300" placeholder="Enter city or town" autocomplete="off" v-model="address.city">
                          <p v-if="addressErrors.city" class="text-xs text-red-600 mt-2">{{ addressErrors.city }}</p>
                      </div>
                      <div class="my-2 w-full">
                          <label for="zipcode" class="text-xs lg:text-sm font-semibold after:content-['*'] after:text-red-600">Zipcode</label>
                          <input type="number" id="zipcode" name="zipcode" class="text-xs lg:text-sm w-full p-2 border border-gray-200 rounded-sm focus:outline-none focus:border-2 focus:border-gray-300" placeholder="Enter zipcode" autocomplete="off" v-model="address.zipcode">
                          <p v-if="addressErrors.zipcode" class="text-xs text-red-600 mt-2">{{ addressErrors.zipcode }}</p>
                      </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-2">
                      <div class="my-2 w-full">
                          <label for="phone" class="text-xs lg:text-sm font-semibold after:content-['*'] after:text-red-600">Phone</label>
                          <input type="tel" id="phone" name="phone" class="text-xs lg:text-sm w-full p-2 border border-gray-200 rounded-sm focus:outline-none focus:border-2 focus:border-gray-300" placeholder="Enter phone number" autocomplete="off" v-model="address.phone">
                          <p v-if="addressErrors.phone" class="text-xs text-red-600 mt-2">{{ addressErrors.phone }}</p>
                      </div>
                      <div class="my-2 w-full">
                          <label for="email" class="text-xs lg:text-sm font-semibold after:content-['*'] after:text-red-600">Email</label>
                          <input type="email" id="email" name="email" class="text-xs lg:text-sm w-full p-2 border border-gray-200 rounded-sm focus:outline-none focus:border-2 focus:border-gray-300" placeholder="Enter email" autocomplete="off" v-model="address.email">
                          <p v-if="addressErrors.email" class="text-xs text-red-600 mt-2">{{ addressErrors.email }}</p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="p-4 lg:p-6 border border-gray-100 rounded-lg shadow w-full md:w-2/3 lg:w-1/2">
              <div class="mb-8">
                <h3 class="text-xl lg:text-2xl font-semibold mb-4">Order Summary</h3>
                <div class="py-6 border-t border-b">
                  <div class="mb-2 text-xs bg-orange-100 p-4 rounded-lg text-orange-600">
                    <p class="text-center">Enter <strong class="font-bold">JT-rB4eBAT5d7</strong> For Testing The Coupon Code</p>
                  </div>
                  <div class="relative">
                    <input class="w-full text-xs py-4 px-6 rounded-full bg-gray-100 focus:outline-none focus:border focus:border-gray-200 md:placeholder:text-[10px] 2xl:placeholder:text-sm" type="text" name="" id="" placeholder="Enter Coupon Code" v-model="couponCode">
                    <button @click="applyCoupon" class="absolute right-2 top-2 text-xs font-semibold text-white py-2 px-4 rounded-full bg-primary hover:bg-primary/80 transition duration-300">Apply Coupon</button>
                    <p v-if="couponError.length" class="text-xs text-center text-red-600 mt-2">{{ couponError }}</p>
                    <p v-if="couponSuccess" class="text-xs text-center text-green-600 mt-2"><span class="font-bold">Congratulations!</span> You have successfully applied the coupon code and <span class="font-bold">saved 6%</span> on your purchase.</p>
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <h4 class="text-base lg:text-xl font-semibold mb-4">Payment Details</h4>
                <div class="py-6 border-t border-b mb-4">
                  <div class="flex items-center mb-6 lg:mb-4">
                    <input type="radio" id="cod" name="payment" class="mr-1 accent-primary" value="Cash on Delivery" v-model="payment">
                    <label class="text-xs lg:text-sm" for="cod">Cash on Delivery</label>
                  </div>
                  <div class="flex items-center mb-6 lg:mb-4">
                    <input type="radio" id="bank" name="payment" class="mr-1 accent-primary" value="Bank Transfer" v-model="payment">
                    <label class="text-xs lg:text-sm" for="bank">Bank Transfer</label>
                  </div>
                  <div class="flex items-center mb-6 lg:mb-4">
                    <input type="radio" id="cc" name="payment" class="mr-1 accent-primary" value="Credit or Debit Card" v-model="payment">
                    <label class="text-xs lg:text-sm" for="cc">Credit or Debit Card</label>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" id="paypal" name="payment" class="mr-1 accent-primary" value="Paypal" v-model="payment">
                    <label class="text-xs lg:text-sm" for="paypal">Paypal</label>
                  </div>
                  <span v-if="paymentError.length" class="text-xs text-red-600 mt-2">{{ paymentError }}</span>
                </div>
                <div>
                  <div class="flex items-center justify-between my-4">
                    <p class="text-xs lg:text-sm font-semibold">Subtotal</p>
                    <p class="text-xs lg:text-sm">${{ subtotal }}</p>
                  </div>
                  <div class="flex items-center justify-between my-4">
                    <p class="text-xs lg:text-sm font-semibold">Tax (10%)</p>
                    <p class="text-xs lg:text-sm">${{ tax }}</p>
                  </div>
                  <div class="flex items-center justify-between my-4">
                    <p class="text-xs lg:text-sm font-semibold">Coupon Discount</p>
                    <p class="text-xs lg:text-sm">-${{ couponDiscount }}</p>
                  </div>
                  <div class="flex items-center justify-between my-4">
                    <p class="text-xs lg:text-sm font-semibold">Shipping Cost</p>
                    <p class="text-xs lg:text-sm">-$0</p>
                  </div>
                </div>
              </div>
              <div class="py-4 border-t">
                <div class="flex items-center justify-between mb-4">
                  <p class="text-xs lg:text-sm font-semibold">Total</p>
                  <p class="text-xs lg:text-sm font-semibold">${{ total }}</p>
                </div>

                <button v-if="!isLoading" @click="pay" class="w-full text-sm lg:text-base font-semibold py-3 px-4 text-center bg-primary text-white hover:bg-primary/80 rounded-full shadow transition duration-300">Pay ${{ total }}</button>
                <button v-else class="w-full flex justify-center text-sm lg:text-base font-semibold py-3 px-4 text-center bg-primary text-white rounded-full shadow">
                  <img src="~/assets/icons/icon-three-dots.svg" alt="loader">
                </button>

                <div class="mt-4 p-4 bg-orange-100 w-full rounded-lg shadow">
                  <p class="text-sm font-semibold text-orange-600 text-center mb-2 uppercase">Please read this: </p>
                  <p class="text-xs text-orange-600 text-center">Please note that any personal information you enter on this form, including your name, address, and payment details, will not be stored to database.
                    <br>
                    <br>
                    To ensure the safety of your personal information, I recommend that you use dummy information when submitting this form.
                    <br>
                    <br>
                    Your payment will still be processed successfully using dummy information, and your real personal information will not be at risk. This will help protect your sensitive information from potential security threats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ClientOnly>
      </section>
      <!-- Checkout Section End -->

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useTransactionStore } from '~/stores/transaction'

const config = useRuntimeConfig();
const route = useRoute();
const {
  couponError,
  couponSuccess,
  couponCode,
  payment,
  paymentError,
  address,
  addressErrors,
  applyCoupon,
  pay,
} = useTransactions();

const {
  orderId,
  token,
  productItems,
  subtotal,
  tax,
  total,
  isLoading,
  couponDiscount
  } = storeToRefs(useTransactionStore())

useHead({
  title: 'Checkout',
  titleTemplate: 'Checkout | JajanTerus',
  meta: [
    { property: 'og:url', content: `${config.public.frontendUrl}/checkout` },
  ]
})

const crumbs = [
  { name: 'Home', link: '/' },
  { name: 'Checkout', link: null }
];

watchEffect(() => {
  if (payment.value.length) {
    paymentError.value = ''
  }
})

onMounted(() => {
  if (route.query.p != undefined || route.query.p !== null) {
    if (route.query.p !== token.value) router.push('/');
  } else {
    router.push('/')
  }
})
</script>
