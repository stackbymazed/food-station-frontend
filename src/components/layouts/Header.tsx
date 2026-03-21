"use client";

import {
  ShoppingCart,
  User,
} from "lucide-react";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function Header() {

  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

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

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-extrabold text-slate-900">
          <span className="text-orange-500">Food</span>Station
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-8 font-medium">

          <li>
            <Link href="/" className={`${isActive("/")} hover:text-orange-500`}>
              Home
            </Link>
          </li>

          <li>
            <Link href="/browse-meals" className={`${isActive("/browse-meals")} hover:text-orange-500`}>
              Browse Meals
            </Link>
          </li>

          <li>
            <Link href="/provider" className={`${isActive("/provider")} hover:text-orange-500`}>
              Provider
            </Link>
          </li>

          <li>
            <Link href="/checkout" className={`${isActive("/checkout")} hover:text-orange-500`}>
              Checkout
            </Link>
          </li>

          <li>
            <Link href="/orders" className={`${isActive("/orders")} hover:text-orange-500`}>
              My Orders
            </Link>
          </li>

          <li>
            <Link href="/add-meal" className={`${isActive("/add-meal")} hover:text-orange-500`}>
              Add Meal
            </Link>
          </li>

        </ul>

        {/* Actions */}
        <div className="flex items-center gap-5">

          {/* Cart */}
          <button className="relative text-slate-700 hover:text-orange-500">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

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