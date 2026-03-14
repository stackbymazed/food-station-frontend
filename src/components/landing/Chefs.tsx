const chefs = [
  { id:1, name:"Bred Tennant", role:"Head Chef", img:"/images/chef-1.png"},
  { id:2, name:"Alaxendra Danvers", role:"Sous Chef", img:"/images/chef-2.png"},
  { id:3, name:"John Philip", role:"Pastry Chef", img:"/images/chef-1.png"},
];

export default function Chefs() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">

        <h4 className="text-orange-500 text-center font-semibold">
          Our Team
        </h4>

        <h2 className="text-4xl font-bold text-center mt-2 mb-12">
          Meet Our Expert Chefs
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {chefs.map(chef => (
            <div key={chef.id} className="bg-white rounded-xl shadow text-center overflow-hidden">

              <img src={chef.img} className="h-72 w-full object-cover"/>

              <div className="p-6">
                <h3 className="text-xl font-bold">{chef.name}</h3>
                <p className="text-orange-500">{chef.role}</p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}