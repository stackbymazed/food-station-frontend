import { Utensils, Facebook, Twitter, Instagram, Linkedin, Share2, ArrowLeft, ArrowRight } from "lucide-react";

const chefs = [
  { id: 1, name: "Bred Tennant", role: "Head Chef", img: "/images/chef-1.png" },
  { id: 2, name: "Alexander Danvers", role: "Sous Chef", img: "/images/chef-2.png" },
  { id: 3, name: "John Philip", role: "Pastry Chef", img: "/images/chef-1.png" },
];

export default function Chefs() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-10 right-10 opacity-10">
        <Utensils size={200} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div className="text-left w-full md:w-auto">
            <div className="flex items-center gap-2 font-bold mb-2">
              <h4 className="text-orange-500 font-pacifico tracking-widest text-2xl">Our Team</h4>
              {/* Small abstract leaf icon next to Food Menu */}
              <svg className="text-red-500 w-8 h-8 -mt-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22C12 22 17 18.5 17 14C17 11.2386 14.7614 9 12 9C9.23858 9 7 11.2386 7 14C7 18.5 12 22 12 22Z" />
                <path d="M12 9C12 6.23858 14.2386 4 17 4C19.7614 4 22 6.23858 22 9C22 9 17 12.5 12 9Z" />
                <path d="M2 9C2 6.23858 4.23858 4 7 4C9.76142 4 12 6.23858 12 9C12 9 7 12.5 2 9Z" />
                <path d="M4 14H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="text-4xl text-[#1e1b4b] font-extrabold tracking-tight">
              Meet Our Expert Chefs
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

        <div className="grid md:grid-cols-3 gap-8">
          {chefs.map((chef, index) => (
            <div
              key={chef.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group animate-in zoom-in fade-in fill-mode-both"
              style={{ animationDelay: `${index * 150}ms`, animationDuration: '800ms' }}
            >
              {/* Card Top Orange Area */}
              <div
                className="h-28 bg-orange-500 rounded-t-2xl relative"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 60%, 50% 100%, 0 60%)' }}
              ></div>

              {/* Chef Image overlay */}
              <div className="flex justify-center -mt-16 relative">
                <div className="w-32 h-32 bg-white rounded-full p-2 shadow-md relative group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={chef.img}
                    alt={chef.name}
                    className="w-full h-full object-cover rounded-full bg-slate-200"
                  />
                  {/* Share button floating target */}
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors shadow">
                    <Share2 size={14} />
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-1">{chef.name}</h3>
                <p className="text-orange-500 font-medium mb-5">{chef.role}</p>

                {/* Social Icons (invisible by default, show on card hover or always show, let's keep visible as the design implies a standard social list) */}
                <div className="flex justify-center gap-2">
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-orange-500 hover:text-white transition-all duration-300">
                    <Facebook size={14} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-orange-500 hover:text-white transition-all duration-300">
                    <Twitter size={14} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-orange-500 hover:text-white transition-all duration-300">
                    <Instagram size={14} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-orange-500 hover:text-white transition-all duration-300">
                    <Linkedin size={14} />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}