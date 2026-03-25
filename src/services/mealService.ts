import { env } from "@/env";

const BASE_URL = env.NEXT_PUBLIC_API_URL;

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface TMeta {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
}

export interface TMeal {
    id: number;
    name: string;
    slug: string;
    category: "BURGER" | "CHICKEN" | "PIZZA" | "DESSERTS";
    price: number;
    discountPrice?: number;
    rating: number;
    reviewCount: number;
    shortDescription?: string;
    description?: string;
    mainImage?: string;
    options?: TMealOption[];
    images?: TMealImage[];
    createdAt: string;
}

export interface TMealOption {
    id: number;
    mealId: number;
    type: "size" | "addon";
    name: string;
    price: number;
}

export interface TMealImage {
    id: number;
    mealId: number;
    image: string;
}

export type TSortBy = "priceLowToHigh" | "priceHighToLow" | "topRated" | "newest" | "";

export interface GetAllMealsParams {
    searchTerm?: string;
    sortBy?: TSortBy | string;
    page?: string | number;
    limit?: string | number;
}

// ─────────────────────────────────────────────
// Meal Service
// ─────────────────────────────────────────────
export const mealService = {

    /**
     * GET /meal
     * Fetch paginated list of meals with optional search + sort
     */
    getAllMeals: async function (
        params: GetAllMealsParams = {}
    ): Promise<{ data: TMeal[]; meta: TMeta; error: any }> {

        const searchTerm = params.searchTerm || "";
        const sortBy = params.sortBy || "";
        const page = params.page || "1";
        const limit = params.limit || "8";

        const query = new URLSearchParams();
        if (searchTerm.trim()) query.set("searchTerm", searchTerm.trim());
        if (sortBy) query.set("sortBy", sortBy);
        query.set("page", String(page));
        query.set("limit", String(limit));

        try {
            const res = await fetch(`${BASE_URL}/meal?${query.toString()}`, {
                method: "GET",
                cache: "no-store",
            });

            // if (!res.ok) {
            //     const errorData = await res.json();

            // }

            const result = await res.json();

            return {
                data: result.data ?? [],
                meta: result.meta ?? { total: 0, page: 1, limit: 8, totalPage: 0 },
                error: null,
            };
        } catch (err) {
            console.error("[mealService.getAllMeals]", err);
            return {
                data: [],
                meta: { total: 0, page: 1, limit: 8, totalPage: 0 },
                error: { message: "Something went wrong" },
            };
        }
    },

    /**
     * GET /meal/:id
     * Fetch a single meal by ID
     */
    getSingleMeal: async function (
        id: number
    ): Promise<{ data: TMeal | null; error: any }> {
        try {
            const res = await fetch(`${BASE_URL}/meal/${id}`, {
                method: "GET",
                cache: "no-store",
            });

            if (!res.ok) throw new Error("Meal not found");

            const result = await res.json();

            return { data: result.data, error: null };
        } catch (err) {
            console.error("[mealService.getSingleMeal]", err);
            return { data: null, error: { message: "Something went wrong" } };
        }
    },
};