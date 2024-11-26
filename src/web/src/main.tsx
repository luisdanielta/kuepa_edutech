import React from "react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"
import "./index.css"
import App from "./App"
import LoginPage from "@/pages/login"
import SignupPage from "@/pages/signUp"
import { UserProvider } from "./context/UserContext"
import { AppProvider } from "@/context/AppContext"
import { ProtectedRoute } from "@/context/ProtectedRoute"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AppProvider>
          <Routes>
            <Route
              element={<ProtectedRoute allowedRoles={["user", "moderator"]} />}
            >
              <Route path="/" element={<App />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/unauthorized" element={<h1>Access Denied</h1>} />
          </Routes>
        </AppProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
