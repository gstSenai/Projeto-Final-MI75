"use client"

import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    const [username, setUsername] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        if (token && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setShowProfileModal(false);
    }

    return (
        <>
            <header className={`${inter.className} bg-[#DFDAD0] px-6 pt-4 max-lg:px-6 lg:px-20 xl:px-16 font-medium`}>
                <section className="flex flex-row justify-between">
                    <div className="flex flex-row items-center md:gap-8 lg:gap-12 xl:gap-20">
                        <div className="flex items-center md:gap-3 gap-4">
                            <Image src="/imagensHeader/Logo HAV.png" alt="Logo HAV" width={45} height={45} className="max-h-full lg:w-[45px] w-[35px] mt-[-0.3rem]" />
                            <p className="md:text-lg text-xl xl:text-2xl font-bold text-vermelho">HAV</p>
                        </div>
                        <div>
                            <nav>
                                <ul className="flex flex-row max-lg:text-base text-xl whitespace-nowrap md:gap-4 lg:gap-6 text-[#303030] max-md:hidden">
                                    <li><Link href="/">Início</Link></li>
                                    <li><Link href="#">Propriedades</Link></li>
                                    <li><Link href="#">Corretores</Link></li>
                                    <li><Link href="/sobreNos">Sobre nós</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="flex flex-row items-center font-medium">
                        <div className="flex flex-row items-center gap-4 max-md:hidden">
                            <div className="flex flex-row items-center md:pl-2 lg:pl-12">
                                <Image src="/imagensHeader/Botão tema site.png" alt="Tema" width={20} height={20} />
                            </div>
                        </div>
                        <div className="flex flex-row items-center md:gap-1 lg:gap-2 md:px-3 lg:px-6 max-md:hidden relative">
                            <Image 
                                src={currentLanguage === 'Português' ? currentImageBrasil : 
                                     currentLanguage === 'English' ? currentImageEUA : 
                                     currentImageEspanhol} 
                                alt="Idioma" 
                                width={20} 
                                height={20} 
                            />
                            <p className="text-lg max-lg:text-base">{currentLanguage}</p>
                            <Image 
                                onClick={() => setShowLanguageModal(!showLanguageModal)}
                                src="/imagensHeader/seta-para-baixo 2.png" 
                                alt="Abrir opções" 
                                width={20} 
                                height={20}
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
                                src={isLoggedIn ? "/imagensHeader/PERFIL SEM LOGIN.png" : "/imagensHeader/PERFIL SEM LOGIN.png"} 
                                alt={isLoggedIn ? "Perfil com login" : "Perfil sem login"} 
                                width={50} 
                                height={50} 
                                className="w-12 md:w-[40px] lg:w-[50px] cursor-pointer" 
                            />
                            {showProfileModal && (
                                <div className="absolute top-[calc(100%+0.5rem)] right-0 w-40 bg-[#702632] rounded-lg shadow-lg py-1 z-50">
                                    {!isLoggedIn ? (
                                        <>
                                            <Link 
                                                href="/login" 
                                                className="block px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center"
                                            >
                                                Fazer login
                                            </Link>
                                            <div className="w-full h-[1px] bg-white opacity-50"></div>
                                            <Link 
                                                href="/cadastro" 
                                                className="block px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center"
                                            >
                                                Cadastrar-se
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <div className="px-4 py-2 text-white text-center">
                                                {username}
                                            </div>
                                            <div className="w-full h-[1px] bg-white opacity-50"></div>
                                            <Link 
                                                href="/perfil" 
                                                className="block px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center"
                                            >
                                                Perfil
                                            </Link>
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
                                width={30}
                                height={30}
                                className="w-8 md:w-[40px] lg:w-[50px] cursor-pointer"
                            />
                        </div>
                    </div>
                </section >
            </header>

            {hamburguerMobile && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50">
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#DFDAD0] z-50 overflow-y-auto">
                        <div className="flex flex-col min-h-full px-6 py-4">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-3">
                                    <Image 
                                        src={isLoggedIn ? "/imagensHeader/PERFIL COM LOGIN.png" : "/imagensHeader/PERFIL SEM LOGIN.png"} 
                                        alt="Perfil" 
                                        width={40} 
                                        height={40} 
                                        className="rounded-full cursor-pointer"
                                    />
                                    {isLoggedIn ? (
                                        <span className="text-xl text-[#303030]">{username}</span>
                                    ) : (
                                        <Link href="/login" className="text-xl text-[#303030] hover:text-vermelho transition-colors">Fazer login</Link>
                                    )}
                                </div>
                                <Image
                                    onClick={() => setHambuguerMobile(false)}
                                    src="/imagensHeader/HAMBURGUER.png"
                                    alt="Fechar menu"
                                    width={30}
                                    height={30}
                                    className="cursor-pointer"
                                />
                            </div>
                            <div className='bg-black p-[0.2px] w-full'></div>
                            <ul className="space-y-3 text-start my-3">
                                <li className='flex gap-3 items-center'>
                                    <Image src="/imagensHeader/logoMinuscula.png" alt="simbolo HAV" width={20}  height={20} className='h-full'/>
                                    <Link  href="/paginaInicial" className="text-xl text-[#303030] hover:text-vermelho transition-colors">Início</Link>
                                </li>
                                <li className='flex gap-3 items-center'>
                                    <Image src="/imagensHeader/casa.png" alt="simbolo casas" width={20}  height={20} className='h-full'/>
                                    <Link href="#" className="text-xl text-[#303030] hover:text-vermelho transition-colors">Propriedades</Link>
                                </li>
                                <li className='flex gap-3 items-center'>
                                    <Image src="/imagensHeader/corretores.png" alt="simbolo corretores" width={20}  height={20} className='h-full'/>
                                    <Link href="#" className="text-xl text-[#303030] hover:text-vermelho transition-colors">Corretores</Link>
                                </li>
                                <li className='flex gap-3 items-center'>
                                    <Image src="/imagensHeader/informacao.png" alt="simbolo Sobre nos" width={20}  height={20} className='h-full'/>
                                    <Link href="/sobreNos" className="text-xl text-[#303030] hover:text-vermelho transition-colors">Sobre nós</Link>
                                </li>
                            </ul>
                            <div className='bg-black p-[0.2px] w-full'></div>
                            <ul className="space-y-3 text-start mt-3">
                                <li className='flex gap-3 items-center'>
                                    <Image src="/imagensHeader/sino.png" alt="chat corretores" width={20}  height={20} className='h-full'/>
                                    <Link href="#" className="text-xl text-[#303030] hover:text-vermelho transition-colors">Chat corretores</Link>
                                </li>
                                <li className='flex gap-3 items-center'>
                                    <Image src="/imagensHeader/configuracoes.png" alt="configurações" width={20}  height={20} className='h-full'/>
                                    <Link href="#" className="text-xl text-[#303030] hover:text-vermelho transition-colors">Configurações</Link>
                                </li>
                                <li className='flex gap-3 items-center'>
                                    <Image src="/imagensHeader/logout.png" alt="logout" width={20}  height={20} className='h-full'/>
                                    <button onClick={handleLogout} className="text-xl text-[#303030] hover:text-vermelho transition-colors">Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}