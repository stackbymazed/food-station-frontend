"use client";

import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, MessageSquare } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Split Screen Hero */}
            <div className="flex flex-col lg:flex-row min-h-[80vh]">
                {/* Left Side: Info */}
                <div className="lg:w-1/2 p-24 bg-orange-600 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32 rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-900/10 blur-3xl -ml-40 -mb-40 rounded-full"></div>

                    <div className="relative z-10 space-y-12">
                        <div className="space-y-4">
                            <h1 className="text-6xl font-black tracking-tighter leading-none">Get In <br /> Touch</h1>
                            <p className="text-orange-100 max-w-md font-medium text-lg leading-relaxed">
                                Questions about our menu or want to partner with us? Our team is available 24/7 to assist with your culinary needs.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {[
                                { icon: Mail, label: "Email Us", val: "support@foodstation.com" },
                                { icon: Phone, label: "Call Us", val: "+1 (800) 555-0199" },
                                { icon: MapPin, label: "Head Office", val: "125 Foodie Street, NY 10001" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-orange-600 transition-all duration-300 backdrop-blur-sm border border-white/20">
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-200 mb-1">{item.label}</p>
                                        <p className="text-xl font-bold">{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-12 flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <button key={i} className="w-12 h-12 bg-white/5 hover:bg-white hover:text-orange-600 rounded-xl flex items-center justify-center transition-all border border-white/10">
                                    <Icon size={20} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:w-1/2 p-24 bg-white flex flex-col justify-center">
                    <form className="max-w-xl mx-auto w-full space-y-10 group" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-orange-500 font-black text-sm uppercase tracking-widest">
                                <MessageSquare size={18} /> Send A Message
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Tell us about your next project or craving.</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border-none p-5 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-bold placeholder:text-slate-300 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border-none p-5 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-bold placeholder:text-slate-300 transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message Subject</label>
                            <select className="w-full bg-slate-50 border-none p-5 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-bold appearance-none cursor-pointer">
                                <option>General Inquiry</option>
                                <option>Order Support</option>
                                <option>Chef Partnership</option>
                                <option>Feature Request</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                            <textarea rows={6} placeholder="How can we help you?" className="w-full bg-slate-50 border-none p-5 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-bold placeholder:text-slate-300 resize-none transition-all"></textarea>
                        </div>

                        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white p-6 rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-orange-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                            <Send size={20} /> Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
