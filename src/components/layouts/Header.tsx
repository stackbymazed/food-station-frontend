"use client";

import {
  ShoppingCart,
  User,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Plus,
} from "lucide-react";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/useCartStore";
import { useEffect, useState } from "react";

export default function Header() {

  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const itemCount = useCartStore((state) => state.getItemCount());

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) =>
    pathname === path ? "text-orange-500" : "text-slate-700";

  const handleLogout = async () => {
    const loading = toast.loading("Logging out...");
    await authClient.signOut();
    toast.success("Logged out successfully", { id: loading });
    redirect("/login");
  };

  return (
    <nav className="bg-white/90 backdrop-blur sticky top-0 z-50 shadow-sm transition-all duration-300">
      {/* Top Bar */}
      <div className="bg-[#f97316] text-white text-[11px] py-1.5 px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-8">
            <span className="flex items-center gap-1.5 opacity-90"><Mail size={12} /> examplemail@gmail.com</span>
            <span className="flex items-center gap-1.5 opacity-90"><Phone size={12} /> +96487452145214</span>
          </div>
          <div className="flex gap-4">
            <Facebook size={12} className="cursor-pointer hover:text-slate-200 transition-colors" />
            <Twitter size={12} className="cursor-pointer hover:text-slate-200 transition-colors" />
            <Instagram size={12} className="cursor-pointer hover:text-slate-200 transition-colors" />
            <Linkedin size={12} className="cursor-pointer hover:text-slate-200 transition-colors" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-extrabold text-slate-900">
          <span className="text-orange-500">Food</span>Station
        </div>

        {/* Nav Links */}
        <ul className="hidden lg:flex gap-7 font-bold text-[13px] uppercase tracking-wide">
          <li><Link href="/" className={`${isActive("/")} hover:text-orange-500 transition-colors`}>Home</Link></li>
          <li><Link href="#" className="text-slate-700 hover:text-orange-500 transition-colors">About</Link></li>
          <li><Link href="/browse-meals" className={`${isActive("/browse-meals")} hover:text-orange-500 transition-colors`}>Menu</Link></li>
          <li><Link href="#" className="text-slate-700 hover:text-orange-500 transition-colors">Chefs</Link></li>

          {/* Pages Dropdown - using a simple hover for now */}
          <li className="relative group cursor-pointer">
            <span className="text-slate-700 hover:text-orange-500 transition-colors flex items-center gap-1">
              Pages <Plus size={10} className="mt-0.5" />
            </span>
            <ul className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-lg py-3 hidden group-hover:block border border-slate-100 z-[100] mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <li><Link href="/checkout" className="block px-6 py-2 hover:bg-orange-50 hover:text-orange-500 transition-colors">Checkout</Link></li>
              <li><Link href="/orders" className="block px-6 py-2 hover:bg-orange-50 hover:text-orange-500 transition-colors">My Orders</Link></li>
              <li><Link href="/add-meal" className="block px-6 py-2 hover:bg-orange-50 hover:text-orange-500 transition-colors">Add Meal</Link></li>
              <li><Link href="/provider" className="block px-6 py-2 hover:bg-orange-50 hover:text-orange-500 transition-colors">Provider</Link></li>
            </ul>
          </li>

          <li><Link href="#" className="text-slate-700 hover:text-orange-500 transition-colors">Blog</Link></li>
          <li><Link href="#" className="text-slate-700 hover:text-orange-500 transition-colors">Contact</Link></li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-5">

          {/* Cart */}
          <Link href="/cart">
            <button className="relative text-slate-700 hover:text-orange-500 transition-colors">
              <ShoppingCart size={22} />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </Link>

          {/* If Logged In */}
          {session ? (
            <>
              <div className="flex items-center gap-2 text-slate-700">

                <User size={20} />

                <span className="hidden md:block text-sm">
                  {session.user.name}
                </span>

              </div>

              <button
                onClick={handleLogout}
                className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow"
              >
                Logout
              </button>
            </>
          ) : (

            <>
              <Link href="/login">
                <button className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow">
                  Register
                </button>
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}