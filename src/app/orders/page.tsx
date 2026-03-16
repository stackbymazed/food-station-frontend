export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-4">

        <div className="border rounded-lg p-5 flex justify-between items-center">

          <div>
            <h2 className="font-semibold">
              Chicken Burger
            </h2>

            <p className="text-gray-500 text-sm">
              Order ID: #12345
            </p>
          </div>

          <span className="text-green-500 font-medium">
            Delivered
          </span>

        </div>

        <div className="border rounded-lg p-5 flex justify-between items-center">

          <div>
            <h2 className="font-semibold">
              Beef Pizza
            </h2>

            <p className="text-gray-500 text-sm">
              Order ID: #12346
            </p>
          </div>

          <span className="text-yellow-500 font-medium">
            Processing
          </span>

        </div>

      </div>

    </div>
  );
}