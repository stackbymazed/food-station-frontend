"use client";

import { TrendingUp, Users, ShoppingBag, Star, PlusCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Role } from "@/constants/role";

interface OverviewTabProps {
    role: string;
    setActiveTab: (tab: string) => void;
}

export default function OverviewTab({ role, setActiveTab }: OverviewTabProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Overview Tab Content */}
            <div className="lg:col-span-2 space-y-12">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">System Overview</h2>
                        <p className="text-slate-500 font-medium">Monitoring real-time performance and metrics.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 shadow-sm">Monthly</button>
                        <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-black/10">Weekly</button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { label: "Gross Revenue", val: "$24,580.00", change: "+12.5%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
                        { label: "New Customers", val: "1,240", change: "+8.2%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Active Orders", val: "842", change: "+24.1%", icon: ShoppingBag, color: "text-orange-600", bg: "bg-orange-50" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                                <item.icon size={24} />
                            </div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
                            <div className="flex items-end gap-3">
                                <h3 className="text-2xl font-black text-slate-900 leading-none">{item.val}</h3>
                                <span className={`text-[10px] font-black ${item.color} mb-1`}>{item.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-xl font-black text-slate-900">Recent Transactions</h3>
                        <button onClick={() => setActiveTab(role === Role.ADMIN ? "all-orders" : "orders")} className="text-orange-500 font-bold text-sm hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                <tr>
                                    <th className="px-8 py-4">Transaction ID</th>
                                    <th className="px-8 py-4">Customer</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[1, 2, 3].map((idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5 text-sm font-bold text-slate-900">#ORD-942{idx}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black">JS</div>
                                                <span className="text-sm font-bold text-slate-700">John Smith</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-black rounded-full uppercase tracking-tighter">Completed</span>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-black text-slate-900">$124.50</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-12">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black mb-4">Launch New Meal</h3>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">Expand your menu and reach thousands of customers in minutes.</p>
                        <button onClick={() => setActiveTab("add-meal")} className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-sm inline-flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg active:scale-95">
                            <PlusCircle size={18} /> Add Meal
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                    <h2 className="text-lg font-black text-slate-900 mb-8 flex items-center justify-between">Top Rated Foods <Star size={16} className="text-orange-500 fill-orange-500" /></h2>
                    <div className="space-y-6">
                        {[
                            { name: "Spicy Beef Burger", cat: "Burger", price: "$45", sales: 124 },
                            { name: "Cheese Pizza Large", cat: "Pizza", price: "$65", sales: 98 },
                        ].map((food, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-slate-100 rounded-2xl shrink-0"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-900 leading-none mb-1">{food.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{food.cat}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-slate-900">{food.price}</p>
                                    <p className="text-[10px] text-green-500 font-bold">{food.sales} sold</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
