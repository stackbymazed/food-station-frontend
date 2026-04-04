"use client";

import { TrendingUp, Loader2, ShoppingBag, Calendar, CreditCard, ChevronRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { orderService } from "@/services/orderService";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

interface MyOrdersTabProps {
    myOrders: any[];
    loadingOrders: boolean;
    fetchMyOrders: () => void;
}

export default function MyOrdersTab({ myOrders, loadingOrders, fetchMyOrders }: MyOrdersTabProps) {
    const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

    const handleCancelOrder = async () => {
        if (!orderToDelete) return;
        const loading = toast.loading("Processing cancellation...");
        try {
            const res = await orderService.deleteOrder(orderToDelete);
            if (res.success) {
                toast.success("Order cancelled and removed", { id: loading });
                fetchMyOrders();
            } else {
                toast.error(res.message || "Failed to cancel", { id: loading });
            }
        } catch (err) {
            toast.error("Error occurred", { id: loading });
        } finally {
            setOrderToDelete(null);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {orderToDelete && (
                <ConfirmationModal
                    onCancel={() => setOrderToDelete(null)}
                    onConfirm={handleCancelOrder}
                    title="Cancel & Delete Order?"
                    message="Are you sure you want to cancel and remove this order from your account? This action cannot be undone."
                    confirmText="Yes, Delete Order"
                    type="danger"
                />
            )}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">My Orders</h2>
                    <p className="text-slate-500 font-medium">Track your delicious meals and past feasts.</p>
                </div>
                <button onClick={fetchMyOrders} className="p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-slate-400 hover:text-orange-500">
                    <TrendingUp size={20} />
                </button>
            </div>

            {loadingOrders ? (
                <div className="min-h-[400px] flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-6" />
                    <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">Retrieving Order History...</p>
                </div>
            ) : myOrders.length > 0 ? (
                <div className="grid grid-cols-1 gap-8">
                    {myOrders.map((order) => (
                        <div key={order.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-10 hover:shadow-xl transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-orange-500/10 transition-colors" />

                            <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
                                {/* Info */}
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="px-4 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-black tracking-widest uppercase">#{order.id.slice(-6)}</div>
                                        <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase ${order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-600' :
                                            order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                                            }`}>{order.status}</div>
                                    </div>

                                    <div className="flex flex-wrap gap-10">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ordered On</p>
                                            <div className="flex items-center gap-2 text-slate-900 font-bold">
                                                <Calendar size={16} className="text-orange-500" />
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Bill</p>
                                            <div className="flex items-center gap-2 text-slate-900 font-black text-xl">
                                                <CreditCard size={18} className="text-orange-500" />
                                                ${order.totalAmount.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="flex gap-4 overflow-x-auto pb-4 max-w-full lg:max-w-md">
                                    {order.items.map((item: any, i: number) => (
                                        <div key={i} className="w-20 h-20 rounded-[24px] bg-slate-50 border border-slate-100 p-1 shrink-0 group-hover:border-orange-200 transition-colors relative">
                                            <img src={item.meal.mainImage} alt="food" className="w-full h-full object-cover rounded-[20px]" />
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-600 text-white text-[10px] font-black flex items-center justify-center rounded-lg shadow-lg">x{item.quantity}</div>
                                        </div>
                                    ))}
                                </div>

                                {order.status !== 'DELIVERED' && (
                                    <button
                                        onClick={() => setOrderToDelete(order.id)}
                                        className="h-14 px-8 bg-red-50 text-red-500 font-black uppercase tracking-widest text-[10px] rounded-2xl border border-red-100 hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-sm"
                                    >
                                        {order.status === 'CANCELLED' ? 'Remove Order' : 'Cancel Order'}
                                    </button>
                                )}

                                <button className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-all active:scale-95">
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[40px] p-24 text-center border border-slate-100 shadow-sm space-y-8">
                    <div className="w-32 h-32 bg-slate-50 rounded-[48px] mx-auto flex items-center justify-center text-slate-200">
                        <ShoppingBag size={64} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">No Orders Yet</h3>
                        <p className="text-slate-500 max-w-xs mx-auto font-medium">Your hunger adventure hasn't started yet. Let's find something delicious!</p>
                    </div>
                    <Link href="/browse-meals" className="px-10 py-5 bg-orange-600 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] inline-block shadow-xl shadow-orange-500/20">Explore Menu</Link>
                </div>
            )}
        </div>
    );
}
