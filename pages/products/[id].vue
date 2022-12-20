<template>
  <div id="product-details">
    <div class="container">

      <ClientOnly>
        <Head>
          <Title>{{ product?.title }}</Title>
          <Meta name="description" :content="product?.description" />
          <Meta property="og:url" :content="`${config.public.frontendUrl}/products/${product?.id}`" />
          <Meta property="og:description" :content="product?.description" />
          <Meta property="og:image" :content="product?.thumbnail" />
          <Meta property="og:image:secure_url" :content="product?.thumbnail" />
          <Meta property="twitter:description" :content="product?.description" />
          <Meta property="twitter:image" :content="product?.thumbnail" />
          <Meta property="twitter:image:alt" :content="product?.title" />
        </Head>
      </ClientOnly>
      
      <!-- Section Details Start  -->
      <Breadcrumbs :crumbs="crumbs" />
      
      <section class="my-4">
        <SkeletonsProductDetails v-if="productLoading" />
        <div v-else class="grid grid-cols-1 items-center md:grid-cols-2 md:gap-4 mt-4">
          <div class="w-full">
            <ClientOnly>
              <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                <Slide v-for="(image, index) in product.images" :key="index">
                  <img class="h-96 w-96 object-contain object-center" :src="image" :alt="product.title">
                </Slide>
              </Carousel>

              <Carousel
                id="thumbnails"
                :items-to-show="3"
                :wrap-around="true"
                v-model="currentSlide"
                ref="carousel"
              >
                <Slide v-for="(image, index) in product.images" :key="index">
                  <div class="p-2 bg-gray-100 w-full h-32 lg:h-52" @click="slideTo(index + 1)">
                    <img :src="image" :alt="product.title" class="h-full w-full object-cover object-center">
                  </div>
                </Slide>
              </Carousel>
            </ClientOnly>
          </div>
          <div class="w-full">
            <h1 class="text-xl md:text-2xl lg:text-4xl font-bold mt-2">{{ product.title }}</h1>
            <h2 class="text-sm text-primary md:text-md lg:text-lg font-semibold mb-2">{{ product.brand }}</h2>
            <p class="text-xs text-gray-500 mb-2">{{ product.description }}</p>
            <div class="flex items-center">
              <StarRating :rating="product.rating" />
              <span class="text-xs text-gray-500">({{ product.rating }})</span>
            </div>
            <div class="flex items-center">
              <h4 class="text-gray-400 my-6 lg:my-8 font-semibold text-xl lg:text-2xl line-through mr-2">${{ product.price }}</h4>
              <h3 class="my-6 lg:my-8 font-semibold text-2xl lg:text-4xl">${{ discountPrice }}</h3>
            </div>
            <div class="flex items-center mb-4">
              <div class="flex items-center px-3 w-32 bg-gray-100 rounded-full text-lg justify-between mr-6">
                <button @click="subtractQty" class="h-10 w-10 text-primary font-medium" :class="{'text-gray-300': qty == 1 }" type="button">-</button>
                <div class="w-1/2 bg-gray-100 focus:border-0 text-center text-primary font-medium">{{ qty }}</div>
                <button @click="addQty" class="h-10 w-10 text-primary font-medium" type="button">+</button>
              </div>
              <div class="w-1/2 text-xs font-semibold text-gray-600">
                <span class="text-orange-400">{{ product.stock }} items</span> left. <br> Don't miss it!
              </div>
            </div>
            <ClientOnly>
              <div class="flex items-center justify-between gap-2 lg:gap-6 mb-8">
                <button v-if="isLogin" @click="buyNow" class="w-1/2 text-center text-base font-semibold text-white bg-primary py-3 rounded-full hover:bg-primary/80 transition duration-300" type="button">Buy Now</button>
                <NuxtLink v-else to="/auth/login" class="w-1/2 text-center text-base font-semibold text-white bg-primary py-3 rounded-full hover:bg-primary/80 transition duration-300" type="button">Buy Now</NuxtLink>

                <button v-if="isLogin" @click="addToCart(product, qty)" class="w-1/2 text-center text-base font-semibold text-primary border border-primary py-3 rounded-full hover:bg-primary hover:text-white transition duration-300" type="button">Add To Cart</button>
                <NuxtLink v-else to="/auth/login" class="w-1/2 text-center text-base font-semibold text-primary border border-primary py-3 rounded-full hover:bg-primary hover:text-white transition duration-300" type="button">Add To Cart</NuxtLink>
              </div>
            </ClientOnly>
            <div class="w-full lg:w-2/3">
              <div class="border border-gray-200 p-4">
                <div class="flex items-center">
                  <img class="mr-1" src="~/assets/icons/icon-delivery.svg" alt="Icon Delivery" width="20">
                  <p class="text-sm font-bold text-gray-600">Free Delivery</p>
                </div>
                <p class="text-xs underline text-gray-500 pl-6">Enter your Postal code for Delivery Availabillity</p>
              </div>
              <div class="border border-gray-200 p-4">
                <div class="flex items-center">
                  <img class="mr-1" src="~/assets/icons/icon-return.svg" alt="Icon Returns" width="20">
                  <p class="text-sm font-bold text-gray-600">Returns Delivery</p>
                </div>
                <p class="text-xs text-gray-500 pl-6">Free 30days Delivery Returns. <span class="underline">Details.</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Section Details End  -->

      <!-- Similar Products Section Start -->
      <section class="my-16">
        <h2 class="text-xl lg:text-3xl font-bold uppercase mb-2 lg:mb-4 mt-10">Similar Items You Might Like!</h2>
        <div class="overflow-auto whitespace-nowrap gap-3 lg:gap-0">
          <div v-if="productCategoriesLoading">
            <SkeletonsProduct v-for="items in 10" :key="items" />
          </div>
          <ProductCard v-else v-for="(product, index) in productCategories.products" :key="index" :data="product" />
        </div>
      </section>
      <!-- Similar Products Section End -->

    </div>
  </div>
