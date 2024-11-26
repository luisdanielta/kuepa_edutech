import { jwtDecode } from "jwt-decode"
import { ApiClient } from "../clients/apiClient"
import { Endpoints } from "../endpoints"
import { TokenStorage } from "../../utils/tokenStorage"
import { User } from "@/domain/entities/User"

const apiClient = ApiClient.getInstance()

interface DecodedToken {
  id: string
  name: string
  username: string
  email: string
  role: "user" | "moderator"
  exp: number // Token expiration time
}

export const AuthService = {
  // Logs in the user and returns the user instance and token
  login: async (
    username: string,
    password: string,
  ): Promise<{ user: User; token: string }> => {
    try {
      const response = await apiClient.request<{ token: string }>(
        Endpoints.auth.login,
        {
          method: "POST",
          body: { username, password },
        },
      )

      const token = response.data.token

      // Decode the token
      const decoded = jwtDecode<DecodedToken>(token)

      // Create a User instance
      const user = new User(
        decoded.id,
        decoded.name,
        decoded.username,
        decoded.email,
        "", // Password is never stored on the client
        new Date(),
        true,
        decoded.role,
      )

      // Store the token in TokenStorage
      TokenStorage.setToken(token)

      return { user, token }
    } catch (error) {
      console.error("Error during login:", error)
      throw new Error(
        error.response?.data?.message || "Failed to log in. Please try again.",
      )
    }
  },

  // Registers a new user and returns the user instance and token
  signup: async (
    username: string,
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> => {
    try {
      const response = await apiClient.request<{ token: string }>(
        Endpoints.auth.signup,
        {
          method: "POST",
          body: { username, email, password },
        },
      )

      const token = response.data.token

      // Decode the token
      const decoded = jwtDecode<DecodedToken>(token)

      // Create a User instance
      const user = new User(
        decoded.id,
        decoded.name,
        decoded.username,
        decoded.email,
        "", // Password is never stored on the client
        new Date(),
        true,
        decoded.role,
      )

      // Store the token in TokenStorage
      TokenStorage.setToken(token)

      return { user, token }
    } catch (error) {
      console.error("Error during signup:", error)
      throw new Error(
        error.response?.data?.message || "Failed to sign up. Please try again.",
      )
    }
  },

  // Logs out the user and clears storage
  logout: async (): Promise<void> => {
    try {
      TokenStorage.clearToken()
      await apiClient.request(Endpoints.auth.logout, { method: "POST" })
    } catch (error) {
      console.error("Error during logout:", error)
      throw new Error("Failed to log out. Please try again.")
    }
  },

  // Checks if the user is authenticated
  isAuthenticated: (): boolean => {
    const token = TokenStorage.getToken()
    if (!token) return false

    try {
      const decoded = jwtDecode<DecodedToken>(token)
      const isExpired = decoded.exp * 1000 < Date.now()
      if (isExpired) {
        TokenStorage.clearToken()
        return false
      }
      return true
    } catch (error) {
      console.error("Error decoding token:", error)
      return false
    }
  },

  // Retrieves the user's role from the token
  getRole: (): "user" | "moderator" | null => {
    const token = TokenStorage.getToken()
    if (!token) return null

    try {
      const decoded = jwtDecode<DecodedToken>(token)
      return decoded.role
    } catch (error) {
      console.error("Error decoding token:", error)
      return null
    }
  },

  // Retrieves the user instance from the token
  getUserFromToken: (): User | null => {
    const token = TokenStorage.getToken()
    if (!token) return null

    try {
      const decoded = jwtDecode<DecodedToken>(token)
      return new User(
        decoded.id,
        decoded.name,
        decoded.username,
        decoded.email,
        "",
        new Date(),
        true,
        decoded.role,
      )
    } catch (error) {
      console.error("Error decoding token:", error)
      return null
    }
  },
}
