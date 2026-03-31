import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const userService = {
  getProviders: async function () {
    try {
      const res = await fetch(`${API_URL}/user/providers`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const result = await res.json();
      return { data: result.data ?? [], error: null };
    } catch (err) {
      console.error("[userService.getProviders]", err);
      return { data: [], error: { message: "Failed to fetch providers" } };
    }
  },

  getAllUsers: async function () {
    try {
      const res = await fetch(`${API_URL}/user`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const result = await res.json();
      return { data: result.data ?? [], error: null };
    } catch (err) {
      console.error("[userService.getAllUsers]", err);
      return { data: [], error: { message: "Failed to fetch users" } };
    }
  },


  updateUser: async function (id: string, data: any) {
    try {
      const res = await fetch(`${API_URL}/user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return { data: result.data, error: null };
    } catch (err) {
      console.error("[userService.updateUser]", err);
      return { data: null, error: { message: "Failed to update user" } };
    }
  },


  deleteUser: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/user/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res.json();
      return { data: result.data, error: null };
    } catch (err) {
      console.error("[userService.deleteUser]", err);
      return { data: null, error: { message: "Failed to delete user" } };
    }
  },
};