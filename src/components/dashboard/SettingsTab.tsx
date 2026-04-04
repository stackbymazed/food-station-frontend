"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { User, Settings, ShieldCheck, Mail, Save } from "lucide-react";

interface SettingsTabProps {
    user: any;
}

export default function SettingsTab({ user }: SettingsTabProps) {
    const [name, setName] = useState(user.name || "");
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateName = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            return toast.error("Name cannot be empty");
        }

        if (name === user.name) {
            return toast.info("No changes made");
        }

        setIsLoading(true);
        const loadingToast = toast.loading("Updating your name...");

        try {
            const { error } = await authClient.updateUser({
                name: name.trim(),
            });

            if (error) {
                toast.error(error.message, { id: loadingToast });
            } else {
                toast.success("Name updated successfully!", { id: loadingToast });
                // We don't need to manually refresh as authClient session handles state
            }
        } catch (err) {
            toast.error("An unexpected error occurred", { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-2xl">
            <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Account Settings</h2>
                <p className="text-slate-500 font-medium">Manage your personal profile and account security preferences.</p>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden p-10 lg:p-12 space-y-10 relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 blur-3xl -mr-24 -mt-24 rounded-full" />

                <section className="space-y-8 relative">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center font-black">
                            <User size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Public Profile</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Update your name</p>
                        </div>
                    </div>

                    <form onSubmit={handleUpdateName} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck size={14} className="text-orange-500" /> Display Name
                            </label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full h-16 px-6 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-bold text-slate-900 outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 opacity-60 grayscale cursor-not-allowed">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Mail size={14} /> Registered Email
                            </label>
                            <input
                                type="email"
                                value={user.email}
                                disabled
                                className="w-full h-16 px-6 rounded-2xl border border-slate-100 bg-slate-50 font-bold text-slate-400 outline-none"
                            />
                            <p className="text-[10px] text-slate-400 font-medium">Contact support to change your registered email address.</p>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-16 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
                            >
                                <Save size={18} /> {isLoading ? "Updating..." : "Save Profile Changes"}
                            </button>
                        </div>
                    </form>
                </section>

                <section className="pt-10 border-t border-slate-50 flex items-center justify-between text-slate-300">
                    <div className="flex items-center gap-2">
                        <Settings size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Version v1.2.0-stable</span>
                    </div>
                </section>
            </div>
        </div>
    );
}
