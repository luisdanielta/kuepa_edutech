import React, { createContext, useState } from "react"

// Define the type for the AppContext
interface AppContextType {
  title: string
  setTitle: (title: string) => void
  logout: () => void
}

// Create the AppContext
const AppContext = createContext<AppContextType | undefined>(undefined)

// AppProvider component to wrap the app and provide context values
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [title, setTitle] = useState<string>("class for ..!")

  // Logout functionality (for now, just log to console)
  const logout = () => {
    console.log("User logged out")
  }

  return (
    <AppContext.Provider value={{ title, setTitle, logout }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
