"use client";

import { AlertTriangle } from "lucide-react";

interface DeleteUserModalProps {
    onCancel: () => void;
    onDelete: () => void;
}

export default function DeleteUserModal({ onCancel, onDelete }: DeleteUserModalProps) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <AlertTriangle size={32} />
                </div>
                <h3 className="text-xl font-black text-center text-slate-900 mb-2">Delete User?</h3>
                <p className="text-slate-500 text-center text-sm mb-8 leading-relaxed">Are you sure you want to delete this user permanently? This action cannot be undone.</p>
                <div className="flex gap-4">
                    <button onClick={onCancel} className="flex-1 px-6 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">Cancel</button>
                    <button onClick={onDelete} className="flex-1 px-6 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 active:scale-95 transition-all">Delete</button>
                </div>
            </div>
        </div>
    );
}
