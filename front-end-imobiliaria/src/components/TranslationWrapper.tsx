"use client"

import { useLanguage } from './context/LanguageContext';
import { useEffect } from 'react';

interface TranslationWrapperProps {
  children: React.ReactNode;
}

export function TranslationWrapper({ children }: TranslationWrapperProps) {
  const { translate, currentLanguage } = useLanguage();

  useEffect(() => {
    // Função para traduzir todos os elementos de texto
    const translatePage = () => {
      // Seleciona todos os elementos de texto
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, button, a, label, input[placeholder], textarea[placeholder]');
      
      textElements.forEach(element => {
        // Ignora elementos que já foram traduzidos ou que não têm texto
        if (element.hasAttribute('data-translated') || !element.textContent?.trim()) {
          return;
        }
        
        // Traduz o texto do elemento
        const originalText = element.textContent?.trim() || '';
        if (originalText) {
          const translatedText = translate(originalText);
          if (translatedText !== originalText) {
            element.textContent = translatedText;
            element.setAttribute('data-translated', 'true');
          }
        }
        
        // Traduz placeholders de inputs e textareas
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
          const placeholder = element.getAttribute('placeholder');
          if (placeholder) {
            const translatedPlaceholder = translate(placeholder);
            if (translatedPlaceholder !== placeholder) {
              element.setAttribute('placeholder', translatedPlaceholder);
              element.setAttribute('data-translated', 'true');
            }
          }
        }
      });
    };

    // Executa a tradução quando o idioma muda
    translatePage();
    
    // Configura um observador para traduzir novos elementos adicionados ao DOM
    const observer = new MutationObserver((mutations) => {
      let shouldTranslate = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldTranslate = true;
        }
      });
      
      if (shouldTranslate) {
        translatePage();
      }
    });
    
    // Observa mudanças no DOM
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      observer.disconnect();
    };
  }, [translate, currentLanguage]);

  return <>{children}</>;
} 