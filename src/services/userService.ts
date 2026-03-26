import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const userService = {
  /**
   * GET /user
   * Fetch all users (Admin only)
   */
  getAllUsers: async function () {
    try {
      const res = await fetch(`${API_URL}/user`, {
        method: "GET",
        cache: "no-store",
      });
      const result = await res.json();
      return { data: result.data ?? [], error: null };
    } catch (err) {
      console.error("[userService.getAllUsers]", err);
      return { data: [], error: { message: "Failed to fetch users" } };
    }
  },

  /**
   * PATCH /user/:id
   * Update user details or role
   */
  updateUser: async function (id: string, data: any) {
    try {
      const res = await fetch(`${API_URL}/user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return { data: result.data, error: null };
    } catch (err) {
      console.error("[userService.updateUser]", err);
      return { data: null, error: { message: "Failed to update user" } };
    }
  },

  /**
   * DELETE /user/:id
   * Remove a user (Admin only)
   */
  deleteUser: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/user/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      return { data: result.data, error: null };
    } catch (err) {
      console.error("[userService.deleteUser]", err);
      return { data: null, error: { message: "Failed to delete user" } };
    }
  },
};