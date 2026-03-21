import { ArrowLeft, ArrowRight } from "lucide-react";
import MealCard from "@/components/layouts/MealCard";

const mockFoods = [
  {
    id: 1,
    image: "/images/hero-pasta.png",
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
    rating: 5,
    reviews: 17,
    price: 100.00,
    oldPrice: 110.00
  },
  {
    id: 4,
    image: "/images/chicken-biryani.png",
    category: "Dressert",
    title: "Fried Chicken",
    rating: 4,
    reviews: 22,
    price: 99.00
  }
];

export default function PopularFoods() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">

      {/* Top Header Row mapping exact layout: Left Title, Right Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Left Aligned Titles */}
        <div className="text-left w-full md:w-auto">
          <div className="flex items-center gap-2 font-bold mb-2">
            <h4 className="text-orange-500 font-pacifico tracking-widest text-2xl">Food Menu</h4>
            {/* Small abstract leaf icon next to Food Menu */}
            <svg className="text-red-500 w-8 h-8 -mt-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22C12 22 17 18.5 17 14C17 11.2386 14.7614 9 12 9C9.23858 9 7 11.2386 7 14C7 18.5 12 22 12 22Z" />
              <path d="M12 9C12 6.23858 14.2386 4 17 4C19.7614 4 22 6.23858 22 9C22 9 17 12.5 12 9Z" />
              <path d="M2 9C2 6.23858 4.23858 4 7 4C9.76142 4 12 6.23858 12 9C12 9 7 12.5 2 9Z" />
              <path d="M4 14H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="text-4xl text-[#1e1b4b] font-extrabold tracking-tight">
            Popular Delicious Foods
          </h2>
        </div>

        {/* Right Aligned Tabs and Navigation Container */}
        <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
          {/* Main Tabs */}
          <div className="flex flex-wrap items-center gap-3 w-full justify-start md:justify-end">
            <button className="px-6 py-2 border border-orange-500 bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors text-sm rounded-sm shrink-0">
              All Menu
            </button>
            <button className="px-6 py-2 border border-orange-500 text-orange-500 bg-white font-medium hover:bg-orange-50 transition-colors text-sm rounded-sm shrink-0">
              Burger
            </button>
            <button className="px-6 py-2 border border-orange-500 text-orange-500 bg-white font-medium hover:bg-orange-50 transition-colors text-sm rounded-sm shrink-0">
              Chicken
            </button>
            <button className="px-6 py-2 border border-orange-500 text-orange-500 bg-white font-medium hover:bg-orange-50 transition-colors text-sm rounded-sm shrink-0">
              Pizza
            </button>
            <button className="px-6 py-2 border border-orange-500 text-orange-500 bg-white font-medium hover:bg-orange-50 transition-colors text-sm rounded-sm shrink-0">
              Dresserts
            </button>
          </div>
        </div>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {mockFoods.map((food, index) => (
          <MealCard 
            key={food.id} 
            index={index}
            food={{
              id: food.id,
              name: food.title,
              mainImage: food.image,
              category: food.category,
              rating: food.rating,
              reviewCount: food.reviews,
              price: food.price,
              discountPrice: food.oldPrice
            }} 
          />
        ))}
      </div>

    </section>
  );
}