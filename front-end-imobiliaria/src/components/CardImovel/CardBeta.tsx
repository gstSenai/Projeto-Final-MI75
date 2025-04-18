"use client"

import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useLanguage } from '@/components/context/LanguageContext';

// Carregando a fonte Inter
const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600'],
    display: 'swap',
});

interface CardProps {
    titulo: string,
    cidade: string,
    qtdDormitorios: number,
    qtdSuite: number,
    qtdBanheiros: number,
    preco: string,
    codigo: number;
}

export default function CardBeta({ titulo, cidade, qtdDormitorios, qtdSuite, qtdBanheiros, preco, codigo }: CardProps) {
    const { translate } = useLanguage();
    
    // Traduzir os textos
    const dormitoriosText = translate('quartos');
    const suiteText = translate('suites');
    const banheirosText = translate('banheiros');
    const codigoText = translate('codigo');
    
    return (
        <>
            <div className={`${inter.className} flex justify-center gap-14 lg:gap-4 py-10 2xl:gap-8 min-h-screen flex-col lg:flex-row bg-[#DFDAD0] px-10`}>
                <button>
                <div className="flex justify-center items-center">
                    <div className="flex flex-col w-full max-w-[375px] lg:max-w-[500px] lg:px-4">
                        <div className="w-full">
                            <Image src="/fotoImovel.png" alt="Imagem Imovel" width={500} height={300} className="w-full max-w-[500px] lg:max-w-[350px] 2xl:max-w-[400px]"  />
                        </div>
                        <div className="w-full bg-white shadow-[5px_20px_100px_rgb(0,0,0,0.1)] rounded-b-[20px] py-2">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg 2xl:text-2xl font-black text-[#5C5C5C] [text-shadow:1px_1px_1px_#5C5C5C]">{titulo}</p>
                                <p className="text-[#702632] font-semibold text-sm 2xl:text-lg">{cidade}</p>
                            </div>
                            <div className="w-full bg-white shadow-[5px_20px_100px_rgb(0,0,0,0.1)] rounded-b-[20px] py-2">
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-lg 2xl:text-2xl font-black text-[#5C5C5C] [text-shadow:1px_1px_1px_#5C5C5C]">{titulo}</p>
                                    <p className="text-[#702632] font-semibold text-sm 2xl:text-lg">{cidade}</p>
                                </div>
                                <div className="flex justify-center gap-10 lg:gap-10 items-center pt-2">
                                    <div className="flex flex-col items-center pl-2">
                                        <p className="text-[#5C5C5C] text-sm 2xl:text-xl">{dormitoriosText}</p>
                                        <Image src="/imagensImovel/imagemDormitorio.png" alt="Imagem Imovel" width={40} height={40} className='2xl:min-w-[60px] lg:min-w-[35px]' />
                                        <p className="text-[#702632] font-black lg:text-lg">{qtdDormitorios}</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="text-[#5C5C5C] text-sm 2xl:text-xl">{suiteText}</p>
                                        <Image src="/imagensImovel/imagemSuite.png" alt="Imagem Suite" width={40} height={40} className="min-w-[20px] max-w-[40px] lg:min-w-[35px] 2xl:min-w-[60px]" />
                                        <p className="text-[#702632] font-black lg:text-lg">{qtdSuite}</p>
                                    </div>
                                    <div className="flex flex-col items-center pr-2">
                                        <p className="text-[#5C5C5C] text-sm 2xl:text-xl">{banheirosText}</p>
                                        <Image src="/imagensImovel/imagemBanheiro.png" alt="Imagem Banheiro" width={40} height={40} className='2xl:min-w-[60px] lg:min-w-[35px]' />
                                        <p className="text-[#702632] font-black lg:text-lg">{qtdBanheiros}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center pt-2">
                                    <p className="text-[#702632] text-2xl 2xl:text-4xl font-black [text-shadow:1px_1px_1px_#702632]">{preco}</p>
                                    <p className="text-[#5C5C5C] text-sm font-black">{codigoText}: {codigo}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </button>
        
        
            </div>
        </>
    );
}