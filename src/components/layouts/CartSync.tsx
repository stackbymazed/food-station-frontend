"use client";

import { useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { useCartStore } from "@/lib/store/useCartStore";
import { cartService } from "@/services/cartService";

export default function CartSync() {
    const { data: session } = authClient.useSession();
    const items = useCartStore((state) => state.items);
    const hasSyncedRef = useRef(false);

    useEffect(() => {
        const sync = async () => {
            // Only sync once when user is logged in and has items in local cart
            if (session?.user && items.length > 0 && !hasSyncedRef.current) {
                try {
                    // console.log("Syncing cart to backend...");
                    await cartService.syncCart(items.map(i => ({ mealId: i.id, quantity: i.quantity })));
                    hasSyncedRef.current = true;
                } catch (err) {
                    console.error("Cart sync failed", err);
                }
            }
        };
        sync();
    }, [session?.user, items.length]);

    return null;
}
