import { ArrowRight, Utensils } from "lucide-react";

export default function Offers() {
  return (
    <section className="py-20 max-w-8xl mx-auto px-18 relative bg-[#EEF6EB]">
      <div className="text-left w-full md:w-auto mb-8">
        <div className="flex items-center gap-2 font-bold mb-2">
          <h4 className="text-orange-500 font-pacifico tracking-widest text-2xl">Daily Offer</h4>
          {/* Small abstract leaf icon next to Food Menu */}
          <svg className="text-red-500 w-8 h-8 -mt-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22C12 22 17 18.5 17 14C17 11.2386 14.7614 9 12 9C9.23858 9 7 11.2386 7 14C7 18.5 12 22 12 22Z" />
            <path d="M12 9C12 6.23858 14.2386 4 17 4C19.7614 4 22 6.23858 22 9C22 9 17 12.5 12 9Z" />
            <path d="M2 9C2 6.23858 4.23858 4 7 4C9.76142 4 12 6.23858 12 9C12 9 7 12.5 2 9Z" />
            <path d="M4 14H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="text-4xl text-[#1e1b4b] font-extrabold tracking-tight">
          Up To 75% Offer For This Day
        </h2>
      </div>

      {/* Dynamic Promo Banner Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mt-4">

        {/* Card 1: Weekly Best Seller */}
        <div className="relative bg-[#FFFAF0] p-8 sm:p-10 rounded-2xl shadow-sm border border-orange-100 flex flex-col sm:flex-row items-center justify-between group overflow-hidden hover:shadow-xl transition-all duration-300">
          {/* Background decorative blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 opacity-10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>

          <div className="relative z-10 w-full sm:w-[55%] pr-4 text-center sm:text-left mb-6 sm:mb-0">
            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-2 block">Weekly Best Seller</span>
            <h3 className="text-3xl font-bold mb-3 text-slate-900">Fried Chicken</h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              Neque porro quisquam est qui dolor ipsum quia dolor sit ametsed.
            </p>
            <button className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-slate-900 transition-colors duration-300 transform group-hover:scale-105">
              Shop Now <ArrowRight size={16} />
            </button>
          </div>

          <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0 flex justify-center items-center">
            {/* Spinning background effect circle */}
            <div className="absolute inset-0 bg-orange-200 rounded-full scale-90 group-hover:scale-100 group-hover:rotate-[360deg] transition-all duration-[3s] ease-linear"></div>

            <img
              src="/images/spicy-burger.png" // Using burger as dummy if fried chicken missing, or just hero-pasta
              className="w-[90%] h-[90%] object-contain drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-700"
              alt="Fried Chicken"
            />
          </div>
        </div>

        {/* Card 2: Daily Offer */}
        <div className="relative bg-[#F8FAFC] p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between group overflow-hidden hover:shadow-xl transition-all duration-300">
          {/* Background decorative blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-400 opacity-10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>

          <div className="relative z-10 w-full sm:w-[55%] pr-4 text-center sm:text-left mb-6 sm:mb-0">
            <span className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-2 block">Daily Offer</span>
            <h3 className="text-3xl font-bold mb-3 text-slate-900">Hyderabadi Biryani</h3>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
              Neque porro quisquam est qui dolor ipsum quia dolor sit ametsed.
            </p>
            <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-orange-500 transition-colors duration-300 transform group-hover:scale-105">
              Shop Now <ArrowRight size={16} />
            </button>
          </div>

          <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0 flex justify-center items-center">
            {/* Spinning background effect circle */}
            <div className="absolute inset-0 bg-slate-200 rounded-full scale-90 group-hover:scale-100 group-hover:rotate-[360deg] transition-all duration-[3s] ease-linear"></div>

            <img
              src="/images/chicken-biryani.png"
              className="w-[95%] h-[95%] object-contain drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-700"
              alt="Hyderabadi Biryani"
            />
          </div>
        </div>

      </div>
    </section>
  );
}