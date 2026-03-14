const foods = [
  { id:1, name:"Spicy Burger", price:"$12", img:"/images/spicy-burger.png" },
  { id:2, name:"Beef Steak", price:"$24", img:"/images/beef-steaks.png" },
  { id:3, name:"Chicken Biryani", price:"$18", img:"/images/chicken-biryani.png" },
  { id:4, name:"Italian Pasta", price:"$15", img:"/images/hero-pasta.png" },
];

export default function PopularFoods() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-6">

      <h4 className="text-orange-500 text-center font-semibold">
        Real Taste
      </h4>

      <h2 className="text-4xl font-bold text-center mt-2 mb-12">
        Popular Delicious Foods
      </h2>

      <div className="grid md:grid-cols-4 gap-8">

        {foods.map(food => (
          <div
            key={food.id}
            className="bg-white p-6 rounded-xl shadow text-center hover:-translate-y-2 transition"
          >

            <img
              src={food.img}
              className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
            />

            <h3 className="text-xl font-bold">{food.name}</h3>

            <p className="text-orange-500 text-lg font-semibold mt-2">
              {food.price}
            </p>

            <button className="mt-4 border border-orange-500 text-orange-500 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition">
              Add to Cart
            </button>

          </div>
        ))}

      </div>

    </section>
  );
}