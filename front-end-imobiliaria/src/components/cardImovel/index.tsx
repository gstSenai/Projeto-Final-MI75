"use client"

import { Inter } from 'next/font/google';
import Image from 'next/image';
import Favoritar from '@/components/favoritar/index'
import { useLanguage } from '@/components/context/LanguageContext';
import { useRouter } from 'next/navigation';

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
    imovelId?: number
}

export function Card({ titulo, cidade, numero_quartos, numero_suites, numero_banheiros, preco, codigo, imovelId }: CardProps) {
    const router = useRouter();

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

    return (
        <div className={`${inter.className} flex justify-center pt-12 lg:pt-0`}>
            <div className="flex flex-col lg:w-full lg:max-w-[320px] 2xl:max-w-[300px] cursor-pointer" onClick={handleClick}>
                <div className='relative'>
                    {imovelId && (
                        <div className="absolute top-2 right-2">
                            <Favoritar usuarioId={1} imovelId={imovelId} />
                        </div>
                    )}
                    <div className="w-full">
                        <Image src="/imagensImovel/fotoImovel.png" alt="Imagem Imovel" className="w-full lg:w-full lg:max-w-[320px] 2xl:max-w-[300px]" width={500} height={324} />
                    </div>
                </div>
                <div className="w-full lg:w-full lg:max-w-[320px] 2xl:max-w-[300px] bg-white shadow-[5px_20px_100px_rgb(0,0,0,0.1)] rounded-b-[20px] py-2">
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