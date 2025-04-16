import "./globals.css"
import { AuthProvider } from "@/components/context/AuthContext"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AccessibilityButton } from "@/components/AccessibilityButton"
import { VLibras } from "@/components/VLibras"

const inter = Inter({ subsets: ["latin"] })

declare global {
  interface Window {
    VLibras: any;
    vlibrasInstance: any;
  }
}

export const metadata: Metadata = {
  title: "Imobiliária",
  description: "Encontre o imóvel dos seus sonhos",
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
      <body className={inter.className}>
        <AuthProvider>
          <VLibras />
          <div className="fixed bottom-4 right-4 z-50">
            <AccessibilityButton />
          </div>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
