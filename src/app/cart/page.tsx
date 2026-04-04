"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import { Minus, Plus, X, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, getItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getTotalPrice();
  const delivery = items.length > 0 ? 5.00 : 0;
  const discount = 0; // Placeholder
  const total = subtotal + delivery - discount;

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Banner */}
      <div
        className="relative h-64 flex items-center justify-center bg-slate-900 overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center text-white z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Cart View</h1>
          <div className="flex items-center justify-center gap-2 text-sm font-medium opacity-90">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-orange-500">Cart View</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 sm:mt-16">
        {items.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-8 sm:p-20 text-center shadow-sm border border-slate-100 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-orange-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 text-sm sm:text-base">Looks like you haven't added anything to your cart yet.</p>
            <Link
              href="/browse-meals"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-500/20 text-sm"
            >
              <ArrowLeft size={18} />
              Browse Meals
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-10">
            {/* Table/Items Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                {/* Desktop Header */}
                <div className="hidden md:grid grid-cols-6 bg-orange-500 text-white font-bold text-[11px] uppercase tracking-[0.2em] py-5 px-6">
                  <div className="col-span-1">Image</div>
                  <div className="col-span-2">Details</div>
                  <div className="col-span-1 text-center">Price</div>
                  <div className="col-span-1 text-center">Quantity</div>
                  <div className="col-span-1 text-right">Total</div>
                </div>

                <div className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <div key={item.id} className="p-5 sm:p-6 group hover:bg-slate-50/50 transition-colors">
                      {/* Mobile Layout (Card) */}
                      <div className="flex gap-4 md:hidden relative">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute top-0 right-0 w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center active:scale-90 transition-all border border-red-100"
                        >
                          <X size={14} />
                        </button>

                        <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 shrink-0">
                          <img src={item.mainImage} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0 pr-6">
                          <h3 className="font-extrabold text-slate-900 mb-1 truncate text-sm">{item.name}</h3>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">{item.category}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-orange-500 text-base">${(item.discountPrice || item.price).toFixed(2)}</span>

                            <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1 border border-slate-100">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="w-7 h-7 rounded-lg bg-white text-slate-600 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all shadow-sm active:scale-90"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-extrabold text-slate-900 w-6 text-center text-xs">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-md active:scale-90"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout (Table Row) */}
                      <div className="hidden md:grid grid-cols-6 items-center gap-4">
                        <div className="col-span-1">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative group">
                            <img src={item.mainImage} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <h3 className="font-extrabold text-slate-900 mb-1 leading-tight">{item.name}</h3>
                          <div className="inline-block px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-md uppercase">
                            {item.category}
                          </div>
                        </div>
                        <div className="col-span-1 text-center font-bold text-slate-700">
                          ${(item.discountPrice || item.price).toFixed(2)}
                        </div>
                        <div className="col-span-1">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 active:scale-90 transition-all font-black"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-black text-slate-900 w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 active:scale-90 transition-all shadow-md shadow-orange-200"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="col-span-1 flex items-center justify-end gap-6 h-full">
                          <span className="font-black text-orange-500 text-lg">
                            ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-9 h-9 rounded-full border border-slate-100 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Total Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 sticky top-32">
                <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                    <ShoppingBag size={18} />
                  </div>
                  Summary ({getItemCount().toString().padStart(2, '0')})
                </h2>

                <div className="space-y-4 mb-8 text-sm">
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="font-bold">Subtotal</span>
                    <span className="font-black text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="font-bold">Delivery</span>
                    <span className="font-black text-green-600">${delivery.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="font-bold">Discount</span>
                    <span className="font-black text-red-500">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-lg font-black text-slate-900">Grand Total</span>
                    <span className="text-2xl font-black text-orange-500">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="w-full py-4 pl-5 pr-24 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-bold outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all placeholder:text-slate-400"
                  />
                  <button className="absolute right-2 top-2 bottom-2 bg-slate-900 hover:bg-orange-500 text-white text-[10px] uppercase tracking-widest font-black px-4 rounded-xl transition-all active:scale-95">
                    Apply
                  </button>
                </div>

                <Link href="/checkout">
                  <button className="w-full bg-orange-500 hover:bg-slate-900 text-white font-black py-5 rounded-2xl transition-all transform active:scale-[0.98] shadow-2xl shadow-orange-200 uppercase tracking-[0.2em] text-xs">
                    Proceed to Payment
                  </button>
                </Link>

                <p className="text-[10px] text-slate-400 text-center mt-6 font-bold uppercase tracking-wider">
                  Secure checkout powered by FoodStation
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
