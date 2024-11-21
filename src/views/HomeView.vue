<script setup lang="ts">
import { useVoucher } from '@/composables/useVoucher';
import { inject, onMounted, ref, watch } from 'vue';
import CardVouchers from '@/components/CardVouchers.vue';
import { useRoute, useRouter } from 'vue-router';
import { initFlowbite } from 'flowbite';
import { axiosInstance } from '@/libs/axios';
import type { VueCookies } from 'vue-cookies';
import { useToast } from 'vue-toast-notification';
import { useLogout } from '@/composables/useLogout';

const route = useRoute()
const router = useRouter()
const { getVoucher, isLoading, vouchers, countVoucher, claimVoucher, isClaiming } = useVoucher()
const cookies = inject<VueCookies>("$cookies")
const {logout} = useLogout()
const toast = useToast()
const isLogin = ref(false)

onMounted(() => {
  getVoucher()
  initFlowbite()
  isLogin.value = cookies!.get("token") ? true : false
})

watch(() => route.query.kategori, () => {
  getVoucher()
})

const handleClaimVoucher = async (id: string) => {
  if (!cookies!.get("token")) {
    toast.error('Please login first')
    router.push('/login')
    return
  }
  if (isClaiming.value) {
    return
  }
  await claimVoucher(id)
}


const handleLogout = async () => {
  await logout()
  isLogin.value = false
  window.location.reload()
  
}


</script>

<template>
  <aside id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-16 pb-4 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:pt-20 sm:px-4 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar">
    <div class="h-full px-3 pb-4 overflow-y-auto bg-gray-300 dark:bg-gray-800">
      <div class="flex items-center justify-center my-8 space-x-4 sm:my-0 sm:hidden">
        <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start"
          class="w-10 h-10 rounded-full cursor-pointer"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQbNlDeOEF9mbaBzWL9K2QHPPkofVOU-FLDwj_7bPMGgcd8JIhIJhoppJy4WwVXFd3BH8&usqp=CAU"
          alt="User dropdown">
        <h3 class="text-2xl font-bold">Horus</h3>
      </div>
      <h1 class="text-3xl font-semibold text-center ">
        <RouterLink to="">Kategory</RouterLink>
      </h1>
      <ul class="mt-6">
        <li>
          <RouterLink to="?kategori=food" class="flex items-center justify-between px-4 py-2 text-gray-900 rounded-lg">
            <span
              class="text-white grow bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Food</span>
            <p
              class="text-white bg-gray-800  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              {{ countVoucher.food }}</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="?kategori=drink" class="flex items-center justify-between px-4 py-2 text-gray-900 rounded-lg">
            <span
              class="text-white grow bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Drink</span>
            <p
              class="text-white bg-gray-800  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              {{ countVoucher.drink }}</p>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="?kategori=travel"
            class="flex items-center justify-between px-4 py-2 text-gray-900 rounded-lg">
            <span
              class="text-white grow bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Travel</span>
            <p
              class="text-white bg-gray-800  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              {{ countVoucher.travel }}</p>
          </RouterLink>
        </li>
      </ul>
      <div class="px-4 sm:hidden" v-if="isLogin">
        <button
          class="text-gray-900 w-40 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          @click="handleLogout">Logout</button>
      </div>
      <div class="px-4 sm:hidden" v-else>
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
  </aside>

  <div class="flex flex-col items-center h-screen">
    <div v-if="isLoading" class="text-2xl">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CardVouchers v-for="(voucher, index) in vouchers" :id="voucher.id" @claimVoucher="handleClaimVoucher"
          :key="index" :kategori="voucher.kategori" :nama="voucher.nama" :foto="voucher.foto"
          :status="voucher.status" />
      </div>
    </div>
  </div>
</template>
