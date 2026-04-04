"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import {
   Plus,
   MapPin,
   ChevronLeft,
   ShieldCheck,
   Truck,
   Wallet,
   ShoppingBag,
   ArrowRight,
   Timer,
   Loader2,
   CreditCard
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "@/components/checkout/StripeCheckoutForm";
import { authClient } from "@/lib/auth-client";
import { env } from "@/env";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
   const router = useRouter();
   const { data: session } = authClient.useSession();
   const { items, getTotalPrice } = useCartStore();
   const [mounted, setMounted] = useState(false);
   const [clientSecret, setClientSecret] = useState<string | null>(null);
   const [paymentError, setPaymentError] = useState<string | null>(null);

   useEffect(() => {
      setMounted(true);

      // Fetch Payment Intent Client Secret
      const fetchIntent = async () => {
         const total = getTotalPrice();
         const amount = total * 1.05; // 5% tax
         // console.log(`[CHECKOUT] Cart total: ${total}, with tax: ${amount}`);

         if (amount <= 0 || isNaN(amount)) {
            // console.warn("[CHECKOUT] Skipping payment intent: Invalid amount.");
            return;
         }

         try {
            setPaymentError(null);
            const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/payment/create-intent`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ amount: amount, currency: "usd" }),
            });
            const result = await res.json();
            if (result.success) {
               setClientSecret(result.data.clientSecret);
            } else {
               setPaymentError(result.message || "Failed to initialize payment gateway");
            }
         } catch (err) {
            // console.error("Failed to fetch payment intent:", err);
            setPaymentError("Network error. Please try again.");
         }
      };

      if (items.length > 0) {
         fetchIntent();
      }
   }, [items.length]);

   if (!mounted) return null;

   const totalPrice = getTotalPrice();
   const totalBill = totalPrice * 1.05;

   if (items.length === 0) {
      return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfdfe] p-6 text-center">
            <div className="w-32 h-32 bg-slate-100 rounded-[48px] flex items-center justify-center text-slate-300 mb-8">
               <ShoppingBag size={64} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">Your Cart is Empty</h1>
            <p className="text-slate-500 mb-10 max-w-sm font-medium">Add some delicious meals to your cart before proceeding to checkout.</p>
            <Link href="/browse-meals" className="px-10 py-5 bg-orange-600 text-white rounded-[32px] font-black uppercase tracking-widest text-xs hover:bg-slate-900 shadow-xl shadow-orange-500/20 active:scale-95 transition-all outline-none">Explore Menu</Link>
         </div>
      );
   }

   return (
      <main className="min-h-screen bg-[#fcfdfe] pb-32 font-outfit">
         {/* Header */}
         <div className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
               <button onClick={() => router.back()} className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-orange-600 hover:text-white transition-all">
                  <ChevronLeft size={24} />
               </button>
               <div className="flex flex-col items-center">
                  <h1 className="text-xl font-black text-slate-900 tracking-tighter">Secure Checkout</h1>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                     <ShieldCheck size={12} />
                     <span className="text-[9px] font-black uppercase tracking-widest">SSL Encrypted</span>
                  </div>
               </div>
               <div className="w-12"></div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-6 mt-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

               {/* Left Side: Step-by-Step Payment (7 columns) */}
               <div className="lg:col-span-7 space-y-12">

                  {/* Delivery Details */}
                  <section className="space-y-8">
                     <div className="flex items-center justify-between">
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                           <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
                           1. Delivery Info
                        </h3>
                     </div>

                     <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm relative group cursor-pointer hover:border-orange-500 transition-all">
                        <div className="flex items-start gap-8">
                           <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                              <MapPin size={36} />
                           </div>
                           <div>
                              <h4 className="text-xl font-black text-slate-900 mb-2">Primary Address</h4>
                              <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                                 124 King Street, Suite 500, San Francisco, CA 94107, United States
                              </p>
                              <div className="mt-4 flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                                 <Timer size={14} /> Estimated: 25-30 Mins
                              </div>
                           </div>
                           <button className="ml-auto p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-all">
                              <Plus size={20} />
                           </button>
                        </div>
                     </div>
                  </section>

                  {/* Payment Section */}
                  <section className="space-y-8">
                     <h3 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
                        2. Payment Method
                     </h3>

                     <div className="bg-white p-10 md:p-14 rounded-[56px] border border-slate-100 shadow-sm space-y-12">
                        <div className="flex items-center gap-4 mb-4">
                           <div className="px-5 py-2.5 bg-slate-900 text-white rounded-2xl flex items-center gap-3 shadow-xl shadow-slate-900/10">
                              <CreditCard size={18} className="text-orange-500" />
                              <span className="text-[11px] font-black uppercase tracking-widest">Card (Stripe)</span>
                           </div>
                           <div className="flex-1 h-[1px] bg-slate-100" />
                        </div>

                        {clientSecret && session?.user?.id ? (
                           <Elements stripe={stripePromise} options={{ clientSecret }}>
                              <StripeCheckoutForm
                                 amount={totalBill}
                                 userId={session.user.id}
                                 items={items}
                              />
                           </Elements>
                        ) : (
                           <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                              {!session?.user?.id ? (
                                 <div className="text-center space-y-6">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-300">
                                       <ShieldCheck size={32} />
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Authentication Required</p>
                                       <p className="text-xs font-medium text-slate-400">Please sign in to complete your purchase safely.</p>
                                    </div>
                                    <Link
                                       href={`/login?callback=/checkout`}
                                       className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                                    >
                                       Sign In Now <ArrowRight size={14} />
                                    </Link>
                                 </div>
                              ) : paymentError ? (
                                 <div className="text-center space-y-6">
                                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto text-red-500">
                                       <Wallet size={32} />
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Initialization Failed</p>
                                       <p className="text-xs font-medium text-red-400">{paymentError}</p>
                                    </div>
                                    <button
                                       onClick={() => window.location.reload()}
                                       className="inline-flex items-center gap-3 px-8 py-4 bg-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all active:scale-95"
                                    >
                                       Retry Fetching
                                    </button>
                                 </div>
                              ) : (
                                 <>
                                    <Loader2 className="animate-spin mb-4 text-orange-600" size={32} />
                                    <p className="text-sm font-bold uppercase tracking-widest">Initializing Gateway...</p>
                                 </>
                              )}
                           </div>
                        )}

                        <div className="pt-8 border-t border-slate-50 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                           <div className="flex items-center gap-2">
                              <ShieldCheck size={14} className="text-orange-500" />
                              Fully Secured
                           </div>
                           <div className="flex items-center gap-2">
                              <Truck size={14} className="text-orange-500" />
                              Express Shipping
                           </div>
                           <div className="flex items-center gap-2">
                              <Wallet size={14} className="text-orange-500" />
                              Payment Protection
                           </div>
                        </div>
                     </div>
                  </section>
               </div>

               {/* Right Side: Final Bill (5 columns) */}
               <aside className="lg:col-span-5 lg:sticky lg:top-36 space-y-8">
                  <div className="bg-white rounded-[56px] p-10 md:p-14 border border-slate-100 shadow-[0_40px_100px_rgba(0,0,0,0.03)] relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/5 blur-[80px] -mr-20 -mt-20 rounded-full" />

                     <h3 className="text-3xl font-black mb-12 tracking-tighter flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                           <ShoppingBag size={24} className="text-white" />
                        </div>
                        Order Bill
                     </h3>

                     <div className="space-y-8 mb-12 max-h-[400px] overflow-y-auto pr-6 custom-scrollbar scroll-smooth">
                        {items.map((item) => (
                           <div key={item.id} className="flex items-center gap-6 group/item">
                              <div className="w-20 h-20 rounded-[28px] overflow-hidden shrink-0 border border-slate-100 group-hover/item:border-orange-500 transition-all p-1 bg-white">
                                 <img src={item.mainImage} alt={item.name} className="w-full h-full object-cover rounded-[24px]" />
                              </div>
                              <div className="flex-1 space-y-1">
                                 <h4 className="font-black text-base text-slate-900 tracking-tight">{item.name}</h4>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-black text-orange-600 text-lg tabular-nums">${(item.price * item.quantity).toFixed(2)}</p>
                           </div>
                        ))}
                     </div>

                     <div className="space-y-6 border-t border-slate-100 pt-12">
                        <div className="flex items-center justify-between text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                           <span>Subtotal Sum</span>
                           <span className="text-slate-900 font-black text-sm tabular-nums">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                           <span>Service Tax (5%)</span>
                           <span className="text-slate-900 font-black text-sm tabular-nums">${(totalPrice * 0.05).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                           <div className="flex items-center gap-2 text-emerald-600">
                              <span>Delivery</span>
                              <div className="px-2 py-0.5 bg-emerald-100 rounded-full text-[8px]">FREE</div>
                           </div>
                           <span className="text-emerald-700 font-black text-sm tabular-nums">$0.00</span>
                        </div>

                        <div className="flex items-center justify-between pt-10 border-t border-slate-100 mt-2">
                           <div className="flex flex-col">
                              <span className="text-2xl font-black italic font-pacifico text-orange-600">Payable Amount</span>
                              <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em] mt-1 ml-1">Secure Transaction Only</p>
                           </div>
                           <span className="text-4xl font-black tabular-nums tracking-tighter text-slate-900">${totalBill.toFixed(2)}</span>
                        </div>
                     </div>
                  </div>

                  <div className="p-10 bg-slate-900 rounded-[48px] text-white flex items-start gap-8 shadow-2xl relative overflow-hidden group">
                     <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-600/10 blur-3xl -mr-16 -mb-16" />
                     <div className="w-16 h-16 bg-white/5 rounded-[24px] flex items-center justify-center text-orange-500 border border-white/10 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-all duration-700 shrink-0">
                        <ShieldCheck size={32} />
                     </div>
                     <div className="space-y-2">
                        <h5 className="text-lg font-black tracking-tight">Purchase Protection</h5>
                        <p className="text-sm font-medium text-white/40 leading-relaxed">Your transaction is protected by 256-bit encryption and is 100% secure.</p>
                     </div>
                  </div>
               </aside>
            </div>
         </div>
      </main>
   );
}
