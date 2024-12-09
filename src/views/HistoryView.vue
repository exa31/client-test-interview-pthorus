<script setup lang="ts">
import TablesHistoryVoucher from '@/components/TablesHistoryVoucher.vue';
import { useClaimVoucher } from '@/composables/useClaimVoucher';
import { useLogout } from '@/composables/useLogout';
import { axiosInstance } from '@/libs/axios';
import { initFlowbite } from 'flowbite';
import { onMounted, watch,inject } from 'vue';
import type { VueCookies } from 'vue-cookies';
import { useRoute,useRouter } from 'vue-router';


const route = useRoute()
const router = useRouter()
const cookies = inject<VueCookies>("$cookies")
const {logout} = useLogout()
const { countVoucher, getVoucher, isLoading, removeClaimVoucher, isDeleting, vouchers } = useClaimVoucher()

onMounted(() => {
  getVoucher()
  initFlowbite()
  if (!cookies!.get('token')) {
    router.push('/login')
  }
})

watch(() => route.query.kategori, () => {
  getVoucher()  
})

const handleLogout = async () => {
  await logout()
  router.push('/')
}

const handleDeleteVoucherClaim = async (id: string) => {
  if (isDeleting.value) {
    return
  }
  await removeClaimVoucher(id)
}

</script>

<template>
  <div class="flex flex-col h-screen">
    <h3 class="text-2xl font-semibold text-start">Voucher Claim</h3>
    <div v-if="isLoading" class="text-2xl">Loading...</div>
    <div class="w-full" v-else>
      <table class="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <TablesHistoryVoucher v-for="(voucher, index) in vouchers" @deleteVoucherClaim="handleDeleteVoucherClaim"
            :key="index" :voucher="voucher" />
        </tbody>
      </table>
    </div>
  </div>

  <aside id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen px-4 py-4 pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:left-auto sm:right-0 sm:pt-20 sm:px-4 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
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
      <div class="px-4 sm:hidden">
        <button
          class="text-gray-900 w-40 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          @click="handleLogout">Logout</button>
      </div>
    </div>
  </aside>


</template>
