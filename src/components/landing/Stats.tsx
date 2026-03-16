import Counter from "@/components/ui/Counter";
import { Users, Award, Smile, ChefHat } from "lucide-react";

export default function Stats() {
  return (
    <section className="relative text-white py-24 overflow-hidden my-4 group/stats">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0 transform group-hover/stats:scale-105 transition-transform duration-[10s] ease-out"
        style={{ backgroundImage: "url('/images/chicken-biryani.png')" }}
      >
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        
        {/* Stat 1 */}
        <div className="flex flex-col items-center animate-in zoom-in fade-in duration-1000">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-slate-600 flex flex-col items-center justify-center relative mb-6 group hover:border-orange-500 transition-colors duration-500 bg-slate-900/40 backdrop-blur-md">
            <div className="w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] rounded-full border border-dashed border-slate-500 absolute group-hover:rotate-180 transition-transform duration-1000 hidden sm:block"></div>
            
            <div className="text-3xl sm:text-4xl font-bold flex items-center justify-center text-white drop-shadow-md">
              <Counter end={85000} suffix="+" />
            </div>
            
            <div className="absolute -bottom-5 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-xl group-hover:-translate-y-2 transition-transform duration-300 ring-4 ring-slate-900">
              <Users size={22} />
            </div>
          </div>
          <p className="mt-2 text-slate-300 font-semibold tracking-wide uppercase text-sm">Customer Served</p>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col items-center animate-in zoom-in fade-in duration-1000 delay-100">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-slate-600 flex flex-col items-center justify-center relative mb-6 group hover:border-orange-500 transition-colors duration-500 bg-slate-900/40 backdrop-blur-md">
            <div className="w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] rounded-full border border-dashed border-slate-500 absolute group-hover:rotate-180 transition-transform duration-1000 hidden sm:block"></div>
            
            <div className="text-3xl sm:text-4xl font-bold flex items-center justify-center text-white drop-shadow-md">
              <Counter end={120} suffix="+" />
            </div>
            
            <div className="absolute -bottom-5 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-xl group-hover:-translate-y-2 transition-transform duration-300 ring-4 ring-slate-900">
              <ChefHat size={22} />
            </div>
          </div>
          <p className="mt-2 text-slate-300 font-semibold tracking-wide uppercase text-sm">Experience Chefs</p>
        </div>

        {/* Stat 3 */}
        <div className="flex flex-col items-center animate-in zoom-in fade-in duration-1000 delay-200">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-slate-600 flex flex-col items-center justify-center relative mb-6 group hover:border-orange-500 transition-colors duration-500 bg-slate-900/40 backdrop-blur-md">
            <div className="w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] rounded-full border border-dashed border-slate-500 absolute group-hover:rotate-180 transition-transform duration-1000 hidden sm:block"></div>
            
            <div className="text-3xl sm:text-4xl font-bold flex items-center justify-center text-white drop-shadow-md">
              <Counter end={72000} suffix="+" />
            </div>
            
            <div className="absolute -bottom-5 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-xl group-hover:-translate-y-2 transition-transform duration-300 ring-4 ring-slate-900">
              <Smile size={22} />
            </div>
          </div>
          <p className="mt-2 text-slate-300 font-semibold tracking-wide uppercase text-sm">Happy Customers</p>
        </div>

        {/* Stat 4 */}
        <div className="flex flex-col items-center animate-in zoom-in fade-in duration-1000 delay-300">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-slate-600 flex flex-col items-center justify-center relative mb-6 group hover:border-orange-500 transition-colors duration-500 bg-slate-900/40 backdrop-blur-md">
            <div className="w-[130px] h-[130px] sm:w-[160px] sm:h-[160px] rounded-full border border-dashed border-slate-500 absolute group-hover:rotate-180 transition-transform duration-1000 hidden sm:block"></div>
            
            <div className="text-3xl sm:text-4xl font-bold flex items-center justify-center text-white drop-shadow-md">
              <Counter end={30} suffix="+" />
            </div>
            
            <div className="absolute -bottom-5 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-xl group-hover:-translate-y-2 transition-transform duration-300 ring-4 ring-slate-900">
              <Award size={22} />
            </div>
          </div>
          <p className="mt-2 text-slate-300 font-semibold tracking-wide uppercase text-sm">Winning Award</p>
        </div>

      </div>
    </section>
  );
}