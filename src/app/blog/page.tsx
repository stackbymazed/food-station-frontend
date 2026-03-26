"use client";

import { Calendar, MessageCircle, ArrowRight, ArrowLeft, Search, TrendingUp, User, Tag } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
    const blogs = [
        {
            id: 1,
            title: "Exploring the Art of Gourmet Burgers",
            date: "March 15, 2024",
            author: "Chef Antonio Romano",
            category: "Cooking Tips",
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=800",
            desc: "Learn the secrets behind crafting the perfect gourmet burger, from meat selection to specialized sauces.",
            comments: 12
        },
        {
            id: 2,
            title: "The Rise of Plant-Based Fine Dining",
            date: "March 10, 2024",
            author: "Sarah Jenkins",
            category: "Food Trends",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
            desc: "How high-end restaurants are redefining vegetarian cuisine with innovative techniques and local produce.",
            comments: 8
        },
        {
            id: 3,
            title: "Traditional Spices: A Journey Through India",
            date: "March 05, 2024",
            author: "Raj Malholtra",
            category: "Gastronomy",
            image: "https://images.unsplash.com/photo-1596797038530-2c39fa80227e?auto=format&fit=crop&q=80&w=800",
            desc: "Discover the deep history and complex flavors of the spices that define diverse regional Indian dishes.",
            comments: 24
        },
        {
            id: 4,
            title: "Sustainable Seafood: Chefs' Commitment",
            date: "February 28, 2024",
            author: "Elena Fisher",
            category: "Sustainability",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
            desc: "Why choosing sustainable seafood is the future of our oceans and how kitchens are leading the change.",
            comments: 15
        },
        {
            id: 5,
            title: "Pastry Mastery: The French Technique",
            date: "February 20, 2024",
            author: "Jean-Pierre",
            category: "Bakery",
            image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
            desc: "A step-by-step exploration of the basic doughs and creams that form the foundation of French patisserie.",
            comments: 31
        },
        {
            id: 6,
            title: "Wine Pairing 101: Enhancing Flavors",
            date: "February 15, 2024",
            author: "Marcus Vinicius",
            category: "Wine & Spirits",
            image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
            desc: "Master the art of matching your favorite wines with the right ingredients for a superior dining experience.",
            comments: 19
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Minimal Header */}
            <section className="py-20 border-b border-slate-100 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                        <TrendingUp size={14} /> The FoodStation Blog
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Kitchen Conversations</h1>
                    <p className="text-slate-500 max-w-xl mx-auto font-medium">Insights, stories and recipes from the best culinary masters on our platform.</p>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-20">
                    {/* Main Content */}
                    <div className="flex-1 space-y-24">
                        <div className="grid md:grid-cols-2 gap-12">
                            {blogs.map((blog) => (
                                <div key={blog.id} className="group space-y-6">
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-slate-100 shadow-sm shadow-slate-100">
                                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                                        <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 border border-white shadow-sm">{blog.category}</div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-orange-500" /> {blog.date}</span>
                                            <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                            <span className="flex items-center gap-1.5"><MessageCircle size={14} className="text-orange-500" /> {blog.comments} Comments</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-orange-500 transition-colors leading-tight">{blog.title}</h3>
                                        <p className="text-slate-500 leading-relaxed font-medium line-clamp-2">{blog.desc}</p>
                                        <button className="text-orange-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">Read Article <ArrowRight size={14} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-4 pt-12 border-t border-slate-100">
                            <button className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-500 transition-all"><ArrowLeft size={18} /></button>
                            <div className="flex gap-2">
                                <button className="w-12 h-12 rounded-2xl bg-orange-500 text-white font-black">1</button>
                                <button className="w-12 h-12 rounded-2xl border border-slate-100 font-bold text-slate-500 hover:bg-slate-50 transition-all">2</button>
                                <button className="w-12 h-12 rounded-2xl border border-slate-100 font-bold text-slate-500 hover:bg-slate-50 transition-all">3</button>
                            </div>
                            <button className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-500 transition-all"><ArrowRight size={18} /></button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-80 space-y-16">
                        <div className="space-y-6">
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 underline decoration-orange-500 decoration-2 underline-offset-8 decoration-wavy">Search Blog</h4>
                            <div className="relative group">
                                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                                <input type="text" placeholder="Keywords..." className="w-full bg-slate-50 border-none p-5 pl-14 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-orange-500/10 text-slate-900 transition-all" />
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 underline decoration-orange-500 decoration-2 underline-offset-8 decoration-wavy">Trending Categories</h4>
                            <div className="flex flex-wrap gap-2">
                                {["Healthy Food", "Chef Specials", "Quick Recipes", "Restaurant Life", "Eco-Friendly Packaging", "Dessert Trends"].map((tag, i) => (
                                    <button key={i} className="px-4 py-2 bg-slate-50 hover:bg-orange-500 hover:text-white rounded-xl text-xs font-bold text-slate-500 transition-all flex items-center gap-2 border border-slate-100"><Tag size={12} /> {tag}</button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-[40px] p-10 text-center space-y-6 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="space-y-4 relative z-10">
                                <h4 className="text-white text-3xl font-black leading-tight">Join Our Masterclass</h4>
                                <p className="text-slate-400 text-sm font-medium">Get weekly recipes and cooking tips from Michelin star chefs.</p>
                                <button className="w-full py-4 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20">Subscribe Now</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}
