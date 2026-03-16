import { Search, Heart, Eye, ArrowLeft, ArrowRight, ChevronRight, Home, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const mockFoods = [
  {
    id: 1,
    image: "/images/chicken-biryani.png",
    category: "Biryani",
    title: "Hyderabadi Biryani",
    rating: 4,
    reviews: 24,
    price: 65.00,
    oldPrice: 90.00
  },
  {
    id: 2,
    image: "/images/beef-steaks.png",
    category: "Chicken",
    title: "Daria Shevtsova",
    rating: 5,
    reviews: 30,
    price: 80.00
  },
  {
    id: 3,
    image: "/images/spicy-burger.png",
    category: "Burger",
    title: "Spicy Burger",
    rating: 4,
    reviews: 17,
    price: 100.00,
    oldPrice: 110.00
  },
  {
    id: 4,
    image: "/images/spicy-burger.png",
    category: "Dessert",
    title: "Fried Chicken",
    rating: 4,
    reviews: 22,
    price: 99.00
  },
  {
    id: 5,
    image: "/images/beef-steaks.png",
    category: "Kebab",
    title: "Mozzarella Sticks",
    rating: 5,
    reviews: 72,
    price: 75.00
  },
  {
    id: 6,
    image: "/images/chicken-biryani.png",
    category: "Kacchi",
    title: "Popcorn Chicken",
    rating: 4,
    reviews: 57,
    price: 69.00,
    oldPrice: 80.00
  },
  {
    id: 7,
    image: "/images/beef-steaks.png",
    category: "Noodle",
    title: "Chicken Wings",
    rating: 4,
    reviews: 43,
    price: 79.00,
    oldPrice: 90.00
  },
  {
    id: 8,
    image: "/images/chicken-biryani.png",
    category: "Grill",
    title: "Onion Rings",
    rating: 5,
    reviews: 62,
    price: 110.00
  }
];

export default function BrowseMealsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Banner Area */}
      <div className="relative h-[300px] w-full flex items-center justify-center bg-slate-900">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: "url('/images/chicken-biryani.png')" }}
        />
        <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto flex flex-col items-start justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Popular Foods Menu
          </h1>
          <div className="flex items-center gap-2 text-white font-medium text-sm md:text-base">
            <Link href="/" className="hover:text-orange-500 transition-colors flex items-center gap-1">
              <Home size={16} /> Home
            </Link>
            <span className="text-gray-400">-</span>
            <span className="text-orange-500">Menu</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Filters Top Bar */}
        <div className="bg-white rounded-full p-2 shadow-sm mb-12 flex flex-col md:flex-row items-center gap-3 border border-slate-100">
          <div className="flex-1 w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="search..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-full outline-none focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-gray-400"
            />
          </div>
          <div className="w-full md:w-64 h-12 flex items-center relative">
            <select className="w-full h-full bg-slate-50 px-5 appearance-none rounded-full outline-none cursor-pointer focus:ring-2 focus:ring-orange-500/20 transition-all border-none">
              <option>Default Shorting</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" size={16} />
          </div>
          <button className="w-full md:w-auto px-10 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-colors duration-300">
            Search
          </button>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockFoods.map((food) => (
            <div key={food.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-100/50 flex flex-col h-full">
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <img 
                  src={food.image} 
                  alt={food.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute bottom-4 right-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-sm shadow-md">
                  {food.category}
                </span>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-800 text-center mb-2 line-clamp-1">{food.title}</h3>
                
                <div className="flex items-center justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(food.rating) ? 'text-orange-500' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-gray-400 text-sm ml-1">— {food.reviews}</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-6 mt-auto">
                  <span className="text-xl font-bold text-orange-500">${food.price.toFixed(2)}</span>
                  {food.oldPrice && (
                    <span className="text-sm font-medium text-gray-400 line-through">${food.oldPrice.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 justify-center">
                  <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-medium transition-colors text-sm rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm">
                    add To Cart
                  </button>
                  <button className="w-10 h-10 border border-orange-200 text-orange-500 flex items-center justify-center hover:bg-orange-50 transition-colors rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm">
                    <Heart size={16} />
                  </button>
                  <button className="w-10 h-10 border border-orange-200 text-orange-500 flex items-center justify-center hover:bg-orange-50 transition-colors rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-16">
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors bg-white">
            <ChevronLeft size={18} />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors bg-white border border-gray-200">
            1
          </button>
          <button className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-medium shadow-md shadow-orange-500/30">
            2
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors bg-white border border-gray-200">
            3
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors bg-white">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}