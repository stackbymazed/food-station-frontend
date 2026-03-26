"use client";

import { Search, Bell } from "lucide-react";

interface DashboardHeaderProps {
    user: any;
    role: string;
}

export default function DashboardHeader({ user, role }: DashboardHeaderProps) {
    return (
        <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-8 lg:px-12 shrink-0">
            <div className="flex items-center gap-4 bg-slate-50 px-4 py-3 rounded-2xl w-96 border border-slate-200">
                <Search size={18} className="text-slate-400" />
                <input type="text" placeholder="Search for data, orders, meals..." className="bg-transparent outline-none text-sm w-full font-medium" />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-10 w-[1px] bg-slate-200 hidden md:block"></div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-black text-slate-900 leading-none mb-1">{user.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{role} Membership</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-black shadow-inner">
                        {user.name?.[0].toUpperCase()}
                    </div>
                </div>
            </div>
        </header>
    );
}
