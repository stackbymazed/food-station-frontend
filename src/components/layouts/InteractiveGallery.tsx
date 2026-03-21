"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface TMealImage {
    image: string;
}

export default function InteractiveGallery({ mainImage, images }: { mainImage: string, images?: TMealImage[] }) {
    const [activeImage, setActiveImage] = useState(mainImage);
    const allImages = [mainImage, ...(images?.map(img => img.image) || [])];

    return (
        <div className="space-y-8">
            <div className="aspect-[4/3] rounded-[40px] overflow-hidden bg-slate-50 border border-gray-100 shadow-inner group relative">
                <img 
                    src={activeImage} 
                    alt="Active Meal" 
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
                {allImages.slice(0, 4).map((img, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`aspect-square rounded-3xl overflow-hidden border-2 transition-all duration-300 active:scale-95 bg-slate-50 relative group ${
                            activeImage === img 
                            ? "border-orange-500 shadow-lg shadow-orange-100" 
                            : "border-gray-100 opacity-60 hover:opacity-100 hover:border-orange-200"
                        }`}
                    >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                        {activeImage === img && (
                            <div className="absolute inset-0 bg-orange-500/10 flex items-center justify-center">
                                <Star size={12} className="fill-orange-500 text-orange-500" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
