import { axiosInstance } from "@/libs/axios";
import type { ResGetVouchersClaimed, VoucherClaimed } from "@/types";
import { AxiosError } from "axios";
import { inject, reactive, ref, watch } from "vue";
import type { VueCookies } from "vue-cookies";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";

export function useClaimVoucher() {
  const route = useRoute();
  const toast = useToast();
  const cookies = inject<VueCookies>("$cookies");
  const isLoading = ref(false);
  const vouchers = ref<VoucherClaimed[]>();
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
      const response = await axiosInstance.get<ResGetVouchersClaimed>(
        `${import.meta.env.VITE_BASE_URL}/api/claim-vouchers?kategori=${
          kategori.value ?? ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${cookies!.get("token")}`,
          },
        }
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
  const removeClaimVoucher = async (id: string) => {
    isLoading.value = true;
    try {
      await axiosInstance.delete(
        `${import.meta.env.VITE_BASE_URL}/api/delete-claim-vouchers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies!.get("token")}`,
          },
        }
      );
      await getVoucher();
      toast.success("Voucher removed successfully");
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
  return { getVoucher, vouchers, isLoading, countVoucher, removeClaimVoucher };
}
