import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export default function useAuth() {
  const config = useRuntimeConfig();
  const { register, login } = useAuthStore()
  const { email, password } = storeToRefs(useAuthStore())
  const { $swal, $cryptoJs } = useNuxtApp()

  const data = ref({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const dataErrors = ref({
    name: null,
    email: null,
    password: null,
    passwordConfirmation: null,
  })

  /**
   * ======================================== COMPUTED ========================================
   **/
  const nameError = computed(() => {
    return validationInput(
      data.value.name,
      /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      'Please enter a valid name.'
    );
  })
  
  const emailError = computed(() => {
    return validationInput(
      data.value.email,
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Please enter a valid email address.'
    );
  })
  
  const passwordError = computed(() => {
    return validationInput(
      data.value.password,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
    );
  })

  const passwordConfirmationError = computed(() => {
    return validationInput(
      data.value.passwordConfirmation,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password confirmation must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
    );
  })

  const emailLoginError = computed(() => {
    if (!data.value.email) return 'This field is required.'
    return null;
  })

  const passwordLoginError = computed(() => {
    if (!data.value.password) return 'This field is required.'
    return null;
  })

  /**
   * ======================================== METHODS ========================================
   **/
  const submitRegister = () => {
    if (!data.value.name) return dataErrors.value.name = nameError;
    if (!data.value.email) return dataErrors.value.email = emailError;
    if (!data.value.password) return dataErrors.value.password = passwordError;
    if (!data.value.passwordConfirmation) return dataErrors.value.passwordConfirmation = passwordConfirmationError;

    if (data.value.password !== data.value.passwordConfirmation) {
      return dataErrors.value.passwordConfirmation = 'Password and confirmation password does not match.';
    }

    data.value.password = $cryptoJs.AES.encrypt(data.value.password, config.public.cryptoSecretKey).toString();

    register(data.value);

    setTimeout(() => { 
      $swal.fire({
        icon: 'success',
        title: 'Register Success',
        text: "Now Let's Login!",
        showConfirmButton: false
      })
    }, 1500)

    setTimeout(() => { 
      window.location.pathname = '/auth/login'
     }, 3000)
  }

  const submitLogin = () => {
    if (!data.value.email) return dataErrors.value.email = emailLoginError;
    if (!data.value.password) return dataErrors.value.password = passwordLoginError;

    if (data.value.email !== email.value) {
      return dataErrors.value.password = 'Invalid Email or Password';
    }

    const bytes = $cryptoJs.AES.decrypt(password.value, config.public.cryptoSecretKey);
    const original = bytes.toString($cryptoJs.enc.Utf8)

    if (data.value.password !== original) {
      return dataErrors.value.password = 'Invalid Email or Password';
    }

    login();
    
    setTimeout(() => { 
      $swal.fire({
        icon: 'success',
        title: 'Login Success',
        text: 'Happy Shopping!',
        showConfirmButton: false
      })
    }, 1500)

    setTimeout(() => { 
      window.location.pathname = '/'
     }, 3000)
  }

  return { data, dataErrors, submitRegister, submitLogin }
}