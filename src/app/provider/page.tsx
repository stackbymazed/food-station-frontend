"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/userService";
import { User, MapPin, Star, Utensils, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProviderPage() {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    setLoading(true);
    const { data } = await userService.getProviders();
    setProviders(data || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1556910103-1c02745aee4c?q=80&w=2070&auto=format&fit=crop" alt="kitchen" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="relative z-10 text-center space-y-6 px-6">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-xs font-black uppercase tracking-widest backdrop-blur-md">
              <Star size={14} className="fill-orange-500" /> Premium Partners
           </div>
           <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
              Our Culinary <span className="text-orange-500 text-shadow-glow">Partners</span>
           </h1>
           <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
              Meet the amazing chefs and kitchens that bring delicious, high-quality meals straight to your doorstep.
           </p>
        </div>
      </section>

      {/* Providers Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Partners...</p>
          </div>
        ) : providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {providers.map((p) => (
              <div key={p.id} className="group bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-orange-500/10 transition-colors" />
                
                <div className="flex items-center gap-6 mb-8 relative z-10">
                   <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-3xl shadow-inner group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors uppercase">
                      {p.name?.[0]}
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight mb-1">{p.name}</h3>
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                         <MapPin size={14} className="text-orange-500" /> Professional Provider
                      </div>
                   </div>
                </div>

                <div className="space-y-4 mb-8 relative z-10">
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group-hover:bg-orange-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                         <Utensils size={18} className="text-slate-400 group-hover:text-orange-500" />
                         <span className="text-sm font-bold text-slate-600">Specialty</span>
                      </div>
                      <span className="text-xs font-black text-slate-900 uppercase">Premium Cuisines</span>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group-hover:bg-orange-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                         <Star size={18} className="text-slate-400 group-hover:text-orange-500 fill-current" />
                         <span className="text-sm font-bold text-slate-600">Rating</span>
                      </div>
                      <span className="text-xs font-black text-slate-900 uppercase">4.9 (High Score)</span>
                   </div>
                </div>

                <Link href={`/browse-meals?provider=${p.id}`} className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]">
                   View Menu <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-20 text-center border border-slate-100 shadow-sm max-w-2xl mx-auto">
             <User size={64} className="mx-auto text-slate-200 mb-6" />
             <h3 className="text-2xl font-black text-slate-900 mb-2">No Providers Yet</h3>
             <p className="text-slate-500 mb-8 leading-relaxed">Our partner network is currently being curated. Check back soon to meet our top chefs!</p>
             <Link href="/" className="text-orange-500 font-black flex items-center gap-2 justify-center hover:gap-3 transition-all">Back to Home <ArrowRight size={18} /></Link>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-slate-900 py-32 relative overflow-hidden">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full"></div>
         <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Own a Kitchen? <br /><span className="text-orange-500">Join Our Family</span></h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">Expand your business and reach thousands of hungry customers by becoming a FoodStation partner today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <button className="px-10 py-5 bg-orange-500 text-white rounded-[24px] font-black text-lg hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/20 active:scale-95">Contact for Partnership</button>
               <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-[24px] font-black text-lg hover:bg-white/10 transition-all backdrop-blur-md">Learn More</button>
            </div>
         </div>
      </section>
    </div>
  );
}