</template>

<script setup>
import { Carousel, Slide } from 'vue3-carousel'
import { useCartsStore } from '~/stores/carts'
import { useTransactionStore } from '~/stores/transaction'
import { useAuthStore } from '~/stores/auth'

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const productId = route.params.id
const {
  product,
  productLoading,
  productCategories,
  productCategoriesLoading,
  getProductDetail,
  getProductCategories
} = useProducts()
const { isLogin } = useAuthStore()
const { addItem } = useCartsStore()
const { proceedCheckout } = useTransactionStore()
const { $swal } = useNuxtApp()

/* ========== Data ========== */
const currentSlide = ref(0);
const qty = ref(1);
const crumbs = ref([
  { name: 'Home', link: '/'},
  { name: 'Product', link: null },
]);

onMounted(() => {
  getProductDetail(productId);

  setTimeout(() => { 
    crumbs.value.push({ name: product ? product?.value?.title : 'oke', link: null });
    getProductCategories(product?.value?.category)
  }, 2000)
})

/* ========== Computed ========== */
const discountPrice = computed(() => {
  return calculateDiscount(product?.value?.price, product?.value?.discountPercentage);
})

/* ========== Methods ========== */
const slideTo = (val) => {
  currentSlide.value = val;
}

const subtractQty = () => {
  if (qty.value > 1) {
    qty.value--
  }
}

const addQty = () => {
  if (qty.value < product.value.stock) qty.value++
}

const addToCart = (product, quantity) => {
  addItem(product, quantity)

  $swal.fire({
    icon: 'success',
    text: 'Add to cart success',
    timer: 2000,
    showConfirmButton: false,
    allowOutsideClick: false,
  })
}

const buyNow = () => {
  const orderId = `JT-${new Date().getTime()}`
  const token = generateToken(60)
  let total = 0;

  if (product.value.discountPercentage > 0) {
    const discountPrice = calculateDiscount(product.value.price, product.value.discountPercentage)
    total = discountPrice * qty.value;
  } else {
    total = product.value.price * qty.value;
  }

  proceedCheckout(orderId, [{...toRefs(product.value), qty}], total, token, false);
  router.replace(`/checkout?p=${token}`);
}
</script>
