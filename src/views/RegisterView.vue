<script setup lang="ts">

import { reactive } from "vue";
import { useRegister } from "@/composables/useRegister";

const form = reactive<{ username: string, password: string, email: string, nama: string }>({
  username: "",
  email: "",
  nama: "",
  password: "",
});

const { error, isSubmtting, register } = useRegister();

const handleSubmit = async () => {
  await register(form);
};

</script>

<template>
  <form @submit.prevent="handleSubmit" class="max-w-sm px-8 py-10 mx-auto bg-gray-300 mt-14 rounded-xl ">
    <h1 class="mb-10 text-3xl font-bold text-center">Register</h1>
    <div class="mb-6">
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
      <input v-model="form.nama" type="text" id="name" placeholder="Enter your nama"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ error.nama }}</p>
    </div>
    <div class="mb-6">
      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
      <input v-model="form.username" type="text" id="username" placeholder="Enter your username"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ error.username }}</p>
    </div>
    <div class="mb-6">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
      <input v-model="form.email" type="email" id="email" placeholder="Enter your email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ error.email }}</p>
    </div>
    <div class="mb-6">
      <label for="Password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
      <input type="password" id="Password" v-model="form.password" placeholder="Enter your password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <p class="mt-2 text-sm text-red-600 dark:text-red-500">{{ error.password }}</p>
    </div>
    <p>Already have an account?
      <RouterLink class="text-blue-500" to="/login"> Login</RouterLink>
    </p>
    <button :disabled="isSubmtting" type="submit"
      class="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline">Register</button>
  </form>
</template>
