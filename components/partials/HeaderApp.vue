<template>
  <header id="header-app" class="bg-white flex w-full absolute top-0 left-0 items-center z-30">
    <div class="container">
      <div class="flex items-center justify-between relative">
        <div>
          <NuxtLink to="/" class="block py-4">
            <img src="~assets/img/logo.svg" alt="Jajan Terus Logo" width="150">
          </NuxtLink>
        </div>

        <div class="flex items-center px-4">
          <button @click="toggleMenu()" type="button" class="block absolute right-0 lg:hidden" :class="{'hamburger-active': activeMenu}">
            <span class="hamburger-line transition duration-500 ease-in-out origin-top-left"></span>
            <span class="hamburger-line transition duration-500 ease-in-out"></span>
            <span class="hamburger-line transition duration-500 ease-in-out origin-bottom-left"></span>
          </button>
        </div>
        
        <transition>
          <nav id="nav-menu" class="absolute py-4 w-full top-full bg-white border transition-all duration-500 ease-in-out lg:right-4 lg:static lg:flex lg:justify-end lg:border-none lg:top-0 lg:bg-transparent z-20 lg:opacity-100" :class="[activeMenu ? 'top-full opacity-100' : '-top-[150%] opacity-0']">
            <div class="px-4 pt-4 lg:w-full lg:pt-0 relative">
              <input @keyup.enter="searchProduct" type="text" class="bg-gray-100 w-full py-3 px-8 rounded-full text-sm focus:outline-none focus:ring focus:ring-dark/10 focus:border-gray-300" placeholder="Search Product" v-model="keyword">
              <img @click="searchProduct" src="~/assets/icons/icon-search.svg" alt="Search Icon" class="absolute top-4 right-9 bg-gray-100 py-3 px-0 lg:right-9 lg:top-0 cursor-pointer">
            </div>
            <ul class="flex items-center justify-center pt-4 lg:pt-0">
              <li class="mx-6">
                <NuxtLink :to="isLogin ? '/cart' : '/auth/login'" class="flex items-center cursor-pointer transition duration-300 hover:opacity-60 relative">
                  <ClientOnly>
                    <span v-if="cartItems.length && isLogin" class="bg-red-600 p-[2px] px-2 rounded-full text-xs font-bold text-white">{{ cartItems.length }}</span>
                  </ClientOnly>
                  <img src="~/assets/icons/icon-cart.svg" alt="Cart Icon" class="mr-1">
                  <p class="font-bold text-sm">Cart</p>
                </NuxtLink>
              </li>
              <li class="mx-6">
                <NuxtLink :to="isLogin ? '/profile' : '/auth/login'" class="flex items-center cursor-pointer transition duration-300 hover:opacity-60">
                  <img src="~/assets/icons/icon-user.svg" alt="User Icon" class="mr-1">
                  <p class="font-bold text-sm">Account</p>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
  import { useCartsStore } from '~/stores/carts'
  import { useAuthStore } from '~/stores/auth';
  
  const cartStore = useCartsStore()
  const { isLogin } = useAuthStore()

  let activeMenu = ref(false);
  const keyword = ref('');


  const cartItems = computed(() => {
    return cartStore.getCarts;
  })

  const toggleMenu = () => {
    activeMenu.value = !activeMenu.value;
  }

  const closeMenu = () => {
    activeMenu.value = false;
  }

  const searchProduct = () => {
    if (keyword.value.trim().length) {
      window.location.assign(`/products/search?q=${keyword.value}`);
      keyword.value = '';
    }
  }

  if (process.client) {
    // Navbar Fixed
    window.onscroll = function() {
      const header = document.querySelector('header');
      const fixedNav = header.offsetTop;
  
      if (window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
      } else {
        header.classList.remove('navbar-fixed');
      }
    }
  }
</script>