import MealCard from "@/components/layouts/MealCard";
import MealFilter from "@/components/layouts/MealFilter";
import Pagination from "@/components/layouts/Pagination";
import { mealService, TMeal } from "@/services/mealService";
import { CloudCog, UtensilsCrossed } from "lucide-react";

interface BrowseMealsSearchParams {
    searchTerm?: string;
    sortBy?: string;
    page?: string;
}

export default async function BrowseMealsPage({
    searchParams,
}: {
    searchParams: Promise<BrowseMealsSearchParams>;
}) {
    const params = await searchParams;
    const searchTerm = params.searchTerm ?? "";
    const sortBy = params.sortBy ?? "";
    const page = params.page ?? "1";

    const { data: meals, meta } = await mealService.getAllMeals({
        searchTerm,
        sortBy,
        page,
        limit: 8,
    });
    console.log(meals)
    const totalPage = meta?.totalPage ?? 1;
    const total = meta?.total ?? 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-10">

                {/* ── Page Header ─────────────────────────── */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Browse Meals
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {total > 0 ? (
                            <>
                                Showing{" "}
                                <span className="font-semibold text-gray-700">{meals.length}</span>{" "}
                                of{" "}
                                <span className="font-semibold text-gray-700">{total}</span> meals
                                {searchTerm && (
                                    <>
                                        {" "}for{" "}
                                        <span className="font-semibold text-orange-500">
                                            &ldquo;{searchTerm}&rdquo;
                                        </span>
                                    </>
                                )}
                            </>
                        ) : (
                            "No meals found"
                        )}
                    </p>
                </div>

                {/* ── Filter Bar ──────────────────────────── */}
                <MealFilter searchTerm={searchTerm} sortBy={sortBy} />

                {/* ── Meal Grid ───────────────────────────── */}
                {meals.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {meals.map((meal: TMeal) => (
                            <MealCard key={meal.id} food={meal} />
                        ))}
                    </div>
                ) : (
                    /* ── Empty State ──────────────────────── */
                    <div className="flex flex-col items-center justify-center py-28 text-center">
                        <UtensilsCrossed className="text-orange-200 mb-5" size={72} />
                        <h2 className="text-xl font-semibold text-gray-500 mb-2">
                            No meals found
                        </h2>
                        <p className="text-gray-400 text-sm max-w-xs">
                            Try different keywords or remove the sort filter to explore
                            all available meals.
                        </p>
                    </div>
                )}

                {/* ── Pagination ──────────────────────────── */}
                <Pagination
                    page={Number(page)}
                    totalPage={totalPage}
                    searchTerm={searchTerm}
                    sortBy={sortBy}
                />

            </div>
        </div>
    );
}