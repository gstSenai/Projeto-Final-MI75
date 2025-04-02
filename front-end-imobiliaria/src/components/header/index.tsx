"use client"

import { Inter } from 'next/font/google';
import { useState } from 'react';
import Image from 'next/image';

// Carregando a fonte Inter
const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600'],
    display: 'swap',
});

export function Header() {
    const [hamburguerMobile, setHambuguerMobile] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [showLanguageModal, setShowLanguageModal] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState('Português')
    const [currentImageBrasil, setCurrentImageBrasil] = useState('/imagensHeader/Brasil.png')
    const [currentImageEUA, setCurrentImageEUA] = useState('/imagensHeader/eua.png')
    const [currentImageEspanhol, setCurrentImageEspanhol] = useState('/imagensHeader/Espanha.png')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = () => {
        setIsLoggedIn(true)
        setShowProfileModal(false)
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
        setShowProfileModal(false)
    }

    return (
        <>
            <header className={`${inter.className} bg-[#DFDAD0] px-10 pt-6 max-lg:px-10 lg:px-30 xl:px-20 font-medium`}>
                <section className="flex flex-row justify-between ">
                    <div className="flex flex-row items-center md:gap-10 lg:gap-16 xl:gap-26">
                        <div className="flex items-center md:gap-4 gap-6">
                            <Image src="/imagensHeader/Logo HAV.png" alt="Logo HAV" width={60} height={60} className="max-h-full lg:w-[60px] w-[40px] mt-[-0.5rem]" />
                            <p className="md:text-xl text-2xl xl:text-3xl font-bold text-vermelho">HAV</p>
                        </div>
                        <div>
                            <nav>
                                <ul className="flex flex-row max-lg:text-base text-xl whitespace-nowrap md:gap-4 lg:gap-6 text-[#303030] max-md:hidden">
                                    <li><a href="/PaginaInicial">Início</a></li>
                                    <li><a href="/">Propriedades</a></li>
                                    <li><a href="/paginaCorretores">Corretores</a></li>
                                    <li><a href="/sobreNos">Sobre nós</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="flex flex-row items-center font-medium ">
                        <div className="flex flex-row items-center gap-6 max-md:hidden">
                            <div className="flex flex-row items-center md:pl-4 lg:pl-16">
                                <Image src="/imagensHeader/Botão tema site.png" alt="Tema" width={24} height={24} />
                            </div>
                        </div>
                        <div className="flex flex-row items-center md:gap-1 lg:gap-2 md:px-4 lg:px-8 max-md:hidden relative">
                            <Image 
                                src={currentLanguage === 'Português' ? currentImageBrasil : 
                                     currentLanguage === 'English' ? currentImageEUA : 
                                     currentImageEspanhol} 
                                alt="Idioma" 
                                width={24} 
                                height={24} 
                            />
                            <p className="text-xl max-lg:text-base">{currentLanguage}</p>
                            <Image 
                                onClick={() => setShowLanguageModal(!showLanguageModal)}
                                src="/imagensHeader/seta-para-baixo 2.png" 
                                alt="Abrir opções" 
                                width={24} 
                                height={24}
                                className="cursor-pointer"
                            />
                            {showLanguageModal && (
                                <div className="absolute top-[calc(100%+0.5rem)] w-40 bg-[#702632] rounded-lg shadow-lg py-1 z-50">
                                    <div 
                                        onClick={() => {
                                            setCurrentLanguage('Português');
                                            setCurrentImageBrasil('/imagensHeader/Brasil.png');
                                            setShowLanguageModal(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center cursor-pointer"
                                    >
                                        <Image src="/imagensHeader/Brasil.png" alt="Português" width={20} height={20} />
                                        <span>Português</span>
                                    </div>
                                    <div className="w-full h-[1px] bg-white opacity-50"></div>
                                    <div 
                                        onClick={() => {
                                            setCurrentLanguage('English');
                                            setCurrentImageEUA('/imagensHeader/eua.png');
                                            setShowLanguageModal(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center cursor-pointer"
                                    >
                                        <Image src="/imagensHeader/eua.png" alt="English" width={20} height={20} />
                                        <span>English</span>
                                    </div>
                                    <div className="w-full h-[1px] bg-white opacity-50"></div>
                                    <div 
                                        onClick={() => {
                                            setCurrentLanguage('Español');
                                            setCurrentImageEspanhol('/imagensHeader/Espanha.png');
                                            setShowLanguageModal(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center cursor-pointer"
                                    >
                                        <Image src="/imagensHeader/Espanha.png" alt="Español" width={20} height={20} />
                                        <span>Español</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-row items-center max-md:hidden relative">
                            <Image 
                                onClick={() => setShowProfileModal(!showProfileModal)}
                                src="/imagensHeader/PERFIL SEM LOGIN.png" 
                                alt="Perfil sem login" 
                                width={50} 
                                height={50} 
                                className="w-12 md:w-[40px] lg:w-[50px] cursor-pointer" 
                            />
                            {showProfileModal && (
                                <div className="absolute top-[calc(100%+0.5rem)] right-0 w-40 bg-[#702632] rounded-lg shadow-lg py-1 z-50">
                                    {!isLoggedIn ? (
                                        <>
                                            <a 
                                                href="/login" 
                                                className="block px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center"
                                            >
                                                Fazer login
                                            </a>
                                            <div className="w-full h-[1px] bg-white opacity-50"></div>
                                            <a 
                                                href="/cadastro" 
                                                className="block px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center"
                                            >
                                                Cadastrar-se
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <a 
                                                href="/perfil" 
                                                className="block px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center"
                                            >
                                                Perfil
                                            </a>
                                            <div className="w-full h-[1px] bg-white opacity-50"></div>
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center"
                                            >
                                                Sair
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-row items-center md:hidden">
                            <Image
                                onClick={() => setHambuguerMobile(!hamburguerMobile)}
                                src={hamburguerMobile ? "/imagensHeader/HAMBURGUER.png" : "/imagensHeader/HAMBURGUER.png"}
                                alt={hamburguerMobile ? "Fechar menu" : "Abrir menu"}
                                width={50}
                                height={50}
                                className="w-12 md:w-[40px] lg:w-[50px] cursor-pointer"
                            />
                        </div>
                    </div>
                </section >
            </header>

            {hamburguerMobile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 ">
                    <div className="fixed inset-0 bg-[#DFDAD0] z-50">
                        <div className="flex flex-col h-full px-10 py-10">
                            <div className="flex justify-end mb-8">
                                <Image
                                    onClick={() => setHambuguerMobile(false)}
                                    src="/imagensHeader/HAMBURGUER.png"
                                    alt="Fechar menu"
                                    width={50}
                                    height={50}
                                    className="cursor-pointer"
                                />
                            </div>
                            <div className='bg-black p-[0.2px] w-full'></div>
                            <ul className="space-y-8 text-start my-8">
                                <li className='flex gap-4 items-center'>
                                    <Image src="/imagensHeader/logoMinuscula.png" alt="simbolo HAV" width={24}  height={24} className=' h-full'/>
                                    <a  href="/paginaInicial" className="text-3xl text-[#303030] hover:text-vermelho transition-colors">Início</a>
                                </li>
                                <li className='flex gap-4 items-center'>
                                    <Image src="/imagensHeader/casa.png" alt="simbolo casas"width={24}  height={24} className=' h-full'/>
                                    <a href="#" className="text-3xl text-[#303030] hover:text-vermelho transition-colors">Propriedades</a>
                                </li>
                                <li className='flex gap-4 items-center'>
                                    <Image src="/imagensHeader/corretores.png" alt="simbolo corretores" width={24}  height={24} className=' h-full'/>
                                    <a href="#" className="text-3xl text-[#303030] hover:text-vermelho transition-colors">Corretores</a>
                                </li>
                                <li className='flex gap-4 items-center'>
                                    <Image src="/imagensHeader/informacao.png" alt="simbolo Sobre nos"width={24}  height={24} className=' h-full'/>
                                    <a href="/sobreNos" className="text-3xl text-[#303030] hover:text-vermelho transition-colors">Sobre nós</a>
                                </li>
                            </ul>
                            <div className='bg-black p-[0.2px] w-full'></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}