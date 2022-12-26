<template>
  <div id="product-categories">
    <div class="container">

      <ClientOnly>
        <Head>
          <Title>{{ category?.title }}</Title>
          <Meta property="og:url" :content="`${config.public.frontendUrl}/products/category/${category?.slug}`" />
          <Meta property="og:title" :content="category?.title" />
        </Head>
      </ClientOnly>

      <Breadcrumbs :crumbs="crumbs" />

      <!-- Product Categories Section Start -->
      <section class="my-2 lg:my-6">
        <div class="title-wrapper">
          <div v-if="categoriesLoading" class="ml-2 w-36 lg:w-72 bg-gray-300 h-8 animate-pulse"></div>
          <h2 v-else class="text-xl lg:text-3xl font-bold uppercase mb-2 lg:mb-4 mt-4">{{ category ? category.title : '' }}</h2>
        </div>
        <div v-if="productCategoriesLoading" class="flex flex-wrap">
          <SkeletonsProduct v-for="items in 12" :key="items" />
        </div>
        <div v-else class="flex flex-wrap">
          <ProductCard v-for="(product, index) in productCategories.products" :key="index" :data="product" @addToCart="addToCart(product)" />
        </div>
        <!-- <div class="flex justify-center items-center my-8 lg:my-10">
          <button class="font-medium text-sm lg:text-xl text-white bg-primary px-12 py-2 rounded-lg hover:bg-primary/90 transition duration-300">Load More</button>
        </div> -->
      </section>
      <!-- Product Categories Section End -->

    </div>
  </div>
</template>

<script setup>
import { useCartsStore } from '~/stores/carts'

const config = useRuntimeConfig();
const route = useRoute();
const categorySlug = route.params.slug;
const { getProductCategories, productCategories, productCategoriesLoading } = useProducts();
const { category, getCategory, categoriesLoading } = useCategories();
const { addItem } = useCartsStore();
const { $swal } = useNuxtApp()

const crumbs = ref([
  { name: 'Home', link: '/' },
  { name: 'Categories', link: null },
])

onMounted(() => {
  getCategory(categorySlug)
  getProductCategories(categorySlug);

  setTimeout(() => { 
    crumbs.value.push({ name: category ? category.value.title : '', link: null });
  }, 500)
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