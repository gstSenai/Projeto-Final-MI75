import type React from "react"
import { AuthProvider } from "@/components/context/AuthContext"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Auth System",
  description: "Authentication system with login and registration",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

