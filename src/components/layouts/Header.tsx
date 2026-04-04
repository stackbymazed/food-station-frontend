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
  Menu,
  X,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  if (pathname === "/dashboard") return null;

  const isActive = (path: string) =>
    pathname === path ? "text-orange-500" : "text-slate-700";

  const handleLogout = async () => {
    const loading = toast.loading("Logging out...");
    try {
      await authClient.signOut();
      toast.success("Logged out successfully", { id: loading });
    } catch (error) {
      toast.error("Something went wrong", { id: loading });
      return;
    }
    redirect("/login");
  };

  return (
    <nav className="bg-white/90 backdrop-blur sticky top-0 z-50 shadow-sm transition-all duration-300">
      {/* Top Bar */}
      <div className="bg-[#f97316] text-white text-[11px] py-1.5 px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-8">
            <span className="flex items-center gap-1.5 opacity-90"><Mail size={12} /> mazedulislam223311@gmail.com</span>
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
          <li><Link href="/about" className={`${isActive("/about")} hover:text-orange-500 transition-colors`}>About</Link></li>
          <li><Link href="/browse-meals" className={`${isActive("/browse-meals")} hover:text-orange-500 transition-colors`}>Menu</Link></li>
          <li><Link href="/provider" className={`${isActive("/provider")} hover:text-orange-500 transition-colors`}>Provider</Link></li>
          <li><Link href="/blog" className={`${isActive("/blog")} hover:text-orange-500 transition-colors`}>Blog</Link></li>
          <li><Link href="/contact" className={`${isActive("/contact")} hover:text-orange-500 transition-colors`}>Contact</Link></li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* Cart */}
          <Link href="/cart">
            <button className="relative text-slate-700 hover:text-orange-500 transition-colors p-2">
              <ShoppingCart size={22} />
              {mounted && itemCount > 0 && (
                <span className="absolute top-0 right-0 text-[10px] bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </Link>

          {/* User Profile (Mobile & Desktop) */}
          <div className="flex items-center">
            {mounted && (
              isPending ? (
                <div className="w-8 h-8 bg-slate-100 animate-pulse rounded-full" />
              ) : session ? (
                <Link href="/dashboard" className="flex items-center gap-2 text-slate-700 hover:text-orange-500 transition-colors">
                  <User size={22} className="lg:w-5 lg:h-5" />
                  <span className="hidden lg:block text-sm font-medium">
                    {session.user.name}
                  </span>
                </Link>
              ) : (
                <Link href="/login" className="lg:block">
                  <button className="hidden lg:block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow transition-all active:scale-95">
                    Login
                  </button>
                  {/* User Icon for Mobile Login */}
                  <div className="lg:hidden text-slate-700 hover:text-orange-500 p-2">
                    <User size={24} />
                  </div>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-slate-700 hover:text-orange-500 p-2 transition-colors relative z-50"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full z-[60] transform ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          } transition-all duration-500 ease-in-out bg-white shadow-2xl rounded-b-[2rem] border-b border-orange-100 overflow-hidden`}
      >
        <div className="flex flex-col p-8 pt-10 space-y-8 relative">
          {/* Header inside dropdown */}
          <div className="flex justify-between items-center pb-4 border-b border-slate-50">
            <div className="text-xl font-extrabold text-slate-900">
              <span className="text-orange-500">Food</span>Station
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 bg-slate-50 text-slate-500 rounded-full hover:bg-orange-100 hover:text-orange-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <ul className="flex flex-col gap-5 font-bold text-lg text-slate-800">
            <li><Link href="/" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-3 ${isActive("/")}`}> <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Home</Link></li>
            <li><Link href="/about" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-3 ${isActive("/about")}`}> <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> About</Link></li>
            <li><Link href="/browse-meals" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-3 ${isActive("/browse-meals")}`}> <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Menu</Link></li>
            <li><Link href="/provider" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-3 ${isActive("/provider")}`}> <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Provider</Link></li>
            <li><Link href="/blog" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-3 ${isActive("/blog")}`}> <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Blog</Link></li>
            <li><Link href="/contact" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-3 ${isActive("/contact")}`}> <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Contact</Link></li>
          </ul>

          <div className="pt-4 flex flex-col gap-4">
            {mounted && !isPending && (
              session ? (
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                      {session.user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{session.user.name}</p>
                      <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-xs text-orange-600 font-semibold underline">Dashboard</Link>
                    </div>
                  </div>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="text-xs font-bold text-red-500 hover:text-red-600 px-4 py-2 bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                    <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold active:scale-95 transition-all shadow-lg shadow-orange-100">
                      Login
                    </button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)} className="w-full">
                    <button className="w-full border-2 border-slate-900 text-slate-900 py-4 rounded-2xl font-bold active:scale-95 transition-all">
                      Join Free
                    </button>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Backdrop for Mobile Menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

    </nav>
  );
}