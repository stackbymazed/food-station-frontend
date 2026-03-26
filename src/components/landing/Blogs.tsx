import { Utensils, Calendar, MessageCircle, ArrowRight, ArrowLeft } from "lucide-react";

export default function Blogs() {
  const latestBlogs = [
    {
      id: 1,
      title: "Mastering the Art of Sustainable Seafood",
      date: "March 15, 2024",
      comments: "Comments (3)",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
      desc: "Inside the kitchens of three chefs who are changing the way we source our fish.",
      authorRole: "Sustainability"
    },
    {
      id: 2,
      title: "Traditional Spices: A Culinary Journey Through India",
      date: "March 10, 2024",
      comments: "Comments (5)",
      image: "https://images.unsplash.com/photo-1596797038530-2c39fa80227e?auto=format&fit=crop&q=80&w=800",
      desc: "Discovery the deep history and complex flavors of the spices that define regional dishes.",
      authorRole: "Gastronomy"
    },
    {
      id: 3,
      title: "The Rise of Plant-Based Fine Dining",
      date: "March 05, 2024",
      comments: "Comments (1)",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
      desc: "How luxury restaurants are redefining vegetarian cuisine with innovative techniques.",
      authorRole: "Trends"
    }
  ];

  return (
    <section className="py-24 bg-orange-50/30">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-left w-full md:w-auto mb-8 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 font-bold mb-2">
              <h4 className="text-orange-500 font-pacifico tracking-widest text-2xl">News & Blogs</h4>
              {/* Small abstract leaf icon next to Food Menu */}
              <svg className="text-red-500 w-8 h-8 -mt-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22C12 22 17 18.5 17 14C17 11.2386 14.7614 9 12 9C9.23858 9 7 11.2386 7 14C7 18.5 12 22 12 22Z" />
                <path d="M12 9C12 6.23858 14.2386 4 17 4C19.7614 4 22 6.23858 22 9C22 9 17 12.5 12 9Z" />
                <path d="M2 9C2 6.23858 4.23858 4 7 4C9.76142 4 12 6.23858 12 9C12 9 7 12.5 2 9Z" />
                <path d="M4 14H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="text-4xl text-[#1e1b4b] font-extrabold tracking-tight">
              Our Latest Foods Blog
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

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog, idx) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group animate-in zoom-in fade-in flex flex-col h-full border border-slate-100/50"
              style={{ animationDelay: `${idx * 150}ms`, animationDuration: '800ms' }}
            >

              {/* Image Container with Date/Category Overlay */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Yellow absolute category badge */}
                <div className="absolute top-4 left-4 bg-yellow-400 text-slate-900 font-bold text-xs uppercase px-3 py-1.5 rounded shadow">
                  {blog.authorRole}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-1 relative bg-white">

                {/* Avatar pushing up onto the image */}
                <div className="absolute -top-6 left-6">
                  <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-md">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-full h-full" alt="author" />
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 uppercase tracking-widest mt-6 mb-4">
                  <div className="flex items-center gap-1.5 opacity-80 hover:text-orange-500 transition-colors cursor-pointer">
                    <Calendar size={14} className="text-orange-500" />
                    {blog.date}
                  </div>
                  <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                  <div className="flex items-center gap-1.5 opacity-80 hover:text-orange-500 transition-colors cursor-pointer">
                    <MessageCircle size={14} className="text-orange-500" />
                    {blog.comments}
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-orange-500 transition-colors cursor-pointer line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                  {blog.desc}
                </p>

                {/* Footer Read More */}
                <div className="mt-auto border-t border-slate-100 pt-4">
                  <button className="flex items-center gap-2 text-slate-900 font-bold text-sm tracking-wide group-hover:text-orange-500 transition-colors">
                    READ MORE <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
