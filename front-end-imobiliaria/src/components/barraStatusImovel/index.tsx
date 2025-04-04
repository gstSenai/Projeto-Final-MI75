"use client";

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

import Image from 'next/image';
import { useEffect, useState } from "react"
import request from "@/routes/request"


interface BarraStatusProps {
    id: number; 
    numero_quartos: number;
    numero_banheiros: number;
    numero_suites: number;
    numero_vagas: number;
    piscina: boolean;
}

// Nome do componente alterado para PascalCase
export function BarraStatusImovel({ id }: { id: number }) {
    const [isLoading, setIsLoading] = useState(false)
    const [barraStatus, setBarraStatus] = useState<BarraStatusProps | null>(null)


    const getBarraStatus = async () => {
        setIsLoading(true);
        try {
            const response = await request("GET", `http://localhost:9090/caracteristicaImovel/getById/${id}`);
            console.log("Resposta da API:", response);
            setBarraStatus(response);
        } catch (error) {
            console.error("Erro ao buscar características do imóvel:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log("ID recebido:", id);
        getBarraStatus();
    }, [id]);




    return (
        <>
            <div className='flex flex-row gap-[38px]'>
                {isLoading ? (
                    <p>Carregando...</p>
                ) : (
                    <>
                        {barraStatus && (
                            <>
                                <div className='flex flex-col items-center gap-2'>
                                    <Image
                                        className='' src="/imagensImovel/imagemDormitorio.png"
                                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                                    />
                                    <p className='text-xs'>{barraStatus.numero_quartos}</p>

                                </div>


                                <div className='flex flex-col items-center gap-2'>
                                    <Image
                                        className='' src="/imagensImovel/imagemBanheiro.png"
                                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                                    />
                                    <p className='text-xs'>{barraStatus.numero_banheiros}</p>
                                </div>


                                <div className='flex flex-col items-center gap-2'>
                                    <Image
                                        className='' src="/iconsImoveis/iconGaragem.png"
                                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                                    />
                                    <p className='text-xs'>{barraStatus.numero_vagas}</p>
                                </div>


                                <div className='flex flex-col items-center gap-2'>
                                    <Image
                                        className='' src="/imagensImovel/imagemSuite.png"
                                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                                    />
                                    <p className='text-xs'>{barraStatus.numero_suites}</p>
                                </div>


                                <div className='flex flex-col items-center gap-2'>
                                    <Image
                                        className='' src="/iconsImoveis/iconPraia.png"
                                        alt="cidade da Pagina do Editor" quality={100} width={30} height={30}
                                    />
                                    <p className='text-xs'>{Number(barraStatus.piscina)}</p>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>


        </>
    )
}