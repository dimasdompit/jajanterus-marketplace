import { storeToRefs } from 'pinia';
import { useTransactionStore } from '~/stores/transaction'
import { useCartsStore } from '~/stores/carts';

export default function useTransactions() {
  const router = useRouter();
  const { $swal } = useNuxtApp();
  
  const { setCoupon, payOder, orderId } = useTransactionStore();
  const { clearItems } = useCartsStore();
  const { couponDiscount, inCart } = storeToRefs(useTransactionStore())

  /**
   * ======================================== DATA ========================================
   **/
  const couponError = ref('');
  const couponSuccess = ref(false);
  const couponCode = ref('');
  const payment = ref('');
  const paymentError = ref('');
  const address = ref({
    firstName: '',
    lastName: '',
    address: '',
    province: null,
    city: null,
    district: null,
    subdistrict: null,
    zipcode: null,
    phone: '',
  });
  const addressErrors = ref({
    firstName: null,
    lastName: null,
    address: null,
    province: null,
    city: null,
    district: null,
    subdistrict: null,
    phone: null,
  })

  /**
   * ======================================== COMPUTED ========================================
   **/
  const firstNameError = computed(() => {
    return validationInput(
      address.value.firstName,
      /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      'First name must contain only letters, spaces, and certain punctuation (apostrophes, hyphens, commas, and periods)'
    );
  })
  
  const lastNameError = computed(() => {
    return validationInput(
      address.value.lastName,
      /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      'Last name must contain only letters, spaces, and certain punctuation (apostrophes, hyphens, commas, and periods)'
    );
  })
  
  const addressError = computed(() => {
    return validationInput(
      address.value.address,
      /[A-Za-z0-9'\.\-\s\,]/,
      'Please enter a valid address. Addresses must contain a number followed by two words separated by a space.'
    );
  })

  const provinceError = computed(() => {
    return validationInput(
      address.value.province,
      /^.+$/,
      'Please choose a province.'
    );
  })
  
  const cityError = computed(() => {
    return validationInput(
      address.value.city,
      /^.+$/,
      'Please choose a city.'
    );
  })

  const districtError = computed(() => {
    return validationInput(
      address.value.district,
      /^.+$/,
      'Please choose a district.'
    );
  })

  const subdistrictError = computed(() => {
    return validationInput(
      address.value.subdistrict,
      /^.+$/,
      'Please choose a subdistrict.'
    );
  })
  
  const phoneError = computed(() => {
    return validationInput(
      address.value.phone,
      /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
      'Please enter a valid phone number.'
    );
  })

  /** 
   * ======================================== METHODS ======================================== 
   **/
  const applyCoupon = () => {
    if (couponCode.value !== "JT-rB4eBAT5d7") {
      couponCode.value = ''
      couponError.value = 'Sorry, the coupon code you entered is invalid.';
      couponSuccess.value = false;
  
      setTimeout(() => { 
        couponError.value = ''
       }, 3000)
    } else {
      if (couponDiscount.value > 0) {
        couponCode.value = ''
        couponError.value = 'Only one coupon may be applied per order.';
        couponSuccess.value = false;
  
        setTimeout(() => { 
          couponError.value = ''
        }, 3000)
      } else {
        setCoupon(couponCode.value)
        couponCode.value = ''
        couponError.value = false;
        couponSuccess.value = true;
      }
    }
  }

  const pay = () => {
    if (!address.value.firstName) return addressErrors.value.firstName = firstNameError;
    if (!address.value.lastName) return addressErrors.value.lastName = lastNameError;
    if (!address.value.address) return addressErrors.value.address = addressError;
    if (!address.value.province) return addressErrors.value.province = provinceError;
    if (!address.value.city) return addressErrors.value.city = cityError;
    if (!address.value.district) return addressErrors.value.district = districtError;
    if (!address.value.subdistrict) return addressErrors.value.subdistrict = subdistrictError;
    if (!address.value.phone) return addressErrors.value.phone = phoneError;
  
    if (!payment.value.length) {
      paymentError.value = 'Please choose a payment!';
      return;
    }
  
    $swal.fire({
      title: 'Are you sure you want to proceed the payment?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#059669',
      allowEscapeKey: false,
      allowEnterKey: false,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        address.value.province = JSON.parse(address.value.province)
        address.value.city = JSON.parse(address.value.city)
        address.value.district = JSON.parse(address.value.district)
        address.value.subdistrict = JSON.parse(address.value.subdistrict)
        address.value.zipcode = JSON.parse(address.value.zipcode)

        payOder(address.value, payment.value);
        if (inCart.value) clearItems();
        setTimeout(() => { 
          $swal.fire({
            title: 'Payment Success!',
            text: 'Thank you for your purchase.',
            icon: 'success',
            confirmButtonColor: '#059669',
          })
         }, 1500)
        setTimeout(() => { 
          router.push(`/profile/order/${orderId}`);
        }, 3000)
      }
  
    })
  }

  return {
    couponError,
    couponSuccess,
    couponCode,
    payment,
    paymentError,
    address,
    addressErrors,
    applyCoupon,
    pay,
  }
}