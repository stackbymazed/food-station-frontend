"use client";

import {
  MapPin,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "text-orange-500" : "text-slate-700";

  return (
    <>
      {/* Top Bar */}
      <div className="bg-orange-500 text-white text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">

          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1">
              <MapPin size={16} /> 123 Street, New York, USA
            </span>

            <span className="flex items-center gap-1">
              <Mail size={16} /> info@example.com
            </span>
          </div>

          <div className="flex gap-3">
            <a className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-orange-500 transition">
              <Facebook size={14} />
            </a>

            <a className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-orange-500 transition">
              <Twitter size={14} />
            </a>

            <a className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-orange-500 transition">
              <Instagram size={14} />
            </a>

            <a className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-orange-500 transition">
              <Linkedin size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          {/* Logo */}
          <div className="text-2xl font-extrabold text-slate-900">
            <span className="text-orange-500">Tay</span>Food
          </div>

          {/* Nav Links */}
          <ul className="hidden md:flex gap-8 font-medium">

            <li>
              <Link href="/" className={`${isActive("/")} hover:text-orange-500`}>
                Home
              </Link>
            </li>

            <li>
              <Link href="/about" className={`${isActive("/about")} hover:text-orange-500`}>
                About
              </Link>
            </li>

            <li>
              <Link href="/menu" className={`${isActive("/menu")} hover:text-orange-500`}>
                Menu
              </Link>
            </li>

            <li>
              <Link href="/service" className={`${isActive("/service")} hover:text-orange-500`}>
                Service
              </Link>
            </li>

            <li>
              <Link href="/contact" className={`${isActive("/contact")} hover:text-orange-500`}>
                Contact
              </Link>
            </li>

          </ul>

          {/* Actions */}
          <div className="flex items-center gap-5">

            <button className="relative text-slate-700 hover:text-orange-500">
              <Search size={22} />
            </button>

            <button className="relative text-slate-700 hover:text-orange-500">
              <ShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <button className="text-slate-700 hover:text-orange-500">
              <User size={22} />
            </button>

            <button className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow">
              Reservation
            </button>

          </div>
        </div>
      </nav>
    </>
  );
}