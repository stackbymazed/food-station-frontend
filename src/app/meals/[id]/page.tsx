import { mealService } from "@/services/mealService";
import { notFound } from "next/navigation";
import MealCard from "@/components/layouts/MealCard";
import MealOrderSection from "@/components/layouts/MealOrderSection";
import InteractiveGallery from "@/components/layouts/InteractiveGallery";
import ContentTabs from "@/components/layouts/ContentTabs";
import {
    Star,
    ChevronRight,
    Home,
    ChevronLeft,
    CheckCircle2,
    Calendar,
    Clock,
    Flame,
    Leaf
} from "lucide-react";
import Link from "next/link";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function MealDetailsPage({ params }: Props) {
    const { id } = await params;

    // Fetch meal details
    const { data: meal, error } = await mealService.getSingleMeal(Number(id));

    if (error || !meal) {
        notFound();
    }

    // Fetch related meals (limit 4)
    const { data: relatedMealsResponse } = await mealService.getAllMeals({
        limit: 4,
    });
    const relatedMeals = relatedMealsResponse || [];

    const formattedDate = new Date(meal.createdAt || Date.now()).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (
        <main className="bg-[#FAFAFA] min-h-screen font-outfit pb-32">
            {/* ── Immersive Banner Section ─────────────────────── */}
            <div className="relative h-[200px] md:h-[350px] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent z-10" />
                <img
                    src={meal.mainImage}
                    alt="Banner"
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-30"
                />

                <div className="relative z-20 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="h-[2px] w-8 bg-orange-500 rounded-full"></span>
                        <h4 className="text-orange-500 font-pacifico text-3xl tracking-wide">Menu Details</h4>
                        <span className="h-[2px] w-8 bg-orange-500 rounded-full"></span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-2xl">
                        {meal.name}
                    </h1>

                    <nav className="flex items-center justify-center gap-4 text-sm md:text-base font-bold text-white/70">
                        <Link href="/" className="flex items-center gap-2 hover:text-orange-500 transition-all duration-300">
                            <Home size={18} className="text-orange-500" /> Home
                        </Link>
                        <ChevronRight size={16} className="text-white/20" />
                        <span className="px-3 py-1 bg-white/10 rounded-lg text-orange-500 font-black">Details</span>
                    </nav>
                </div>
            </div>

            {/* ── Main Content Grid ─────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 -mt-16 md:-mt-24 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Left & Middle Area (8 columns) */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* 1. Main Details Overview Card */}
                        <div className="bg-white rounded-[40px] md:rounded-[50px] shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-gray-100/50 p-8 md:p-12 lg:p-14 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] -mr-32 -mt-32 rounded-full" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                                {/* Interactive Image Gallery */}
                                <InteractiveGallery mainImage={meal.mainImage} images={meal.images} />

                                {/* Essential Details */}
                                <div className="flex flex-col pt-4 relative z-10">
                                    <div className="flex flex-wrap items-center gap-4 mb-6">
                                        <div className="px-5 py-2 bg-orange-100/40 text-orange-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-orange-100 flex items-center gap-2">
                                            <Flame size={14} /> {meal.category}
                                        </div>
                                        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
                                            <Star size={14} className="fill-orange-500 text-orange-500" />
                                            <span className="text-sm font-black text-slate-800">{meal.rating.toFixed(1)}</span>
                                            <span className="text-xs text-slate-400 font-bold ml-1">({meal.reviewCount})</span>
                                        </div>
                                    </div>

                                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                                        {meal.name}
                                    </h2>

                                    <div className="flex items-baseline gap-4 mb-8">
                                        <span className="text-5xl font-black text-orange-600 tracking-tighter">
                                            ${meal.price.toFixed(2)}
                                        </span>
                                        {meal.discountPrice && (
                                            <span className="text-2xl text-slate-300 line-through font-bold">
                                                ${meal.discountPrice.toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-slate-500 leading-relaxed text-lg mb-10 font-medium italic border-l-4 border-orange-500 pl-6 bg-orange-50/20 py-4 rounded-r-3xl">
                                        "{meal.shortDescription || "Experience the authentic taste of our chef's special creation. Prepared with fresh, high-quality ingredients."}"
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mt-auto">
                                        <div className="bg-slate-50 p-4 rounded-[28px] border border-slate-100">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Preparation</span>
                                            <div className="flex items-center gap-2 text-slate-800 font-bold">
                                                <Clock size={16} className="text-orange-500" /> 15-20 Min
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-[28px] border border-slate-100">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Released On</span>
                                            <div className="flex items-center gap-2 text-slate-800 font-bold">
                                                <Calendar size={16} className="text-orange-500" /> {formattedDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Interactive Content Tabs (Description/Reviews) */}
                        <ContentTabs
                            description={meal.description || `Indulge in a masterpiece of culinary art. Our ${meal.name} is more than just a meal; it is a celebration of flavors crafted with the finest ingredients.`}
                            reviewCount={meal.reviewCount}
                        />

                        {/* 3. Additional Quality Indicators Grid */}
                        <div className="bg-white rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-100/50 p-10 md:p-14">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h4 className="text-sm font-black text-orange-500 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-4 bg-orange-600 rounded-full" />
                                        Key Selection
                                    </h4>
                                    <div className="grid grid-cols-1 gap-5">
                                        {[
                                            "Premium Quality Sourcing",
                                            "Signature Chef's Spices",
                                            "Fresh Locally Grown Greens",
                                            "Eco-friendly Packaging"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 group">
                                                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-orange-600 transition-all duration-300">
                                                    <CheckCircle2 size={18} className="text-orange-500 group-hover:text-white" />
                                                </div>
                                                <span className="text-base font-bold text-slate-800 tracking-tight">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-slate-900 rounded-[36px] p-8 text-white relative overflow-hidden group border border-white/5">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent" />
                                    <div className="flex items-center gap-4 mb-6 relative z-10">
                                        <div className="w-12 h-12 rounded-full border-2 border-orange-500 flex items-center justify-center bg-orange-500/10">
                                            <Star className="fill-orange-500 text-orange-500" size={24} />
                                        </div>
                                        <h4 className="text-lg font-black italic font-pacifico text-orange-500">Chef's Choice</h4>
                                    </div>
                                    <p className="text-white/70 italic text-lg leading-relaxed mb-6 group-hover:text-white transition-colors relative z-10">
                                        "A perfect balance of heat, zest, and crunch that defines our craft."
                                    </p>
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                        <span className="text-xs uppercase font-black tracking-[0.2em] text-orange-500">Master Kitchen</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sticky Sidebar (4 columns) */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
                        <div className="bg-white rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.05)] border border-gray-100 p-10 overflow-hidden relative group">
                            <div className="absolute top-0 left-0 w-2 h-full bg-orange-600 transition-all duration-500 group-hover:w-4" />
                            <div className="flex items-center gap-3 mb-10">
                                <Link
                                    href="/browse-meals"
                                    className="w-12 h-12 bg-slate-50 text-slate-400 rounded-[18px] flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
                                >
                                    <ChevronLeft size={24} />
                                </Link>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Place Order</h3>
                            </div>

                            <MealOrderSection meal={meal} />

                            <div className="mt-12 flex items-center gap-6 p-6 bg-[#FAFAFA] rounded-[30px] border border-slate-100">
                                <div className="w-14 h-14 bg-emerald-100/50 text-emerald-600 rounded-2xl flex items-center justify-center">
                                    <Leaf size={28} />
                                </div>
                                <div className="space-y-1">
                                    <h5 className="text-sm font-black text-slate-800 tracking-tight">Healthy Choice</h5>
                                    <p className="text-xs text-slate-400 font-bold leading-tight">Prepared with zero trans-fats & organic produce.</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Summary Reference */}
                        <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-600/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700" />
                            <h4 className="text-xl font-black mb-6 flex items-center gap-3">
                                <Star className="fill-orange-500 text-orange-500" size={20} />
                                Quick Overview
                            </h4>
                            <div className="space-y-5">
                                {[
                                    { label: "Category", val: meal.category },
                                    { label: "Servings", val: "1 Person" },
                                    { label: "Best For", val: "Lunch/Dinner" },
                                    { label: "Origin", val: "Chef's Special" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                                        <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                                        <span className="text-sm font-bold text-white/90">{item.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Related Items Section */}
                <div className="mt-40">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl animate-in fade-in slide-in-from-left duration-700">
                            <div className="flex items-center gap-2 font-bold mb-4">
                                <h4 className="text-orange-500 font-pacifico tracking-widest text-2xl">Gastronomy</h4>
                            </div>
                            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1]">
                                Explore More <span className="text-orange-500">Specialties</span>
                            </h3>
                        </div>
                        <Link
                            href="/browse-meals"
                            className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-3"
                        >
                            View Entire Menu <ChevronRight size={16} className="text-orange-500" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedMeals.map((m, idx) => (
                            <MealCard
                                key={m.id}
                                index={idx}
                                food={{
                                    id: m.id,
                                    name: m.name,
                                    mainImage: m.mainImage || "/placeholder.png",
                                    category: m.category,
                                    rating: m.rating,
                                    reviewCount: m.reviewCount,
                                    price: m.price,
                                    discountPrice: m.discountPrice
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
