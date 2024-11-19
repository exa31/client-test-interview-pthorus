import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    nama: "",
    email: "",
    isLogin: false,
  }),
  actions: {
    setNama(nama: string) {
      this.nama = nama;
    },
    setEmail(email: string) {
      this.email = email;
    },
    setIsLogin(isLogin: boolean) {
      this.isLogin = isLogin;
    },
  },
});
