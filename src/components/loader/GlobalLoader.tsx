"use client";

import { Loader2 } from "lucide-react";

export default function GlobalLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md animate-in fade-in duration-500">
            <div className="relative">
                {/* Brand Glow */}
                <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full animate-pulse" />

                {/* Spinning Rings */}
                <div className="relative flex items-center justify-center">
                    <div className="w-24 h-24 border-t-4 border-orange-500 border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin" />
                    <div className="absolute w-16 h-16 border-b-4 border-slate-900 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin [animation-duration:1.5s] [animation-direction:reverse]" />

                    <div className="absolute flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase tracking-[3px] text-orange-500 mb-0.5 ml-1">Food</span>
                        <span className="text-[8px] font-black uppercase tracking-[2px] text-slate-900 ml-0.5">Station</span>
                    </div>
                </div>
            </div>

            <p className="mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">
                Prearing your experience...
            </p>
        </div>
    );
}
