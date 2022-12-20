import { useCartsStore } from "~/stores/carts";

export default function useCarts() {
  const { addQuantity, subtractQuantity } = useCartsStore()
  const trashItems = ref([]);

  const add = (cart) => {
    if (cart.qty < cart.stock) {
      addQuantity(cart.id)
    }
  }
  
  const subtract = (cart) => {
    if (cart.qty > 1) {
      subtractQuantity(cart.id)
    }
  }
  
  const isActive = (cart) => {
    const item = trashItems.value.find(item => item.id === cart.id);
  
    return item !== undefined ? item.isActive : false;
  }
  
  const openDelete = (cart) => {
    const item = trashItems.value.find(item => item.id === cart.id);
  
    if (item) {
      if (item.isActive === false) item.isActive = true
    } else {
      trashItems.value.push({ ...cart, isActive: true });
    }
  }
  
  const closeDelete = (cart) => {
    const index = trashItems.value.findIndex(item => item.id === cart.id);
    trashItems.value[index].isActive = false
  }

  return {
    trashItems,
    add,
    subtract,
    isActive,
    openDelete,
    closeDelete,
  }
}