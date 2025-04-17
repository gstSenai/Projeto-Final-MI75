"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, memo } from 'react';

type Language = 'Português' | 'English' | 'Español';

interface LanguageContextType {
    currentLanguage: Language;
    setCurrentLanguage: (lang: Language) => void;
    translate: (key: string) => string;
}

type TranslationDictionary = {
    [key: string]: string;
};

const translations: Record<Language, TranslationDictionary> = {
    'Português': {
        // Header
        'inicio': 'Início',
        'imoveis': 'Imóveis',
        'sobre': 'Sobre',
        'contato': 'Contato',
        'login': 'Login',
        'cadastro': 'Cadastro',
        'corretores': 'Corretores',
        'chat': 'Chat',
        'configuracoes': 'Configurações',
        'logout': 'Sair',
        
        // Home Page
        'encontre_sua_casa': 'Encontre sua',
        'casa_maravilhosa': 'Maravilhosa',
        'casa': 'casa',
        'plataforma_descricao': 'Uma ótima plataforma para comprar, vender e alugar seus imóveis sem nenhum agente ou comissões.',
        'como_funciona': 'Como Funciona',
        'plataforma_funciona': 'Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.',
        
        // Features
        'sistema_compra': 'Sistema de Compra',
        'sistema_chat': 'Sistema de Chat',
        'seguranca_clientes': 'Segurança dos Clientes',
        'sistema_compra_desc': 'Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.',
        'sistema_chat_desc': 'Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.',
        'seguranca_desc': 'Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.',
        
        // Properties
        'imoveis_destaque': 'Imóveis em Destaque',
        'propriedades_localizacao': 'Propriedades por localização e Bairro',
        'imoveis_recentes': 'Imóveis Adicionados Recentemente',
        'imoveis_promocao': 'Imóveis em Promoção',
        'localidades': 'Localidades',
        
        // Property Card
        'quartos': 'Quartos',
        'suites': 'Suítes',
        'banheiros': 'Banheiros',
        'preco': 'Preço',
        'codigo': 'Código',
        'ver_mais': 'Ver Mais',
        
        // Footer
        'footer_descricao': 'Nosso objetivo é fornecer soluções imobiliárias de alta qualidade, garantindo satisfação e confiança em cada transação.',
        'footer_links': 'Serviços',
        'footer_contato': 'Contato',
        'footer_redes': 'Links Rápidos',
        'footer_email': 'Email',
        'footer_telefone': 'Telefone',
        'footer_endereco': 'Endereço',
        'footer_termos_de_uso': 'Termos de Uso',
        'footer_politica_de_privacidade': 'Política de Privacidade',
        'footer_politica_de_cookies': 'Política de Cookies',
        'footer_copyright': 'HAV Imobiliária. Todos os direitos reservados.',
        
        // Search
        'pesquisar': 'Pesquisar',
        'filtros': 'Filtros',
        'tipo_imovel': 'Tipo de Imóvel',
        'faixa_preco': 'Faixa de Preço',
        'localizacao': 'Localização',
        
        // Footer translations
        'footer.informacoes': 'Informações',
        'footer.objetivo': 'Nosso objetivo é fornecer soluções imobiliárias de alta qualidade, garantindo satisfação e confiança em cada transação.',
        'footer.servicos': 'Serviços',
        'footer.avaliacoes': 'Avaliações',
        'footer.consultoria': 'Consultoria',
        'footer.regularizacao': 'Regularização',
        'footer.investimentos': 'Investimentos',
        'footer.contato': 'Contato',
        'footer.suporte': 'Suporte',
        'footer.atendimento': 'Atendimento',
        'footer.faq': 'Perguntas Frequentes',
        'footer.reclameAqui': 'Reclamações',
        'footer.linksRapidos': 'Links Rápidos',
        'footer.paginaInicial': 'Página Inicial',
        'footer.sobreNos': 'Sobre Nós',
        'footer.comprar': 'Comprar Imóvel',
        'footer.vender': 'Vender Imóvel',
        'footer.direitosReservados': 'Todos os direitos reservados. Este site é protegido por direitos autorais. Reprodução ou distribuição não autorizada é proibida.',
        'footer.termosUso': 'Termos de Uso',
        'footer.politicaPrivacidade': 'Política de Privacidade',
        'footer.politicaCookies': 'Política de Cookies',
        
        // Sobre Nós
        'sobre_nos.titulo': 'Sobre nós',
        'sobre_nos.subtitulo': 'Apaixonados por qualidade e inovação. Criamos experiências autênticas, unindo compromisso e excelência para oferecer o melhor a você.',
        'sobre_nos.missoes.titulo': 'Missões',
        'sobre_nos.missoes.texto': 'Nossa missão na HAV Imobiliária é conectar pessoas aos seus sonhos de moradia, oferecendo soluções personalizadas e um atendimento transparente. Buscamos simplificar o processo de compra, venda e locação de imóveis, garantindo segurança jurídica e satisfação em cada negociação. Atuamos com ética, expertise de mercado e compromisso social para construir relacionamentos duradouros com nossos clientes.',
        'sobre_nos.visao.titulo': 'Visão',
        'sobre_nos.visao.texto': 'Almejamos ser reconhecidos como a imobiliária de referência em Jaraguá do Sul e região, destacando-nos pela excelência no atendimento, inovação tecnológica e conhecimento profundo do mercado imobiliário. Nossa visão é expandir nossas operações mantendo os valores de integridade, profissionalismo e atenção às reais necessidades de cada cliente, tornando-nos parceiros confiáveis em todas as etapas da jornada imobiliária.',
        'sobre_nos.sede.titulo': 'Sede da HAV Imobiliária',
        'sobre_nos.sede.nome': 'HAV Imobiliária',
        'sobre_nos.sede.endereco': 'Centro, Jaraguá do Sul',
        'sobre_nos.sede.cep': 'Código Postal 89253-030',
        'sobre_nos.sede.estado': 'SC, Brasil',
        'sobre_nos.sede.email': 'contato@havimobiliaria.com.br',
        'receba_atualizacoes.titulo': 'Receba Atualizações',
        'receba_atualizacoes.subtitulo': 'Inscreva-se para receber as últimas informações',
        'receba_atualizacoes.email_placeholder': 'Escreva seu E-mail',
        'receba_atualizacoes.botao': 'Inscreva-se',
        'imoveis_cadastrados': 'Imóveis Cadastrados',
        'imoveis_vendidos': 'Imóveis Vendidos',
        'imoveis_alugados': 'Imóveis Alugados',
        'filtro.comprar': 'Comprar',
        'filtro.alugar': 'Aluguel',
        'filtro.codigo': 'Código do Imóvel',
        'filtro.codigo_placeholder': 'Digite o código do imóvel',
        'filtro.localizacao': 'Localização',
        'filtro.localizacao_placeholder': 'Digite a localização desejada',
        'filtro.avancado': 'Busca Avançada',
        'filtro.pesquisa': 'Pesquisar',
        'filtro.min_valor': 'Valor Mínimo',
        'filtro.max_valor': 'Valor Máximo',
        'filtro.min_valor_placeholder': 'Digite o valor mínimo',
        'filtro.max_valor_placeholder': 'Digite o valor máximo',
        'filtro.tipo_local': 'Tipo do Imóvel',
        'filtro.quartos': 'Quantidade de Quartos',
        'filtro.garagem': 'Quantidade de Vagas',
        'filtro.banheiros': 'Quantidade de Banheiros',
    },
    'English': {
        // Header
        'inicio': 'Home',
        'imoveis': 'Properties',
        'sobre': 'About',
        'contato': 'Contact',
        'login': 'Login',
        'cadastro': 'Register',
        'corretores': 'Brokers',
        'chat': 'Chat',
        'configuracoes': 'Settings',
        'logout': 'Logout',
        
        // Home Page
        'encontre_sua_casa': 'Find your',
        'casa_maravilhosa': 'Wonderful',
        'casa': 'house',
        'plataforma_descricao': 'A great platform to buy, sell and rent your properties without any agent or commissions.',
        'como_funciona': 'How it Works',
        'plataforma_funciona': 'A great platform to buy and rent your properties with well-prepared agents and commissions.',
        
        // Features
        'sistema_compra': 'Purchase System',
        'sistema_chat': 'Chat System',
        'seguranca_clientes': 'Customer Security',
        'sistema_compra_desc': 'A great platform to buy and rent your properties with well-prepared agents and commissions.',
        'sistema_chat_desc': 'A great platform to buy and rent your properties with well-prepared agents and commissions.',
        'seguranca_desc': 'A great platform to buy and rent your properties with well-prepared agents and commissions.',
        
        // Properties
        'imoveis_destaque': 'Featured Properties',
        'propriedades_localizacao': 'Properties by location and neighborhood',
        'imoveis_recentes': 'Recently Added Properties',
        'imoveis_promocao': 'Properties on Sale',
        'localidades': 'Locations',
        
        // Property Card
        'quartos': 'Bedrooms',
        'suites': 'Suites',
        'banheiros': 'Bathrooms',
        'preco': 'Price',
        'codigo': 'Code',
        'ver_mais': 'View More',
        
        // Footer
        'footer_descricao': 'Our goal is to provide high-quality real estate solutions, ensuring satisfaction and trust in every transaction.',
        'footer_links': 'Services',
        'footer_contato': 'Contact',
        'footer_redes': 'Quick Links',
        'footer_email': 'Email',
        'footer_telefone': 'Phone',
        'footer_endereco': 'Address',
        'footer_termos_de_uso': 'Terms of Use',
        'footer_politica_de_privacidade': 'Privacy Policy',
        'footer_politica_de_cookies': 'Cookie Policy',
        'footer_copyright': 'HAV Real Estate. All rights reserved.',
        
        // Search
        'pesquisar': 'Search',
        'filtros': 'Filters',
        'tipo_imovel': 'Property Type',
        'faixa_preco': 'Price Range',
        'localizacao': 'Location',
        
        // Footer translations
        'footer.informacoes': 'Information',
        'footer.objetivo': 'Our goal is to provide high-quality real estate solutions, ensuring satisfaction and trust in every transaction.',
        'footer.servicos': 'Services',
        'footer.avaliacoes': 'Appraisals',
        'footer.consultoria': 'Consulting',
        'footer.regularizacao': 'Regularization',
        'footer.investimentos': 'Investments',
        'footer.contato': 'Contact',
        'footer.suporte': 'Support',
        'footer.atendimento': 'Service',
        'footer.faq': 'Frequently Asked Questions',
        'footer.reclameAqui': 'Complaints Center',
        'footer.linksRapidos': 'Quick Links',
        'footer.paginaInicial': 'Homepage',
        'footer.sobreNos': 'About Us',
        'footer.comprar': 'Purchase Property',
        'footer.vender': 'Sell Property',
        'footer.direitosReservados': 'All rights reserved. This site is protected by copyright. Unauthorized reproduction or distribution is prohibited.',
        'footer.termosUso': 'Terms of Use',
        'footer.politicaPrivacidade': 'Privacy Policy',
        'footer.politicaCookies': 'Cookie Policy',
        
        // About Us
        'sobre_nos.titulo': 'About Us',
        'sobre_nos.subtitulo': 'Passionate about quality and innovation. We create authentic experiences, combining commitment and excellence to offer you the best.',
        'sobre_nos.missoes.titulo': 'Mission',
        'sobre_nos.missoes.texto': 'Our mission at HAV Real Estate is to connect people to their housing dreams, offering personalized solutions and transparent service. We seek to simplify the process of buying, selling, and renting properties, ensuring legal security and satisfaction in each negotiation. We work with ethics, market expertise, and social commitment to build lasting relationships with our clients.',
        'sobre_nos.visao.titulo': 'Vision',
        'sobre_nos.visao.texto': 'We aim to be recognized as the reference real estate company in Jaraguá do Sul and surrounding areas, standing out for excellence in service, technological innovation, and deep knowledge of the real estate market. Our vision is to expand our operations while maintaining the values of integrity, professionalism, and attention to the real needs of each client, becoming reliable partners in all stages of the real estate journey.',
        'sobre_nos.sede.titulo': 'HAV Real Estate Headquarters',
        'sobre_nos.sede.nome': 'HAV Real Estate',
        'sobre_nos.sede.endereco': 'Downtown, Jaraguá do Sul',
        'sobre_nos.sede.cep': 'Postal Code 89253-030',
        'sobre_nos.sede.estado': 'SC, Brazil',
        'sobre_nos.sede.email': 'contact@havrealestate.com.br',
        'receba_atualizacoes.titulo': 'Receive Updates',
        'receba_atualizacoes.subtitulo': 'Subscribe to receive the latest information',
        'receba_atualizacoes.email_placeholder': 'Enter your E-mail',
        'receba_atualizacoes.botao': 'Subscribe',
        'imoveis_cadastrados': 'Registered Properties',
        'imoveis_vendidos': 'Properties Sold',
        'imoveis_alugados': 'Properties Rented',
        'filtro.comprar': 'Buy',
        'filtro.alugar': 'Rent',
        'filtro.codigo': 'Property Code',
        'filtro.codigo_placeholder': 'Enter the property code',
        'filtro.localizacao': 'Location',
        'filtro.localizacao_placeholder': 'Enter the desired location',
        'filtro.avancado': 'Advanced Search',
        'filtro.pesquisa': 'Search',
        'filtro.min_valor': 'Minimum Value',
        'filtro.max_valor': 'Maximum Value',
        'filtro.min_valor_placeholder': 'Enter the minimum value',
        'filtro.max_valor_placeholder': 'Enter the maximum value',
        'filtro.tipo_local': 'Property Type',
        'filtro.quartos': 'Number of Bedrooms',
        'filtro.garagem': 'Number of Parking Spaces',
        'filtro.banheiros': 'Number of Bathrooms',
    },
    'Español': {
        // Header
        'inicio': 'Inicio',
        'imoveis': 'Propiedades',
        'sobre': 'Sobre',
        'contato': 'Contacto',
        'login': 'Iniciar Sesión',
        'cadastro': 'Registrarse',
        'corretores': 'Corredores',
        'chat': 'Chat',
        'configuracoes': 'Configuración',
        'logout': 'Cerrar Sesión',
        
        // Home Page
        'encontre_sua_casa': 'Encuentra tu',
        'casa_maravilhosa': 'Maravillosa',
        'casa': 'casa',
        'plataforma_descricao': 'Una gran plataforma para comprar, vender y alquilar tus propiedades sin agentes ni comisiones.',
        'como_funciona': 'Cómo Funciona',
        'plataforma_funciona': 'Una gran plataforma para comprar y alquilar tus propiedades con agentes y comisiones bien preparadas.',
        
        // Features
        'sistema_compra': 'Sistema de Compra',
        'sistema_chat': 'Sistema de Chat',
        'seguranca_clientes': 'Seguridad de Clientes',
        'sistema_compra_desc': 'Una gran plataforma para comprar y alquilar tus propiedades con agentes y comisiones bien preparadas.',
        'sistema_chat_desc': 'Una gran plataforma para comprar y alquilar tus propiedades con agentes y comisiones bien preparadas.',
        'seguranca_desc': 'Una gran plataforma para comprar y alquilar tus propiedades con agentes y comisiones bien preparadas.',
        
        // Properties
        'imoveis_destaque': 'Propiedades Destacadas',
        'propriedades_localizacao': 'Propiedades por ubicación y barrio',
        'imoveis_recentes': 'Propiedades Agregadas Recientemente',
        'imoveis_promocao': 'Propiedades en Promoción',
        'localidades': 'Localidades',
        
        // Property Card
        'quartos': 'Dormitorios',
        'suites': 'Suites',
        'banheiros': 'Baños',
        'preco': 'Precio',
        'codigo': 'Código',
        'ver_mais': 'Ver Más',
        
        // Footer
        'footer_descricao': 'Nuestro objetivo es proporcionar soluciones inmobiliarias de alta calidad, garantizando satisfacción y confianza en cada transacción.',
        'footer_links': 'Servicios',
        'footer_contato': 'Contacto',
        'footer_redes': 'Enlaces Rápidos',
        'footer_email': 'Correo',
        'footer_telefone': 'Teléfono',
        'footer_endereco': 'Dirección',
        'footer_termos_de_uso': 'Términos de Uso',
        'footer_politica_de_privacidade': 'Política de Privacidad',
        'footer_politica_de_cookies': 'Política de Cookies',
        'footer_copyright': 'HAV Inmobiliaria. Todos los derechos reservados.',
        
        // Search
        'pesquisar': 'Buscar',
        'filtros': 'Filtros',
        'tipo_imovel': 'Tipo de Propiedad',
        'faixa_preco': 'Rango de Precio',
        'localizacao': 'Ubicación',
        
        // Footer translations
        'footer.informacoes': 'Información',
        'footer.objetivo': 'Nuestro objetivo es proporcionar soluciones inmobiliarias de alta calidad, garantizando satisfacción y confianza en cada transacción.',
        'footer.servicos': 'Servicios',
        'footer.avaliacoes': 'Evaluaciones',
        'footer.consultoria': 'Consultoría',
        'footer.regularizacao': 'Regularización',
        'footer.investimentos': 'Inversiones',
        'footer.contato': 'Contacto',
        'footer.suporte': 'Soporte',
        'footer.atendimento': 'Atención',
        'footer.faq': 'Preguntas Frecuentes',
        'footer.reclameAqui': 'Centro de Reclamaciones',
        'footer.linksRapidos': 'Enlaces Rápidos',
        'footer.paginaInicial': 'Página Principal',
        'footer.sobreNos': 'Sobre Nosotros',
        'footer.comprar': 'Comprar Propiedad',
        'footer.vender': 'Vender Propiedad',
        'footer.direitosReservados': 'Todos los derechos reservados. Este sitio está protegido por derechos de autor. La reproducción o distribución no autorizada está prohibida.',
        'footer.termosUso': 'Términos de Uso',
        'footer.politicaPrivacidade': 'Política de Privacidad',
        'footer.politicaCookies': 'Política de Cookies',
        
        // Sobre Nosotros
        'sobre_nos.titulo': 'Sobre Nosotros',
        'sobre_nos.subtitulo': 'Apasionados por la calidad y la innovación. Creamos experiencias auténticas, uniendo compromiso y excelencia para ofrecerte lo mejor.',
        'sobre_nos.missoes.titulo': 'Misión',
        'sobre_nos.missoes.texto': 'Nuestra misión en HAV Inmobiliaria es conectar a las personas con sus sueños de vivienda, ofreciendo soluciones personalizadas y un servicio transparente. Buscamos simplificar el proceso de compra, venta y alquiler de propiedades, garantizando seguridad jurídica y satisfacción en cada negociación. Actuamos con ética, experiencia de mercado y compromiso social para construir relaciones duraderas con nuestros clientes.',
        'sobre_nos.visao.titulo': 'Visión',
        'sobre_nos.visao.texto': 'Aspiramos a ser reconocidos como la inmobiliaria de referencia en Jaraguá do Sul y alrededores, destacándonos por la excelencia en el servicio, la innovación tecnológica y el profundo conocimiento del mercado inmobiliario. Nuestra visión es expandir nuestras operaciones manteniendo los valores de integridad, profesionalismo y atención a las necesidades reales de cada cliente, convirtiéndonos en socios confiables en todas las etapas del viaje inmobiliario.',
        'sobre_nos.sede.titulo': 'Sede de HAV Inmobiliaria',
        'sobre_nos.sede.nome': 'HAV Inmobiliaria',
        'sobre_nos.sede.endereco': 'Centro, Jaraguá do Sul',
        'sobre_nos.sede.cep': 'Código Postal 89253-030',
        'sobre_nos.sede.estado': 'SC, Brasil',
        'sobre_nos.sede.email': 'contacto@havinmobiliaria.com.br',
        'receba_atualizacoes.titulo': 'Recibe Actualizaciones',
        'receba_atualizacoes.subtitulo': 'Suscríbete para recibir la última información',
        'receba_atualizacoes.email_placeholder': 'Escribe tu E-mail',
        'receba_atualizacoes.botao': 'Suscríbete',
        'imoveis_cadastrados': 'Propiedades Registradas',
        'imoveis_vendidos': 'Propiedades Vendidas',
        'imoveis_alugados': 'Propiedades Alquiladas',
        'filtro.comprar': 'Comprar',
        'filtro.alugar': 'Alquilar',
        'filtro.codigo': 'Código de Propiedad',
        'filtro.codigo_placeholder': 'Ingrese el código de la propiedad',
        'filtro.localizacao': 'Ubicación',
        'filtro.localizacao_placeholder': 'Ingrese la ubicación deseada',
        'filtro.avancado': 'Búsqueda Avanzada',
        'filtro.pesquisa': 'Buscar',
        'filtro.min_valor': 'Valor Mínimo',
        'filtro.max_valor': 'Valor Máximo',
        'filtro.min_valor_placeholder': 'Ingrese el valor mínimo',
        'filtro.max_valor_placeholder': 'Ingrese el valor máximo',
        'filtro.tipo_local': 'Tipo de Propiedad',
        'filtro.quartos': 'Cantidad de Dormitorios',
        'filtro.garagem': 'Cantidad de Estacionamientos',
        'filtro.banheiros': 'Cantidad de Baños',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [currentLanguage, setCurrentLanguage] = useState<Language>('Português');

    // Carregar o idioma salvo ao iniciar
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage) {
            setCurrentLanguage(savedLanguage);
        }
    }, []);

    // Salvar o idioma quando mudar
    useEffect(() => {
        localStorage.setItem('language', currentLanguage);
    }, [currentLanguage]);

    // Memoize a função de tradução para evitar recriações
    const translate = useCallback((key: string): string => {
        return translations[currentLanguage][key] || key;
    }, [currentLanguage]);

    // Memoize o valor do contexto para evitar re-renderizações desnecessárias
    const contextValue = React.useMemo(() => ({
        currentLanguage,
        setCurrentLanguage,
        translate
    }), [currentLanguage, translate]);

    return (
        <LanguageContext.Provider value={contextValue}>
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