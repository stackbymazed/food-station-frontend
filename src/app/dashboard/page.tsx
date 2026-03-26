"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { 
  Users, 
  ShoppingBag, 
  Utensils, 
  Settings, 
  BarChart3, 
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Package,
  PlusCircle,
  Truck,
  TrendingUp,
  Search,
  Bell,
  MoreVertical,
  Star,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Calendar,
  CreditCard,
  MapPin
} from "lucide-react";
import Link from "next/link";
import { userService } from "@/services/userService";
import { mealService, TMeal } from "@/services/mealService";
import { orderService } from "@/services/orderService";
import { toast } from "sonner";
import MealCard from "@/components/layouts/MealCard";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Users tracking
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Meals tracking
  const [meals, setMeals] = useState<TMeal[]>([]);
  const [loadingMeals, setLoadingMeals] = useState(false);

  // Orders tracking
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "all-meals") {
      fetchMeals();
    } else if (activeTab === "orders") {
      fetchMyOrders();
    } else if (activeTab === "all-orders") {
      fetchAllOrders();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data } = await userService.getAllUsers();
      setUsers(data || []);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchMeals = async () => {
    setLoadingMeals(true);
    try {
      const { data } = await mealService.getAllMeals();
      setMeals(data || []);
    } catch (err) {
      toast.error("Failed to load meals");
    } finally {
      setLoadingMeals(false);
    }
  };

  const fetchMyOrders = async () => {
    if (!session?.user?.id) return;
    setLoadingOrders(true);
    try {
      const result = await orderService.getUserOrders(session.user.id);
      setMyOrders(result.data || []);
    } catch (err) {
      toast.error("Failed to load your orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchAllOrders = async () => {
    setLoadingOrders(true);
    try {
      const result = await orderService.getAllOrders();
      setAllOrders(result.data || []);
    } catch (err) {
      toast.error("Failed to load all orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateRole = async (userId: string, role: string) => {
    const loading = toast.loading("Updating role...");
    try {
      await userService.updateUser(userId, { role });
      toast.success("Role updated", { id: loading });
      fetchUsers();
    } catch (err) {
      toast.error("Update failed", { id: loading });
    }
  };

  const handleUpdateStatus = async (userId: string, status: string) => {
    const loading = toast.loading("Updating status...");
    try {
      await userService.updateUser(userId, { status });
      toast.success("Status updated", { id: loading });
      fetchUsers();
    } catch (err) {
      toast.error("Update failed", { id: loading });
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteConfirm) return;
    const loading = toast.loading("Deleting user...");
    try {
      await userService.deleteUser(deleteConfirm);
      toast.success("User deleted successfully", { id: loading });
      setDeleteConfirm(null);
      fetchUsers();
    } catch (err) {
      toast.error("Delete failed", { id: loading });
    }
  };

  if (!mounted) return null;

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;
  const role = (user as any).role || "user";

  const sidebarLinks = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    ...(role === "admin" ? [
      { id: "users", label: "All Users", icon: Users },
      { id: "all-orders", label: "All Orders", icon: Package },
    ] : []),
    ...(role === "provider" || role === "admin" ? [
      { id: "all-meals", label: "All Meals", icon: Utensils },
      { id: "add-meal", label: "Add New Meal", icon: PlusCircle, href: "/add-meal" },
    ] : []),
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-outfit">
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                 <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-black text-center text-slate-900 mb-2">Delete User?</h3>
              <p className="text-slate-500 text-center text-sm mb-8 leading-relaxed">Are you sure you want to delete this user permanently? This action cannot be undone.</p>
              <div className="flex gap-4">
                 <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-6 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">Cancel</button>
                 <button onClick={handleDeleteUser} className="flex-1 px-6 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 active:scale-95 transition-all">Delete</button>
              </div>
           </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-72 bg-[#1e293b] text-slate-300 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8 mb-4">
          <Link href="/" className="text-2xl font-black text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30">FS</div>
            FoodStation
          </Link>
        </div>

        <div className="px-6 mb-4">
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 px-4 mb-4">Main Menu</p>
          <nav className="space-y-1.5 font-bold">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              
              return link.href ? (
                <Link
                  key={link.id}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-slate-800 hover:text-white transition-all text-sm group"
                >
                  <Icon size={18} className="text-slate-500 group-hover:text-orange-500 transition-colors" />
                  {link.label}
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ) : (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-sm group ${
                    isActive
                      ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20"
                      : "hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={18} className={`${isActive ? "text-white" : "text-slate-500 group-hover:text-orange-500"} transition-colors`} />
                  {link.label}
                </button>
              );
            })}
            
            <button
               onClick={async () => { await authClient.signOut(); router.push("/login"); }}
               className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-sm font-bold text-red-400 hover:bg-red-500/10 group mt-4 border border-red-500/20"
            >
               <LogOut size={18} className="text-red-500" />
               Sign Out
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
           <div className="bg-slate-800/50 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Server Status: Live</p>
              </div>
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                 <div className="h-full bg-orange-500 w-[85%] rounded-full"></div>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header Section */}
        <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-8 lg:px-12 shrink-0">
           <div className="flex items-center gap-4 bg-slate-50 px-4 py-3 rounded-2xl w-96 border border-slate-200">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search for data, orders, meals..." className="bg-transparent outline-none text-sm w-full font-medium" />
           </div>

           <div className="flex items-center gap-6">
              <button className="relative w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all">
                 <Bell size={20} />
                 <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="h-10 w-[1px] bg-slate-200 hidden md:block"></div>

              <div className="flex items-center gap-4">
                 <div className="text-right hidden md:block">
                    <p className="text-sm font-black text-slate-900 leading-none mb-1">{user.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{role} Membership</p>
                 </div>
                 <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-black shadow-inner">
                    {user.name?.[0].toUpperCase()}
                 </div>
              </div>
           </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12">
           <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                   {/* Overview Tab Content (Same as before) */}
                   <div className="lg:col-span-2 space-y-12">
                      <div className="flex items-center justify-between">
                         <div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight">System Overview</h2>
                            <p className="text-slate-500 font-medium">Monitoring real-time performance and metrics.</p>
                         </div>
                         <div className="flex gap-2">
                            <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 shadow-sm">Monthly</button>
                            <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-black/10">Weekly</button>
                         </div>
                      </div>

                      {/* Stats */}
                      <div className="grid md:grid-cols-3 gap-6">
                         {[
                           { label: "Gross Revenue", val: "$24,580.00", change: "+12.5%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
                           { label: "New Customers", val: "1,240", change: "+8.2%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                           { label: "Active Orders", val: "842", change: "+24.1%", icon: ShoppingBag, color: "text-orange-600", bg: "bg-orange-50" },
                         ].map((item, i) => (
                           <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
                              <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                                 <item.icon size={24} />
                              </div>
                              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
                              <div className="flex items-end gap-3">
                                 <h3 className="text-2xl font-black text-slate-900 leading-none">{item.val}</h3>
                                 <span className={`text-[10px] font-black ${item.color} mb-1`}>{item.change}</span>
                              </div>
                           </div>
                         ))}
                      </div>

                      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
                         <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-xl font-black text-slate-900">Recent Transactions</h3>
                            <button onClick={() => setActiveTab(role === "admin" ? "all-orders" : "orders")} className="text-orange-500 font-bold text-sm hover:underline">View All</button>
                         </div>
                         <div className="overflow-x-auto">
                            <table className="w-full text-left">
                               <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                  <tr>
                                     <th className="px-8 py-4">Transaction ID</th>
                                     <th className="px-8 py-4">Customer</th>
                                     <th className="px-8 py-4">Status</th>
                                     <th className="px-8 py-4">Amount</th>
                                  </tr>
                               </thead>
                               <tbody className="divide-y divide-slate-50">
                                  {[1, 2, 3].map((idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                       <td className="px-8 py-5 text-sm font-bold text-slate-900">#ORD-942{idx}</td>
                                       <td className="px-8 py-5">
                                          <div className="flex items-center gap-3">
                                             <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black">JS</div>
                                             <span className="text-sm font-bold text-slate-700">John Smith</span>
                                          </div>
                                       </td>
                                       <td className="px-8 py-5">
                                          <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-black rounded-full uppercase tracking-tighter">Completed</span>
                                       </td>
                                       <td className="px-8 py-5 text-sm font-black text-slate-900">$124.50</td>
                                    </tr>
                                  ))}
                               </tbody>
                            </table>
                         </div>
                      </div>
                   </div>

                   {/* Right: Sidebar */}
                   <div className="space-y-12">
                      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                         <div className="relative z-10">
                            <h3 className="text-2xl font-black mb-4">Launch New Meal</h3>
                            <p className="text-slate-400 text-sm mb-8 leading-relaxed">Expand your menu and reach thousands of customers in minutes.</p>
                            <Link href="/add-meal" className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-sm inline-flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg active:scale-95">
                               <PlusCircle size={18} /> Add Meal
                            </Link>
                         </div>
                      </div>

                      <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                         <h2 className="text-lg font-black text-slate-900 mb-8 flex items-center justify-between">Top Rated Foods <Star size={16} className="text-orange-500 fill-orange-500" /></h2>
                         <div className="space-y-6">
                            {[
                               { name: "Spicy Beef Burger", cat: "Burger", price: "$45", sales: 124 },
                               { name: "Cheese Pizza Large", cat: "Pizza", price: "$65", sales: 98 },
                            ].map((food, i) => (
                               <div key={i} className="flex items-center gap-4">
                                  <div className="w-14 h-14 bg-slate-100 rounded-2xl shrink-0"></div>
                                  <div className="flex-1">
                                     <p className="text-sm font-bold text-slate-900 leading-none mb-1">{food.name}</p>
                                     <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{food.cat}</p>
                                  </div>
                                  <div className="text-right">
                                     <p className="text-sm font-black text-slate-900">{food.price}</p>
                                     <p className="text-[10px] text-green-500 font-bold">{food.sales} sold</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {/* Users Management Tab */}
              {activeTab === "users" && role === "admin" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all">
                   <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">User Management</h2>
                        <p className="text-slate-500 font-medium">Manage user roles, account status, and permissions.</p>
                      </div>
                      <button onClick={fetchUsers} className={`p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all ${loadingUsers ? 'animate-spin' : ''}`}>
                         <TrendingUp size={20} className="text-slate-400" />
                      </button>
                   </div>

                   <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden ring-1 ring-slate-100">
                      <div className="overflow-x-auto">
                         <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-[0.1em]">
                               <tr>
                                  <th className="px-10 py-6">User</th>
                                  <th className="px-10 py-6">Role</th>
                                  <th className="px-10 py-6">Status</th>
                                  <th className="px-10 py-6 text-center">Actions</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 font-medium">
                               {loadingUsers ? (
                                 [1, 2, 3].map(i => (
                                   <tr key={i} className="animate-pulse">
                                      <td colSpan={4} className="px-10 py-8 bg-slate-50/30"></td>
                                   </tr>
                                 ))
                               ) : users.length > 0 ? (
                                 users.map((u) => (
                                   <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                                      <td className="px-10 py-6">
                                         <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black">
                                               {u.name?.[0]?.toUpperCase()}
                                            </div>
                                            <div>
                                               <p className="font-black text-slate-900">{u.name}</p>
                                               <p className="text-xs text-slate-400">{u.email}</p>
                                            </div>
                                         </div>
                                      </td>
                                      <td className="px-10 py-6">
                                         <select 
                                           value={u.role || "user"} 
                                           onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                                           className={`bg-slate-50 border-none outline-none ring-1 ring-slate-200 py-2 px-4 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer focus:ring-orange-500 transition-all ${
                                             u.role === "admin" ? "text-purple-600 ring-purple-100 bg-purple-50" : 
                                             u.role === "provider" ? "text-blue-600 ring-blue-100 bg-blue-50" : "text-slate-600"
                                           }`}
                                         >
                                            <option value="user">User</option>
                                            <option value="provider">Provider</option>
                                            <option value="admin">Admin</option>
                                         </select>
                                      </td>
                                      <td className="px-10 py-6">
                                         <div className="flex items-center gap-3">
                                            {u.status === "active" ? <CheckCircle2 size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-400" />}
                                            <select 
                                              value={u.status || "active"} 
                                              onChange={(e) => handleUpdateStatus(u.id, e.target.value)}
                                              className="bg-transparent border-none outline-none text-xs font-bold text-slate-600 cursor-pointer hover:text-orange-500 transition-colors"
                                            >
                                               <option value="active">Active</option>
                                               <option value="inactive">Inactive</option>
                                            </select>
                                         </div>
                                      </td>
                                      <td className="px-10 py-6 text-center">
                                         <button 
                                           onClick={() => setDeleteConfirm(u.id)}
                                           className="w-10 h-10 rounded-xl border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all flex items-center justify-center mx-auto"
                                         >
                                            <Trash2 size={18} />
                                         </button>
                                      </td>
                                   </tr>
                                 ))
                               ) : (
                                 <tr>
                                    <td colSpan={4} className="px-10 py-20 text-center text-slate-400 italic">No users found.</td>
                                 </tr>
                               )}
                            </tbody>
                         </table>
                      </div>
                   </div>
                </div>
              )}

              {/* All Meals Tab */}
              {activeTab === "all-meals" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="flex items-center justify-between">
                      <div>
                         <h2 className="text-4xl font-black text-slate-900 tracking-tight">All Delicious Meals</h2>
                         <p className="text-slate-500 font-medium">Explore and manage all the amazing dishes available in FoodStation.</p>
                      </div>
                      <Link href="/add-meal" className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-orange-600 shadow-xl shadow-orange-500/20 active:scale-95 transition-all">
                         <PlusCircle size={18} /> Add New Meal
                      </Link>
                   </div>

                   {loadingMeals ? (
                     <div className="min-h-[400px] flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                        <p className="text-slate-400 font-bold animate-pulse">Fetching the best recipes...</p>
                     </div>
                   ) : meals.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                        {meals.map((meal) => (
                           <MealCard key={meal.id} food={meal} />
                        ))}
                     </div>
                   ) : (
                     <div className="bg-white rounded-[40px] p-20 text-center border border-slate-100 shadow-sm">
                        <Utensils size={64} className="mx-auto text-slate-200 mb-6" />
                        <h3 className="text-2xl font-black text-slate-900 mb-2">No Meals Found</h3>
                        <p className="text-slate-500 mb-8">It looks like the kitchen is empty. Start adding some delicious food!</p>
                        <Link href="/add-meal" className="text-orange-500 font-black flex items-center gap-2 justify-center hover:gap-3 transition-all">Get Started <ChevronRight size={18} /></Link>
                     </div>
                   )}
                </div>
              )}

              {/* My Orders Tab */}
              {activeTab === "orders" && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                   <div className="flex items-center justify-between">
                      <div>
                         <h2 className="text-4xl font-black text-slate-900 tracking-tighter">My Orders</h2>
                         <p className="text-slate-500 font-medium">Track your delicious meals and past feasts.</p>
                      </div>
                      <button onClick={fetchMyOrders} className="p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-slate-400 hover:text-orange-500">
                         <TrendingUp size={20} />
                      </button>
                   </div>

                   {loadingOrders ? (
                      <div className="min-h-[400px] flex flex-col items-center justify-center">
                         <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-6" />
                         <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">Retrieving Order History...</p>
                      </div>
                   ) : myOrders.length > 0 ? (
                      <div className="grid grid-cols-1 gap-8">
                         {myOrders.map((order) => (
                            <div key={order.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-10 hover:shadow-xl transition-all group overflow-hidden relative">
                               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-orange-500/10 transition-colors" />
                               
                               <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
                                  {/* Info */}
                                  <div className="flex-1 space-y-6">
                                     <div className="flex items-center gap-4">
                                        <div className="px-4 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-black tracking-widest uppercase">#{order.id.slice(-6)}</div>
                                        <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase ${
                                           order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-600' : 
                                           order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                                        }`}>{order.status}</div>
                                     </div>
                                     
                                     <div className="flex flex-wrap gap-10">
                                        <div className="space-y-1">
                                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ordered On</p>
                                           <div className="flex items-center gap-2 text-slate-900 font-bold">
                                              <Calendar size={16} className="text-orange-500" />
                                              {new Date(order.createdAt).toLocaleDateString()}
                                           </div>
                                        </div>
                                        <div className="space-y-1">
                                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Bill</p>
                                           <div className="flex items-center gap-2 text-slate-900 font-black text-xl">
                                              <CreditCard size={18} className="text-orange-500" />
                                              ${order.totalAmount.toFixed(2)}
                                           </div>
                                        </div>
                                     </div>
                                  </div>

                                  {/* Items */}
                                  <div className="flex gap-4 overflow-x-auto pb-4 max-w-full lg:max-w-md">
                                     {order.items.map((item: any, i: number) => (
                                        <div key={i} className="w-20 h-20 rounded-[24px] bg-slate-50 border border-slate-100 p-1 shrink-0 group-hover:border-orange-200 transition-colors relative">
                                           <img src={item.meal.mainImage} alt="food" className="w-full h-full object-cover rounded-[20px]" />
                                           <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-600 text-white text-[10px] font-black flex items-center justify-center rounded-lg shadow-lg">x{item.quantity}</div>
                                        </div>
                                     ))}
                                  </div>

                                  <button className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-all active:scale-95">
                                     <ChevronRight size={24} />
                                  </button>
                               </div>
                            </div>
                         ))}
                      </div>
                   ) : (
                      <div className="bg-white rounded-[40px] p-24 text-center border border-slate-100 shadow-sm space-y-8">
                         <div className="w-32 h-32 bg-slate-50 rounded-[48px] mx-auto flex items-center justify-center text-slate-200">
                            <ShoppingBag size={64} />
                         </div>
                         <div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">No Orders Yet</h3>
                            <p className="text-slate-500 max-w-xs mx-auto font-medium">Your hunger adventure hasn't started yet. Let's find something delicious!</p>
                         </div>
                         <Link href="/browse-meals" className="px-10 py-5 bg-orange-600 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] inline-block shadow-xl shadow-orange-500/20">Explore Menu</Link>
                      </div>
                   )}
                </div>
              )}

              {/* All Orders Tab (Admin) */}
              {activeTab === "all-orders" && role === "admin" && (
                <div className="space-y-12 animate-in fade-in duration-700">
                   <div className="flex items-center justify-between">
                      <div>
                         <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Global Orders</h2>
                         <p className="text-slate-500 font-medium">Monitoring all customer feasts and food trafficking.</p>
                      </div>
                      <button onClick={fetchAllOrders} className="p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-slate-400">
                         <TrendingUp size={20} />
                      </button>
                   </div>

                   <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden overflow-x-auto">
                      <table className="w-full text-left">
                         <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            <tr>
                               <th className="px-10 py-8">Customer</th>
                               <th className="px-10 py-8">Order ID</th>
                               <th className="px-10 py-8">Status</th>
                               <th className="px-10 py-8">Items</th>
                               <th className="px-10 py-8 text-right">Revenue</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-50">
                            {loadingOrders ? (
                               [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan={5} className="px-10 py-8 bg-slate-50/30"></td></tr>)
                            ) : allOrders.map((order) => (
                               <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="px-10 py-8">
                                     <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xs">{order.user.name[0]}</div>
                                        <div>
                                           <p className="font-black text-slate-900 text-sm leading-none mb-1">{order.user.name}</p>
                                           <p className="text-[10px] text-slate-400 font-bold">{order.user.email}</p>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="px-10 py-8 font-bold text-slate-500 text-xs">#{order.id.slice(-8)}</td>
                                  <td className="px-10 py-8 text-center bg-slate-50/50">
                                     <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-tighter uppercase ${
                                       order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                                     }`}>{order.status}</span>
                                  </td>
                                  <td className="px-10 py-8">
                                     <div className="flex -space-x-3">
                                        {order.items.slice(0, 3).map((item: any, i: number) => (
                                           <div key={i} className="w-10 h-10 rounded-xl border-2 border-white overflow-hidden shadow-sm">
                                              <img src={item.meal.mainImage} alt="meal" className="w-full h-full object-cover" />
                                           </div>
                                        ))}
                                        {order.items.length > 3 && (
                                           <div className="w-10 h-10 rounded-xl border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">+{order.items.length - 3}</div>
                                        )}
                                     </div>
                                  </td>
                                  <td className="px-10 py-8 text-right font-black text-slate-900 text-lg">${order.totalAmount.toFixed(2)}</td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
              )}

              {/* Handle other tabs */}
              {activeTab !== "overview" && activeTab !== "users" && activeTab !== "all-meals" && activeTab !== "orders" && activeTab !== "all-orders" && (
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
                   <div className="w-24 h-24 bg-slate-100 rounded-[32px] flex items-center justify-center text-slate-300">
                      <LayoutDashboard size={48} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">Modules Loading...</h3>
                      <p className="text-slate-500 max-w-sm font-medium">This module ({activeTab}) is currently under development.</p>
                   </div>
                   <button onClick={() => setActiveTab("overview")} className="text-orange-500 font-black flex items-center gap-2">Return Home <ChevronRight size={18} /></button>
                </div>
              )}
           </section>
        </main>
      </div>
    </div>
  );
}
