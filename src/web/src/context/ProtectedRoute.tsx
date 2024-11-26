import React from "react"
import { Navigate, Outlet } from "react-router"
import { useUserContext } from "@/hooks/useUserContext"

interface ProtectedRouteProps {
  allowedRoles: Array<"user" | "moderator">
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
}) => {
  const { user, isAuthenticated } = useUserContext()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user?.role || "")) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
