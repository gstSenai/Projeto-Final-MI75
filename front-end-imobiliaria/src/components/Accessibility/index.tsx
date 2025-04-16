"use client"

import { VLibras } from "@/components/VLibras"
import { useState } from "react"

interface AccessibilityProps {
  showControls?: boolean
}

export function Accessibility({ showControls = false }: AccessibilityProps) {
  const [fontSize, setFontSize] = useState(100) // 100% é o tamanho padrão
  const [highContrast, setHighContrast] = useState(false)

  // Função para aumentar o tamanho da fonte
  const increaseFontSize = () => {
    if (fontSize < 200) {
      setFontSize(fontSize + 10)
      document.documentElement.style.fontSize = `${fontSize + 10}%`
    }
  }

  // Função para diminuir o tamanho da fonte
  const decreaseFontSize = () => {
    if (fontSize > 70) {
      setFontSize(fontSize - 10)
      document.documentElement.style.fontSize = `${fontSize - 10}%`
    }
  }

  // Função para alternar o modo de alto contraste
  const toggleHighContrast = () => {
    setHighContrast(!highContrast)
    if (!highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }

  return (
    <>
      <VLibras />
      
      {showControls && (
        <div className="fixed bottom-20 right-4 z-50 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-2">Acessibilidade</h3>
          
          <div className="mb-4">
            <p className="text-sm mb-1">Tamanho do texto:</p>
            <div className="flex items-center gap-2">
              <button 
                onClick={decreaseFontSize}
                className="bg-gray-200 p-1 rounded"
                aria-label="Diminuir tamanho do texto"
              >
                A-
              </button>
              <span className="text-sm">{fontSize}%</span>
              <button 
                onClick={increaseFontSize}
                className="bg-gray-200 p-1 rounded"
                aria-label="Aumentar tamanho do texto"
              >
                A+
              </button>
            </div>
          </div>
          
          <div>
            <button 
              onClick={toggleHighContrast}
              className={`px-3 py-1 rounded text-sm ${highContrast ? 'bg-black text-white' : 'bg-gray-200'}`}
              aria-label="Alternar modo de alto contraste"
            >
              Alto Contraste
            </button>
          </div>
        </div>
      )}
    </>
  )
} 