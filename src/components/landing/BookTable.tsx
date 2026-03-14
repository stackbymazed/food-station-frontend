export default function BookTable() {
  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <img
          src="/images/spicy-burger.png"
          className="rounded-xl"
        />

        <div className="bg-orange-500 p-10 rounded-2xl">
          <h2 className="text-3xl font-bold mb-8">Book A Table</h2>

          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="p-3 rounded text-black"/>
            <input type="time" className="p-3 rounded text-black"/>
            <input placeholder="Your Name" className="p-3 rounded text-black"/>
            <input placeholder="Phone Number" className="p-3 rounded text-black"/>
            <input placeholder="People" className="p-3 rounded text-black"/>

            <button className="col-span-2 bg-slate-900 py-3 rounded font-bold">
              Book Now
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}