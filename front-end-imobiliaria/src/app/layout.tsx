import "./globals.css"
import { AuthProvider } from "@/components/context/AuthContext"
import { LanguageProvider } from "@/components/context/LanguageContext"
import { TranslationWrapper } from "@/components/TranslationWrapper"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AccessibilityButton } from "@/components/AccessibilityButton"
import { VLibrasScript } from "@/components/VLibrasScript"

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
        <VLibrasScript />
        <div data-vw="true">
          <div data-vw-access-button="true"></div>
          <div data-vw-plugin-wrapper="true">
            <div className="vw-plugin-top-wrapper"></div>
          </div>
        </div>

        <AuthProvider>
          <LanguageProvider>
            <TranslationWrapper>
              <div className="fixed bottom-4 right-4 z-50">
                <AccessibilityButton />
              </div>
              {children}
            </TranslationWrapper>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
