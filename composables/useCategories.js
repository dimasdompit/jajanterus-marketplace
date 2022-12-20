import { categoriesData } from '~/assets/json/categories.json'

export default function useCategories() {
  const categories = ref([]);
  const category = ref(null);
  const categoriesLoading = ref(false);

  const getAllCategories = () => {
    categoriesLoading.value = true
    setTimeout(() => { 
      categories.value = categoriesData.length ? categoriesData : [];
      categoriesLoading.value = false;
    }, 1500)
  }

  const getCategory = (slug) => {
    categoriesLoading.value = true;
    
    setTimeout(() => { 
      const filtered = categoriesData.find(item => item.slug === slug);

      category.value = filtered;
      categoriesLoading.value = false;
    }, 1500)
  }

  onMounted(() => {
    getAllCategories();
  })

  return { categories, category, categoriesLoading, getCategory }
}