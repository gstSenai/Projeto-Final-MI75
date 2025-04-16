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
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (hasMounted) {
      const vLibrasDiv = document.querySelector('div[vw]')
      if (vLibrasDiv) {
        setIsVLibrasActive(vLibrasDiv.classList.contains('enabled'))
      }
    }
  }, [hasMounted])

  const toggleVLibras = () => {
    if (!hasMounted) return

    const newState = !isVLibrasActive
    setIsVLibrasActive(newState)
    
    const vLibrasDiv = document.querySelector('div[vw]')
    const vLibrasButton = document.querySelector('div[vw-access-button]')
    const vLibrasWrapper = document.querySelector('div[vw-plugin-wrapper]')
    
    if (vLibrasDiv && vLibrasButton && vLibrasWrapper) {
      const elements = [vLibrasDiv, vLibrasButton, vLibrasWrapper]
      elements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = newState ? 'block' : 'none'
        }
      })

      if (vLibrasDiv instanceof HTMLElement) {
        if (newState) {
          vLibrasDiv.classList.add('enabled')
        } else {
          vLibrasDiv.classList.remove('enabled')
        }
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

      {hasMounted && isMenuOpen && (
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
              disabled={!hasMounted}
            >
              A-
            </button>
            <span>{fontSize}%</span>
            <button
              onClick={increaseFontSize}
              aria-label="Aumentar tamanho da fonte"
              disabled={!hasMounted}
            >
              A+
            </button>
          </div>

          <button
            className={`${styles.highContrastButton} ${isHighContrast ? styles.active : ''}`}
            onClick={toggleHighContrast}
            aria-label={isHighContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
            disabled={!hasMounted}
          >
            <FaAdjust size={20} />
            <span>Alto Contraste</span>
          </button>
        </div>
      )}
    </div>
  )
} 