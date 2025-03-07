"use client";
import { useState } from 'react';


import { Montserrat } from 'next/font/google';
import Image from 'next/image';


const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

export function PesquisaPaginaInicial() {
    const [modo, setModo] = useState('comprar');
    const [mostrarAvançado, setMostrarAvançado] = useState(false);

    return (
        <div className={`${montserrat.className} bg-[#702632] pr-6 pl-6 pt-6 rounded-3xl w-[320px]`}>
            <div className='flex text-lg justify-between'>
                <button
                    className={`p-2 px-6 rounded-md ${modo === 'comprar' ? 'bg-[#DFDAD0] font-medium text-black' : 'text-white font-bold'}`}
                    onClick={() => setModo('comprar')}
                >Comprar</button>
                <button
                    className={`p-2 px-6 rounded-md ${modo === 'alugar' ? 'bg-[#DFDAD0] font-medium text-black' : 'text-white font-bold'}`}
                    onClick={() => setModo('alugar')}
                >Aluguel</button>
            </div>
            <div className='bg-[#702632] w-0 lg:w-[650px] xl:w-[800px] pt-6 pr-16 pb-6 rounded-3xl text-white'>
                <div className='flex flex-col lg:flex-row 2xl:flex-row justify-between'>
                    <div className='py-4'>
                        <p className='font-medium lg:font-bold text-2xl'>Código:</p>
                        <input className='rounded-md p-2 pr-16 bg-[#DFDAD0] ' placeholder='Busca por Código' type="text" />
                    </div>
                    <div className='py-4'>
                        <p className='font-medium lg:font-bold text-2xl'>Localização:</p>
                        <input className='rounded-md p-2 pr-16 bg-[#DFDAD0] ' type="text" placeholder='Busca por Localização' />
                    </div>
                </div>

                <button className='py-8' onClick={() => setMostrarAvançado(!mostrarAvançado)}>
                    {mostrarAvançado ? 'Ocultar Avançado' : 'Mostrar Avançado'}
                </button>

                <button className="rounded-md bg-[#DFDAD0] pr-6 flex">
                    <div className='flex p-2'>
                    <Image src="/lupa.png" alt="Ícone de pesquisa" width={20} height={20} />
                        <p className='text-[#702632]'>Pesquisa</p>
                    </div>
                </button>

                {mostrarAvançado && (
                    <div className='py-8'>
                        {/* Conteúdo da seção avançada */}
                        <p className='font-bold text-2xl'>Pesquisa Avançada:</p>
                        <input className='rounded-md p-2 bg-[#DFDAD0] ' type="text" placeholder='Pesquisa Avançada' />
                        {/* Adicione mais campos conforme necessário */}
                    </div>
                )}

            </div>
        </div>
    );
}