<script setup lang="ts">
import { axiosInstance } from '@/libs/axios';
import { inject, onMounted, ref, watch, } from 'vue';
import type { VueCookies } from 'vue-cookies';
import { useRoute, useRouter } from 'vue-router'
import { initFlowbite } from 'flowbite'
import { useUserStore } from '@/stores';
import { useLogout } from '@/composables/useLogout';


const route = useRoute()
const router = useRouter()
const cookies = inject<VueCookies>("$cookies")
const isLogin = ref(false)
const userStore = useUserStore()
const {logout}  = useLogout()
onMounted(() => {
  isLogin.value = cookies!.get("token") ? true : false
  userStore.setIsLogin(isLogin.value)
  initFlowbite()
})

watch(() => route.path, () => {
  isLogin.value = cookies!.get("token") ? true : false
  userStore.setIsLogin(isLogin.value)
})

const handleLogout = async () => {
  await logout()
  isLogin.value = false
  userStore.setIsLogin(isLogin.value)
  if (route.path.includes('history')) {
    router.push('/')
  } else {
    window.location.reload()
  }
  }

</script>

<template>
  <main>
    <nav
      :class="'sticky top-0 z-50 w-full bg-gray-300 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 ' + (route.path.includes('login') || route.path.includes('register') ? 'hidden' : '')">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center justify-start rtl:justify-end">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                  </path>
                </svg>
              </button>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ms-3">
                <div class="hidden sm:block">
                  <button type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-8 h-8 rounded-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQbNlDeOEF9mbaBzWL9K2QHPPkofVOU-FLDwj_7bPMGgcd8JIhIJhoppJy4WwVXFd3BH8&usqp=CAU"
                      alt="user photo">
                  </button>
                </div>
                <div
                  class="z-50 hidden py-4 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user">
                  <div class="px-4 " v-if="isLogin">
                    <button
                      class="text-gray-900 w-40 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      @click="handleLogout">Logout</button>
                  </div>
                  <div class="px-4 " v-else>
                    <button @click="() => router.push('/register')"
                      class="text-white w-full  bg-gray-800  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                      Register
                    </button>
                    <button @click="() => router.push('/login')"
                      class="text-gray-900 w-full  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div v-if="!route.path.includes('history')" class="flex items-center justify-center">
              <button @click="() => isLogin ? router.push('/history') : router.push('/login')"
                class="text-gray-900 w-24  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                History
              </button>
            </div>
            <div v-if="route.path.includes('history')" class="flex items-center justify-center">
              <button @click="() => router.push('/')"
                class="text-gray-900 w-24  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div v-if="!route.path.includes('history')"
      :class="'p-4  ' + ((!route.path.includes('login') && !route.path.includes('register')) ? 'sm:ml-64' : '')">
      <RouterView />
    </div>
    <div v-else
      :class="'p-4  ' + ((!route.path.includes('login') && !route.path.includes('register')) ? 'sm:mr-64' : '')">
      <RouterView />
    </div>
  </main>
</template>
