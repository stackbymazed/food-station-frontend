"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import { TMeal } from "@/services/mealService";

export default function MealOrderSection({ meal }: { meal: TMeal }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string | null>(
        meal.options?.find(o => o.type === 'size' && o.name === 'Large')?.name || 
        meal.options?.find(o => o.type === 'size')?.name || null
    );
    const [selectedAddons, setSelectedAddons] = useState<number[]>([]);

    const handleAddonToggle = (id: number) => {
        setSelectedAddons(prev => 
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    const basePrice = meal.price;
    const sizePrice = meal.options?.find(o => o.type === 'size' && o.name === selectedSize)?.price || 0;
    const addonsPrice = selectedAddons.reduce((acc, id) => {
        const opt = meal.options?.find(o => o.id === id);
        return acc + (opt?.price || 0);
    }, 0);

    const unitPrice = basePrice + sizePrice + addonsPrice;
    const totalPrice = unitPrice * quantity;

    return (
        <div className="flex flex-col h-full space-y-12">
            {/* Professional Size Selection */}
            {meal.options && meal.options.filter(o => o.type === 'size').length > 0 && (
                <div>
                    <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-orange-600 rounded-full"></span>
                        Select Your Size
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                        {meal.options.filter(o => o.type === 'size').map((opt) => (
                            <button 
                                key={opt.id}
                                onClick={() => setSelectedSize(opt.name)}
                                className={`flex items-center p-5 rounded-3xl border-2 transition-all duration-300 group cursor-pointer ${
                                    selectedSize === opt.name 
                                    ? "border-orange-600 bg-orange-50/50" 
                                    : "border-slate-100 hover:border-slate-300 bg-white"
                                }`}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${
                                    selectedSize === opt.name 
                                    ? "border-orange-600" 
                                    : "border-slate-300 group-hover:border-slate-400"
                                }`}>
                                    {selectedSize === opt.name && (
                                        <div className="w-3 h-3 bg-orange-600 rounded-full animate-in zoom-in-50 duration-300" />
                                    )}
                                </div>
                                <span className={`text-base font-bold flex-1 tracking-tight ${selectedSize === opt.name ? "text-slate-900" : "text-slate-500"}`}>
                                    {opt.name}
                                </span>
                                <span className={`text-base font-black ${selectedSize === opt.name ? "text-orange-600" : "text-slate-400"}`}>
                                    + ${opt.price.toFixed(2)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Premium Addons Selection */}
            {meal.options && meal.options.filter(o => o.type === 'addon').length > 0 && (
                <div>
                    <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-orange-600 rounded-full"></span>
                        Extra Addons
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {meal.options.filter(o => o.type === 'addon').map((opt) => (
                            <button 
                                key={opt.id}
                                onClick={() => handleAddonToggle(opt.id)}
                                className={`flex items-center p-4 rounded-3xl border transition-all duration-300 group cursor-pointer ${
                                    selectedAddons.includes(opt.id)
                                    ? "bg-slate-900 border-slate-900 shadow-xl shadow-slate-200"
                                    : "bg-white border-slate-100 hover:border-slate-300"
                                }`}
                            >
                                <div className={`w-6 h-6 rounded-xl border flex items-center justify-center transition-all ${
                                    selectedAddons.includes(opt.id)
                                    ? "bg-orange-600 border-orange-600"
                                    : "bg-slate-50 border-slate-200 group-hover:border-orange-400"
                                }`}>
                                    {selectedAddons.includes(opt.id) && (
                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className="animate-in zoom-in-75 duration-300">
                                            <path d="M1 5L4 8L11 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </div>
                                <div className="ml-4 text-left flex-1 min-w-0">
                                    <p className={`text-sm font-black truncate tracking-tight ${selectedAddons.includes(opt.id) ? "text-white" : "text-slate-700"}`}>
                                        {opt.name}
                                    </p>
                                    <p className={`text-xs font-bold ${selectedAddons.includes(opt.id) ? "text-orange-400" : "text-slate-400"}`}>
                                        + ${opt.price.toFixed(2)}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Final Interaction Bar */}
            <div className="pt-8 border-t border-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-8 mb-10">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing Policy</p>
                        <span className="text-3xl font-black text-slate-900 tracking-tighter">
                            Total: <span className="text-orange-600">${totalPrice.toFixed(2)}</span>
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-3xl p-1.5 shadow-sm">
                        <button 
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-orange-600 hover:text-white rounded-2xl transition-all duration-300 active:scale-90"
                        >
                            <Minus size={20} />
                        </button>
                        <span className="w-14 text-center text-xl font-black text-slate-900 tabular-nums">{quantity}</span>
                        <button 
                            onClick={() => setQuantity(q => q + 1)}
                            className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-orange-600 hover:text-white rounded-2xl transition-all duration-300 active:scale-90"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-orange-600 hover:bg-slate-900 text-white font-black py-6 rounded-[32px] shadow-2xl shadow-orange-100 transition-all duration-500 active:scale-95 text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 group">
                        <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" />
                        Add To Cart
                    </button>
                    <button className="border-2 border-slate-900 hover:bg-slate-900 text-slate-900 hover:text-white font-black py-6 rounded-[32px] transition-all duration-500 active:scale-95 text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                        <Heart size={20} />
                        Pay to Proceed
                    </button>
                </div>
            </div>
        </div>
    );
}
