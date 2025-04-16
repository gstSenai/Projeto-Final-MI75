"use client"

import { useState, useEffect } from "react"
import { FaWheelchair, FaFont, FaAdjust, FaHandPointer } from "react-icons/fa"
import styles from './styles.module.css'

declare global {
  interface Window {
    VLibras: any;
    vlibrasInstance: any;
  }
}

export function AccessibilityButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [isHighContrast, setIsHighContrast] = useState(false)
  const [isVLibrasActive, setIsVLibrasActive] = useState(false)

  useEffect(() => {
    // Adiciona os elementos necessários para o VLibras
    const vLibrasDiv = document.createElement('div')
    vLibrasDiv.setAttribute('vw', 'true')
    
    const vLibrasWidgetDiv = document.createElement('div')
    vLibrasWidgetDiv.setAttribute('vw-access-button', 'true')
    
    const vLibrasPluginDiv = document.createElement('div')
    vLibrasPluginDiv.setAttribute('vw-plugin-wrapper', 'true')
    
    vLibrasDiv.appendChild(vLibrasWidgetDiv)
    vLibrasDiv.appendChild(vLibrasPluginDiv)
    
    document.body.appendChild(vLibrasDiv)

    // Carrega o script do VLibras
    const script = document.createElement('script')
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
    script.async = true
    script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget()
      }
    }
    document.body.appendChild(script)

    // Remove os elementos ao desmontar
    return () => {
      const scriptElement = document.querySelector('script[src*="vlibras.gov.br"]')
      if (scriptElement) {
        scriptElement.remove()
      }
      const vLibrasElement = document.querySelector('div[vw="true"]')
      if (vLibrasElement) {
        vLibrasElement.remove()
      }
    }
  }, [])

  const toggleVLibras = () => {
    setIsVLibrasActive(!isVLibrasActive)
    const vLibrasDiv = document.querySelector('div[vw="true"]')
    if (vLibrasDiv) {
      vLibrasDiv.style.display = isVLibrasActive ? 'none' : 'block'
    }
  }

  const increaseFontSize = () => {
    if (fontSize < 200) {
      const newSize = fontSize + 10
      setFontSize(newSize)
      document.documentElement.style.fontSize = `${newSize}%`
    }
  }

  const decreaseFontSize = () => {
    if (fontSize > 50) {
      const newSize = fontSize - 10
      setFontSize(newSize)
      document.documentElement.style.fontSize = `${newSize}%`
    }
  }

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast)
    document.documentElement.classList.toggle('high-contrast')
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.accessibilityButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Menu de acessibilidade"
      >
        <FaWheelchair size={24} />
      </button>

      {isMenuOpen && (
        <div className={styles.menu}>
          <button
            className={`${styles.vlibrasButton} ${isVLibrasActive ? styles.active : ''}`}
            onClick={toggleVLibras}
            aria-label={isVLibrasActive ? 'Desativar VLibras' : 'Ativar VLibras'}
          >
            <FaHandPointer size={20} />
            <span>VLibras</span>
          </button>
          
          <div className={styles.fontSizeControls}>
            <button
              onClick={decreaseFontSize}
              aria-label="Diminuir tamanho da fonte"
            >
              A-
            </button>
            <span>{fontSize}%</span>
            <button
              onClick={increaseFontSize}
              aria-label="Aumentar tamanho da fonte"
            >
              A+
            </button>
          </div>

          <button
            className={`${styles.highContrastButton} ${isHighContrast ? styles.active : ''}`}
            onClick={toggleHighContrast}
            aria-label={isHighContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
          >
            <FaAdjust size={20} />
            <span>Alto Contraste</span>
          </button>
        </div>
      )}
    </div>
  )
} 