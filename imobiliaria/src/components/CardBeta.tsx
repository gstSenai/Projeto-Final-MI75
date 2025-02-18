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
    preco: number,
    codigo: number;
}

export default function CardBeta({ titulo, cidade, qtdDormitorios, qtdSuite, qtdBanheiros, preco, codigo }: CardProps) {
    return (
        <>
            <div className={`${inter.className} flex justify-center gap-6 min-h-screen bg-[#DFDAD0] px-6 font-inter`}>
                <div className="flex justify-center items-center">
                    <div className="flex flex-col w-full max-w-[500px] px-6">
                        <div className="w-full">
                            <img src="/fotoImovel.png" alt="Imagem Imovel" className="w-full max-w-[500px]" />
                        </div>
                        <div className="w-full bg-white rounded-b-[20px] py-2">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg font-extrabold text-[#5C5C5C]">{titulo}</p>
                                <p className="text-[#702632] font-medium">{cidade}</p>
                            </div>
                            <div className="flex justify-center gap-6 items-center pt-6">
                                <div className="flex flex-col items-center px-2">
                                    <p className="text-sm text-[#5C5C5C]">Dormitórios</p>
                                    <img src="/imagemDormitorio.png" alt="Imagem Imovel" />
                                    <p className="text-[#702632] font-extrabold">{qtdDormitorios}</p>
                                </div>
                                <div className="flex flex-col items-center px-2">
                                    <p className="text-sm text-[#5C5C5C]">Suíte</p>
                                    <img src="/imagemSuite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[35px]" />
                                    <p className="text-[#702632] font-extrabold">{qtdSuite}</p>
                                </div>
                                <div className="flex flex-col items-center px-2">
                                    <p className="text-sm text-[#5C5C5C]">Banheiros</p>
                                    <img src="/imagemBanheiro.png" alt="Imagem Banheiro" />
                                    <p className="text-[#702632] font-extrabold">{qtdBanheiros}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-6">
                                <p className="text-[#702632] text-2xl font-extrabold">R${preco}</p>
                                <p className="text-[#5C5C5C] text-sm font-medium pt-2">Cód: {codigo}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <div className="flex flex-col w-full max-w-[500px] px-6">
                        <div className="w-full">
                            <img src="/fotoImovel.png" alt="Imagem Imovel" className="w-full max-w-[500px]" />
                        </div>
                        <div className="w-full bg-white rounded-b-[20px] py-2">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg font-extrabold text-[#5C5C5C]">{titulo}</p>
                                <p className="text-[#702632] font-medium">{cidade}</p>
                            </div>
                            <div className="flex justify-center gap-6 items-center pt-6">
                                <div className="flex flex-col items-center px-2">
                                    <p className="text-sm text-[#5C5C5C]">Dormitórios</p>
                                    <img src="/imagemDormitorio.png" alt="Imagem Imovel" />
                                    <p className="text-[#702632] font-extrabold">{qtdDormitorios}</p>
                                </div>
                                <div className="flex flex-col items-center px-2">
                                    <p className="text-sm text-[#5C5C5C]">Suíte</p>
                                    <img src="/imagemSuite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[35px]" />
                                    <p className="text-[#702632] font-extrabold">{qtdSuite}</p>
                                </div>
                                <div className="flex flex-col items-center px-2">
                                    <p className="text-sm text-[#5C5C5C]">Banheiros</p>
                                    <img src="/imagemBanheiro.png" alt="Imagem Banheiro" />
                                    <p className="text-[#702632] font-extrabold">{qtdBanheiros}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-6">
                                <p className="text-[#702632] text-2xl font-extrabold">R${preco}</p>
                                <p className="text-[#5C5C5C] text-sm font-medium pt-2">Cód: {codigo}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <div className="flex flex-col w-full max-w-[500px] px-6">
                        <div className="w-full">
                            <img src="/fotoImovel.png" alt="Imagem Imovel" className="w-full max-w-[500px]" />
                        </div>
                        <div className="w-full bg-white rounded-b-[20px] py-2">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-lg font-extrabold text-[#5C5C5C]">{titulo}</p>
                                <p className="text-[#702632] font-medium">{cidade}</p>
                            </div>
                            <div className="flex justify-center gap-6 items-center pt-6">
                                <div className="flex flex-col items-center px-2">
                                    <p className="text-sm text-[#5C5C5C]">Dormitórios</p>
                                    <img src="/imagemDormitorio.png" alt="Imagem Imovel" />
                                    <p className="text-[#702632] font-extrabold">{qtdDormitorios}</p>
                                </div>
                                <div className="flex flex-col items-center px-2">
                                    <p className="text-sm text-[#5C5C5C]">Suíte</p>
                                    <img src="/imagemSuite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[35px]" />
                                    <p className="text-[#702632] font-extrabold">{qtdSuite}</p>
                                </div>
                                <div className="flex flex-col items-center px-2">
                                    <p className="text-sm text-[#5C5C5C]">Banheiros</p>
                                    <img src="/imagemBanheiro.png" alt="Imagem Banheiro" />
                                    <p className="text-[#702632] font-extrabold">{qtdBanheiros}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-6">
                                <p className="text-[#702632] text-2xl font-extrabold">R${preco}</p>
                                <p className="text-[#5C5C5C] text-sm font-medium pt-2">Cód: {codigo}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}