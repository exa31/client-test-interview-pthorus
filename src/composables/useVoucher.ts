import { axiosInstance } from "@/libs/axios";
import type { ResGetVouchers, Voucher } from "@/types";
import { AxiosError } from "axios";
import { inject, reactive, ref, watch } from "vue";
import type { VueCookies } from "vue-cookies";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";

export function useVoucher() {
  const route = useRoute();
  const toast = useToast();
  const cookies = inject<VueCookies>("$cookies");
  const isLoading = ref(false);
  const vouchers = ref<Voucher[]>();
  const kategori = ref(route.query.kategori);
  watch(
    () => route.query.kategori,
    (newKategori) => {
      kategori.value = newKategori;
    }
  );
  const countVoucher = reactive<{
    food: number;
    drink: number;
    travel: number;
  }>({
    food: 0,
    drink: 0,
    travel: 0,
  });
  const getVoucher = async () => {
    isLoading.value = true;
    try {
      const response = await axiosInstance.get<ResGetVouchers>(
        `${import.meta.env.VITE_BASE_URL}/api/vouchers?kategori=${
          kategori.value ?? ""
        }`
      );
      vouchers.value = response.data.data.vouchers;
      countVoucher.food = response.data.data.countVoucherFood;
      countVoucher.drink = response.data.data.countVoucherDrink;
      countVoucher.travel = response.data.data.countVoucherTravel;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      isLoading.value = false;
    }
  };
  const claimVoucher = async (id: string) => {
    isLoading.value = true;
    try {
      await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/api/claim-vouchers`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies!.get("token")}`,
          },
        }
      );
      await getVoucher();
      toast.success("Voucher claimed successfully");
      vouchers.value = vouchers.value?.filter((v) => v.id !== id);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      isLoading.value = false;
    }
  };
  return { getVoucher, vouchers, isLoading, countVoucher, claimVoucher };
}
