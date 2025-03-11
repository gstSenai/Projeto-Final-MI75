"use client";
import { useState } from 'react';


import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import PlaceFilter from '../botaoselecao';


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
                <div className='flex flex-col  py-4 lg:flex-row 2xl:flex-row justify-between '>
                    <div className=' py-2 w-64 xl:w-[320px]'>
                        <p className='font-medium lg:font-bold text-2xl pb-2'>Código:</p>
                        <input className='rounded-md p-2 w-full bg-[#DFDAD0] text-[#702632]' placeholder='Busca por Código' type="text" />
                    </div>
                    <div className=' py-2 w-64 xl:w-[320px]'>
                        <p className='font-medium lg:font-bold text-2xl pb-2'>Localização:</p>
                        <input className='rounded-md p-2  w-full bg-[#DFDAD0] text-[#702632]' type="text" placeholder='Busca por Localização' />
                    </div>
                </div>

                <button
                    className='py-4 flex items-center gap-2'
                    onClick={() => setMostrarAvançado(!mostrarAvançado)}
                >
                    <Image className={`transition-transform duration-300 w-6 h-6  ${mostrarAvançado ? 'rotate-180' : ''}`} src="/seta.png" alt="Ícone avançado" width={48} height={48} />
                    <span className='text-xl'>Avançado</span>
                </button>

                <button className="rounded-md p-2 w-[180px] bg-[#DFDAD0] text-[#702632] items-center">
                    <div className='flex items-center gap-2'>
                        <Image src="/lupa.png" alt="Ícone de pesquisa" width={30} height={30} />
                        <p className='text-[#702632] font-medium '>Pesquisa</p>
                    </div>
                </button>

                {mostrarAvançado && (
                    <div>
                        <div className='py-4 flex flex-col lg:flex-row 2xl:flex-row justify-between '>
                            <div className='py-2 w-64 xl:w-[320px]'>
                                <p className='font-medium lg:font-bold text-2xl'>Min Valor:</p>
                                <input className='rounded-md p-2 w-full bg-[#DFDAD0] text-[#702632]' type="value" placeholder='Busca por Valor Minimo' />
                            </div>
                            <div className='py-2 w-64 xl:w-[320px]'>
                                <p className='font-medium lg:font-bold text-2xl'>Max Valor:</p>
                                <input className='rounded-md p-2  w-full bg-[#DFDAD0] text-[#702632]' type="value" placeholder='Busca por Valor Maximo' />
                            </div>
                        </div>
                        <div className='py-4 flex flex-col lg:flex-row 2xl:flex-row justify-between gap-4 '>
                            <PlaceFilter tipo="TipoLocal" texto='Quant. de Quartos:' />
                            <PlaceFilter tipo="NumLocal" texto='Quant. de Quartos:' />
                        </div>
                        <div className='py-4 flex flex-col lg:flex-row 2xl:flex-row justify-between gap-4'>
                            <PlaceFilter tipo="NumLocal" texto='Quant. de Garagem:' />
                            <PlaceFilter tipo="NumLocal" texto='Quant. de Banheiros:' />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}