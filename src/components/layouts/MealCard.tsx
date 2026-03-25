"use client";

import Link from "next/link";
import { Eye, Heart, Star } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { toast } from "sonner";

type Meal = {
    id: number;
    name: string;
    mainImage: string;
    category: string;
    rating: number;
    reviewCount: number;
    price: number;
    discountPrice?: number;
};

export default function MealCard({ food, index = 0 }: { food: Meal, index?: number }) {
    const addItem = useCartStore((state) => state.addItem);

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
            <div className="relative h-64 w-full bg-slate-100 overflow-hidden shrink-0">
                <img
                    src={food.mainImage}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Category Badge - Orange rectangle bottom right overlapping the image slightly */}
                <div className="absolute bottom-0 right-0 bg-[#f97316] text-white text-[13px] italic font-semibold font-pacifico px-5 py-2 shadow-sm z-10 transition-transform duration-300 group-hover:translate-x-0">
                    {food.category}
                </div>
            </div>

            {/* White Body taking up the rest of the space */}
            <div className="bg-white flex-1 p-6 pb-24 relative border-l border-r border-[#f1f5f9]">
                <h3 className="text-[17px] font-extrabold text-[#111827] text-center mb-4 tracking-tight min-h-[50px] flex items-center justify-center">
                    {food.name}
                </h3>

                {/* Custom Star Rating Layout */}
                <div className="flex items-center justify-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(food.rating) ? 'text-[#f97316] fill-[#f97316]' : 'text-gray-300'} stroke-current`}
                            style={{ fill: i < Math.floor(food.rating) ? 'currentColor' : 'none' }}
                        />
                    ))}
                    <span className="text-[#374151] font-medium text-sm ml-2">— {food.reviewCount}</span>
                </div>

                {/* Price Container */}
                <div className="flex items-center justify-center gap-2 pt-1 border-t border-dashed border-gray-200 w-3/4 mx-auto mt-4">
                    <span className="text-[22px] font-bold text-[#f97316]">${food.price.toFixed(2)}</span>
                    {food.discountPrice && (
                        <span className="text-sm font-medium text-gray-400 line-through">${food.discountPrice.toFixed(2)}</span>
                    )}
                </div>
            </div>

            {/* Bottom Actions Floating absolute row exactly like the mockup */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between pointer-events-none">

                {/* Add To Cart button taking up most space */}
                <button 
                    onClick={handleAddToCart}
                    className="bg-[#f97316] hover:bg-orange-600 text-white py-2.5 px-6 font-semibold text-sm transition-colors shadow-sm pointer-events-auto active:scale-95"
                    style={{ borderRadius: '0px', borderTopLeftRadius: '16px', borderBottomRightRadius: '16px' }}
                >
                    add To Cart
                </button>

                <div className="flex items-center gap-2 pointer-events-auto pr-4 mb-2">
                    <button className="w-9 h-9 border border-[#f97316] text-[#f97316] flex items-center justify-center hover:bg-orange-50 transition-colors shadow-sm bg-white active:scale-90"
                        style={{ borderRadius: '0px' }}
                    >
                        <Heart size={16} />
                    </button>
                    <Link 
                        href={`/meals/${food.id}`}
                        className="w-9 h-9 border border-[#f97316] text-[#f97316] flex items-center justify-center hover:bg-orange-50 transition-colors shadow-sm bg-white active:scale-90"
                        style={{ borderRadius: '0px' }}
                    >
                        <Eye size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}