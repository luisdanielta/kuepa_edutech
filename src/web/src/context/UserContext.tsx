import React, { createContext, useState } from "react"
import { TokenStorage } from "@/utils/tokenStorage"
import { User } from "@/domain/entities/User"

// Define the structure of the UserContext
interface UserContextType {
  user: User | null // Stores the authenticated user or null if not logged in
  isAuthenticated: boolean // Indicates if the user is logged in
  login: (userData: User, token: string) => void // Logs in the user
  logout: () => void // Logs out the user
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined)

// Provider component for UserContext
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)

  // Log in the user by setting the token and user state
  const login = (userData: User, token: string) => {
    TokenStorage.setToken(token) // Save the token in local storage
    setUser(userData) // Save the user data in the context
  }

  // Log out the user by clearing the token and user state
  const logout = () => {
    TokenStorage.clearToken() // Clear the token from local storage
    setUser(null) // Clear the user data from the context
  }

  // Determine if the user is authenticated based on the user state
  const isAuthenticated = !!user

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
