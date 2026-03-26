"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userService } from "@/services/userService";
import { mealService, TMeal } from "@/services/mealService";
import MealCard from "@/components/layouts/MealCard";
import { MapPin, Star, Utensils, Loader2, ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ProviderDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [provider, setProvider] = useState<any>(null);
    const [meals, setMeals] = useState<TMeal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchProviderData();
    }, [id]);

    const fetchProviderData = async () => {
        setLoading(true);
        // We can use getAllUsers and find the one with this ID if there's no single user route
        const { data: users } = await userService.getAllUsers();
        const found = users.find((u: any) => u.id === id);
        setProvider(found);

        // Fetch meals for this provider
        // Assuming we update backend to filter by providerId or just filter here
        const { data: allMeals } = await mealService.getAllMeals({ limit: 100 });
        const providerMeals = allMeals.filter((m: any) => m.providerId === id);
        setMeals(providerMeals);
        
        setLoading(false);
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
        </div>
    );

    if (!provider) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
            <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Chef Not Found</h1>
            <p className="text-slate-500 mb-8">This culinary partner might have closed their kitchen or changed their name.</p>
            <button onClick={() => router.back()} className="flex items-center gap-2 font-black text-orange-500 hover:gap-3 transition-all">
                <ArrowLeft size={20} /> Back to Partners
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header / Banner */}
            <div className="h-[250px] bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10 pb-20">
                <div className="bg-white rounded-[48px] p-10 shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col md:flex-row gap-10 items-start mb-16">
                    <div className="w-40 h-40 rounded-[32px] bg-orange-100 flex items-center justify-center text-orange-600 font-black text-5xl uppercase shadow-inner shrink-0 scale-100 hover:scale-105 transition-transform duration-500">
                        {provider.name?.[0]}
                    </div>
                    
                    <div className="flex-1 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter">{provider.name}</h1>
                                    <ShieldCheck className="text-orange-500" size={32} />
                                </div>
                                <div className="flex items-center gap-4 text-slate-400 font-bold uppercase tracking-widest text-xs">
                                     <span className="flex items-center gap-1.5"><MapPin size={14} className="text-orange-500" /> Professional Provider</span>
                                     <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                     <span className="flex items-center gap-1.5"><Mail size={14} className="text-orange-500" /> {provider.email}</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Link href="/browse-meals" className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-[24px] font-black text-sm transition-all active:scale-[0.98]">
                                    Browse All
                                </Link>
                                <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-[24px] font-black text-sm transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98]">
                                    Follow Chef
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100/50">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Creations</p>
                                <p className="text-2xl font-black text-slate-900">{meals.length} Dishes</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100/50">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Satisfied Foodies</p>
                                <p className="text-2xl font-black text-slate-900">1.2k +</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100/50">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Chef Rating</p>
                                <p className="text-2xl font-black text-slate-900 flex items-center gap-2">4.9 <Star className="text-orange-500 fill-current" size={20} /></p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100/50">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Quick Delivery</p>
                                <p className="text-2xl font-black text-slate-900">25-35 min</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="flex items-center justify-between">
                         <div className="space-y-1">
                             <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                 <Utensils className="text-orange-500" /> Our Menu
                             </h2>
                             <p className="text-slate-400 font-medium">Signature dishes crafted with love and fresh ingredients.</p>
                         </div>
                    </div>

                    {meals.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {meals.map((meal) => (
                                <MealCard key={meal.id} food={meal} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[48px] border border-slate-100 shadow-sm">
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm italic">This chef is currently prepping some secret recipes...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
