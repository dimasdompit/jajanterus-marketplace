export const useTransactionStore = definePiniaStore(
  'transaction-store',
  {
    state: () => ({
      orderId: null,
      token: null,
      productItems: [],
      subtotal: 0,
      tax: 0,
      couponDiscount: 0,
      total: 0,
      isComplete: false,
      address: {},
      payment: '',
      isLoading: false,
      orders: [],
      inCart: true,
    }),
    persist: true,
    getters: {},
    actions: {
      proceedCheckout(orderId = null, products = [], subtotal = 0, token = null, inCart = true) {
        let newSubtotal = subtotal;

        const taxes = newSubtotal * 10 / 100
        const newTotal = newSubtotal + taxes;

        this.inCart = inCart;
        this.orderId = orderId;
        this.token = token
        this.productItems = products;
        this.subtotal = newSubtotal;
        this.tax = taxes;
        this.total = newTotal.toFixed(1);
        this.isComplete = false
        this.couponDiscount = 0;
      },
      setCoupon(coupon = null) {
        let discounts = 0;

        if (coupon !== null && coupon === "JT-rB4eBAT5d7") {
          discounts = this.subtotal * 6 / 100
        } else {
          discounts = 0;
        }

        const newTotal = this.subtotal + this.tax - discounts

        this.couponDiscount = discounts;
        this.total = newTotal.toFixed(1);
      },
      payOder(address = {}, payment = '') {
        this.isLoading = true;
        
        setTimeout(() => { 
            this.orders.unshift({
              orderId: this.orderId,
              productItems: this.productItems,
              subtotal: this.subtotal,
              tax: this.tax,
              couponDiscount: this.couponDiscount,
              total: this.total,
              isComplete: true,
              orderDate: parseDate(new Date()),
              address,
              payment
            })

            this.orderId = null;
            this.token = null;
            this.productItems = [],
            this.subtotal = 0,
            this.tax = 0,
            this.couponDiscount = 0,
            this.total = 0,
            this.address = {},
            this.payment = '',
            this.isLoading = false;
         }, 3000)
      }
    }
  }
)