"use client";

import { useEffect, useState } from "react";
import MealCard from "@/components/layouts/MealCard";
import { mealService, TMeal } from "@/services/mealService";

const CATEGORIES = [
  { label: "All Menu", value: "ALL" },
  { label: "Burger", value: "BURGER" },
  { label: "Chicken", value: "CHICKEN" },
  { label: "Pizza", value: "PIZZA" },
  { label: "Desserts", value: "DESSERTS" },
];

export default function PopularFoods() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [meals, setMeals] = useState<TMeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const { data } = await mealService.getAllMeals({
        category: activeCategory === "ALL" ? "" : activeCategory,
        limit: 4,
      });
      setMeals(data);
      setLoading(false);
    };
    fetchMeals();
  }, [activeCategory]);
  return (
    <section className="py-14 max-w-7xl mx-auto px-6">

      {/* Top Header Row mapping exact layout: Left Title, Right Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Left Aligned Titles */}
        <div className="text-left w-full md:w-auto">
          <div className="flex items-center gap-2 font-bold mb-2">
            <h4 className="text-orange-500 font-pacifico tracking-widest text-2xl">Food Menu</h4>
            {/* Small abstract leaf icon next to Food Menu */}
            <svg className="text-red-500 w-8 h-8 -mt-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22C12 22 17 18.5 17 14C17 11.2386 14.7614 9 12 9C9.23858 9 7 11.2386 7 14C7 18.5 12 22 12 22Z" />
              <path d="M12 9C12 6.23858 14.2386 4 17 4C19.7614 4 22 6.23858 22 9C22 9 17 12.5 12 9Z" />
              <path d="M2 9C2 6.23858 4.23858 4 7 4C9.76142 4 12 6.23858 12 9C12 9 7 12.5 2 9Z" />
              <path d="M4 14H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-4xl text-[#1e1b4b] font-extrabold tracking-tight">
            Popular Delicious Foods
          </h2>
        </div>

        {/* Right Aligned Tabs and Navigation Container */}
        <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
          {/* Main Tabs - Scrollable on mobile */}
          <div className="flex items-center gap-3 w-full justify-start md:justify-end overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-6 py-2.5 border border-orange-500 font-bold transition-all text-xs sm:text-sm rounded-full shrink-0 whitespace-nowrap active:scale-95 ${activeCategory === cat.value
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-100"
                  : "bg-white text-orange-500 hover:bg-orange-50"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Food Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-100 h-64 sm:h-96 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : meals.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-8">
          {meals.map((food, index) => (
            <MealCard key={food.id} index={index} food={food as any} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-slate-500 font-medium">
          No meals found in this category.
        </div>
      )}

    </section>
  );
}