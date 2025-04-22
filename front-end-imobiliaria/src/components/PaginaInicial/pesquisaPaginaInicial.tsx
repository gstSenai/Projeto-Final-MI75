"use client";
import { useState } from 'react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import PlaceFilter from '@/components/PaginaInicial/botaoselecao';
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
    const { translate } = useLanguage();
    const router = useRouter();

    const handlePesquisaCodigo = async () => {
        setErro('');
        try {
            if (codigo.trim()) {
                console.log('Fazendo requisição para:', `http://localhost:9090/imovel/filtroCodigo?codigo=${codigo}`);
                const response = await fetch(`http://localhost:9090/imovel/filtroCodigo?codigo=${codigo}`);
                console.log('Resposta recebida:', response.status);
                
                if (!response.ok) {
                    throw new Error('Imóvel não encontrado');
                }
                const data = await response.json();
                console.log('Dados recebidos:', data);
                
                if (data && data.id) {
                    console.log('Redirecionando para página de imóveis com código:', codigo);
                    router.push(`/paginaImoveis?codigo=${codigo}`);
                } else {
                    console.log('Imóvel não encontrado nos dados');
                    setErro('Imóvel não encontrado');
                }
            } else {
                // Se não houver código, redireciona para a página de imóveis sem filtro
                router.push('/paginaImoveis');
            }
        } catch (error) {
            console.error('Erro completo:', error);
            setErro('Imóvel não encontrado');
        }
    };

    const handlePesquisaEndereco = async () => {
        if (!codigo.trim() && !cidade.trim() && !bairro.trim()) {
            setErro('Por favor, preencha pelo menos um campo');
            return;
        }

        try {
            let url = '/paginaImoveis?';
            const params = [];

            if (codigo.trim()) {
                params.push(`codigo=${codigo}`);
            }
            if (cidade.trim()) {
                params.push(`cidade=${cidade}`);
            }
            if (bairro.trim()) {
                params.push(`bairro=${bairro}`);
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
                            <input 
                                className='rounded-md w-full bg-[#DFDAD0] text-vermelho' 
                                type="text" 
                                placeholder='Cidade' 
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                            />
                            <input 
                                className='rounded-md w-full bg-[#DFDAD0] text-vermelho' 
                                type="text" 
                                placeholder='Bairro' 
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                            />
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
                                        type="value" 
                                        placeholder={translate('filtro.min_valor_placeholder')} 
                                    />
                                </div>
                            </div>
                            <div className='py-2 w-64'>
                                <p className='font-medium lg:font-bold text-2xl'>{translate('filtro.max_valor')}</p>
                                <div className='rounded-md w-full bg-[#DFDAD0] flex items-center p-1 gap-2'>
                                    <Image src="/paginaInicial/paginasInicialDetalhes/cifrao.png" alt="Ícone de cifrão" width={24} height={24} />
                                    <input 
                                        className='rounded-md w-full bg-[#DFDAD0] text-vermelho outline-none' 
                                        type="value" 
                                        placeholder={translate('filtro.max_valor_placeholder')} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='py-4 flex flex-col lg:flex-row 2xl:flex-row justify-between gap-4'>
                            <PlaceFilter tipo="TipoLocal" texto={translate('filtro.tipo_local')} />
                            <PlaceFilter tipo="NumLocal" texto={translate('filtro.quartos')} />
                        </div>
                        <div className='py-4 flex flex-col lg:flex-row 2xl:flex-row justify-between gap-4'>
                            <PlaceFilter tipo="NumLocal" texto={translate('filtro.garagem')} />
                            <PlaceFilter tipo="NumLocal" texto={translate('filtro.banheiros')} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}