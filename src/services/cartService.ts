import { env } from "@/env";

const BASE_URL = env.NEXT_PUBLIC_API_URL;

export const cartService = {
    getCart: async () => {
        const res = await fetch(`${BASE_URL}/cart`, {
            headers: {
                "Accept": "application/json",
            },
            credentials: 'include',
            cache: 'no-store'
        });
        return res.json();
    },
    
    addToCart: async (mealId: number, quantity: number = 1) => {
        const res = await fetch(`${BASE_URL}/cart`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ mealId, quantity })
        });
        return res.json();
    },
    
    syncCart: async (items: { mealId: number, quantity: number }[]) => {
        // Simple sequential sync for now
        for (const item of items) {
            await cartService.addToCart(item.mealId, item.quantity);
        }
    }
}
