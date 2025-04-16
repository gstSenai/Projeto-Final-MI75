'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    VLibras: any;
  }
}

export function VLibrasScript() {
  useEffect(() => {
    const loadVLibras = () => {
      // Cria a div principal do VLibras
      const vw = document.createElement('div')
      vw.setAttribute('vw', '')
      
      // Cria o botão de acesso
      const vwAccessButton = document.createElement('div')
      vwAccessButton.setAttribute('vw-access-button', '')
      vw.appendChild(vwAccessButton)
      
      // Cria o wrapper do plugin
      const vwPluginWrapper = document.createElement('div')
      vwPluginWrapper.setAttribute('vw-plugin-wrapper', '')
      vw.appendChild(vwPluginWrapper)
      
      // Adiciona a div principal ao body
      document.body.appendChild(vw)
      
      // Carrega o script do VLibras
      const script = document.createElement('script')
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
      script.async = true
      
      script.onload = () => {
        try {
          if (typeof window.VLibras !== 'undefined') {
            const widgetInstance = new window.VLibras.Widget();
            // Oculta inicialmente
            const elements = document.querySelectorAll('[vw], [vw-access-button], [vw-plugin-wrapper]')
            elements.forEach(el => {
              if (el instanceof HTMLElement) {
                el.style.display = 'none'
              }
            })
          }
        } catch (error) {
          console.error('Error initializing VLibras:', error)
        }
      }
      
      document.head.appendChild(script)
    }

    // Carrega o VLibras apenas se ainda não estiver carregado
    if (!document.querySelector('[vw]')) {
      loadVLibras()
    }

    return () => {
      // Cleanup ao desmontar
      const vw = document.querySelector('[vw]')
      if (vw) {
        vw.remove()
      }
      const script = document.querySelector('script[src*="vlibras.gov.br"]')
      if (script) {
        script.remove()
      }
    }
  }, [])

  return null
} 