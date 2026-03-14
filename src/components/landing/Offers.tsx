import { ArrowRight } from "lucide-react";

export default function Offers() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">

      <h4 className="text-orange-500 text-center font-semibold">
        Top Offer
      </h4>

      <h2 className="text-4xl text-center font-bold mt-2 mb-12">
        Up To 75% Off For This Day
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white p-8 rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold mb-2">Beef Steak</h3>
            <p className="text-slate-500 mb-4">
              Get up to 30% off on your first order.
            </p>

            <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full">
              Order Now <ArrowRight size={16}/>
            </button>
          </div>

          <img src="/images/beef-steaks.png" className="w-32 h-32 rounded-full"/>
        </div>

        <div className="bg-orange-500 text-white p-8 rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold mb-2">Or Mutton!</h3>
            <p className="mb-4 opacity-80">
              Get up to 25% off on your first order.
            </p>

            <button className="bg-white text-orange-500 px-4 py-2 rounded-full flex items-center gap-2">
              Order Now <ArrowRight size={16}/>
            </button>
          </div>

          <img src="/images/chicken-biryani.png" className="w-32 h-32 rounded-full"/>
        </div>

      </div>
    </section>
  );
}