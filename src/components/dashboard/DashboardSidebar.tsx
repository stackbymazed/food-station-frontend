"use client";

import { LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface DashboardSidebarProps {
    sidebarLinks: any[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function DashboardSidebar({ sidebarLinks, activeTab, setActiveTab }: DashboardSidebarProps) {
    const router = useRouter();

    return (
        <aside className="w-72 bg-[#1e293b] text-slate-300 hidden lg:flex flex-col sticky top-0 h-screen">
            <div className="p-8 mb-4">
                <Link href="/" className="text-2xl font-black text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30">FS</div>
                    FoodStation
                </Link>
            </div>

            <div className="px-6 mb-4">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 px-4 mb-4">Main Menu</p>
                <nav className="space-y-1.5 font-bold">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = activeTab === link.id;

                        return link.href ? (
                            <Link
                                key={link.id}
                                href={link.href}
                                className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-slate-800 hover:text-white transition-all text-sm group"
                            >
                                <Icon size={18} className="text-slate-500 group-hover:text-orange-500 transition-colors" />
                                {link.label}
                                <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        ) : (
                            <button
                                key={link.id}
                                onClick={() => setActiveTab(link.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-sm group ${isActive
                                        ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20"
                                        : "hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                <Icon size={18} className={`${isActive ? "text-white" : "text-slate-500 group-hover:text-orange-500"} transition-colors`} />
                                {link.label}
                            </button>
                        );
                    })}

                    <button
                        onClick={async () => { await authClient.signOut(); router.push("/login"); }}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-sm font-bold text-red-400 hover:bg-red-500/10 group mt-4 border border-red-500/20"
                    >
                        <LogOut size={18} className="text-red-500" />
                        Sign Out
                    </button>
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-slate-800">
                <div className="bg-slate-800/50 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Server Status: Live</p>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[85%] rounded-full"></div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
