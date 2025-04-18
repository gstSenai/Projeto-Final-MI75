import "./globals.css";
import { LanguageProvider } from "@/components/context/LanguageContext"
import Chatbot from "@/components/Chatbot";
import { AuthProvider } from "@/components/context/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AccessibilityButton } from "@/components/accessibilityButton";
import { VLibrasScript } from "@/components/VLibrasScript";

const inter = Inter({ subsets: ["latin"] });

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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