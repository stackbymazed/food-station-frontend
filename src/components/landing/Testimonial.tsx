import { MessageSquareQuote, Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      name: "MD. Loni",
      role: "CEO",
      feedback: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ex placeat architecto, voluptatem corrupti facere?",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "MD. Loni",
      role: "CEO",
      feedback: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ex placeat architecto, voluptatem corrupti facere?",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/44.jpg"
    }
  ];

  return (
    <section className="py-24 bg-orange-50/50 relative overflow-hidden">
      {/* Decorative vectors standard to themes */}
      <div className="absolute left-0 bottom-0 w-48 h-64 bg-slate-100 rounded-tr-full opacity-60 pointer-events-none"></div>
      <div className="absolute right-0 top-10 w-32 h-64 bg-orange-100 rounded-l-full opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header and Carousel Controls Container */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 md:px-0">
          <div className="text-left w-full md:w-auto ml-0 md:ml-8">
            <div className="flex items-center gap-2 font-bold mb-2">
              <h4 className="text-orange-500 font-pacifico tracking-widest text-2xl">Testimonial</h4>
              {/* Small abstract leaf icon next to Food Menu */}
              <svg className="text-red-500 w-8 h-8 -mt-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22C12 22 17 18.5 17 14C17 11.2386 14.7614 9 12 9C9.23858 9 7 11.2386 7 14C7 18.5 12 22 12 22Z" />
                <path d="M12 9C12 6.23858 14.2386 4 17 4C19.7614 4 22 6.23858 22 9C22 9 17 12.5 12 9Z" />
                <path d="M2 9C2 6.23858 4.23858 4 7 4C9.76142 4 12 6.23858 12 9C12 9 7 12.5 2 9Z" />
                <path d="M4 14H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="text-4xl text-[#1e1b4b] font-extrabold tracking-tight">
              Our Customer Feedbacks
            </h2>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 rounded-full border border-orange-200 text-slate-800 flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors shadow-sm bg-white">
              <ArrowLeft size={20} />
            </button>
            <button className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-slate-900 transition-colors shadow-sm">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Flex container */}
        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-14 lg:gap-16">
          {testimonials.map((t, idx) => (
            <div
              key={t.id}
              className="w-full md:w-[45%] bg-white rounded-[2rem] relative p-10 pt-16 shadow-xl shadow-slate-200/50 border border-slate-100/50 hover:-translate-y-2 transition-transform duration-300 group animate-in zoom-in fade-in"
              style={{ animationDelay: `${idx * 200}ms`, animationDuration: '800ms' }}
            >

              {/* Profile Avatar perfectly centered floating top */}
              <div className="absolute left-1/2 -ml-14 -top-14 z-20">
                <div className="w-28 h-28 rounded-full border-[8px] border-white p-1 bg-orange-50 relative group-hover:scale-105 transition-transform duration-300 shadow-xl shadow-slate-200/50">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover rounded-full" />

                  {/* Floating Quote Badge */}
                  <div className="absolute bottom-0 right-0 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <Quote size={12} className="fill-current" />
                  </div>
                </div>
              </div>

              {/* Decorative Quotes Icon Floating in Background */}
              <div className="absolute text-orange-500/5 top-20 right-10 group-hover:text-orange-500/10 transition-colors duration-500 pointer-events-none">
                <Quote size={100} className="fill-current" />
              </div>

              {/* Content */}
              <div className="text-center relative z-10 flex flex-col h-full">

                {/* Embedded Stars Top */}
                <div className="flex justify-center gap-1.5 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="text-orange-400 w-5 h-5 fill-current" />
                  ))}
                </div>

                <p className="text-slate-600 italic mb-8 leading-relaxed text-lg">
                  "{t.feedback}"
                </p>

                <div className="mt-auto">
                  <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">{t.name}</h3>
                  <h4 className="text-orange-500 text-sm font-bold uppercase tracking-widest mt-1">{t.role}</h4>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Small Navigation dots below */}
        <div className="flex justify-center gap-3 mt-14">
          <button className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></button>
          <button className="w-4 h-4 rounded-full bg-orange-200 hover:bg-orange-300 transition-colors cursor-pointer"></button>
          <button className="w-4 h-4 rounded-full bg-orange-200 hover:bg-orange-300 transition-colors cursor-pointer"></button>
        </div>

      </div>
    </section>
  );
}
