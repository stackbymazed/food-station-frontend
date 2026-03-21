"use client";

import { useState } from "react";

interface Props {
    description: string;
    reviewCount: number;
}

export default function ContentTabs({ description, reviewCount }: Props) {
    const [activeTab, setActiveTab] = useState("description");

    return (
        <div className="bg-white rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-100/50 p-10 md:p-14">
            <div className="flex items-center gap-12 border-b border-slate-100 mb-12">
                <button 
                    onClick={() => setActiveTab("description")}
                    className="pb-6 relative group"
                >
                    <span className={`text-xl font-black block pb-2 tracking-tight transition-colors ${activeTab === 'description' ? 'text-slate-900' : 'text-slate-300'}`}>
                        Full Story
                    </span>
                    <div className={`h-[3px] w-full bg-orange-600 rounded-full transition-transform origin-left ${activeTab === 'description' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
                </button>
                <button 
                    onClick={() => setActiveTab("reviews")}
                    className="pb-6 relative group"
                >
                    <span className={`text-xl font-bold block pb-2 tracking-tight transition-colors ${activeTab === 'reviews' ? 'text-slate-900' : 'text-slate-300'}`}>
                        Customer Voices ({reviewCount})
                    </span>
                    <div className={`h-[3px] w-full bg-orange-600 rounded-full transition-transform origin-left ${activeTab === 'reviews' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
                </button>
            </div>

            <div className="space-y-12 max-w-4xl min-h-[300px] animate-in fade-in duration-500">
                {activeTab === "description" ? (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-slate-900">Crafting The Taste</h3>
                        <p className="text-slate-500 leading-[2] text-xl font-medium">
                            {description}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[300px] bg-slate-50/50 rounded-[40px] border border-dashed border-slate-200">
                        <div className="text-6xl mb-6">📝</div>
                        <h4 className="text-xl font-black text-slate-900 mb-2">No reviews yet</h4>
                        <p className="text-slate-400 font-bold">Be the first one to share your feedback!</p>
                        <button className="mt-8 px-8 py-3 bg-slate-900 text-white font-black rounded-2xl hover:bg-orange-600 transition-colors duration-300">
                            Write a Review
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
