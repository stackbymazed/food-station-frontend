import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-[#1f1a29] overflow-hidden min-h-[85vh] lg:min-h-[600px] flex items-center">
      {/* Background patterns and image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 pointer-events-none"
        style={{ backgroundImage: "url('/images/beef-steaks.png')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1f1a29] via-[#1f1a29]/50 to-transparent z-0 pointer-events-none"></div>

      {/* Abstract floating shapes */}
      <div className="absolute top-1/4 left-8 text-orange-500 opacity-90 pointer-events-none animate-pulse">
        {/* Flower-like abstract SVG matching screenshot */}
        <svg fill="currentColor" width="32" height="32" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-4 items-center relative z-10 w-full">
        {/* Left Content */}
        <div className="text-white space-y-4 animate-in slide-in-from-left duration-700 relative z-20 text-center lg:text-left">

          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <h3 className="font-pacifico text-orange-500 text-2xl sm:text-3xl md:text-[2.2rem] tracking-wide relative">
              <span className="hidden sm:block absolute -left-12 top-1 opacity-80 animate-spin" style={{ animationDuration: '10s' }}>🍅</span>
              Satisfy Your Cravings
            </h3>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.6rem] xl:text-[4rem] font-bold leading-[1.15] text-white my-6 drop-shadow-md tracking-tight">
            Delicious Foods With <br className="hidden md:block" />
            Wonderful Eating
          </h1>

          <p className="text-slate-200 text-sm sm:text-base md:text-[17px] max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal shadow-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum<br className="hidden md:block" />
            fugit minimaet debitis ut distinctio optio.
          </p>

          <div className="relative mt-8 sm:mt-10 w-full max-w-[500px] mx-auto lg:mx-0">
            {/* Search Input matching screenshot */}
            <div className="flex bg-white rounded-full p-[4px] sm:p-[6px] pl-5 sm:pl-6 relative items-center border-[4px] sm:border-[8px] border-white/10 bg-clip-padding backdrop-blur-sm shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
              <input
                placeholder="Search . . ."
                className="flex-1 outline-none text-slate-800 bg-transparent placeholder:text-slate-400 text-sm sm:text-[15px] font-medium w-full"
              />
              <button className="bg-[#fb923c] hover:bg-orange-600 text-white px-5 sm:px-8 md:px-[2.5rem] py-2.5 sm:py-3.5 md:py-[15px] rounded-full font-bold transition-colors duration-300 text-sm sm:text-[15px] shadow-sm">
                Search
              </button>
            </div>

            {/* Tiny abstract decoration left of search box */}
            <div className="hidden sm:block absolute bottom-6 -left-12 text-orange-500 opacity-90 animate-pulse">
              <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
            </div>

            {/* Tiny tomato icon */}
            <div className="absolute -bottom-[22px] left-[55%] transform -translate-x-1/2 drop-shadow-lg text-[22px] pointer-events-none hover:-translate-y-2 transition-transform duration-300 cursor-pointer hidden sm:block">
              🍅
            </div>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="relative flex justify-center lg:justify-end items-center h-full animate-in zoom-in duration-700 delay-150 relative z-10 w-full pr-0 lg:pr-8 xl:pr-12">

          <div className="relative isolate flex items-center justify-center rounded-full p-[8px] sm:p-[12px] w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] xl:w-[540px] xl:h-[540px] group shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-gradient-to-b from-white via-white/80 to-[#f97316]">

            {/* Spinning animated dashed ring outside */}
            <div className="absolute inset-[-15px] lg:inset-[-30px] border-[2px] sm:border-[3px] border-dashed border-orange-500/50 rounded-full animate-[spin_10s_linear_infinite] -z-20"></div>

            {/* Inner colorful gradient spinner restricted to 2 colors - reduced spread */}
            <div className="absolute inset-[-3px] rounded-full bg-[conic-gradient(from_0deg,#f97316_0deg,#f97316_180deg,#ffffff_180deg,#ffffff_360deg)] animate-[spin_12s_linear_infinite] -z-10 opacity-90 shadow-sm border border-black/10"></div>

            {/* The actual image clipping */}
            <div className="w-full h-full rounded-full overflow-hidden relative z-10 bg-slate-800 shadow-inner">
              <img
                src="/images/image.png"
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.12]"
                alt="Delicious Pasta"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent opacity-60"></div>
            </div>
          </div>

          {/* 35% Off Badge */}
          <div className="absolute top-2 -left-2 sm:top-4 sm:left-4 z-30 bg-[#f97316] text-white w-20 h-20 sm:w-24 sm:h-24 lg:w-[130px] lg:h-[130px] rounded-full flex flex-col items-center justify-center shadow-2xl border-[4px] lg:border-[8px] border-white transform hover:scale-110 rotate-[-5deg] transition-transform duration-300">
            <span className="text-2xl sm:text-[28px] lg:text-[40px] font-extrabold leading-none tracking-tight drop-shadow-sm">35%</span>
            <span className="text-sm sm:text-lg lg:text-[28px] font-pacifico leading-tight text-white drop-shadow-sm mt-0.5 sm:mt-1">off</span>
          </div>

          {/* Decorative floating elements nearby */}
          <div className="absolute top-10 lg:top-16 -left-6 lg:-left-10 text-orange-500 z-0 animate-spin-slow hidden sm:block" style={{ animationDuration: '20s' }}>
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 0L55.5 35L90 20L65 50L90 80L55.5 65L50 100L44.5 65L10 80L35 50L10 20L44.5 35L50 0Z" fill="currentColor" /></svg>
          </div>
          <div className="absolute top-0 right-10 lg:right-20 text-2xl sm:text-3xl drop-shadow-xl z-20 animate-pulse">
            🌿
          </div>
        </div>
      </div>
    </section>
  );
}