"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Users, ShoppingBag, Star, PlusCircle, Loader2, DollarSign, Utensils, ChevronRight } from "lucide-react";
import { Role } from "@/constants/role";
import { statsService } from "@/services/statsService";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';

interface OverviewTabProps {
    role: string;
    setActiveTab: (tab: string) => void;
    userId: string;
}

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function OverviewTab({ role, setActiveTab, userId }: OverviewTabProps) {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, [role, userId]);

    const fetchStats = async () => {
        setLoading(true);
        try {
            let res;
            if (role === Role.ADMIN) res = await statsService.getAdminStats();
            else if (role === Role.PROVIDER) res = await statsService.getProviderStats(userId);
            else res = await statsService.getUserStats(userId);

            if (res.success) setStats(res.data);
        } catch (err) {
            console.error("Failed to fetch stats", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Analytics...</p>
            </div>
        );
    }

    const adminMetrics = [
        { label: "Total Revenue", val: `$${stats?.totalRevenue?.toFixed(2) || "0.00"}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
        { label: "Total Users", val: stats?.totalUsers || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Total Orders", val: stats?.totalOrders || 0, icon: ShoppingBag, color: "text-orange-600", bg: "bg-orange-50" },
    ];

    const providerMetrics = [
        { label: "My Revenue", val: `$${stats?.providerRevenue?.toFixed(2) || "0.00"}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
        { label: "My Orders", val: stats?.providerOrdersCount || 0, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Active Meals", val: stats?.providerMealsCount || 0, icon: Utensils, color: "text-orange-600", bg: "bg-orange-50" },
    ];

    const userMetrics = [
        { label: "Total Spent", val: `$${stats?.totalSpent?.toFixed(2) || "0.00"}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
        { label: "My Orders", val: stats?.ordersCount || 0, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
    ];

    const currentMetrics = role === Role.ADMIN ? adminMetrics : role === Role.PROVIDER ? providerMetrics : userMetrics;
    const chartData = stats?.dailyRevenue || stats?.dailySpending || [];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter capitalize">{role} Dashboard</h2>
                    <p className="text-slate-500 font-medium">Welcome back! Here's what's happening with your account.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchStats} className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Refresh Data</button>
                    {(role === Role.ADMIN || role === Role.PROVIDER) && (
                        <button onClick={() => setActiveTab("add-meal")} className="px-6 py-3 bg-orange-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-2">
                            <PlusCircle size={14} /> New Meal
                        </button>
                    )}
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentMetrics.map((item, i) => (
                    <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/5 blur-3xl -mr-16 -mt-16 rounded-full" />
                        <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-[24px] flex items-center justify-center mb-8 shadow-sm`}>
                            <item.icon size={28} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 leading-none">{item.val}</h3>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Graph */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl space-y-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Performance Trends</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Revenue/Spending Over Time</p>
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px' }}
                                        labelStyle={{ fontWeight: 900, marginBottom: '5px' }}
                                    />
                                    <Area type="monotone" dataKey={role === 'user' ? 'spent' : 'revenue'} stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-100">
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No transaction data available for chart</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Side Content */}
                <div className="space-y-8">
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl space-y-8">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Activity</h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-orange-50 group-hover:text-orange-500 transition-all">
                                        <ShoppingBag size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black text-slate-900 mb-0.5">Order Ref #{i}842</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Processing</p>
                                    </div>
                                    <button className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400">
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 p-10 rounded-[40px] text-white space-y-6 relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl -mb-16 -mr-16 rounded-full" />
                        <Star className="text-orange-500 fill-orange-500" size={32} />
                        <div>
                            <h4 className="text-lg font-black tracking-tight">Premium Features</h4>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed">Upgrade to unlock advanced analytics and inventory management.</p>
                        </div>
                        <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-500 hover:text-white transition-all active:scale-95">Upgrade Pro</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
