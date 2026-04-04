"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  Users,
  ShoppingBag,
  Utensils,
  Settings,
  LayoutDashboard,
  Package,
  PlusCircle,
  ChevronRight
} from "lucide-react";
import { userService } from "@/services/userService";
import { mealService, TMeal } from "@/services/mealService";
import { orderService } from "@/services/orderService";
import { toast } from "sonner";
import { Role } from "@/constants/role";

// Component Imports
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewTab from "@/components/dashboard/OverviewTab";
import UserManagementTab from "@/components/dashboard/UserManagementTab";
import AllMealsTab from "@/components/dashboard/AllMealsTab";
import AddMealTab from "@/components/dashboard/AddMealTab";
import MyOrdersTab from "@/components/dashboard/MyOrdersTab";
import GlobalOrdersTab from "@/components/dashboard/GlobalOrdersTab";
import DeleteUserModal from "@/components/dashboard/DeleteUserModal";
import SettingsTab from "@/components/dashboard/SettingsTab";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [mounted, setMounted] = useState(false);

  // States
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [meals, setMeals] = useState<TMeal[]>([]);
  const [loadingMeals, setLoadingMeals] = useState(false);
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    else if (activeTab === "all-meals") fetchMeals();
    else if (activeTab === "orders") fetchMyOrders();
    else if (activeTab === "all-orders") fetchAllOrders();
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

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    const loading = toast.loading(`Updating order to ${status}...`);
    try {
      const result = await orderService.updateOrderStatus(orderId, status);
      if (result.success) {
        toast.success("Order status updated", { id: loading });
        fetchAllOrders();
      } else {
        toast.error(result.message || "Failed to update status", { id: loading });
      }
    } catch (err) {
      toast.error("An error occurred", { id: loading });
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

  if (!mounted || isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const user = session.user;
  const role = (user as any).role || Role.USER;

  const sidebarLinks = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    ...(role === Role.ADMIN ? [{ id: "users", label: "All Users", icon: Users }] : []),
    ...(role === Role.ADMIN || role === Role.PROVIDER ? [{ id: "all-orders", label: "All Orders", icon: Package }] : []),
    ...(role === Role.PROVIDER || role === Role.ADMIN ? [
      { id: "all-meals", label: "All Meals", icon: Utensils },
      { id: "add-meal", label: "Add New Meal", icon: PlusCircle },
    ] : []),
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-outfit">
      {deleteConfirm && (
        <DeleteUserModal
          onCancel={() => setDeleteConfirm(null)}
          onDelete={handleDeleteUser}
        />
      )}

      <DashboardSidebar
        sidebarLinks={sidebarLinks}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <DashboardHeader user={user} role={role} />

        <main className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12">
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === "overview" && (
              <OverviewTab role={role} setActiveTab={setActiveTab} />
            )}

            {activeTab === "users" && role === Role.ADMIN && (
              <UserManagementTab
                users={users}
                loadingUsers={loadingUsers}
                fetchUsers={fetchUsers}
                handleUpdateRole={handleUpdateRole}
                handleUpdateStatus={handleUpdateStatus}
                setDeleteConfirm={setDeleteConfirm}
              />
            )}

            {activeTab === "all-meals" && (
              <AllMealsTab
                meals={meals}
                loadingMeals={loadingMeals}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === "add-meal" && (role === Role.ADMIN || role === Role.PROVIDER) && (
              <AddMealTab
                session={session}
                setActiveTab={setActiveTab}
                fetchMeals={fetchMeals}
              />
            )}

            {activeTab === "orders" && (
              <MyOrdersTab
                myOrders={myOrders}
                loadingOrders={loadingOrders}
                fetchMyOrders={fetchMyOrders}
              />
            )}

            {activeTab === "all-orders" && (role === Role.ADMIN || role === Role.PROVIDER) && (
              <GlobalOrdersTab
                allOrders={allOrders}
                loadingOrders={loadingOrders}
                fetchAllOrders={fetchAllOrders}
                handleUpdateOrderStatus={handleUpdateOrderStatus}
                role={role}
              />
            )}

            {activeTab === "settings" && (
              <SettingsTab user={user} />
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== "overview" && activeTab !== "users" && activeTab !== "all-meals" &&
              activeTab !== "add-meal" && activeTab !== "orders" && activeTab !== "all-orders" && activeTab !== "settings" && (
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
