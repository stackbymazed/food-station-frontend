import { Play } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="grid md:grid-cols-4">

      <img src="/images/beef-steaks.png" className="h-[300px] object-cover w-full"/>

      <img src="/images/hero-pasta.png" className="h-[300px] object-cover w-full"/>

      <div className="relative">
        <img src="/images/spicy-burger.png" className="h-[300px] object-cover w-full"/>

        <button className="absolute inset-0 m-auto w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white">
          <Play size={28}/>
        </button>
      </div>

      <img src="/images/chicken-biryani.png" className="h-[300px] object-cover w-full"/>

    </section>
  );
}