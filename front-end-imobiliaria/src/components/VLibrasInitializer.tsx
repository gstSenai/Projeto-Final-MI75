"use client"

import { useEffect } from "react"

export default function VLibrasInitializer() {
  useEffect(() => {
    const initializeVLibras = () => {
      if (window.VLibras) {
        try {
          // Inicializar o VLibras com o método correto
          window.vlibrasInstance = new window.VLibras.Widget();
          
          // Verificar se o botão do VLibras foi criado
          const checkButton = setInterval(() => {
            const vlibrasButton = document.querySelector('#vlibras-gov-button');
            if (vlibrasButton) {
              console.log("Botão do VLibras encontrado no DOM");
              clearInterval(checkButton);
              
              // Verificar quais métodos estão disponíveis no botão
              console.log("Métodos disponíveis no botão VLibras:", Object.keys(vlibrasButton));
              
              // Verificar se o botão tem um evento de clique
              const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
              });
              
              // Não disparar o evento automaticamente, apenas verificar se funciona
              console.log("Botão VLibras está pronto para uso");
            }
          }, 500);
          
          // Limpar o intervalo após 10 segundos para evitar loops infinitos
          setTimeout(() => clearInterval(checkButton), 10000);
          
          console.log("VLibras inicializado com sucesso");
        } catch (error) {
          console.error("Erro ao inicializar VLibras:", error);
        }
      } else {
        console.error("VLibras não está disponível");
      }
    }

    // Verificar se o script já foi carregado
    const checkScriptLoaded = () => {
      if (window.VLibras) {
        initializeVLibras();
      } else {
        // Tentar novamente após um pequeno delay
        setTimeout(checkScriptLoaded, 500);
      }
    }

    // Iniciar a verificação
    checkScriptLoaded();

    // Também adicionar um listener para o evento de carregamento do script
    const script = document.querySelector('script[src="https://vlibras.gov.br/app/vlibras-plugin.js"]');
    if (script) {
      script.addEventListener('load', initializeVLibras);
    }

    return () => {
      // Limpar o event listener se o componente for desmontado
      if (script) {
        script.removeEventListener('load', initializeVLibras);
      }
    }
  }, [])

  // Este componente não renderiza nada
  return null
} 