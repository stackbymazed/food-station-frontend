import Counter from "@/components/ui/Counter";

export default function Stats() {
  return (
    <section className="bg-slate-900 text-white py-20">

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">

        <div>
          <Counter end={2129} suffix="+"/>
          <p className="mt-2">Delicious Items</p>
        </div>

        <div>
          <Counter end={5} suffix="+"/>
          <p className="mt-2">Experience Chefs</p>
        </div>

        <div>
          <Counter end={1000} suffix="+"/>
          <p className="mt-2">Happy Customers</p>
        </div>

        <div>
          <Counter end={1} suffix="+"/>
          <p className="mt-2">Dining Space</p>
        </div>

      </div>

    </section>
  );
}