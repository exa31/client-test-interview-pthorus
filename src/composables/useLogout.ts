import { axiosInstance } from "@/libs/axios"
import { inject } from 'vue'
import type { VueCookies } from 'vue-cookies';

export const useLogout = () => {
    const cookies = inject<VueCookies>("$cookies")
    const logout = async () => {
        try {
            await axiosInstance.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${cookies!.get("token")}`,
                },
            })
            cookies!.remove("token")
        } catch (error) {
            console.log(error)
        }
    }
    return {logout}
}
