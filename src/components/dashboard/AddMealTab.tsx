"use client";

import { useForm } from "react-hook-form";
import { 
    PlusCircle, 
    Type, 
    DollarSign, 
    Tag, 
    ImagePlus, 
    FileText 
} from "lucide-react";
import { toast } from "sonner";
import { mealService } from "@/services/mealService";

interface AddMealTabProps {
    session: any;
    setActiveTab: (tab: string) => void;
    fetchMeals: () => void;
}

export default function AddMealTab({ session, setActiveTab, fetchMeals }: AddMealTabProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<any>();

    const onSubmit = async (data: any) => {
        const loading = toast.loading("Cooking your new meal...");
        try {
            const finalData = {
                ...data,
                price: parseFloat(data.price),
                rating: 0,
                reviewCount: 0,
                slug: data.name.toLowerCase().replace(/ /g, "-") + "-" + Date.now().toString().slice(-4),
                providerId: session?.user?.id,
            };

            const res = await mealService.createMeal(finalData);
            if (res.success) {
                toast.success("Meal added to the menu!", { id: loading });
                reset();
                setActiveTab("all-meals");
                fetchMeals();
            } else {
                toast.error(res.error?.message || "Failed to add meal", { id: loading });
            }
        } catch (err) {
            toast.error("An error occurred while adding the meal", { id: loading });
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-4">
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Kitchen Creation</h2>
                <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">Design your next culinary masterpiece and share it with the world.</p>
            </div>

            <div className="bg-white rounded-[48px] p-12 shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-3xl -mr-32 -mt-32 rounded-full"></div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><Type size={12} /> Meal Masterpiece Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text" placeholder="e.g. Signature Beef Truffle Burger"
                            className={`w-full bg-slate-50 border p-5 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-900 placeholder:text-slate-300 ${errors.name ? 'border-red-500 bg-red-50/10' : 'border-slate-100'}`}
                        />
                        {errors.name && <p className="text-[10px] font-bold text-red-500 ml-2">{(errors.name as any).message}</p>}
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><DollarSign size={12} /> Price (USD)</label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-400">$</span>
                            <input
                                {...register("price", { required: "Price is required", min: { value: 0, message: "Price must be positive" } })}
                                type="number" step="0.01" placeholder="0.00"
                                className={`w-full bg-slate-50 border p-5 pl-10 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-900 placeholder:text-slate-300 ${errors.price ? 'border-red-500 bg-red-50/10' : 'border-slate-100'}`}
                            />
                        </div>
                        {errors.price && <p className="text-[10px] font-bold text-red-500 ml-2">{(errors.price as any).message}</p>}
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><Tag size={12} /> Category</label>
                        <select
                            {...register("category", { required: "Please select a category" })}
                            className={`w-full bg-slate-50 border p-5 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-900 appearance-none cursor-pointer ${errors.category ? 'border-red-500 bg-red-50/10' : 'border-slate-100'}`}
                        >
                            <option value="">Select Category</option>
                            <option value="BURGER">Burger</option>
                            <option value="CHICKEN">Chicken</option>
                            <option value="PIZZA">Pizza</option>
                            <option value="DESSERTS">Desserts</option>
                        </select>
                        {errors.category && <p className="text-[10px] font-bold text-red-500 ml-2">{(errors.category as any).message}</p>}
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><ImagePlus size={12} /> Hero Image URL</label>
                        <input
                            {...register("mainImage", { required: "Main image URL is required" })}
                            type="url" placeholder="https://unsplash.com/food-image.jpg"
                            className={`w-full bg-slate-50 border p-5 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-900 placeholder:text-slate-300 ${errors.mainImage ? 'border-red-500 bg-red-50/10' : 'border-slate-100'}`}
                        />
                        {errors.mainImage && <p className="text-[10px] font-bold text-red-500 ml-2">{(errors.mainImage as any).message}</p>}
                    </div>

                    <div className="md:col-span-2 space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><FileText size={12} /> Short Punchline</label>
                        <input
                            {...register("shortDescription")}
                            type="text" placeholder="One sentence that makes them hungry..."
                            className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                        />
                    </div>

                    <div className="md:col-span-2 space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><FileText size={12} /> Full Gastronomic Description</label>
                        <textarea
                            {...register("description", { required: "Full description is required" })}
                            rows={5} placeholder="Describe the flavors, textures, and love put into this dish..."
                            className={`w-full bg-slate-50 border p-5 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-900 placeholder:text-slate-300 resize-none ${errors.description ? 'border-red-500 bg-red-50/10' : 'border-slate-100'}`}
                        ></textarea>
                        {errors.description && <p className="text-[10px] font-bold text-red-500 ml-2">{(errors.description as any).message}</p>}
                    </div>

                    <div className="md:col-span-2 pt-6">
                        <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white p-6 rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-orange-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                            <PlusCircle size={22} /> Add to Menu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
