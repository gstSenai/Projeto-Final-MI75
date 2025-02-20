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
            <div className={`${inter.className} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10  2xl:gap-y-20 2xl:gap-x-10 py-10 min-h-screen flex-col lg:flex-row bg-[#DFDAD0] 2xl:px-40 xl:px-32 lg:px-20 px-10`}>
                <div className="flex justify-center">
                    <div className="flex flex-col lg:w-full lg:max-w-[350px] 2xl:max-w-[450px]">
                        <div className="w-full">
                            <img src="/imagensImovel/fotoImovel.png" alt="Imagem Imovel" className="w-full max-md:max-w-[350px]  max-w-[400px] lg:max-w-[350px] 2xl:max-w-[400px]" />
                        </div>
                        <div className="w-full max-md:max-w-[350px]  max-w-[400px] lg:max-w-[350px] 2xl:max-w-[400px] bg-white shadow-[5px_20px_100px_rgb(0,0,0,0.1)] rounded-b-[20px] py-2">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg 2xl:text-2xl font-black text-[#5C5C5C] [text-shadow:1px_1px_1px_#5C5C5C]">{titulo}</p>
                                <p className="text-[#702632] font-semibold text-sm 2xl:text-lg">{cidade}</p>
                            </div>
                            <div className="flex justify-center gap-10 lg:gap-10 items-center pt-2">
                                <div className="flex flex-col items-center pl-2">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Dormitórios</p>
                                    <img src="/imagensImovel/imagemDormitorio.png" alt="Imagem Imovel" className='2xl:min-w-[60px] lg:min-w-[35px]' />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdDormitorios}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Suíte</p>
                                    <img src="/imagensImovel/imagemSuite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[35px] 2xl:min-w-[60px]" />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdSuite}</p>
                                </div>
                                <div className="flex flex-col items-center pr-2">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Banheiros</p>
                                    <img src="/imagensImovel/imagemBanheiro.png" alt="Imagem Banheiro" className='2xl:min-w-[60px] lg:min-w-[35px]' />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdBanheiros}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-2">
                                <p className="text-[#702632] text-2xl 2xl:text-4xl font-black [text-shadow:1px_1px_1px_#702632]">{preco}</p>
                                <p className="text-[#5C5C5C] text-sm font-black">Cód: {codigo}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex justify-center">
                    <div className="flex flex-col lg:w-full lg:max-w-[350px] 2xl:max-w-[450px]">
                        <div className="w-full">
                            <img src="/imagensImovel/fotoImovel.png" alt="Imagem Imovel" className="w-full max-md:max-w-[350px]  max-w-[400px] lg:max-w-[350px] 2xl:max-w-[400px]" />
                        </div>
                        <div className="w-full max-md:max-w-[350px]  max-w-[400px] lg:max-w-[350px] 2xl:max-w-[400px] bg-white shadow-[5px_20px_100px_rgb(0,0,0,0.1)] rounded-b-[20px] py-2">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg 2xl:text-2xl font-black text-[#5C5C5C] [text-shadow:1px_1px_1px_#5C5C5C]">{titulo}</p>
                                <p className="text-[#702632] font-semibold text-sm 2xl:text-lg">{cidade}</p>
                            </div>
                            <div className="flex justify-center gap-10 lg:gap-10 items-center pt-2">
                                <div className="flex flex-col items-center pl-2">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Dormitórios</p>
                                    <img src="/imagensImovel/imagemDormitorio.png" alt="Imagem Imovel" className='2xl:min-w-[60px] lg:min-w-[35px]' />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdDormitorios}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Suíte</p>
                                    <img src="/imagensImovel/imagemSuite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[35px] 2xl:min-w-[60px]" />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdSuite}</p>
                                </div>
                                <div className="flex flex-col items-center pr-2">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Banheiros</p>
                                    <img src="/imagensImovel/imagemBanheiro.png" alt="Imagem Banheiro" className='2xl:min-w-[60px] lg:min-w-[35px]' />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdBanheiros}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-2">
                                <p className="text-[#702632] text-2xl 2xl:text-4xl font-black [text-shadow:1px_1px_1px_#702632]">{preco}</p>
                                <p className="text-[#5C5C5C] text-sm font-black">Cód: {codigo}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex justify-center">
                    <div className="flex flex-col lg:w-full lg:max-w-[350px] 2xl:max-w-[450px]">
                        <div className="w-full">
                            <img src="/imagensImovel/fotoImovel.png" alt="Imagem Imovel" className="w-full max-md:max-w-[350px]  max-w-[400px] lg:max-w-[350px] 2xl:max-w-[400px]" />
                        </div>
                        <div className="w-full max-md:max-w-[350px]  max-w-[400px] lg:max-w-[350px] 2xl:max-w-[400px] bg-white shadow-[5px_20px_100px_rgb(0,0,0,0.1)] rounded-b-[20px] py-2">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg 2xl:text-2xl font-black text-[#5C5C5C] [text-shadow:1px_1px_1px_#5C5C5C]">{titulo}</p>
                                <p className="text-[#702632] font-semibold text-sm 2xl:text-lg">{cidade}</p>
                            </div>
                            <div className="flex justify-center gap-10 lg:gap-10 items-center pt-2">
                                <div className="flex flex-col items-center pl-2">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Dormitórios</p>
                                    <img src="/imagensImovel/imagemDormitorio.png" alt="Imagem Imovel" className='2xl:min-w-[60px] lg:min-w-[35px]' />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdDormitorios}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Suíte</p>
                                    <img src="/imagensImovel/imagemSuite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[35px] 2xl:min-w-[60px]" />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdSuite}</p>
                                </div>
                                <div className="flex flex-col items-center pr-2">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Banheiros</p>
                                    <img src="/imagensImovel/imagemBanheiro.png" alt="Imagem Banheiro" className='2xl:min-w-[60px] lg:min-w-[35px]' />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdBanheiros}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-2">
                                <p className="text-[#702632] text-2xl 2xl:text-4xl font-black [text-shadow:1px_1px_1px_#702632]">{preco}</p>
                                <p className="text-[#5C5C5C] text-sm font-black">Cód: {codigo}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex justify-center">
                    <div className="flex flex-col lg:w-full lg:max-w-[350px] 2xl:max-w-[450px]">
                        <div className="w-full">
                            <img src="/imagensImovel/fotoImovel.png" alt="Imagem Imovel" className="w-full max-md:max-w-[350px]  max-w-[400px] lg:max-w-[350px] 2xl:max-w-[400px]" />
                        </div>
                        <div className="w-full max-md:max-w-[350px]  max-w-[400px] lg:max-w-[350px] 2xl:max-w-[400px] bg-white shadow-[5px_20px_100px_rgb(0,0,0,0.1)] rounded-b-[20px] py-2">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg 2xl:text-2xl font-black text-[#5C5C5C] [text-shadow:1px_1px_1px_#5C5C5C]">{titulo}</p>
                                <p className="text-[#702632] font-semibold text-sm 2xl:text-lg">{cidade}</p>
                            </div>
                            <div className="flex justify-center gap-10 lg:gap-10 items-center pt-2">
                                <div className="flex flex-col items-center pl-2">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Dormitórios</p>
                                    <img src="/imagensImovel/imagemDormitorio.png" alt="Imagem Imovel" className='2xl:min-w-[60px] lg:min-w-[35px]' />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdDormitorios}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Suíte</p>
                                    <img src="/imagensImovel/imagemSuite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[35px] 2xl:min-w-[60px]" />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdSuite}</p>
                                </div>
                                <div className="flex flex-col items-center pr-2">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Banheiros</p>
                                    <img src="/imagensImovel/imagemBanheiro.png" alt="Imagem Banheiro" className='2xl:min-w-[60px] lg:min-w-[35px]' />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdBanheiros}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-2">
                                <p className="text-[#702632] text-2xl 2xl:text-4xl font-black [text-shadow:1px_1px_1px_#702632]">{preco}</p>
                                <p className="text-[#5C5C5C] text-sm font-black">Cód: {codigo}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex justify-center">
                    <div className="flex flex-col lg:w-full lg:max-w-[350px] 2xl:max-w-[450px]">
                        <div className="w-full">
                            <img src="/imagensImovel/fotoImovel.png" alt="Imagem Imovel" className="w-full max-md:max-w-[350px]  max-w-[400px] lg:max-w-[350px] 2xl:max-w-[400px]" />
                        </div>
                        <div className="w-full max-md:max-w-[350px]  max-w-[400px] lg:max-w-[350px] 2xl:max-w-[400px] bg-white shadow-[5px_20px_100px_rgb(0,0,0,0.1)] rounded-b-[20px] py-2">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg 2xl:text-2xl font-black text-[#5C5C5C] [text-shadow:1px_1px_1px_#5C5C5C]">{titulo}</p>
                                <p className="text-[#702632] font-semibold text-sm 2xl:text-lg">{cidade}</p>
                            </div>
                            <div className="flex justify-center gap-10 lg:gap-10 items-center pt-2">
                                <div className="flex flex-col items-center pl-2">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Dormitórios</p>
                                    <img src="/imagensImovel/imagemDormitorio.png" alt="Imagem Imovel" className='2xl:min-w-[60px] lg:min-w-[35px]' />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdDormitorios}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Suíte</p>
                                    <img src="/imagensImovel/imagemSuite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[35px] 2xl:min-w-[60px]" />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdSuite}</p>
                                </div>
                                <div className="flex flex-col items-center pr-2">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Banheiros</p>
                                    <img src="/imagensImovel/imagemBanheiro.png" alt="Imagem Banheiro" className='2xl:min-w-[60px] lg:min-w-[35px]' />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdBanheiros}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-2">
                                <p className="text-[#702632] text-2xl 2xl:text-4xl font-black [text-shadow:1px_1px_1px_#702632]">{preco}</p>
                                <p className="text-[#5C5C5C] text-sm font-black">Cód: {codigo}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex justify-center">
                    <div className="flex flex-col lg:w-full lg:max-w-[350px] 2xl:max-w-[450px]">
                        <div className="w-full">
                            <img src="/imagensImovel/fotoImovel.png" alt="Imagem Imovel" className="w-full max-md:max-w-[350px]  max-w-[400px] lg:max-w-[350px] 2xl:max-w-[400px]" />
                        </div>
                        <div className="w-full max-md:max-w-[350px]  max-w-[400px] lg:max-w-[350px] 2xl:max-w-[400px] bg-white shadow-[5px_20px_100px_rgb(0,0,0,0.1)] rounded-b-[20px] py-2">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg 2xl:text-2xl font-black text-[#5C5C5C] [text-shadow:1px_1px_1px_#5C5C5C]">{titulo}</p>
                                <p className="text-[#702632] font-semibold text-sm 2xl:text-lg">{cidade}</p>
                            </div>
                            <div className="flex justify-center gap-10 lg:gap-10 items-center pt-2">
                                <div className="flex flex-col items-center pl-2">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Dormitórios</p>
                                    <img src="/imagensImovel/imagemDormitorio.png" alt="Imagem Imovel" className='2xl:min-w-[60px] lg:min-w-[35px]' />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdDormitorios}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Suíte</p>
                                    <img src="/imagensImovel/imagemSuite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[35px] 2xl:min-w-[60px]" />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdSuite}</p>
                                </div>
                                <div className="flex flex-col items-center pr-2">
                                    <p className="text-[#5C5C5C] text-sm 2xl:text-xl">Banheiros</p>
                                    <img src="/imagensImovel/imagemBanheiro.png" alt="Imagem Banheiro" className='2xl:min-w-[60px] lg:min-w-[35px]' />
                                    <p className="text-[#702632] font-black lg:text-lg">{qtdBanheiros}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-2">
                                <p className="text-[#702632] text-2xl 2xl:text-4xl font-black [text-shadow:1px_1px_1px_#702632]">{preco}</p>
                                <p className="text-[#5C5C5C] text-sm font-black">Cód: {codigo}</p>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </>
    );
}