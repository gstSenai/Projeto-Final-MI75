"use client"

import React, { createContext, useContext, useState } from 'react';

type Language = 'pt' | 'en' | 'es';

// Dicionários de tradução
const translations = {
  // Português -> Inglês
  'pt-en': {
    'Início': 'Home',
    'Aluguel': 'Rent',
    'Comprar': 'Buy',
    'Venda': 'Sale',
    'Propriedades': 'Properties',
    'Corretores': 'Brokers',
    'Sobre nós': 'About us',
    'Fazer login': 'Login',
    'Cadastrar-se': 'Sign up',
    'Perfil': 'Profile',
    'Sair': 'Logout',
    'Olá, este é um teste de tradução': 'Hello, this is a translation test',
    'Como podemos ajudar?': 'How can we help you?',
    'Imóveis em Destaque': 'Featured Properties',
    'Imóveis Adicionados Recentemente': 'Recently Added Properties',
    'Imóveis em Promoção': 'Properties on Sale',
    'Localidades': 'Locations',
    'Sistema de Compra': 'Purchase System',
    'Sistema de Chat': 'Chat System',
    'Segurança dos Clientes': 'Customer Security',
    'Imoveis Cadastrados': 'Registered Properties',
    'Imoveis Vendidos': 'Sold Properties',
    'Imoveis Alugados': 'Rented Properties',
    'Como Funciona': 'How It Works',
    'Nós vamos ajudá-lo a encontrar sua': 'We will help you find your',
    'Maravilhosa': 'Wonderful',
    'casa': 'house',
    'Uma ótima plataforma para comprar, vender e alugar seus imóveis sem nenhum agente ou comissões.': 'A great platform to buy, sell and rent your properties without any agent or commissions.',
    'Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.': 'A great platform to buy and rent your properties with well-prepared agents and commissions.',
    'Propriedades por localização e Bairro': 'Properties by location and neighborhood',
    'Ver detalhes': 'View details',
    'Casa Moderna': 'Modern House',
    'Apartamento': 'Apartment',
    'Terreno': 'Land',
    'Todos': 'All',
    'Filtrar': 'Filter',
    'Restaurar Padrão': 'Restore Default',
    'Nenhum imóvel encontrado.': 'No properties found',
    'Carregando imóveis...': 'Loading properties...',
    'Comercial': 'Commercial',
    'Residencial': 'Residential',
    'Rural': 'Rural',
    'Buscar': 'Search',
    'Filtros': 'Filters',
    'Preço': 'Price',
    'Área': 'Area',
    'Quartos': 'Bedrooms',
    'Banheiros': 'Bathrooms',
    'Vagas': 'Parking spots',
    'Contato': 'Contact',
    'Envie uma mensagem': 'Send a message',
    'Nome': 'Name',
    'Email': 'Email',
    'Telefone': 'Phone',
    'Mensagem': 'Message',
    'Enviar': 'Send',
    'Sobre a Imobiliária': 'About the Real Estate',
    'Nossa História': 'Our Story',
    'Missão': 'Mission',
    'Visão': 'Vision',
    'Valores': 'Values',
    'Equipe': 'Team',
    'Depoimentos': 'Testimonials',
    'Blog': 'Blog',
    'Notícias': 'News',
    'Dicas': 'Tips',
    'FAQ': 'FAQ',
    'Política de Privacidade': 'Privacy Policy',
    'Termos de Uso': 'Terms of Use',
    'Mapa do Site': 'Site Map',
    'Redes Sociais': 'Social Media',
    'WhatsApp': 'WhatsApp',
    'Instagram': 'Instagram',
    'Facebook': 'Facebook',
    'LinkedIn': 'LinkedIn',
    'YouTube': 'YouTube',
    'Endereço': 'Address',
    'Horário de Funcionamento': 'Business Hours',
    'Segunda a Sexta': 'Monday to Friday',
    'Sábado': 'Saturday',
    'Domingo': 'Sunday',
    'Feriados': 'Holidays',
    'Fechado': 'Closed',
    'Aberto': 'Open',
    'Meio período': 'Half day',
  },
  // Português -> Espanhol
  'pt-es': {
    'Início': 'Inicio',
    'Propriedades': 'Propiedades',
    'Corretores': 'Corredores',
    'Sobre nós': 'Sobre nosotros',
    'Fazer login': 'Iniciar sesión',
    'Cadastrar-se': 'Registrarse',
    'Perfil': 'Perfil',
    'Sair': 'Salir',
    'Olá, este é um teste de tradução': 'Hola, esta es una prueba de traducción',
    'Como podemos ayudar?': '¿Cómo podemos ayudarte?',
    'Imóveis em Destaque': 'Propiedades Destacadas',
    'Imóveis Adcionados Recentemente': 'Propiedades Añadidas Recientemente',
    'Imóveis em Promoção': 'Propiedades en Promoción',
    'Localidades': 'Localidades',
    'Sistema de Compra': 'Sistema de Compra',
    'Sistema de Chat': 'Sistema de Chat',
    'Segurança dos Clientes': 'Seguridad de los Clientes',
    'Imoveis Cadastrados': 'Propiedades Registradas',
    'Imoveis Vendidos': 'Propiedades Vendidas',
    'Imoveis Alugados': 'Propiedades Alquiladas',
    'Como Funciona': 'Cómo Funciona',
    'Nós vamos ajudá-lo a encontrar sua': 'Te ayudaremos a encontrar tu',
    'Maravilhosa': 'Maravillosa',
    'casa': 'casa',
    'Uma ótima plataforma para comprar, vender e alugar seus imóveis sem nenhum agente ou comissões.': 'Una gran plataforma para comprar, vender y alquilar sus propiedades sin agentes ni comisiones.',
    'Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.': 'Una gran plataforma para comprar y alquilar sus propiedades con agentes y comisiones muy bien preparadas.',
    'Propriedades por localização e Bairro': 'Propiedades por ubicación y barrio',
    'Ver detalhes': 'Ver detalles',
    'Casa Moderna': 'Casa Moderna',
    'Apartamento': 'Apartamento',
    'Terreno': 'Terreno',
    'Comercial': 'Comercial',
    'Residencial': 'Residencial',
    'Rural': 'Rural',
    'Buscar': 'Buscar',
    'Filtros': 'Filtros',
    'Preço': 'Precio',
    'Área': 'Área',
    'Quartos': 'Habitaciones',
    'Banheiros': 'Baños',
    'Vagas': 'Plazas de parking',
    'Contato': 'Contacto',
    'Envie uma mensagem': 'Envía un mensaje',
    'Nome': 'Nombre',
    'Email': 'Email',
    'Telefone': 'Teléfono',
    'Mensagem': 'Mensaje',
    'Enviar': 'Enviar',
    'Sobre a Imobiliária': 'Sobre la Inmobiliaria',
    'Nossa História': 'Nuestra Historia',
    'Missão': 'Misión',
    'Visão': 'Visión',
    'Valores': 'Valores',
    'Equipe': 'Equipo',
    'Depoimentos': 'Testimonios',
    'Blog': 'Blog',
    'Notícias': 'Noticias',
    'Dicas': 'Consejos',
    'FAQ': 'FAQ',
    'Política de Privacidade': 'Política de Privacidad',
    'Termos de Uso': 'Términos de Uso',
    'Mapa do Site': 'Mapa del Sitio',
    'Redes Sociais': 'Redes Sociales',
    'WhatsApp': 'WhatsApp',
    'Instagram': 'Instagram',
    'Facebook': 'Facebook',
    'LinkedIn': 'LinkedIn',
    'YouTube': 'YouTube',
    'Endereço': 'Dirección',
    'Horário de Funcionamento': 'Horario de Atención',
    'Segunda a Sexta': 'Lunes a Viernes',
    'Sábado': 'Sábado',
    'Domingo': 'Domingo',
    'Feriados': 'Festivos',
    'Fechado': 'Cerrado',
    'Aberto': 'Abierto',
    'Meio período': 'Medio día',
  }
};

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translate: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('pt');

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const translate = (text: string): string => {
    if (!text || currentLanguage === 'pt') return text;
    
    const translationKey = `pt-${currentLanguage}`;
    const dictionary = translations[translationKey as keyof typeof translations];
    
    if (dictionary && dictionary[text as keyof typeof dictionary]) {
      return dictionary[text as keyof typeof dictionary];
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 