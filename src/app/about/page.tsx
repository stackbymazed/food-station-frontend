"use client";

import { CheckCircle2, Users, Utensils, Award } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 bg-orange-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-100/50 skew-x-12 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 animate-in slide-in-from-left duration-700">
                            <div>
                                <h4 className="text-orange-500 font-pacifico text-2xl mb-4">Our Story</h4>
                                <h1 className="text-6xl font-black text-slate-900 leading-tight">
                                    Crafting Culinary <br />
                                    <span className="text-orange-500 underline decoration-wavy decoration-orange-200 underline-offset-8">Experiences</span> Since 2010
                                </h1>
                            </div>
                            <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
                                FoodStation started with a simple mission: to connect food lovers with the best chefs in town. What began as a small kitchen project has now grown into a community of over 500+ premium providers.
                            </p>
                            <div className="flex gap-6 pt-4">
                                <div className="text-center">
                                    <p className="text-4xl font-black text-slate-900">12+</p>
                                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Years Exp</p>
                                </div>
                                <div className="w-px h-12 bg-slate-200"></div>
                                <div className="text-center">
                                    <p className="text-4xl font-black text-slate-900">50K+</p>
                                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Happy Clients</p>
                                </div>
                                <div className="w-px h-12 bg-slate-200"></div>
                                <div className="text-center">
                                    <p className="text-4xl font-black text-slate-900">500+</p>
                                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Master Chefs</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative animate-in zoom-in duration-1000">
                            <div className="rounded-[60px] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-[12px] border-white">
                                <img src="/images/beef-steaks.png" alt="Our Kitchen" className="w-full h-[500px] object-cover" />
                            </div>
                            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[40px] shadow-xl border border-orange-100 animate-bounce duration-[3000ms]">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                                        <Award size={32} />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900">Best Food App</p>
                                        <p className="text-xs text-slate-500">Awarded in 2023</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Our Core Values</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">We believe in quality, transparency, and the magic of a home-cooked meal shared with loved ones.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: CheckCircle2, title: "Fresh Ingredients", desc: "Every meal is crafted using only the freshest, locally sourced organic ingredients." },
                            { icon: Users, title: "Community First", desc: "We support local independent chefs and small kitchens to thrive in the digital age." },
                            { icon: Utensils, title: "Taste of Excellence", desc: "Our rigorous quality checks ensure every bite satisfies your culinary cravings." }
                        ].map((item, i) => (
                            <div key={i} className="group p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-orange-500 hover:border-orange-500 transition-all duration-500 hover:-translate-y-2">
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-orange-500 group-hover:text-orange-600 shadow-sm mb-8 transition-colors">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                                <p className="text-slate-500 group-hover:text-orange-50 transition-colors leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
