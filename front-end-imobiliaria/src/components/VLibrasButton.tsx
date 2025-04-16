"use client"

import { useEffect } from 'react'

declare global {
  interface Window {
    VLibras: any;
    vlibrasInstance: any;
  }
}

export function VLibrasButton() {
  useEffect(() => {
    // Verificar se o script já foi carregado
    if (document.querySelector('script[src*="vlibras.gov.br"]')) {
      console.log('Script do VLibras já está carregado');
      return;
    }

    // Carregar o script do VLibras
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      console.log('Script do VLibras carregado com sucesso');
      
      // Inicializar o VLibras após o script ser carregado
      if (window.VLibras) {
        try {
          window.vlibrasInstance = new window.VLibras.Widget();
          console.log('VLibras inicializado com sucesso');
        } catch (error) {
          console.error('Erro ao inicializar VLibras:', error);
        }
      }
    };
    script.onerror = (error) => {
      console.error('Erro ao carregar script do VLibras:', error);
    };
    document.body.appendChild(script);

    return () => {
      // Limpar o script quando o componente for desmontado
      const scriptElement = document.querySelector('script[src*="vlibras.gov.br"]');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []);

  return null; // Este componente não renderiza nada
} 