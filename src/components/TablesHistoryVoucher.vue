<script setup lang="ts">
import type { VoucherClaimed } from '@/types';

const props = defineProps<{ voucher: VoucherClaimed }>()
const emit = defineEmits(['deleteVoucherClaim'])

const url = import.meta.env.VITE_BASE_URL + '/images'
const handleDeleteVoucherClaim = (id: string) => {
  emit('deleteVoucherClaim', id)
}
</script>

<template>


  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
      <img class="w-10 h-10 rounded-full" :src="url + props.voucher.voucher.foto" alt="Jese image">
      <div class="ps-3">
        <div class="text-base font-semibold">{{ props.voucher.voucher.nama }}</div>
      </div>
    </th>
    <td class="px-6 py-4">
      <button @click="handleDeleteVoucherClaim(props.voucher.id)"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Remove
      </button>
    </td>
  </tr>


</template>
