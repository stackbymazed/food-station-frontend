import { Utensils } from "lucide-react";

export default function BookTable() {
  return (
    <section className="relative w-full h-auto md:h-[500px] flex max-md:flex-col overflow-hidden animate-in fade-in duration-1000 my-10">
      
      {/* Left side: Background Image */}
      <div 
        className="relative w-full md:w-1/2 h-64 md:h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/chicken-biryani.png')" }} 
      >
        <div className="absolute inset-0 bg-slate-900/40"></div>
      </div>

      {/* Right side: Orange Form Area with angled edge on large screens */}
      <div className="relative w-full md:w-1/2 h-full bg-orange-500 py-12 px-6 lg:px-16 flex flex-col justify-center">
        
        {/* The angled clip-path overlay for desktop */}
        <div 
          className="hidden md:block absolute top-0 -left-16 w-16 h-full bg-orange-500"
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 100% 0)' }}
        ></div>

        <div className="relative z-10 w-full max-w-lg mb-8">
          <div className="flex items-center gap-2 font-bold mb-2 text-white">
            <Utensils className="w-5 h-5" />
            <h4 className="tracking-wide uppercase">Book A Table</h4>
          </div>
          <h2 className="text-4xl text-white font-extrabold tracking-tight mb-8">
            Book A Table
          </h2>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Name" 
              className="p-3 w-full rounded-md text-slate-800 bg-white border-none outline-none focus:ring-2 focus:ring-slate-900 placeholder:text-gray-400 block"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="p-3 w-full rounded-md text-slate-800 bg-white border-none outline-none focus:ring-2 focus:ring-slate-900 placeholder:text-gray-400 block"
            />
            <input 
              type="text" 
              placeholder="Phone Number" 
              className="p-3 w-full rounded-md text-slate-800 bg-white border-none outline-none focus:ring-2 focus:ring-slate-900 placeholder:text-gray-400 block"
            />
            <input 
              type="date" 
              className="p-3 w-full rounded-md text-slate-800 bg-white border-none outline-none focus:ring-2 focus:ring-slate-900 placeholder:text-gray-400 block"
              placeholder="Date"
            />
            <div className="sm:col-span-2">
              <button 
                type="button" 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-md font-semibold transition-colors duration-300 mt-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Book A Table
              </button>
            </div>
          </form>
        </div>
      </div>

    </section>
  );
}