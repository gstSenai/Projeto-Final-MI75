'use client'

import { useEffect } from 'react'

export function VLibrasScript() {
  useEffect(() => {
    const loadVLibras = () => {
      // Cria a div principal do VLibras
      const vw = document.createElement('div')
      vw.id = 'vlibras'
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
        // Inicializa o widget após o script carregar
        new window.VLibras.Widget('https://vlibras.gov.br/app')
        
        // Configura o widget
        const widgetConfig = {
          opacity: 0.9,
          position: 3, // 1-TL 2-TR 3-BR 4-BL
          avatar: 1, // 1-Ícaro 2-Hozana 3-Guga
          speed: 1.0, // 0.8-Normal 1.0-Rápido
          animate: true,
          showOnLoad: false
        }
        
        if (window.VLibras?.Widget) {
          const widget = new window.VLibras.Widget()
          widget.configure(widgetConfig)
        }
        
        // Oculta inicialmente
        const elements = document.querySelectorAll('[vw], [vw-access-button], [vw-plugin-wrapper]')
        elements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.display = 'none'
          }
        })
      }
      
      document.head.appendChild(script)
    }

    // Carrega o VLibras apenas se ainda não estiver carregado
    if (!document.querySelector('#vlibras')) {
      loadVLibras()
    }

    return () => {
      // Cleanup ao desmontar
      const vw = document.querySelector('#vlibras')
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