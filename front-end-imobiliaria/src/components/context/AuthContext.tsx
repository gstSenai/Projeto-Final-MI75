"use client"
import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

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
  const [userRole, setUserRole] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedRole = localStorage.getItem("tipo_conta")
    const storedUserId = localStorage.getItem("id")

    if (storedToken && storedRole && storedUserId) {
      setToken(storedToken)
      setRole(storedRole.toLowerCase())
      setUserId(Number(storedUserId))
      setIsAuthenticated(true)
    }
  }, [])

  const login = (newToken: string, newRole: string, newUserId: number) => {
    const normalizedRole = newRole.toLowerCase()
    localStorage.setItem("token", newToken)
    localStorage.setItem("tipo_conta", normalizedRole)
    localStorage.setItem("id", newUserId.toString())
    setToken(newToken)
    setRole(normalizedRole)
    setUserId(newUserId)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("tipo_conta")
    localStorage.removeItem("id")
    localStorage.removeItem("username")
    setToken(null)
    setRole(null)
    setUserId(null)
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


