// src/app/layout.tsx
import './globals.css'
import { Montserrat } from 'next/font/google'
import { LanguageProvider } from '@/components/context/LanguageContext'

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
