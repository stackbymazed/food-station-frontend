"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { TSortBy } from "@/services/mealService";

interface MealFilterProps {
    searchTerm: string;
    sortBy: string;
}

const SORT_OPTIONS: { value: TSortBy | ""; label: string }[] = [
    { value: "", label: "Default (Newest)" },
    { value: "priceLowToHigh", label: "Price: Low → High" },
    { value: "priceHighToLow", label: "Price: High → Low" },
    { value: "topRated", label: "⭐ Top Rated" },
];

export default function MealFilter({ searchTerm, sortBy }: MealFilterProps) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    function handleFilter(searchVal?: string, sortVal?: string) {
        const params = new URLSearchParams();
        
        // If values aren't passed, get them from current state/refs
        const finalSearch = searchVal !== undefined ? searchVal : (inputRef.current?.value || "");
        const finalSort = sortVal !== undefined ? sortVal : (formRef.current?.sortBy.value || "");

        if (finalSearch.trim()) params.set("searchTerm", finalSearch.trim());
        if (finalSort) params.set("sortBy", finalSort);
        params.set("page", "1");

        router.push(`/browse-meals?${params.toString()}`);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        handleFilter(data.get("searchTerm") as string, data.get("sortBy") as string);
    }

    function handleClear() {
        if (inputRef.current) inputRef.current.value = "";
        router.push("/browse-meals?page=1");
    }

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-4 shadow-md mb-10 flex flex-col md:flex-row gap-3 border border-gray-100"
        >
            {/* ── Search Input ─────────────────────── */}
            <div className="flex-1 relative">
                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={18}
                />
                <input
                    ref={inputRef}
                    name="searchTerm"
                    defaultValue={searchTerm}
                    placeholder="Search by name, category…"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
                />
                {searchTerm && (
                    <button
                        type="button"
                        onClick={handleClear}
                        title="Clear search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* ── Sort Dropdown ─────────────────────── */}
            <div className="relative flex items-center">
                <SlidersHorizontal
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                />
                <select
                    name="sortBy"
                    key={sortBy} // force re-render when sortBy prop changes
                    defaultValue={sortBy}
                    onChange={(e) => handleFilter(undefined, e.target.value)}
                    className="appearance-none pl-9 pr-8 py-3 bg-slate-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition cursor-pointer min-w-[200px]"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* ── Submit Button ─────────────────────── */}
            <button
                type="submit"
                className="flex items-center justify-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white rounded-xl font-semibold transition-all duration-200 shadow-sm"
            >
                <Search size={16} />
                Search
            </button>
        </form>
    );
}