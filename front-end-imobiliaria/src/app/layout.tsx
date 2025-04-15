import "./globals.css"
import { AuthProvider } from "@/components/context/AuthContext"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "HAV",
  icons: {
    icon: "/logos/logoLogin.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
