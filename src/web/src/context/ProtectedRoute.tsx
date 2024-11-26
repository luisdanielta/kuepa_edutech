import React from "react"
import { Navigate, Outlet } from "react-router"
import { AuthService } from "@/api/services/authService"

interface ProtectedRouteProps {
  allowedRoles: Array<"user" | "moderator">
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
}) => {
  const isAuthenticated = AuthService.isAuthenticated()
  const userRole = AuthService.getRole()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(userRole!)) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
