"use client";

import { TrendingUp, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { Role } from "@/constants/role";

interface UserManagementTabProps {
    users: any[];
    loadingUsers: boolean;
    fetchUsers: () => void;
    handleUpdateRole: (userId: string, role: string) => void;
    handleUpdateStatus: (userId: string, status: string) => void;
    setDeleteConfirm: (userId: string) => void;
}

export default function UserManagementTab({
    users,
    loadingUsers,
    fetchUsers,
    handleUpdateRole,
    handleUpdateStatus,
    setDeleteConfirm,
}: UserManagementTabProps) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">User Management</h2>
                    <p className="text-slate-500 font-medium">Manage user roles, account status, and permissions.</p>
                </div>
                <button
                    onClick={fetchUsers}
                    className={`p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all ${loadingUsers ? 'animate-spin' : ''}`}
                >
                    <TrendingUp size={20} className="text-slate-400" />
                </button>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden ring-1 ring-slate-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-[0.1em]">
                            <tr>
                                <th className="px-10 py-6">User</th>
                                <th className="px-10 py-6">Role</th>
                                <th className="px-10 py-6">Status</th>
                                <th className="px-10 py-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 font-medium">
                            {loadingUsers ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={4} className="px-10 py-8 bg-slate-50/30"></td>
                                    </tr>
                                ))
                            ) : users.length > 0 ? (
                                users.map((u) => (
                                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black">
                                                    {u.name?.[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900">{u.name}</p>
                                                    <p className="text-xs text-slate-400">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <select
                                                value={u.role || "user"}
                                                onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                                                className={`bg-slate-50 border-none outline-none ring-1 ring-slate-200 py-2 px-4 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer focus:ring-orange-500 transition-all ${u.role === Role.ADMIN ? "text-purple-600 ring-purple-100 bg-purple-50" :
                                                        u.role === Role.PROVIDER ? "text-blue-600 ring-blue-100 bg-blue-50" : "text-slate-600"
                                                    }`}
                                            >
                                                <option value="user">User</option>
                                                <option value="provider">Provider</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-3">
                                                {u.status === "active" ? <CheckCircle2 size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-400" />}
                                                <select
                                                    value={u.status || "active"}
                                                    onChange={(e) => handleUpdateStatus(u.id, e.target.value)}
                                                    className="bg-transparent border-none outline-none text-xs font-bold text-slate-600 cursor-pointer hover:text-orange-500 transition-colors"
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            <button
                                                onClick={() => setDeleteConfirm(u.id)}
                                                className="w-10 h-10 rounded-xl border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all flex items-center justify-center mx-auto"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-10 py-20 text-center text-slate-400 italic">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
