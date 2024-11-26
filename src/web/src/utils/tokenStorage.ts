const TOKEN_KEY = "jwt_token"
const ROLE_KEY = "user_role"

export const TokenStorage = {
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token)
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY)
  },

  clearToken: (): void => {
    localStorage.removeItem(TOKEN_KEY)
  },

  setRole: (role: "user" | "moderator"): void => {
    localStorage.setItem(ROLE_KEY, role)
  },

  getRole: (): "user" | "moderator" | null => {
    return localStorage.getItem(ROLE_KEY) as "user" | "moderator" | null
  },

  clearRole: (): void => {
    localStorage.removeItem(ROLE_KEY)
  },
}
