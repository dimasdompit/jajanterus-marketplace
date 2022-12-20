export const useAuthStore = definePiniaStore(
  'auth-store',
  {
    state: () => ({
      isLogin: false,
      isLoadingAuth: false,
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      expired: 0,
    }),
    persist: true,
    getters: {},
    actions: {
      register(data = {}) {
        this.isLoadingAuth = true;

        setTimeout(() => { 
          this.name = data.name;
          this.email = data.email;
          this.password = data.password;
          this.password_confirmation = data.password_confirmation;

          this.isLoadingAuth = false;
         }, 1500)
      },
      login() {
        this.isLoadingAuth = true;

        setTimeout(() => {
          const timeout = new Date().getTime() + 1440*60*1000;

          this.isLogin = true;
          this.expired = timeout;

          this.isLoadingAuth = false;
        }, 1500)
      },
      logout() {
        this.isLoadingAuth = true

        setTimeout(() => { 
          this.isLogin = false
          this.expired = 0;

          window.location.pathname = '/';
          this.isLoadingAuth = false;
         }, 1500)
      },
      authCheck() {
        if (new Date().getTime() > this.expired) {
          this.isLogin = false;
          this.expired = 0;
        }
      }
    }
  }
)