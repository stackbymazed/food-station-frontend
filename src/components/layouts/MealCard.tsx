"use client";

import Link from "next/link";
import { Eye, Heart, Star } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Meal = {
    id: number;
    name: string;
    mainImage: string;
    category: string;
    rating: number;
    reviewCount: number;
    price: number;
    discountPrice?: number;
    providerId?: string;
    provider?: { name: string };
};

export default function MealCard({ food, index = 0 }: { food: Meal, index?: number }) {
    const addItem = useCartStore((state) => state.addItem);
    const router = useRouter();

    const handleAddToCart = () => {
        addItem(food as any);
        toast.success(`${food.name} added to cart!`);
    };

    return (
        <div
            key={food.id}
            className="bg-[#fafafa] shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col h-full relative"
            style={{ animationDelay: `${index * 100}ms`, animationDuration: '800ms' }}
        >
            {/* Image Container with precise category overlay */}
            <div className="relative h-40 sm:h-64 w-full bg-slate-100 overflow-hidden shrink-0">
                <img
                    src={food.mainImage}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Category Badge */}
                <div className="absolute bottom-0 right-0 bg-[#f97316] text-white text-[10px] sm:text-[13px] italic font-semibold font-pacifico px-3 sm:px-5 py-1 sm:py-2 shadow-sm z-10 transition-transform duration-300">
                    {food.category}
                </div>
            </div>

            {/* White Body */}
            <div className="bg-white flex-1 p-3 sm:p-6 pb-20 sm:pb-24 relative border-l border-r border-[#f1f5f9]">
                <h3 className="text-sm sm:text-[17px] font-extrabold text-[#111827] text-center mb-2 sm:mb-4 tracking-tight min-h-[40px] sm:min-h-[50px] flex items-center justify-center line-clamp-2">
                    {food.name}
                </h3>

                {/* Custom Star Rating Layout */}
                <div className="flex items-center justify-center gap-0.5 mb-2 sm:mb-4 scale-75 sm:scale-100">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(food.rating) ? 'text-[#f97316] fill-[#f97316]' : 'text-gray-300'} stroke-current`}
                            style={{ fill: i < Math.floor(food.rating) ? 'currentColor' : 'none' }}
                        />
                    ))}
                    <span className="text-[#374151] font-medium text-[10px] sm:text-sm ml-1 sm:ml-2">— {food.reviewCount}</span>
                </div>

                {/* Price Container */}
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 pt-1 border-t border-dashed border-gray-200 w-full sm:w-3/4 mx-auto mt-2 sm:mt-4">
                    {food.discountPrice ? (
                        <>
                            <span className="text-lg sm:text-[22px] font-bold text-[#f97316]">${food.discountPrice.toFixed(2)}</span>
                            <span className="text-[10px] sm:text-sm font-medium text-gray-400 line-through">${food.price.toFixed(2)}</span>
                        </>
                    ) : (
                        <span className="text-lg sm:text-[22px] font-bold text-[#f97316]">${food.price.toFixed(2)}</span>
                    )}
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between pointer-events-none p-1 sm:p-0">

                {/* Add To Cart button */}
                <button
                    onClick={handleAddToCart}
                    className="bg-[#f97316] hover:bg-orange-600 text-white py-2 sm:py-2.5 px-3 sm:px-6 font-bold text-[10px] sm:text-sm transition-all shadow-sm pointer-events-auto active:scale-95"
                    style={{ borderRadius: '0px', borderTopLeftRadius: '12px', borderBottomRightRadius: '12px' }}
                >
                    Add to Cart
                </button>

                <div className="flex items-center gap-1 sm:gap-2 pointer-events-auto pr-1 sm:pr-4 mb-2">
                    <button
                        onClick={() => food.providerId && router.push(`/provider/${food.providerId}`)}
                        title={food.provider?.name || "View Provider"}
                        className="w-8 h-8 sm:w-9 sm:h-9 border border-[#f97316] text-[#f97316] flex items-center justify-center hover:bg-orange-50 transition-colors shadow-sm bg-white active:scale-90"
                        style={{ borderRadius: '0px' }}
                    >
                        <Heart size={14} className="sm:w-[16px] sm:h-[16px]" />
                    </button>
                    <Link
                        href={`/meals/${food.id}`}
                        className="w-8 h-8 sm:w-9 sm:h-9 border border-[#f97316] text-[#f97316] flex items-center justify-center hover:bg-orange-50 transition-colors shadow-sm bg-white active:scale-90"
                        style={{ borderRadius: '0px' }}
                    >
                        <Eye size={14} className="sm:w-[16px] sm:h-[16px]" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
