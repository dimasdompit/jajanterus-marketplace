<template>
  <div id="home">

    <div class="container">
      <!-- Carousel Section Start -->
      <section>
        <SkeletonsFeaturedProduct v-if="featuredProductsLoading" />
        <SliderBanner v-else :data="featuredProducts?.products" />
      </section>
      <!-- Carousel Section End -->

      <!-- Top Products Section Start -->
      <section class="my-4">
        <h2 class="text-xl lg:text-3xl font-bold uppercase mb-2 lg:mb-4 mt-8">Top Products!</h2>
        <div class="overflow-auto whitespace-nowrap gap-3 lg:gap-0">
          <div v-if="topProductsLoading">
            <SkeletonsProduct v-for="items in 10" :key="items" />
          </div>
          <ProductCard v-else v-for="(product, index) in topProducts.products" :key="index" :data="product" @addToCart="addToCart(product)" />
        </div>
      </section>
      <!-- Top Products Section End -->

      <!-- Categories Section Start -->
      <section class="my-8 lg:my-12">
        <div class="bg-slate-100 w-full overflow-hidden rounded-lg shadow-lg">
          <h3 class="p-3 lg:p-5 font-medium uppercase">Categories</h3>

          <!-- Desktop -->
          <div v-if="categoriesLoading" class="hidden lg:grid lg:grid-cols-10 lg:mx-auto p-[2px]">
            <SkeletonsCategories v-for="items in 10" :key="items" />
          </div>
          <div v-else class="hidden lg:grid lg:grid-cols-10 lg:mx-auto p-[2px]">
            <CategoryCard v-for="(category, index) in categories" :key="index" :data="category" />
          </div>

          <!-- Mobile -->
          <div v-if="categoriesLoading" class="overflow-auto whitespace-nowrap flex flex-row justify-items-stretch lg:hidden">
            <SkeletonsCategories v-for="items in 10" :key="items" />
          </div>

          <div v-else class="overflow-auto whitespace-nowrap flex flex-col justify-items-stretch lg:hidden">
            <!-- Row -->
            <div v-for="(row, indexRow) in chunkedCategories" :key="indexRow" class="flex">
              <CategoryCard v-for="(category, index) in row" :key="index" :data="category" />
            </div>
          </div>
        </div>
      </section>
      <!-- Categories Section End -->

      <!-- Daily Discover Section Start -->
      <section class="my-8 lg:my-12">
        <h2 class="text-xl lg:text-3xl font-bold uppercase mb-2 lg:mb-4 mt-10">Daily Discover</h2>
        <div v-if="allProductsLoading" class="flex flex-wrap">
          <SkeletonsProduct v-for="items in 12" :key="items" />
        </div>
        <div v-else class="flex flex-wrap">
          <ProductCard v-for="(product, index) in allProducts?.products" :key="index" :data="product" @addToCart="addToCart(product)" />
        </div>
        <div class="flex justify-center items-center my-8 lg:my-10">
          <button @click="loadMoreProducts" class="font-medium text-sm lg:text-xl text-white bg-primary px-12 py-2 rounded-lg hover:bg-primary/90 transition duration-300">
            <span v-if="moreProductsLoading">
              <img src="~/assets/icons/icon-three-dots.svg" alt="loader">
            </span>
            <span v-else>Load More</span>
          </button>
        </div>
      </section>
      <!-- Daily Discover Section End -->

    </div>
    <!-- About Section Start -->
    <section class="my-8">
      <hr class="w-full border-4 border-primary" />
      <div class="container">
        <div class="py-8 lg:py-12">
          <h4 class="font-bold text-sm text-gray-500">JajanTerus - The best deals are just a click away..</h4>
          <p class="text-xs text-gray-400 mt-3">
            JajanTerus is the ultimate destination for all your shopping needs. With a vast selection of products ranging from clothing and accessories to home goods and electronics, you'll find everything you need at unbeatable prices. Our marketplace is home to a community of sellers offering a diverse range of products, from popular brands to unique and one-of-a-kind items. With JajanTerus, you can discover new and exciting products from around the world. At JajanTerus, we pride ourselves on providing exceptional customer service. Our dedicated team is always available to answer your questions and help you find the perfect product for your needs. With our easy-to-use website and mobile app, shopping on JajanTerus is a breeze. You can easily search for products, compare prices, read reviews, and make secure purchases with just a few taps on your smartphone or clicks on your computer.
          </p>
          <p class="text-xs text-gray-400 mt-3">
            With JajanTerus, you can shop with confidence knowing that your personal information is safe and secure. Our advanced security technology protects your data and ensures that your transactions are always safe and secure. Save money and time when you shop on JajanTerus. With our low prices and fast shipping, you can have the products you want delivered right to your doorstep without breaking the bank. Whether you're a first-time shopper or a seasoned pro, you'll love the convenience of shopping on JajanTerus. Our intuitive platform makes it easy to find what you're looking for, and our user-friendly interface makes the shopping experience enjoyable and stress-free.
          </p>
          <p class="text-xs text-gray-400 mt-3">
            Experience the power of community when you shop on JajanTerus. With our user-generated reviews and ratings, you can see what other customers have to say about the products you're interested in, and make informed purchasing decisions. Shop with peace of mind on JajanTerus. Our strict seller policies and rigorous quality control processes ensure that you're only getting the best products from trusted sellers. Join the millions of happy customers who have already discovered the joy of shopping on JajanTerus. With our wide selection of products, excellent customer service, and unbeatable prices, you'll find everything you need and more at our marketplace.
          </p>
        </div>
      </div>
    </section>
    <!-- About Section End -->
  </div>
</template>

<script setup>
import { useCartsStore } from '~/stores/carts'

useHead({
  title: 'Home',
  titleTemplate: 'JajanTerus | The best deals are just a click away',
})

const {
  topProducts,
  allProducts,
  featuredProducts,
  featuredProductsLoading,
  topProductsLoading,
  allProductsLoading,
  loadMoreProducts,
  moreProductsLoading,
} = useProducts();
const { categories, categoriesLoading } = useCategories()
const { addItem } = useCartsStore()
const { $swal } = useNuxtApp()

// Computed
const chunkedCategories = computed(() => {
  return chunkData(categories.value, 10);
})

const addToCart = product => {
  addItem(product)

  $swal.fire({
    icon: 'success',
    text: 'Add to cart success',
    timer: 1500,
    showConfirmButton: false,
    allowOutsideClick: false,
  })
}
</script>