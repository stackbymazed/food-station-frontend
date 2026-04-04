import { env } from "@/env";

export const statsService = {
    getAdminStats: async () => {
        try {
            const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/stats/admin`, {
                credentials: "include"
            });
            return await res.json();
        } catch (error) {
            console.error("Failed to fetch admin stats:", error);
            return { success: false };
        }
    },
    getProviderStats: async (providerId: string) => {
        try {
            const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/stats/provider/${providerId}`, {
                credentials: "include"
            });
            return await res.json();
        } catch (error) {
            console.error("Failed to fetch provider stats:", error);
            return { success: false };
        }
    },
    getUserStats: async (userId: string) => {
        try {
            const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/stats/user/${userId}`, {
                credentials: "include"
            });
            return await res.json();
        } catch (error) {
            console.error("Failed to fetch user stats:", error);
            return { success: false };
        }
    },
};
