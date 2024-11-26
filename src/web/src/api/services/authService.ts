import { jwtDecode } from "jwt-decode"
import { ApiClient } from "../clients/apiClient"
import { Endpoints } from "../endpoints"
import { TokenStorage } from "../../utils/tokenStorage"

const apiClient = ApiClient.getInstance()

interface DecodedToken {
  role: "user" | "moderator"
  exp: number
}

export const AuthService = {
  login: async (username: string, password: string) => {
    const response = await apiClient.request<{ token: string }>(
      Endpoints.auth.login,
      {
        method: "POST",
        body: { username, password },
      },
    )

    const token = response.data.token
    TokenStorage.setToken(token)

    // Decodificar roles y guardarlos
    const decoded = jwtDecode<DecodedToken>(token)
    TokenStorage.setRole(decoded.role)

    return response
  },

  signup: async (username: string, email: string, password: string) => {
    const response = await apiClient.request<{ token: string }>(
      Endpoints.auth.signup,
      {
        method: "POST",
        body: { username, email, password },
      },
    )

    const token = response.data.token
    TokenStorage.setToken(token)

    // Decodificar roles y guardarlos
    const decoded = jwtDecode<DecodedToken>(token)
    TokenStorage.setRole(decoded.role)

    return response
  },

  logout: async () => {
    TokenStorage.clearToken()
    TokenStorage.clearRole()
    return apiClient.request(Endpoints.auth.logout, { method: "POST" })
  },

  isAuthenticated: (): boolean => {
    const token = TokenStorage.getToken()
    return !!token
  },

  getRole: (): "user" | "moderator" | null => {
    return TokenStorage.getRole()
  },
}
