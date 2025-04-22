"use client";
import { useState } from 'react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import PlaceFilter from '@/components/paginaInicial/botaoselecao';
import { useLanguage } from '@/components/context/LanguageContext';
import { useRouter } from 'next/navigation';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

export function PesquisaPaginaInicial() {
    const [modo, setModo] = useState('comprar');
    const [mostrarAvançado, setMostrarAvançado] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [erro, setErro] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [enderecos, setEnderecos] = useState<any[]>([]);
    const [minValor, setMinValor] = useState('');
    const [maxValor, setMaxValor] = useState('');
    const [tipoImovel, setTipoImovel] = useState('');
    const [quantidadeQuartos, setQuantidadeQuartos] = useState('');
    const [quantidadeBanheiros, setQuantidadeBanheiros] = useState('');
    const [quantidadeVagas, setQuantidadeVagas] = useState('');
    const { translate } = useLanguage();
    const router = useRouter();

    const handlePesquisaCodigo = async () => {
        setErro('');
        try {
            if (codigo.trim()) {
                const response = await fetch(`http://localhost:9090/imovel/filtroCodigo?codigo=${codigo}`);
                
                if (!response.ok) {
                    throw new Error('Imóvel não encontrado');
                }
                
                const data = await response.json();
                
                if (data && data.id) {
                    // Navigate to the imóveis page with the code filter
                    router.push(`/paginaImoveis?codigo=${codigo}`);
                } else {
                    setErro('Imóvel não encontrado');
                }
            } else {
                // If no code is provided, redirect to imóveis page without filter
                router.push('/paginaImoveis');
            }
        } catch (error) {
            console.error('Erro ao buscar imóvel:', error);
            setErro('Imóvel não encontrado');
        }
    };

    const handlePesquisaEndereco = async () => {
        try {
            let url = '/paginaImoveis?';
            const params = [];

            if (codigo.trim()) {
                params.push(`codigo=${encodeURIComponent(codigo.trim())}`);
            }
            if (cidade.trim()) {
                params.push(`cidade=${encodeURIComponent(cidade.trim())}`);
            }
            if (bairro.trim()) {
                params.push(`bairro=${encodeURIComponent(bairro.trim())}`);
            }
            if (minValor.trim()) {
                params.push(`valor_min=${encodeURIComponent(minValor.trim())}`);
            }
            if (maxValor.trim()) {
                params.push(`valor_max=${encodeURIComponent(maxValor.trim())}`);
            }
            if (tipoImovel) {
                params.push(`tipo_imovel=${encodeURIComponent(tipoImovel.toLowerCase().trim())}`);
            }
            if (quantidadeQuartos) {
                params.push(`quantidade_quartos=${encodeURIComponent(quantidadeQuartos)}`);
            }
            if (quantidadeBanheiros) {
                params.push(`quantidade_banheiros=${encodeURIComponent(quantidadeBanheiros)}`);
            }
            if (quantidadeVagas) {
                params.push(`quantidade_vagas=${encodeURIComponent(quantidadeVagas)}`);
            }

            url += params.join('&');
            router.push(url);
        } catch (error) {
            console.error('Erro ao buscar:', error);
            setErro('Erro ao realizar a busca');
        }
    };

    return (
        <div className={`${montserrat.className} bg-vermelho pr-6 pl-6 pt-6 rounded-3xl w-[320px]`}>
            <div className='flex text-lg justify-between'>
                <button
                    className={`p-2 px-6 rounded-md ${modo === 'comprar' ? 'bg-[#DFDAD0] font-medium text-black' : 'text-white font-bold'}`}
                    onClick={() => setModo('comprar')}
                >
                    Comprar
                </button>
                <button
                    className={`p-2 px-6 rounded-md ${modo === 'alugar' ? 'bg-[#DFDAD0] font-medium text-black' : 'text-white font-bold'}`}
                    onClick={() => setModo('alugar')}
                >
                    Aluguel
                </button>
            </div>
            <div className='bg-vermelho w-0 lg:w-[650px] xl:w-[800px] pt-6 pr-16 pb-6 rounded-3xl text-white'>
                <div className='flex flex-col py-4 lg:flex-row 2xl:flex-row justify-between'>
                    <div className='py-2 w-64'>
                        <p className='font-medium lg:font-bold text-2xl pb-2'>Código:</p>
                        <div className='rounded-md  bg-[#DFDAD0] flex items-center p-1 gap-2'>
                            <Image src="/paginaInicial/paginasInicialDetalhes/lupa.png" alt="Ícone de pesquisa" width={30} height={30} />
                            <input 
                                className='rounded-md w-full bg-[#DFDAD0] text-vermelho' 
                                placeholder='Busca por Código' 
                                type="text" 
                                value={codigo}
                                onChange={(e) => {
                                    setCodigo(e.target.value);
                                    setErro('');
                                }}
                            />
                        </div>
                        {erro && <p className="text-red-500 text-sm mt-1">{erro}</p>}
                    </div>
                    <div className='py-2 w-64'>
                        <p className='font-medium lg:font-bold text-2xl pb-2'>Localização:</p>
                        <div className='rounded-md bg-[#DFDAD0] flex flex-col p-1 gap-2'>
                            <div 
                                className='rounded-md w-full bg-[#DFDAD0] cursor-pointer hover:opacity-90 transition-opacity duration-200 flex items-center justify-center'
                                onClick={() => router.push('/mapa')}
                            >
                                <div className='flex flex-col items-center gap-2'>
                                    <p className='text-vermelho text-sm font-medium'>Ver no Mapa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className='py-4 flex items-center gap-2'
                    onClick={() => setMostrarAvançado(!mostrarAvançado)}
                >
                    <Image 
                        className={`transition-transform duration-300 w-6 h-6 ${mostrarAvançado ? 'rotate-180' : ''}`} 
                        src="/paginaInicial/paginasInicialDetalhes/seta.png" 
                        alt="Ícone avançado" 
                        width={48} 
                        height={48} 
                    />
                    <span className='text-xl'>Avançado</span>
                </button>

                <button 
                    className="rounded-md p-2 w-[180px] bg-[#DFDAD0] text-vermelho items-center focus:outline-none focus:ring-0 active:bg-[#dfd0d0]"
                    onClick={handlePesquisaEndereco}
                >
                    <div className='flex items-center gap-2'>
                        <Image src="/paginaInicial/paginasInicialDetalhes/lupa.png" alt="Ícone de pesquisa" width={30} height={30} />
                        <p className='text-vermelho font-medium'>Pesquisa</p>
                    </div>
                </button>

                {mostrarAvançado && (
                    <div>
                        <div className='py-4 flex flex-col lg:flex-row 2xl:flex-row justify-between'>
                            <div className='py-2 w-64'>
                                <p className='font-medium lg:font-bold text-2xl'>{translate('filtro.min_valor')}</p>
                                <div className='rounded-md w-full bg-[#DFDAD0] flex items-center p-1 gap-2'>
                                    <Image src="/paginaInicial/paginasInicialDetalhes/cifrao.png" alt="Ícone de cifrão" width={24} height={24} />
                                    <input 
                                        className='rounded-md w-full bg-[#DFDAD0] text-vermelho outline-none' 
                                        type="number" 
                                        placeholder={translate('filtro.min_valor_placeholder')}
                                        value={minValor}
                                        onChange={(e) => setMinValor(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='py-2 w-64'>
                                <p className='font-medium lg:font-bold text-2xl'>{translate('filtro.max_valor')}</p>
                                <div className='rounded-md w-full bg-[#DFDAD0] flex items-center p-1 gap-2'>
                                    <Image src="/paginaInicial/paginasInicialDetalhes/cifrao.png" alt="Ícone de cifrão" width={24} height={24} />
                                    <input 
                                        className='rounded-md w-full bg-[#DFDAD0] text-vermelho outline-none' 
                                        type="number" 
                                        placeholder={translate('filtro.max_valor_placeholder')}
                                        value={maxValor}
                                        onChange={(e) => setMaxValor(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='py-4 flex flex-col lg:flex-row 2xl:flex-row justify-between gap-4'>
                            <PlaceFilter 
                                tipo="TipoLocal" 
                                texto={translate('filtro.tipo_local')} 
                                onSelect={setTipoImovel}
                            />
                            <PlaceFilter 
                                tipo="NumLocal" 
                                texto={translate('filtro.quartos')} 
                                onSelect={setQuantidadeQuartos}
                            />
                        </div>
                        <div className='py-4 flex flex-col lg:flex-row 2xl:flex-row justify-between gap-4'>
                            <PlaceFilter 
                                tipo="NumLocal" 
                                texto={translate('filtro.banheiros')} 
                                onSelect={setQuantidadeBanheiros}
                            />
                            <PlaceFilter 
                                tipo="NumLocal" 
                                texto={translate('filtro.garagem')} 
                                onSelect={setQuantidadeVagas}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}