"use client"
import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  userRole: string | null
  username: string | null
  login: (token: string, role: string, username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()

  // Carrega o estado inicial do localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedRole = localStorage.getItem("tipo_conta")
    const storedUsername = localStorage.getItem("username")
    
    if (storedToken && storedRole && storedUsername) {
      setToken(storedToken)
      setUserRole(storedRole)
      setUsername(storedUsername)
      setIsAuthenticated(true)
    }
  }, [])

  // Atualiza o estado quando o localStorage muda
  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("token")
      const storedRole = localStorage.getItem("tipo_conta")
      const storedUsername = localStorage.getItem("username")
      
      if (storedToken && storedRole && storedUsername) {
        setToken(storedToken)
        setUserRole(storedRole)
        setUsername(storedUsername)
        setIsAuthenticated(true)
      } else {
        setToken(null)
        setUserRole(null)
        setUsername(null)
        setIsAuthenticated(false)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const login = (newToken: string, role: string, newUsername: string) => {
    // Primeiro atualiza o localStorage
    localStorage.setItem("token", newToken)
    localStorage.setItem("tipo_conta", role)
    localStorage.setItem("username", newUsername)
    
    // Depois atualiza o estado
    setToken(newToken)
    setUserRole(role)
    setUsername(newUsername)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("tipo_conta")
    localStorage.removeItem("username")
    localStorage.removeItem("id")
    setToken(null)
    setUserRole(null)
    setUsername(null)
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userRole, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
