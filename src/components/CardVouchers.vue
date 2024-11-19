<script setup lang="ts">
import type { Voucher } from '@/types';

const url = import.meta.env.VITE_BASE_URL + '/images'
const emit = defineEmits(['claimVoucher', 'test'])
const props = defineProps<Voucher>()
const handleClaim = () => {
  emit('claimVoucher', props.id)
}
</script>

<template>
  <div
    class="flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="grow">
      <img class="rounded-t-lg" :src="url + props.foto" alt="" />
    </div>
    <div class="p-5 ">
      <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 line-clamp-1 dark:text-white">{{ props.nama }}</h5>
      <div class="flex justify-between ">
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ props.kategori.charAt(0).toUpperCase() +
          props.kategori.slice(1) }}</p>
        <button @click="handleClaim"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Claim
        </button>
      </div>
    </div>
  </div>

</template>
