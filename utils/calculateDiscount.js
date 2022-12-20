export const calculateDiscount = (price = 0, discount = 0) => {
  return (price - (price * (discount / 100))).toFixed(0);
}