"use client"

import { useState, useEffect } from "react"
import { FaWheelchair, FaFont, FaAdjust, FaHandPointer, FaSignLanguage } from "react-icons/fa"
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
    // Inicializa o estado do VLibras baseado na visibilidade do widget
    const vLibrasDiv = document.querySelector('div[vw]')
    if (vLibrasDiv) {
      setIsVLibrasActive(vLibrasDiv.classList.contains('enabled'))
    }
  }, [])

  const toggleVLibras = () => {
    const newState = !isVLibrasActive
    setIsVLibrasActive(newState)
    
    const vLibrasDiv = document.querySelector('div[vw]')
    const vLibrasButton = document.querySelector('div[vw-access-button]')
    const vLibrasWrapper = document.querySelector('div[vw-plugin-wrapper]')
    
    if (vLibrasDiv && vLibrasButton && vLibrasWrapper) {
      if (newState) {
        vLibrasDiv.classList.add('enabled')
        vLibrasDiv.style.display = 'block'
        vLibrasButton.style.display = 'block'
        vLibrasWrapper.style.display = 'block'
      } else {
        vLibrasDiv.classList.remove('enabled')
        vLibrasDiv.style.display = 'none'
        vLibrasButton.style.display = 'none'
        vLibrasWrapper.style.display = 'none'
      }
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
        <FaSignLanguage size={24} />
      </button>

      {isMenuOpen && (
        <div className={styles.menu}>
          <button
            className={`${styles.vlibrasButton} ${isVLibrasActive ? styles.active : ''}`}
            onClick={toggleVLibras}
            aria-label={isVLibrasActive ? 'Desativar VLibras' : 'Ativar VLibras'}
          >
            <FaSignLanguage size={20} />
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