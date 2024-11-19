import { axiosInstance } from "@/libs/axios";
import { AxiosError } from "axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

export function useRegister() {
  const isSubmtting = ref(false);
  const isError = ref(false);
  const router = useRouter();
  const toast = useToast();
  const error = reactive({
    email: "",
    username: "",
    nama: "",
    password: "",
  });
  const register = async ({
    email,
    username,
    nama,
    password,
  }: {
    email: string;
    username: string;
    nama: string;
    password: string;
  }) => {
    try {
      isSubmtting.value = true;
      isError.value = false;
      if (!email) {
        error.email = "Email is required";
        isError.value = true;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email) && email) {
        error.email = "Invalid email format";
        isError.value = true;
      }
      if (!username || username.length < 3) {
        error.username =
          "Username is required and must be at least 6 characters";
        isError.value = true;
      }

      if (!nama || nama.length < 3) {
        error.nama = "Nama is required and must be at least 3 characters";
        isError.value = true;
      }

      if (!password || password.length < 8) {
        error.password =
          "Password is required and must be at least 6 characters";
        isError.value = true;
      }

      if (isError.value) {
        return;
      } else {
        error.email = "";
        error.username = "";
        error.nama = "";
        error.password = "";
        await axiosInstance.post<{
          username: string;
          email: string;
          nama: string;
          password: string;
        }>(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
          email,
          username,
          nama,
          password,
        });
        toast.success("Register success, please login");
        return router.push("/login");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data.error === "Email already exists") {
          error.email = "Email already exists";
          isError.value = true;
        }
        if (err.response?.data.error === "Username already exists") {
          error.username = "Username already exists";
          isError.value = true;
        }
        if (err.response?.data.error === "Username and Email already exists") {
          error.username = "Username already exists";
          error.email = "Email already exists";
          isError.value = true;
        }
        toast.error(err.response?.data.error);
      }
    } finally {
      isSubmtting.value = false;
    }
  };
  return { register, isSubmtting, error };
}
