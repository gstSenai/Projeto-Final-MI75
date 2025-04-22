
// src/app/layout.tsx
import './globals.css'
import { Montserrat } from 'next/font/google'
import { LanguageProvider } from '@/components/context/LanguageContext'
import "./globals.css";
import Chatbot from "@/components/Chatbot";
import { AuthProvider } from "@/components/context/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AccessibilityButton } from "@/components/accessibilityButton/index";
import { VLibrasScript } from "@/components/VLibrasScript";


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '800'],
  display: 'swap',
})

export const metadata = {
  title: 'HAV Imóveis',
  description: 'A melhor plataforma para comprar e vender imóveis',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

    <html lang="pt">
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
            {children}
            <div className="fixed bottom-4 right-4 z-50">
              <AccessibilityButton />
            </div>
            <Chatbot />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
