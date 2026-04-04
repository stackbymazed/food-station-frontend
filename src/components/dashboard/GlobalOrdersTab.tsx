"use client";

import { TrendingUp } from "lucide-react";
import LocalLoader from "../loader/LocalLoader";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

interface GlobalOrdersTabProps {
    allOrders: any[];
    loadingOrders: boolean;
    fetchAllOrders: () => void;
    handleUpdateOrderStatus: (orderId: string, status: string) => void;
    role: string;
}

export default function GlobalOrdersTab({
    allOrders,
    loadingOrders,
    fetchAllOrders,
    handleUpdateOrderStatus,
    role
}: GlobalOrdersTabProps) {
    const [confirmUpdate, setConfirmUpdate] = useState<{ id: string, status: string } | null>(null);

    const onConfirmStatusUpdate = () => {
        if (confirmUpdate) {
            handleUpdateOrderStatus(confirmUpdate.id, confirmUpdate.status);
            setConfirmUpdate(null);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {confirmUpdate && (
                <ConfirmationModal
                    onCancel={() => setConfirmUpdate(null)}
                    onConfirm={onConfirmStatusUpdate}
                    title="Change Order Status?"
                    message={`Are you sure you want to change this order status to ${confirmUpdate.status}? This will notify the customer.`}
                    confirmText="Update Status"
                    type="warning"
                />
            )}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Global Orders</h2>
                    <p className="text-slate-500 font-medium">Monitoring all customer feasts and food trafficking.</p>
                </div>
                <button onClick={fetchAllOrders} className="p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-slate-400">
                    <TrendingUp size={20} />
                </button>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        <tr>
                            <th className="px-10 py-8">Customer</th>
                            <th className="px-10 py-8">Order ID</th>
                            <th className="px-10 py-8">Status</th>
                            <th className="px-10 py-8">Items</th>
                            <th className="px-10 py-8 text-right">Revenue</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loadingOrders ? (
                            <tr><td colSpan={5}><LocalLoader message="Syncing global orders..." variant="slate" /></td></tr>
                        ) : allOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xs">{order.user.name[0]}</div>
                                        <div>
                                            <p className="font-black text-slate-900 text-sm leading-none mb-1">{order.user.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold">{order.user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-8 font-bold text-slate-500 text-xs">#{order.id.slice(-8)}</td>
                                <td className="px-10 py-8 text-center">
                                    {(role === 'admin' || role === 'provider') ? (
                                        <select
                                            value={order.status}
                                            onChange={(e) => setConfirmUpdate({ id: order.id, status: e.target.value })}
                                            className={`border text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl cursor-pointer transition-all outline-none shadow-sm
                                                ${order.status === 'DELIVERED' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
                                                    order.status === 'CANCELLED' ? 'bg-red-50 border-red-200 text-red-600' :
                                                        order.status === 'ACCEPTED' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' :
                                                            order.status === 'PROCESSING' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                                                                'bg-orange-50 border-orange-200 text-orange-600'
                                                }`}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="PROCESSING">Processing</option>
                                            <option value="ACCEPTED">Accepted</option>
                                            <option value="DELIVERED">Delivered</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>
                                    ) : (
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase ${order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-600' :
                                            order.status === 'CANCELLED' ? 'bg-red-100 text-red-600' :
                                                order.status === 'ACCEPTED' ? 'bg-indigo-100 text-indigo-600' :
                                                    order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-600' :
                                                        'bg-orange-100 text-orange-600'
                                            }`}>{order.status}</span>
                                    )}
                                </td>
                                <td className="px-10 py-8">
                                    <div className="flex -space-x-3">
                                        {order.items.slice(0, 3).map((item: any, i: number) => (
                                            <div key={i} className="w-10 h-10 rounded-xl border-2 border-white overflow-hidden shadow-sm">
                                                <img src={item.meal.mainImage} alt="meal" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                        {order.items.length > 3 && (
                                            <div className="w-10 h-10 rounded-xl border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">+{order.items.length - 3}</div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-10 py-8 text-right font-black text-slate-900 text-lg">${order.totalAmount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
