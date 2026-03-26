"use client";

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { env } from "@/env";

export default function StripeCheckoutForm({ 
  amount, 
  userId, 
  items 
}: { 
  amount: number; 
  userId: string; 
  items: any[] 
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message || "Payment failed");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Create order in DB
      try {
        const orderData = {
          userId: userId,
          totalAmount: amount, // Full bill including tax
          status: "PROCESSING",
          items: items.map(item => ({
            mealId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        };

        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        const result = await res.json();

        if (result.success) {
          toast.success("Order confirmed! Your meal is being prepared.");
          clearCart();
          router.push("/dashboard");
        } else {
          toast.error("Payment was successful, but order creation failed. Please contact support.");
        }
      } catch (err) {
        console.error("Order creation error:", err);
        toast.error("Something went wrong while confirming your order.");
      }
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 shadow-inner">
        <PaymentElement />
      </div>

      <button
        disabled={isProcessing || !stripe || !elements}
        className="w-full bg-orange-600 hover:bg-slate-900 text-white py-8 rounded-[40px] font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-700 active:scale-95 shadow-2xl shadow-orange-500/20 flex items-center justify-center gap-4 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            Pay Now ${(amount).toFixed(2)}
            <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}
