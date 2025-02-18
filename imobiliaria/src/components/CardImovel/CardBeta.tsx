import { Inter } from 'next/font/google';

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
    return (
        <>
            <div className={`${inter.className} flex justify-center gap-14 py-10 lg:gap-6 min-h-screen flex-col lg:flex-row bg-[#DFDAD0] px-10`}>
                <div className="flex justify-center items-center">
                    <div className="flex flex-col w-full max-w-[500px] lg:px-4">
                        <div className="w-full">
                            <img src="/fotoImovel.png" alt="Imagem Imovel" className="w-full max-w-[500px]" />
                        </div>
                        <div className="w-full bg-white rounded-b-[20px] py-2">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg font-black text-[#5C5C5C] xl:text-2xl">{titulo}</p>
                                <p className="text-[#702632] font-semibold xl:text-xl">{cidade}</p>
                            </div>
                            <div className="flex justify-center gap-10 lg:gap-6 items-center pt-2 lg:pt-6">
                                <div className="flex flex-col items-center pl-2">
                                    <p className="text-[#5C5C5C] text-sm lg:text-lg">Dormitórios</p>
                                    <img src="/imagemDormitorio.png" alt="Imagem Imovel" className='xl:min-w-[80px] lg:min-w-[45px]' />
                                    <p className="text-[#702632] font-black lg:text-2xl">{qtdDormitorios}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[#5C5C5C] text-sm lg:text-lg">Suíte</p>
                                    <img src="/imagemSuite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[45px] xl:min-w-[70px]" />
                                    <p className="text-[#702632] font-black lg:text-2xl">{qtdSuite}</p>
                                </div>
                                <div className="flex flex-col items-center pr-2">
                                    <p className="text-[#5C5C5C] text-sm lg:text-lg">Banheiros</p>
                                    <img src="/imagemBanheiro.png" alt="Imagem Banheiro" className='xl:min-w-[70px] lg:min-w-[45px]' />
                                    <p className="text-[#702632] font-black lg:text-2xl">{qtdBanheiros}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-2 lg:pt-6">
                                <p className="text-[#702632] text-2xl lg:text-3xl font-black xl:text-4xl">{preco}</p>
                                <p className="text-[#5C5C5C] text-sm lg:text-lg font-black lg:pt-2 xl:text-xl">Cód: {codigo}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <div className="flex flex-col w-full max-w-[500px] lg:px-4">
                        <div className="w-full">
                            <img src="/fotoImovel.png" alt="Imagem Imovel" className="w-full max-w-[500px]" />
                        </div>
                        <div className="w-full bg-white rounded-b-[20px] py-2">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg font-black text-[#5C5C5C] xl:text-2xl">{titulo}</p>
                                <p className="text-[#702632] font-semibold xl:text-xl">{cidade}</p>
                            </div>
                            <div className="flex justify-center gap-10 lg:gap-6 items-center pt-2 lg:pt-6">
                                <div className="flex flex-col items-center pl-2">
                                    <p className="text-[#5C5C5C] text-sm lg:text-lg">Dormitórios</p>
                                    <img src="/imagemDormitorio.png" alt="Imagem Imovel" className='xl:min-w-[80px] lg:min-w-[45px]' />
                                    <p className="text-[#702632] font-black lg:text-2xl">{qtdDormitorios}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[#5C5C5C] text-sm lg:text-lg">Suíte</p>
                                    <img src="/imagemSuite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[45px] xl:min-w-[70px]" />
                                    <p className="text-[#702632] font-black lg:text-2xl">{qtdSuite}</p>
                                </div>
                                <div className="flex flex-col items-center pr-2">
                                    <p className="text-[#5C5C5C] text-sm lg:text-lg">Banheiros</p>
                                    <img src="/imagemBanheiro.png" alt="Imagem Banheiro" className='xl:min-w-[70px] lg:min-w-[45px]' />
                                    <p className="text-[#702632] font-black lg:text-2xl">{qtdBanheiros}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-2 lg:pt-6">
                                <p className="text-[#702632] text-2xl lg:text-3xl font-black xl:text-4xl">{preco}</p>
                                <p className="text-[#5C5C5C] text-sm lg:text-lg font-black lg:pt-2 xl:text-xl">Cód: {codigo}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <div className="flex flex-col w-full max-w-[500px] lg:px-4">
                        <div className="w-full">
                            <img src="/fotoImovel.png" alt="Imagem Imovel" className="w-full max-w-[500px]" />
                        </div>
                        <div className="w-full bg-white rounded-b-[20px] py-2">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg font-black text-[#5C5C5C] xl:text-2xl">{titulo}</p>
                                <p className="text-[#702632] font-semibold xl:text-xl">{cidade}</p>
                            </div>
                            <div className="flex justify-center gap-10 lg:gap-6 items-center pt-2 lg:pt-6">
                                <div className="flex flex-col items-center pl-2">
                                    <p className="text-[#5C5C5C] text-sm lg:text-lg">Dormitórios</p>
                                    <img src="/imagemDormitorio.png" alt="Imagem Imovel" className='xl:min-w-[80px] lg:min-w-[45px]' />
                                    <p className="text-[#702632] font-black lg:text-2xl">{qtdDormitorios}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[#5C5C5C] text-sm lg:text-lg">Suíte</p>
                                    <img src="/imagemSuite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[45px] xl:min-w-[70px]" />
                                    <p className="text-[#702632] font-black lg:text-2xl">{qtdSuite}</p>
                                </div>
                                <div className="flex flex-col items-center pr-2">
                                    <p className="text-[#5C5C5C] text-sm lg:text-lg">Banheiros</p>
                                    <img src="/imagemBanheiro.png" alt="Imagem Banheiro" className='xl:min-w-[70px] lg:min-w-[45px]' />
                                    <p className="text-[#702632] font-black lg:text-2xl">{qtdBanheiros}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-2 lg:pt-6">
                                <p className="text-[#702632] text-2xl lg:text-3xl font-black xl:text-4xl">{preco}</p>
                                <p className="text-[#5C5C5C] text-sm lg:text-lg font-black lg:pt-2 xl:text-xl">Cód: {codigo}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}