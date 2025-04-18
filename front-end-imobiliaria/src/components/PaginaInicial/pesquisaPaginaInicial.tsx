'use client';
import { useState } from 'react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import PlaceFilter from '../PaginaInicial/botaoselecao';
import { useLanguage } from '@/components/context/LanguageContext';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

export function PesquisaPaginaInicial() {
    const [modo, setModo] = useState<'comprar' | 'alugar'>('comprar');
    const [mostrarAvancado, setMostrarAvancado] = useState(false);
    const { translate } = useLanguage();

    return (
        <div className={`${montserrat.className} bg-[#702632] pr-6 pl-6 pt-6 rounded-3xl w-[320px] lg:w-[650px] xl:w-[800px]`}>
            {/* Botões de modo */}
            <div className='flex text-lg justify-between mb-4'>
                <button
                    className={`p-2 px-6 rounded-md ${modo === 'comprar' ? 'bg-[#DFDAD0] font-medium text-black' : 'text-white font-bold'}`}
                    onClick={() => setModo('comprar')}
                >
                    {translate('filtro.comprar')}
                </button>
                <button
                    className={`p-2 px-6 rounded-md ${modo === 'alugar' ? 'bg-[#DFDAD0] font-medium text-black' : 'text-white font-bold'}`}
                    onClick={() => setModo('alugar')}
                >
                    {translate('filtro.alugar')}
                </button>
            </div>

            {/* Filtros principais */}
            <div className='text-white'>
                <div className='flex flex-col lg:flex-row justify-between gap-4'>
                    <div className='w-full'>
                        <p className='font-bold text-2xl pb-2'>{translate('filtro.codigo')}</p>
                        <div className='rounded-md bg-[#DFDAD0] flex items-center p-1 gap-2'>
                            <Image src="/paginaInicial/paginasInicialDetalhes/lupa.png" alt="Ícone de pesquisa" width={30} height={30} />
                            <input className='bg-[#DFDAD0] text-[#702632] w-full outline-none' placeholder={translate('filtro.codigo_placeholder')} />
                        </div>
                    </div>
                    <div className='w-full'>
                        <p className='font-bold text-2xl pb-2'>{translate('filtro.localizacao')}</p>
                        <div className='rounded-md bg-[#DFDAD0] flex items-center p-1 gap-2'>
                            <Image src="/paginaInicial/paginasInicialDetalhes/localização.png" alt="Ícone de localização" width={28} height={28} />
                            <input className='bg-[#DFDAD0] text-[#702632] w-full outline-none' placeholder={translate('filtro.localizacao_placeholder')} />
                        </div>
                    </div>
                </div>

                {/* Botão avançado */}
                <button onClick={() => setMostrarAvancado(!mostrarAvancado)} className='py-4 flex items-center gap-2'>
                    <Image
                        className={`transition-transform duration-300 w-6 h-6 ${mostrarAvancado ? 'rotate-180' : ''}`}
                        src="/paginaInicial/paginasInicialDetalhes/seta.png"
                        alt="Ícone avançado"
                        width={48}
                        height={48}
                    />
                    <span className='text-xl'>{translate('filtro.avancado')}</span>
                </button>

                {/* Filtros Avançados */}
                {mostrarAvancado && (
                    <>
                        <div className='flex flex-col lg:flex-row justify-between gap-4'>
                            <div className='w-full'>
                                <p className='font-bold text-2xl'>{translate('filtro.min_valor')}</p>
                                <div className='rounded-md bg-[#DFDAD0] flex items-center p-1 gap-2'>
                                    <Image src="/paginaInicial/paginasInicialDetalhes/cifrao.png" alt="Ícone cifrão" width={24} height={24} />
                                    <input className='bg-[#DFDAD0] text-[#702632] w-full outline-none' placeholder={translate('filtro.min_valor_placeholder')} />
                                </div>
                            </div>
                            <div className='w-full'>
                                <p className='font-bold text-2xl'>{translate('filtro.max_valor')}</p>
                                <div className='rounded-md bg-[#DFDAD0] flex items-center p-1 gap-2'>
                                    <Image src="/paginaInicial/paginasInicialDetalhes/cifrao.png" alt="Ícone cifrão" width={24} height={24} />
                                    <input className='bg-[#DFDAD0] text-[#702632] w-full outline-none' placeholder={translate('filtro.max_valor_placeholder')} />
                                </div>
                            </div>
                        </div>

                        <div className='py-4 flex flex-col lg:flex-row justify-between gap-4'>
                            <PlaceFilter tipo="TipoLocal" texto={translate('filtro.tipo_local')} />
                            <PlaceFilter tipo="NumLocal" texto={translate('filtro.quartos')} />
                        </div>

                        <div className='py-4 flex flex-col lg:flex-row justify-between gap-4'>
                            <PlaceFilter tipo="NumLocal" texto={translate('filtro.garagem')} />
                            <PlaceFilter tipo="NumLocal" texto={translate('filtro.banheiros')} />
                        </div>
                    </>
                )}

                {/* Botão de pesquisa */}
                <div className='mt-6'>
                    <button className="rounded-md p-2 w-[180px] bg-[#DFDAD0] text-[#702632] flex items-center gap-2">
                        <Image src="/paginaInicial/paginasInicialDetalhes/lupa.png" alt="Ícone de pesquisa" width={30} height={30} />
                        <span className='font-medium'>{translate('filtro.pesquisa')}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
