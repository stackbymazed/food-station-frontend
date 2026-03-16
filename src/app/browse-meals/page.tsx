export default function BrowseMealsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Browse Meals
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="border rounded-lg p-5 shadow-sm">
          <h2 className="text-xl font-semibold">
            Chicken Burger
          </h2>

          <p className="text-gray-500 mt-2">
            Delicious grilled chicken burger with sauce.
          </p>

          <p className="text-orange-500 font-bold mt-3">
            $8
          </p>
        </div>

        <div className="border rounded-lg p-5 shadow-sm">
          <h2 className="text-xl font-semibold">
            Beef Pizza
          </h2>

          <p className="text-gray-500 mt-2">
            Cheese loaded pizza with beef topping.
          </p>

          <p className="text-orange-500 font-bold mt-3">
            $12
          </p>
        </div>

        <div className="border rounded-lg p-5 shadow-sm">
          <h2 className="text-xl font-semibold">
            Pasta Alfredo
          </h2>

          <p className="text-gray-500 mt-2">
            Creamy pasta with garlic sauce.
          </p>

          <p className="text-orange-500 font-bold mt-3">
            $10
          </p>
        </div>

      </div>

    </div>
  );
}