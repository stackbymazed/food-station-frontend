import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://food-station-backend.vercel.app",
  fetchOptions: {
    credentials: "include", // Ensure cookies are included for cross-origin requests
  },
})