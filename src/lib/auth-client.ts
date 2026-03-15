import { createAuthClient } from "better-auth/react"

const url = process.env.API_URL || "http://localhost:5000"
export const authClient = createAuthClient({
  baseURL: url
})