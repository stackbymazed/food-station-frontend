export const orderService = {
  getUserOrders: async (userId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/user/${userId}`);
      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Failed to fetch user orders:", error);
      return { success: false, data: [] };
    }
  },
  getAllOrders: async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`);
      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Failed to fetch all orders:", error);
      return { success: false, data: [] };
    }
  },
};
