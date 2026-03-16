import { Play, Apple } from "lucide-react";

export default function VideoSection() {
  const scrollImages = [
    "/images/beef-steaks.png",
    "/images/hero-pasta.png",
    "/images/chicken-biryani.png",
    "/images/spicy-burger.png",
  ];

  // We duplicate the array to create a seamless infinite marquee loop
  const duplicatedImages = [...scrollImages, ...scrollImages];

  return (
    <section className="flex flex-col xl:flex-row w-full h-auto bg-slate-900 border-t border-t-slate-800 overflow-hidden">
      
      {/* 1st Column: Call to Action Block */}
      <div className="w-full xl:w-[35%] bg-slate-900 text-white p-10 lg:p-14 flex flex-col justify-center relative z-20 shrink-0">
        <div className="flex items-center gap-2 mb-4 text-orange-500 font-bold text-sm uppercase tracking-wider relative">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          $5.00 Cashback
        </div>
        
        <h2 className="text-3xl lg:text-5xl font-extrabold leading-tight mb-8">
          Easy To Order Our All Food
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl transition-colors font-semibold group flex-1">
            <Apple className="w-7 h-7 group-hover:scale-110 transition-transform" />
            <div className="text-left leading-tight">
              <div className="text-[10px] font-normal opacity-90 uppercase tracking-widest">Download on the</div>
              <div className="text-sm md:text-base font-bold">App Store</div>
            </div>
          </button>
          
          <button className="flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 p-4 rounded-xl transition-colors font-semibold group flex-1 shadow-inner">
            <Play className="w-7 h-7 text-orange-500 group-hover:scale-110 transition-transform shrink-0 fill-current" />
            <div className="text-left leading-tight">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Get it on</div>
              <div className="text-sm md:text-base font-bold">Google Play</div>
            </div>
          </button>
        </div>
      </div>

      {/* Infinite Marquee Container (Right-to-Left Animation) */}
      <div className="w-full xl:w-[65%] flex items-center relative py-6 xl:py-10 bg-slate-900 overflow-hidden">
        
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 text-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 text-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-marquee space-x-4 pl-4 hover:[animation-play-state:paused] transition-all">
          {duplicatedImages.map((src, i) => (
            <div key={i} className="relative group overflow-hidden h-[250px] sm:h-[350px] w-[250px] sm:w-[350px] shrink-0 rounded-2xl border border-slate-800 isolate cursor-pointer">
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/10 transition-colors duration-500 z-10"></div>
              <img 
                src={src} 
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 absolute inset-0 -z-10"
                alt="Food marquee item"
              />
            </div>
          ))}
        </div>
        
      </div>

    </section>
  );
}