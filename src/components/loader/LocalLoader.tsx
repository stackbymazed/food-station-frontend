"use client";

import { Loader2 } from "lucide-react";

interface LocalLoaderProps {
    message?: string;
    variant?: 'orange' | 'slate' | 'white';
}

export default function LocalLoader({ message = "Fetching data...", variant = 'orange' }: LocalLoaderProps) {
    const colors = {
        orange: 'text-orange-500 border-orange-500',
        slate: 'text-slate-900 border-slate-900',
        white: 'text-white border-white'
    };

    return (
        <div className="flex flex-col items-center justify-center p-12 min-h-[300px] w-full animate-in fade-in duration-300">
            <div className="relative group">
                {/* Glow ring */}
                <div className={`absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full ${variant === 'orange' ? 'bg-orange-500' : 'bg-slate-900'}`} />

                {/* Spinner */}
                <div className={`w-12 h-12 border-4 rounded-full border-t-transparent animate-spin ${colors[variant as keyof typeof colors]}`} />

                {/* Icon */}
                <Loader2
                    className={`absolute inset-0 m-auto animate-pulse ${variant === 'orange' ? 'text-orange-600' : 'text-slate-700'}`}
                    size={16}
                />
            </div>

            {message && (
                <p className={`mt-6 text-[11px] font-black uppercase tracking-[0.2em] animate-pulse ${variant === 'orange' ? 'text-orange-500' : 'text-slate-400'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}
