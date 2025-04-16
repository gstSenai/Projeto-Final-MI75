"use client"

import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation"
import { useLanguage } from '../context/LanguageContext';

// Carregando a fonte Inter
const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600'],
    display: 'swap',
});

export function Header() {
    const router = useRouter()
    const { currentLanguage, setLanguage, translate } = useLanguage();
    const [hamburguerMobile, setHambuguerMobile] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [showLanguageModal, setShowLanguageModal] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [userRole, setUserRole] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('tipo_conta');
        if (token && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
            setUserRole(storedRole || '');
        }
    }, []);

    const handleLogoClick = () => {
        if (userRole === 'Administrador') {
            router.push('/paginaAdministrador');
        } else if (userRole === 'Corretor') {
            router.push('/paginaCorretores');
        } else if (userRole === 'Proprietario') {
            router.push('/paginaProprietarios');
        } else if (userRole === 'Editor') {
            router.push('/paginaEditor');
        } else if (userRole === 'Usuario') {
            router.push('/paginaInicial');
        } else {
            router.push('/paginaInicial');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setShowProfileModal(false);
        router.push('/login');
    }

    const handleLanguageChange = async (lang: 'pt' | 'en' | 'es') => {
        await setLanguage(lang);
        setShowLanguageModal(false);
    };

    return (
        <>
            <header className={`${inter.className} bg-[#DFDAD0] px-6 pt-4 max-lg:px-6 lg:px-20 xl:px-16 font-medium`}>
                <section className="flex flex-row justify-between">
                    <div className="flex flex-row items-center md:gap-8 lg:gap-12 xl:gap-20">
                        <div className="flex items-center md:gap-3 gap-4">
                            <Image
                                src="/imagensHeader/Logo HAV.png"
                                alt="Logo HAV"
                                width={45}
                                height={45}
                                className="max-h-full lg:w-[45px] w-[35px] mt-[-0.3rem] cursor-pointer"
                                onClick={handleLogoClick}
                            />
                            <p
                                className="md:text-lg text-xl xl:text-2xl font-bold text-vermelho cursor-pointer"
                                onClick={handleLogoClick}
                            >
                                HAV
                            </p>
                        </div>
                        <div>
                            <nav>
                                <ul className="flex flex-row max-lg:text-base text-xl whitespace-nowrap md:gap-4 lg:gap-6 text-[#303030] max-md:hidden">
                                    <li><Link href={userRole === 'Administrador' ? '/paginaAdministrador' : 
                                                  userRole === 'Corretor' ? '/paginaCorretores' : 
                                                  userRole === 'Proprietario' ? '/paginaProprietarios' : 
                                                  userRole === 'Editor' ? '/paginaEditor' : 
                                                  '/paginaInicial'}>{translate('Início')}</Link></li>
                                    <li><Link href="/paginaImoveis">{translate('Propriedades')}</Link></li>
                                    <li><Link href="/paginaCorretores">{translate('Corretores')}</Link></li>
                                    <li><Link href="/sobreNos">{translate('Sobre nós')}</Link></li>
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
                            <div className='flex flex-row items-center gap-2 cursor-pointer' onClick={() => setShowLanguageModal(!showLanguageModal)}>
                                <Image
                                    src={currentLanguage === 'pt' ? '/imagensHeader/Brasil.png' :
                                        currentLanguage === 'en' ? '/imagensHeader/eua.png' :
                                            '/imagensHeader/Espanha.png'}
                                    alt={currentLanguage === 'pt' ? 'Português' :
                                        currentLanguage === 'en' ? 'English' :
                                            'Español'}
                                    width={20}
                                    height={20}
                                />
                                <p className="text-lg max-lg:text-base">
                                    {currentLanguage === 'pt' ? 'Português' :
                                        currentLanguage === 'en' ? 'English' :
                                            'Español'}
                                </p>
                                <Image
                                    src="/imagensHeader/seta-para-baixo 2.png"
                                    alt="Abrir opções"
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                />
                            </div>
                            {showLanguageModal && (
                                <div className="absolute top-[calc(100%+0.5rem)] w-40 bg-[#702632] rounded-lg shadow-lg py-1 z-50">
                                    <div
                                        onClick={() => handleLanguageChange('pt')}
                                        className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center cursor-pointer"
                                    >
                                        <Image src="/imagensHeader/Brasil.png" alt="Português" width={20} height={20} />
                                        <span>Português</span>
                                    </div>
                                    <div className="w-full h-[1px] bg-white opacity-50"></div>
                                    <div
                                        onClick={() => handleLanguageChange('en')}
                                        className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center cursor-pointer"
                                    >
                                        <Image src="/imagensHeader/eua.png" alt="English" width={20} height={20} />
                                        <span>English</span>
                                    </div>
                                    <div className="w-full h-[1px] bg-white opacity-50"></div>
                                    <div
                                        onClick={() => handleLanguageChange('es')}
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
                                                {translate('Fazer login')}
                                            </Link>
                                            <div className="w-full h-[1px] bg-white opacity-50"></div>
                                            <Link
                                                href="/cadastro"
                                                className="block px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center"
                                            >
                                                {translate('Cadastrar-se')}
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <div className="px-4 py-2 text-white text-center">
                                                {username}
                                            </div>
                                            <div className="w-full h-[1px] bg-white opacity-50"></div>
                                            <Link
                                                href="/perfilUsuario"
                                                className="block px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center"
                                            >
                                                {translate('Perfil')}
                                            </Link>
                                            <div className="w-full h-[1px] bg-white opacity-50"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full px-4 py-2 text-white hover:bg-[#8a2e3d] transition-colors text-center"
                                            >
                                                {translate('Sair')}
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
                </section>
            </header>

            {hamburguerMobile && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50">
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#DFDAD0] z-50 overflow-y-auto">
                        <div className="flex flex-col min-h-full px-6 py-4">
                            <div className="flex justify-between items-center mb-8">
                                <Image
                                    src="/imagensHeader/Logo HAV.png"
                                    alt="Logo HAV"
                                    width={45}
                                    height={45}
                                    className="w-[35px]"
                                />
                                <button onClick={() => setHambuguerMobile(false)}>
                                    <Image
                                        src="/imagensHeader/HAMBURGUER.png"
                                        alt="Fechar menu"
                                        width={30}
                                        height={30}
                                        className="w-8"
                                    />
                                </button>
                            </div>
                            <nav>
                                <ul className="flex flex-col gap-6 text-xl text-[#303030]">
                                    <li><Link href={userRole === 'Administrador' ? '/paginaAdministrador' : 
                                                  userRole === 'Corretor' ? '/paginaCorretores' : 
                                                  userRole === 'Proprietario' ? '/paginaProprietarios' : 
                                                  userRole === 'Editor' ? '/paginaEditor' : 
                                                  '/paginaInicial'}>{translate('Início')}</Link></li>
                                    <li><Link href="/paginaImoveis">{translate('Propriedades')}</Link></li>
                                    <li><Link href="/paginaCorretores">{translate('Corretores')}</Link></li>
                                    <li><Link href="/sobreNos">{translate('Sobre nós')}</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}