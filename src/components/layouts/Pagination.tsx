import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    page: number;
    totalPage: number;
    searchTerm?: string;
    sortBy?: string;
}

export default function Pagination({
    page,
    totalPage,
    searchTerm = "",
    sortBy = "",
}: PaginationProps) {

    // Don't render if only 1 page
    if (totalPage <= 1) return null;

    /** Build URL for a specific page while preserving filters */
    function buildHref(p: number): string {
        const params = new URLSearchParams();
        params.set("page", String(p));
        if (searchTerm) params.set("searchTerm", searchTerm);
        if (sortBy) params.set("sortBy", sortBy);
        return `/browse-meals?${params.toString()}`;
    }

    /**
     * Smart page-number list:
     * Always show: 1, last, and current ±2
     * Insert "..." gaps where needed
     */
    function getPageList(): (number | "...")[] {
        const range: (number | "...")[] = [];
        let prev: number | null = null;

        for (let i = 1; i <= totalPage; i++) {
            const show =
                i === 1 ||
                i === totalPage ||
                (i >= page - 2 && i <= page + 2);

            if (show) {
                if (prev !== null && i - prev > 1) {
                    range.push("...");
                }
                range.push(i);
                prev = i;
            }
        }

        return range;
    }

    const pageList = getPageList();

    const baseBtn =
        "flex items-center gap-1 px-4 py-2 rounded-xl border font-medium transition-all duration-200 text-sm";

    return (
        <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">

            {/* ── Prev ─────────────────────── */}
            {page > 1 ? (
                <Link
                    href={buildHref(page - 1)}
                    className={`${baseBtn} bg-white border-gray-200 text-gray-600 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600 shadow-sm`}
                >
                    <ChevronLeft size={16} /> Prev
                </Link>
            ) : (
                <span className={`${baseBtn} bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed`}>
                    <ChevronLeft size={16} /> Prev
                </span>
            )}

            {/* ── Page Numbers ─────────────── */}
            {pageList.map((p, idx) =>
                p === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 select-none">
                        …
                    </span>
                ) : (
                    <Link
                        key={p}
                        href={buildHref(p)}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl font-semibold text-sm border transition-all duration-200 shadow-sm ${
                            page === p
                                ? "bg-orange-500 text-white border-orange-500 scale-110 shadow-md shadow-orange-200"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600"
                        }`}
                    >
                        {p}
                    </Link>
                )
            )}

            {/* ── Next ─────────────────────── */}
            {page < totalPage ? (
                <Link
                    href={buildHref(page + 1)}
                    className={`${baseBtn} bg-white border-gray-200 text-gray-600 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600 shadow-sm`}
                >
                    Next <ChevronRight size={16} />
                </Link>
            ) : (
                <span className={`${baseBtn} bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed`}>
                    Next <ChevronRight size={16} />
                </span>
            )}
        </div>
    );
}