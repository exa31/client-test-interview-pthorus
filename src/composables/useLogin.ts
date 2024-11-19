import { axiosInstance } from "@/libs/axios";
import { useUserStore } from "@/stores";
import type { ResLogin } from "@/types";
import { AxiosError } from "axios";
import { inject, ref } from "vue";
import type { VueCookies } from "vue-cookies";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

export function useLogin() {
  const isSubmtting = ref(false);
  const cookies = inject<VueCookies>("$cookies");
  const store = useUserStore();
  const toast = useToast();
  const route = useRouter();
  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      isSubmtting.value = true;
      const response = await axiosInstance.post<
        { username: string; password: string },
        { data: ResLogin }
      >(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        username,
        password,
      });
      cookies!.set("token", response.data.data.token, "", "/", "", true);
      store.setNama(response.data.data.nama);
      store.setEmail(response.data.data.email);
      store.setIsLogin(true);
      return route.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(error.response!.data.error);
      }
      return toast.error("An error occurred");
    } finally {
      isSubmtting.value = false;
    }
  };
  return { login, isSubmtting };
}
