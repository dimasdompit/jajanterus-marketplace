import { featuredData } from '~/assets/json/featuredProducts.json'

export default function useProducts() {
  const { $apiFetch } = useNuxtApp()

  const skip = ref(15);
  const featuredProducts = ref({});
  const topProducts = ref([]);
  const allProducts = ref([]);
  const productCategories = ref({});
  const product = ref({});
  const searchProductResult = ref([]);
  const featuredProductsLoading = ref(false)
  const topProductsLoading = ref(false)
  const allProductsLoading = ref(false)
  const productCategoriesLoading = ref(false);
  const productLoading = ref(false);
  const searchProductResultLoading = ref(false);
  const moreProductsLoading = ref(false);


  // const getFeaturedProducts = async () => {
  //   featuredProductsLoading.value = true;
  //   try {
  //     const response = await $apiFetch('/products?limit=5')

  //     featuredProducts.value = response
  //     console.log(response.products)
  //     featuredProductsLoading.value = false
  //   } catch (error) {
  //     console.log(error)
  //     featuredProductsLoading.value = false
  //   }
  // }

  const getFeaturedProducts = () => {
    featuredProductsLoading.value = true;
    setTimeout(() => { 
      featuredProducts.value = featuredData !== undefined ? featuredData : [];
      featuredProductsLoading.value = false;
    }, 500)
  }

  const getTopProducts = async () => {
    topProductsLoading.value = true;
    try {
      const response = await $apiFetch('/products?limit=10&skip=5')

      topProducts.value = response
      topProductsLoading.value = false;
    } catch (error) {
      console.log(error)
      topProductsLoading.value = false;
    }
  }

  const getAllProducts = async () => {
    allProductsLoading.value = true;
    try {
      const response = await $apiFetch(`/products?limit=12&skip=15`)
      allProducts.value = response
      allProductsLoading.value = false;
    } catch (error) {
      console.log(error)
      allProductsLoading.value = false;
    }
  }

  const getProductCategories = async (slug) => {
    productCategoriesLoading.value = true;
    try {
      const response = await $apiFetch(`/products/category/${slug}`)
      productCategories.value = response;
      productCategoriesLoading.value = false;
    } catch (error) {
      console.log(error)
      productCategoriesLoading.value = false;
    }
  }

  const getProductDetail = async (id) => {
    productLoading.value = true;
    try {
      const response = await $apiFetch(`/products/${id}`)
      product.value = response;
      productLoading.value = false;
    } catch (error) {
      console.log(error)
      productLoading.value = false;
    }
  }

  const loadMoreProducts = async () => {
    moreProductsLoading.value = true;
    try {
      skip.value += 15
      const response = await $apiFetch(`/products?limit=12&skip=${skip.value}`)
      allProducts.value.products.push(...response.products)
      moreProductsLoading.value = false;
    } catch (error) {
      console.log(error)
    }
  }

  const searchProducts = async (keyword) => {
    searchProductResultLoading.value = true;
    try {
      const response = await $apiFetch(`/products/search?q=${keyword}`)
      searchProductResult.value = response;
      searchProductResultLoading.value = false;
    } catch (error) {
      console.log(error)
      searchProductResultLoading.value = false;
    }
  }

  onMounted(() => {
    getFeaturedProducts();
    getTopProducts();
    getAllProducts();
  })

  return {
    featuredProducts,
    topProducts,
    allProducts,
    featuredProductsLoading,
    topProductsLoading,
    allProductsLoading,
    getProductCategories,
    productCategories,
    productCategoriesLoading,
    product,
    productLoading,
    getProductDetail,
    loadMoreProducts,
    moreProductsLoading,
    searchProductResult,
    searchProductResultLoading,
    searchProducts
  }
}