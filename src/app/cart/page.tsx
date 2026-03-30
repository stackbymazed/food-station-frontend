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

      <div className="max-w-7xl mx-auto px-6 mt-16">
        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-100 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              href="/browse-meals" 
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-500/20"
            >
              <ArrowLeft size={18} />
              Browse Meals
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Table Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-orange-500 text-white font-bold text-sm uppercase tracking-wider">
                      <th className="py-5 px-6">Image</th>
                      <th className="py-5 px-6">Details</th>
                      <th className="py-5 px-6">Price</th>
                      <th className="py-5 px-6 text-center">Quantity</th>
                      <th className="py-5 px-6">Total</th>
                      <th className="py-5 px-6 text-center">Clear All</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-6 px-6">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                            <img src={item.mainImage} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <h3 className="font-bold text-slate-900 mb-1">{item.name}</h3>
                          <p className="text-xs text-slate-500 font-medium">{item.category}</p>
                        </td>
                        <td className="py-6 px-6 font-bold text-slate-700">
                          ${(item.discountPrice || item.price).toFixed(2)}
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center justify-center gap-3">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 active:scale-90 transition-all font-bold"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-bold text-slate-900 w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 active:scale-90 transition-all font-bold"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="py-6 px-6 font-bold text-orange-500">
                          ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-6 px-6 text-center">
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="w-10 h-10 rounded-full border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all flex items-center justify-center mx-auto"
                          >
                            <X size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Section */}
            <div className="lg:col-span-1">
              <div className="bg-[#f1f5f9]/50 rounded-3xl p-8 border border-white shadow-sm sticky top-32">
                <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
                  Total Cart ({getItemCount().toString().padStart(2, '0')})
                </h2>
                
                <div className="space-y-4 mb-10 text-sm">
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="font-medium">Delivery:</span>
                    <span className="font-bold text-green-600">${delivery.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="font-medium">Discount:</span>
                    <span className="font-bold text-red-500">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-lg font-black text-slate-900">Total:</span>
                    <span className="text-2xl font-black text-orange-500">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="relative mb-6">
                  <input 
                    type="text" 
                    placeholder="Coupon Code" 
                    className="w-full py-4 pl-5 pr-24 bg-white rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-400" 
                  />
                  <button className="absolute right-2 top-2 bottom-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 rounded-lg transition-colors active:scale-95">
                    Apply
                  </button>
                </div>

                <Link href="/checkout">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-orange-500/20 uppercase tracking-widest text-sm">
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
