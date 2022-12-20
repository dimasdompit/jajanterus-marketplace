export const useCartsStore = definePiniaStore(
  'carts-store',
  {
    state: () => ({
      cartItems: [],
      total: 0
    }),
    persist: true,
    getters: {
      getCarts() {
        return this.cartItems;
      },
      getTotalPrice() {
        return this.total;
      }
    },
    actions: {
      // Add Cart Item
      addItem(product, productQty = 1) {
        let items = this.cartItems || [];
        items = items.slice();
        let alreadyInCart = false;
        items.forEach(item => {
          if (item.id === product.id) {
            alreadyInCart = true;
            item.qty = item.qty + productQty;
            if (item.discountPercentage > 0) {
              let discountPrice = calculateDiscount(item.price, item.discountPercentage)
              item.total = item.qty * discountPrice
            } else {
              item.total = item.qty * item.price;
            }
            
            if (item.qty >= item.stock) {
              item.qty = item.stock
            }
          }
        });

        if (!alreadyInCart) {
          let total = 0;
          if (product.discountPercentage > 0) {
            let discount = calculateDiscount(product.price, product.discountPercentage)
            total = productQty * discount
          } else {
            total = productQty * product.price
          }
          items.push({ ...product, qty: productQty, total })
        }

        const newTotal = items.reduce((acc, curr) => {
          let total = 0;
          if (curr.discountPercentage > 0) {
            const discountPrice = calculateDiscount(curr.price, curr.discountPercentage)
            total = discountPrice * curr.qty
          } else {
            total = curr.price * curr.qty
          }
          return acc + total
        }, 0);

        this.cartItems = items;
        this.total = newTotal
      },
      // Add Cart Quantity
      addQuantity(productId) {
        const cartItems = [...this.cartItems];
        const selectedProduct = cartItems.find(item => item.id === productId);
        const index = cartItems.indexOf(selectedProduct);
        const product = cartItems[index];

        product.qty += 1;

        if (product.discountPercentage > 0) {
          let discountPrice = calculateDiscount(product.price, product.discountPercentage)
          product.total = product.qty * discountPrice
        } else {
          product.total = product.qty * product.price;
        }

        const newTotal = cartItems.reduce((acc, curr) => {
          let total = 0;
          if (curr.discountPercentage > 0) {
            const discountPrice = calculateDiscount(curr.price, curr.discountPercentage)
            total = discountPrice * curr.qty
          } else {
            total = curr.price * curr.qty
          }
          return acc + total
        }, 0);

        this.cartItems = [...cartItems];
        this.total = newTotal;
      },
      // Subtract Cart Quantity
      subtractQuantity(productId) {
        const cartItems = [...this.cartItems];
        const selectedProduct = cartItems.find(item => item.id === productId);
        const index = cartItems.indexOf(selectedProduct);
        const product = cartItems[index];

        product.qty -= 1;

        if (product.discountPercentage > 0) {
          let discountPrice = calculateDiscount(product.price, product.discountPercentage)
          product.total = product.qty * discountPrice
        } else {
          product.total = product.qty * product.price;
        }

        const newTotal = cartItems.reduce((acc, curr) => {
          let total = 0;
          if (curr.discountPercentage > 0) {
            const discountPrice = calculateDiscount(curr.price, curr.discountPercentage)
            total = discountPrice * curr.qty
          } else {
            total = curr.price * curr.qty
          }
          return acc + total
        }, 0);

        this.cartItems = [...cartItems];
        this.total = newTotal;
      },
      deleteItem(product) {
        this.cartItems.forEach((item, index) => {
          if (item.id === product.id) {
            this.cartItems.splice(index, 1)
          }
        })

        const newTotal = this.cartItems.reduce((acc, curr) => {
          let total = 0;
          if (curr.discountPercentage > 0) {
            const discountPrice = calculateDiscount(curr.price, curr.discountPercentage)
            total = discountPrice * curr.qty
          } else {
            total = curr.price * curr.qty
          }
          return acc + total
        }, 0);

        this.total = newTotal;
      },
      clearItems() {
        setTimeout(() => {
          this.cartItems = [];
          this.total = 0;
         }, 3000)
      }
    }
  }
)