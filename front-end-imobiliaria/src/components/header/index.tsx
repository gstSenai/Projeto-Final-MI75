"use client";
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
    const [mostrarAvançado, setMostrarAvançado] = useState(false);
    return (
        <>
            <header className="font-inter bg-[#DFDAD0] px-10 pt-6 max-lg:px-10 lg:px-30 xl:px-20 font-medium">
                <section className="flex flex-row justify-between ">
                    <div className="flex flex-row items-center lg:gap-16 xl:gap-26">
                        <div>
                            <a className='flex items-center gap-6' href="/PaginaInicial">
                                <img src="/imagensHeader/Logo HAV.png" alt="Logo HAV" className="max-h-full lg:w-[60px] w-[40px] mt-[-0.5rem]" />
                                <p className="text-2xl xl:text-3xl font-bold text-[#702632]">HAV</p>
                            </a>
                        </div>
                        <div>
                            <nav>
                                <ul className="flex flex-row text-xl whitespace-nowrap gap-12 lg:gap-6 text-[#303030] max-lg:hidden">
                                    <li><a href="/PaginaInicial">Início</a></li>
                                    <li><a href="#">Propriedades</a></li>
                                    <li><a href="#">Corretores</a></li>
                                    <li><a href="/sobreNos">Sobre nós</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="flex flex-row items-center font-medium ">
                        <div className="flex flex-row items-center gap-6 max-lg:hidden">
                            <div className="flex flex-row items-center pl-16" />
                            <img src="/imagensHeader/Botão tema site.png" alt="Tema" />
                        </div>
                        <div className="flex flex-row items-center gap-2 px-8 max-lg:hidden">
                            <img src="/imagensHeader/Brasil.png" alt="Idioma" />
                            <p className="text-xl">Português</p>
                            <img src="/imagensHeader/seta-para-baixo 2.png" alt="Abrir opções" />
                        </div>
                        <div className="flex flex-row items-center max-lg:hidden">
                            <img src="/imagensHeader/PERFIL SEM LOGIN.png" alt="Perfil sem login" className="w-12 lg:w-[50px]" />
                        </div>
                        <button onClick={() => setMostrarAvançado(!mostrarAvançado)}>
                            <div className="flex flex-row items-center lg:hidden">
                                <img src="/imagensHeader/HAMBURGUER.png" alt="Perfil sem login" className="w-12 lg:w-[50px]" />
                            </div>
                        </button>
                    </div>


                    {mostrarAvançado && (
                        <>
                            <div className='bg-[#DFDAD0] absolute z-10'>
                                <nav>
                                    <ul className="flex flex-col text-xl whitespace-nowrap gap-12 lg:gap-6 text-[#303030]">
                                        <div className='flex p-[0.5px]'></div>
                                        <li className='flex items-center gap-2 text-2xl'>
                                            <Image src="/iconsDentrodoHeader/logoMinuscula.png" alt="logo Minuscula" width={24} height={24} />
                                            <a href="/PaginaInicial">Início</a>
                                        </li>
                                        <li className='flex items-center gap-2 text-2xl'>
                                            <Image src="/iconsDentrodoHeader/casa.png" alt="logo Minuscula" width={24} height={24} />
                                            <a href="#">Propriedades</a>
                                        </li>
                                        <li className='flex items-center gap-2 text-2xl'>
                                            <Image src="/iconsDentrodoHeader/corretores.png" alt="logo Minuscula" width={24} height={24} />
                                            <a href="#">Corretores</a>
                                        </li>
                                        <li className='flex items-center gap-2 text-2xl'>
                                            <Image src="/iconsDentrodoHeader/informacao.png" alt="logo Minuscula" width={24} height={24} />
                                            <a href="/sobreNos">Sobre nós</a>
                                        </li>
                                    </ul>
                                </nav>



                            </div>
                        </>
                    )}



                </section >
            </header>
        </>
    );
}