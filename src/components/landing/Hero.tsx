export default function Hero() {
  return (
    <section className="bg-slate-900 text-white py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <span className="bg-orange-500/20 text-orange-500 px-4 py-2 rounded-full font-semibold">
            😋 Simply Delicious Foods
          </span>

          <h1 className="text-5xl font-bold mt-6">
            Delicious Foods With <br/> Wonderful Eating
          </h1>

          <p className="text-slate-400 mt-6">
            Fresh and healthy food available here. Discover the best food from
            popular restaurants and enjoy your dining experience.
          </p>

          <div className="flex bg-white rounded-full mt-8 p-2 max-w-md">
            <input
              placeholder="Search Your Food..."
              className="flex-1 px-4 outline-none text-black"
            />
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full">
              Search
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/images/hero-pasta.png"
            className="rounded-full w-[380px] shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}