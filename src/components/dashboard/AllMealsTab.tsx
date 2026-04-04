"use client";

import { PlusCircle, Utensils, ChevronRight } from "lucide-react";
import Link from "next/link";
import MealCard from "@/components/layouts/MealCard";
import { TMeal } from "@/services/mealService";
import LocalLoader from "../loader/LocalLoader";

interface AllMealsTabProps {
    meals: TMeal[];
    loadingMeals: boolean;
    setActiveTab: (tab: string) => void;
}

export default function AllMealsTab({ meals, loadingMeals, setActiveTab }: AllMealsTabProps) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">All Delicious Meals</h2>
                    <p className="text-slate-500 font-medium">Explore and manage all the amazing dishes available in FoodStation.</p>
                </div>
                <button
                    onClick={() => setActiveTab("add-meal")}
                    className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-orange-600 shadow-xl shadow-orange-500/20 active:scale-95 transition-all"
                >
                    <PlusCircle size={18} /> Add New Meal
                </button>
            </div>

            {loadingMeals ? (
                <LocalLoader
                    message="Cooking up the best recipes..."
                    variant="orange"
                />
            ) : meals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                    {meals.map((meal) => (
                        <MealCard key={meal.id} food={meal} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[40px] p-20 text-center border border-slate-100 shadow-sm">
                    <Utensils size={64} className="mx-auto text-slate-200 mb-6" />
                    <h3 className="text-2xl font-black text-slate-900 mb-2">No Meals Found</h3>
                    <p className="text-slate-500 mb-8">It looks like the kitchen is empty. Start adding some delicious food!</p>
                    <button
                        onClick={() => setActiveTab("add-meal")}
                        className="text-orange-500 font-black flex items-center gap-2 justify-center hover:gap-3 transition-all"
                    >
                        Get Started <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}
