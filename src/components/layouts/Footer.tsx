"use client";

import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* Logo */}
          <div>
            <div className="text-3xl font-extrabold text-white mb-6">
              <span className="text-orange-500">Tay</span>Food
            </div>

            <p className="leading-relaxed mb-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.
            </p>

            <div className="flex gap-3">
              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-orange-500 transition">
                <Facebook size={16} />
              </a>

              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-orange-500 transition">
                <Twitter size={16} />
              </a>

              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-orange-500 transition">
                <Instagram size={16} />
              </a>

              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-orange-500 transition">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Useful Links
            </h4>

            <ul className="space-y-4">
              <li className="hover:text-orange-500 cursor-pointer">About Us</li>
              <li className="hover:text-orange-500 cursor-pointer">Our Menu</li>
              <li className="hover:text-orange-500 cursor-pointer">Delivery Info</li>
              <li className="hover:text-orange-500 cursor-pointer">Contact Us</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Quick Links
            </h4>

            <ul className="space-y-4">
              <li className="hover:text-orange-500 cursor-pointer">Orders Return</li>
              <li className="hover:text-orange-500 cursor-pointer">Latest News</li>
              <li className="hover:text-orange-500 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-orange-500 cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Newsletter
            </h4>

            <p className="mb-4">
              Subscribe our newsletter to get more updates.
            </p>

            <div className="flex bg-white/10 rounded-full p-1">

              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 bg-transparent outline-none px-4 text-white placeholder:text-slate-400"
              />

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full">
                <ArrowRight size={16} />
              </button>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-6 text-center text-sm">
          © {new Date().getFullYear()} FoodStation. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}