<template>
  <div id="search-result">
    <div class="container">

      <!-- Product Search Section Start -->
      <section class="my-2 lg:my-6">
        <div class="title-wrapper">
          <h2 class="text-xl lg:text-3xl font-bold mb-2 lg:mb-4 mt-4">SEARCH RESULTS: "{{ keyword }}"</h2>
        </div>

        <div v-if="searchProductResultLoading" class="flex flex-wrap">
          <SkeletonsProduct v-for="items in 12" :key="items" />
        </div>
        <div v-else class="flex flex-wrap">
          <div v-if="searchProductResult.products?.length">
            <ProductCard v-for="(product, index) in searchProductResult.products" :key="index" :data="product" @addToCart="addToCart(product)" />
          </div>
          <div v-else class="mt-8 mx-auto md:w-1/2">
            <div class="flex flex-col items-center justify-center">
              <img src="~/assets/illustrations/illustration-empty-product.svg" alt="Empty Product" class="w-full h-full mb-4" />
              <p class="mb-4 text-xs text-center text-gray-500 sm:text-base lg:text-lg">Oops, that product is currently unavailable.</p>
            </div>
          </div>
        </div>
      </section>
      <!-- Product Search Section End -->

    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const keyword = route.query.q;

const { searchProductResult, searchProductResultLoading, searchProducts } = useProducts();
const { addItem } = useCartsStore();
const { $swal } = useNuxtApp()

onMounted(() => {
  searchProducts(keyword);
})

const addToCart = product => {
  addItem(product)

  $swal.fire({
    icon: 'success',
    text: 'Add To Success',
    timer: 1500,
    showConfirmButton: false,
    allowOutsideClick: false,
  })
}
</script>
