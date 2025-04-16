"use client"

import { useState, useEffect } from "react"
import { FaWheelchair, FaFont, FaAdjust } from "react-icons/fa"
import { VLibrasButton } from "../VLibrasButton"
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

  const toggleVLibras = () => {
    setIsVLibrasActive(!isVLibrasActive)
    const vlibrasWidget = document.getElementById('vlibras-widget')
    if (vlibrasWidget) {
      vlibrasWidget.style.display = isVLibrasActive ? 'none' : 'block'
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
          <VLibrasButton isActive={isVLibrasActive} onToggle={toggleVLibras} />
          
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