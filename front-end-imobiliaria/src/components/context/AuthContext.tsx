"use client"
import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  role: string | null
  userId: number | null
  login: (token: string, role: string, userId: number) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  role: null,
  userId: null,
  login: () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedRole = localStorage.getItem("role")
    const storedUserId = localStorage.getItem("userId")

    if (storedToken && storedRole && storedUserId) {
      setToken(storedToken)
      setRole(storedRole)
      setUserId(Number(storedUserId))
      setIsAuthenticated(true)
    }
  }, [])

  const login = (newToken: string, newRole: string, newUserId: number) => {
    localStorage.setItem("token", newToken)
    localStorage.setItem("role", newRole)
    localStorage.setItem("userId", newUserId.toString())
    setToken(newToken)
    setRole(newRole)
    setUserId(newUserId)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("userId")
    setToken(null)
    setRole(null)
    setUserId(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
