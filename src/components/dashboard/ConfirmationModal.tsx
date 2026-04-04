"use client";

import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

interface ConfirmationModalProps {
    onCancel: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: "danger" | "warning" | "info" | "success";
}

export default function ConfirmationModal({
    onCancel,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "info"
}: ConfirmationModalProps) {

    const colors = {
        danger: {
            bg: "bg-red-50",
            icon: "text-red-500",
            btn: "bg-red-500 hover:bg-red-600 shadow-red-500/20",
            iconComp: AlertTriangle
        },
        warning: {
            bg: "bg-amber-50",
            icon: "text-amber-500",
            btn: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20",
            iconComp: AlertCircle
        },
        info: {
            bg: "bg-blue-50",
            icon: "text-blue-500",
            btn: "bg-orange-500 hover:bg-orange-600 shadow-orange-500/20",
            iconComp: AlertCircle
        },
        success: {
            bg: "bg-emerald-50",
            icon: "text-emerald-500",
            btn: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20",
            iconComp: CheckCircle2
        }
    };

    const config = colors[type];
    const Icon = config.iconComp;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 p-6">
            <div className="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
                <div className={`w-20 h-20 ${config.bg} ${config.icon} rounded-[32px] flex items-center justify-center mb-8 mx-auto shadow-sm`}>
                    <Icon size={40} />
                </div>

                <div className="text-center space-y-4 mb-10">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">{title}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed px-4">{message}</p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all active:scale-95 border border-slate-200/50"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] text-white shadow-xl active:scale-95 transition-all ${config.btn}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
