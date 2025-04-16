"use client"

import { useEffect, useState } from 'react';
import { FaHandPointer } from 'react-icons/fa';
import styles from './styles.module.css';

declare global {
  interface Window {
    VLibras: any;
    vlibrasInstance: any;
  }
}

export function VLibrasButton() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Verificar se o script já foi carregado
    if (document.querySelector('script[src*="vlibras.gov.br"]')) {
      return;
    }

    // Carregar o script do VLibras
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      // Inicializar o VLibras após o script ser carregado
      if (window.VLibras) {
        window.vlibrasInstance = new window.VLibras.Widget();
        // Inicialmente esconder o widget
        const vlibrasWidget = document.getElementById('vlibras-widget');
        if (vlibrasWidget) {
          vlibrasWidget.style.display = 'none';
        }
      }
    };
    document.body.appendChild(script);

    return () => {
      const scriptElement = document.querySelector('script[src*="vlibras.gov.br"]');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []);

  const toggleVLibras = () => {
    setIsActive(!isActive);
    const vlibrasWidget = document.getElementById('vlibras-widget');
    if (vlibrasWidget) {
      vlibrasWidget.style.display = isActive ? 'none' : 'block';
    }
  };

  return (
    <button
      className={`${styles.vlibrasButton} ${isActive ? styles.active : ''}`}
      onClick={toggleVLibras}
      aria-label={isActive ? 'Desativar VLibras' : 'Ativar VLibras'}
    >
      <FaHandPointer size={20} />
      <span>VLibras</span>
    </button>
  );
} 
 