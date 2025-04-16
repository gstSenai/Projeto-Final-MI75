"use client"

import { useEffect } from 'react'

interface VLibrasProps {
  rootPath?: string
  forceOnload?: boolean
}

export function VLibras({ rootPath = '/', forceOnload = true }: VLibrasProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
    script.async = true
    script.onload = () => {
      if (window.VLibras) {
        window.vlibrasInstance = new window.VLibras.Widget({
          rootPath,
          forceOnload
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      const scriptElement = document.querySelector('script[src*="vlibras.gov.br"]')
      if (scriptElement) {
        scriptElement.remove()
      }
    }
  }, [rootPath, forceOnload])

  return null
}

// Adiciona a declaração de tipo para o objeto window
declare global {
  interface Window {
    vlibras?: {
      config: (options: { rootPath: string; forceOnload: boolean }) => void
    }
  }
} 