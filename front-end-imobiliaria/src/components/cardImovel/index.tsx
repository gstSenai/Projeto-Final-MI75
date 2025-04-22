"use client"

import { Inter } from 'next/font/google';
import Image from 'next/image';
import Favoritar from '@/components/favoritar/index'
import { useLanguage } from '@/components/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600'],
    display: 'swap',
});

interface CardProps {
    titulo: string,
    cidade: string,
    numero_quartos: number,
    numero_suites: number,
    numero_banheiros: number,
    preco: number,
    codigo: number,
    imovelId?: number,
    imagemPrincipal?: string,
    destaque?: 'Destaque' | 'Promoção' | 'Adicionado Rec.' | 'Não Destaque' 
}

export function Card({ titulo, cidade, numero_quartos, numero_suites, numero_banheiros, preco, codigo, imovelId, imagemPrincipal, destaque }: CardProps) {
    const router = useRouter();
    const [mainImage, setMainImage] = useState<string>('/imagensImovel/fotoImovel.png');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMainImage = async () => {
            if (imovelId) {
                setIsLoading(true);
                try {
                    const response = await fetch(`http://localhost:9090/imagens/download/imovel/${imovelId}/imagem/0`);
                    if (response.ok) {
                        const blob = await response.blob();
                        const imageUrl = URL.createObjectURL(blob);
                        setMainImage(imageUrl);
                    } else {
                        setMainImage('/imagensImovel/fotoImovel.png');
                    }
                } catch (error) {
                    console.error('Erro ao buscar imagem principal:', error);
                    setMainImage('/imagensImovel/fotoImovel.png');
                } finally {
                    setIsLoading(false);
                }
            } else {
                setMainImage('/imagensImovel/fotoImovel.png');
                setIsLoading(false);
            }
        };

        fetchMainImage();
    }, [imovelId]);

    const handleClick = () => {
        if (imovelId) {
            localStorage.setItem('currentImovelId', imovelId.toString());
            router.push('/paginaImoveis/imovelDetalhes');
        }
    };

    const { translate } = useLanguage();
    const dormitoriosText = translate('quartos');
    const suiteText = translate('suites');
    const banheirosText = translate('banheiros');
    const codigoText = translate('codigo');

    const formattedPrice = preco ? preco.toLocaleString('pt-BR') : '0';

    const getLabelStyle = (tipo: string) => {
        switch (tipo) {
            case 'Destaque':
                return 'bg-[#702632]';
            case 'Promoção':
                return 'bg-[#FFA500]';
            case 'Adicionado Rec.':
                return 'bg-white';
            default:
                return '';
        }
    };

    return (
        <div className={`${inter.className} flex justify-center pt-12 lg:pt-0`}>
            <div className="flex flex-col w-[250px] lg:w-[320px] 2xl:w-[300px] cursor-pointer" onClick={handleClick}>
                <div className='relative w-full'>
                    {imovelId && (
                        <div className="absolute top-2 right-2">
                            <Favoritar usuarioId={1} imovelId={imovelId} />
                        </div>
                    )}
                    <div className="w-full overflow-hidden">
                        {isLoading ? (
                            <div className="w-full h-[324px] flex items-center justify-center bg-gray-200">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vermelho"></div>
                            </div>
                        ) : (
                            <div className="relative w-full">
                                {destaque === 'Adicionado Rec.' && (
                                    <div className={`absolute top-6 -left-8 whitespace-nowrap text-center text-black ${getLabelStyle(destaque)} py-1 px-10 transform -rotate-[30deg] z-10 font-bold text-xs shadow-md`}>
                                        {destaque.toUpperCase()}
                                    </div>
                                )}
                                {destaque === 'Destaque'  && (
                                    <div className={`absolute top-5 -left-4 text-white ${getLabelStyle(destaque)} py-1 px-12 transform -rotate-[31deg] z-10 font-bold text-xs shadow-md`}>
                                        {destaque?.toUpperCase()}
                                    </div>
                                )}
                                {destaque === 'Promoção' && (
                                    <div className={`absolute top-4 -left-4 text-white ${getLabelStyle(destaque)} py-1 px-10 transform -rotate-[30deg] z-10 font-bold text-xs shadow-md`}>
                                        {destaque?.toUpperCase()}
                                    </div>
                                )}
                                <Image 
                                    src={mainImage} 
                                    alt="Imagem Imovel" 
                                    className="w-full h-[324px] object-cover rounded-t-[20px]" 
                                    width={500} 
                                    height={324} 
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full bg-white shadow-[5px_20px_100px_rgb(0,0,0,0.1)] rounded-b-[20px] py-2">
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-lg 2xl:text-2xl font-black text-[#5C5C5C] [text-shadow:1px_1px_1px_#5C5C5C]">{titulo}</p>
                        <p className="text-vermelho font-semibold text-xs 2xl:text-base">{cidade}</p>
                    </div>
                    <div className="flex justify-center max-sm:gap-4 gap-10 items-center pt-2 2xl:gap-4">
                        <div className="flex flex-col items-center">
                            <p className="text-[#5C5C5C] text-xs 2xl:text-base">{dormitoriosText}</p>
                            <Image src="/imagensImovel/imagemDormitorio.png" alt="Imagem Imovel" className='min-w-[20px] max-w-[40px] lg:min-w-[25px] 2xl:min-w-[30px]' width={25} height={25} />
                            <p className="text-vermelho font-black 2xl:text-base lg:text-xs">{numero_quartos}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-[#5C5C5C] text-xs 2xl:text-base">{suiteText}</p>
                            <Image src="/imagensImovel/imagemSuite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[25px] 2xl:min-w-[30px]" width={25} height={25} />
                            <p className="text-vermelho font-black 2xl:text-base lg:text-xs">{numero_suites}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-[#5C5C5C] text-xs 2xl:text-base">{banheirosText}</p>
                            <Image src="/imagensImovel/imagemBanheiro.png" alt="Imagem Banheiro" className='min-w-[20px] max-w-[40px] lg:min-w-[25px] 2xl:min-w-[30px]' width={25} height={25} />
                            <p className="text-vermelho font-black 2xl:text-base lg:text-xs">{numero_banheiros}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center pt-2">
                        <p className="text-vermelho text-lg 2xl:text-2xl font-black [text-shadow:1px_1px_1px_#702632]">R${formattedPrice},00</p>
                        <p className="text-[#5C5C5C] text-xs font-black">{codigoText}: {codigo}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}