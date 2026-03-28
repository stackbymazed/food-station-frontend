import { env } from "@/env";

export const orderService = {
  getUserOrders: async (userId: string) => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/order/user/${userId}`, {
        credentials: "include"
      });
      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Failed to fetch user orders:", error);
      return { success: false, data: [] };
    }
  },
  getAllOrders: async () => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/order`, {
        credentials: "include"
      });
      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Failed to fetch all orders:", error);
      return { success: false, data: [] };
    }
  },
  updateOrderStatus: async (orderId: string, status: string) => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/order/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Failed to update order status:", error);
      return { success: false, message: "Network error" };
    }
  },
};
