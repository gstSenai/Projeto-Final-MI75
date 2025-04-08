import { Inter } from 'next/font/google';
import Image from 'next/image';

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
    preco: number,
    codigo: number;
}

export function Card({ titulo, cidade, qtdDormitorios, qtdSuite, qtdBanheiros, preco, codigo }: CardProps) {
    return (
        <>
            <button>
                <div className={`${inter.className} flex justify-center px-6  `}>
                    <div className="flex flex-col lg:w-full max-lg:max-w-[250px] lg:max-w-[250px] max-w-[300px] max-lg:mt-6">
                        <div className="w-full max-sm:max-w-[200px]">
                            <Image src="/imagensImovel/fotoImovel.png" alt="Imagem Imovel" className="w-full max-md:max-w-[350px]  max-w-[400px] lg:max-w-[350px] 2xl:max-w-[400px]" width={500} height={324} />
                        </div>
                        <div className="w-full max-md:max-w-[350px] max-sm:max-w-[200px] max-w-[400px] lg:max-w-[350px] 2xl:max-w-[400px] bg-white shadow-[5px_20px_100px_rgb(0,0,0,0.1)] rounded-b-[20px] py-2">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg 2xl:text-2xl font-black text-[#5C5C5C] [text-shadow:1px_1px_1px_#5C5C5C]">{titulo}</p>
                                <p className="text-vermelho font-semibold text-xs 2xl:text-base">{cidade}</p>
                            </div>
                            <div className="flex justify-center max-sm:gap-4 gap-10 items-center pt-2 2xl:gap-4">
                                <div className="flex flex-col items-center">
                                    <p className="text-[#5C5C5C] text-xs 2xl:text-base">Dormitórios</p>
                                    <Image src="/imagensImovel/imagemDormitorio.png" alt="Imagem Imovel" className='min-w-[20px] max-w-[40px] lg:min-w-[25px] 2xl:min-w-[30px]' width={25} height={25} />
                                    <p className="text-vermelho font-black 2xl:text-base lg:text-xs">{qtdDormitorios}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[#5C5C5C] text-xs 2xl:text-base">Suíte</p>
                                    <Image src="/imagensImovel/imagemSuite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[25px] 2xl:min-w-[30px]" width={25} height={25} />
                                    <p className="text-vermelho font-black 2xl:text-base lg:text-xs">{qtdSuite}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[#5C5C5C] text-xs 2xl:text-base">Banheiros</p>
                                    <Image src="/imagensImovel/imagemBanheiro.png" alt="Imagem Banheiro" className='min-w-[20px] max-w-[40px] lg:min-w-[25px] 2xl:min-w-[30px]' width={25} height={25} />
                                    <p className="text-vermelho font-black 2xl:text-base lg:text-xs">{qtdBanheiros}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-2">
                                <p className="text-vermelho text-lg 2xl:text-2xl font-black [text-shadow:1px_1px_1px_#702632]">R${preco},00</p>
                                <p className="text-[#5C5C5C] text-xs font-black">Cód: {codigo}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        </>
    );
}

export default Card;