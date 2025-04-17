
import { Inter } from 'next/font/google'
import Image from 'next/image'
// Carregando a fonte Montserrat
const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '600'],
    display: 'swap',
});


export default function ImoveisComparacao() {

    return (
        <>
            <div className={`flex flex-col gap-10 sm:flex-col lg:flex-row ${inter.className}`}>
                <div className='flex'>
                    <div className='flex flex-col h-full bg-white rounded-lg w-96'>
                        <Image src={'/paginaInicial/fotosDamainEfotter/PaginaCasaPaginaInicial.png'} alt='Imagem do imóvel' width={384} height={384} />
                        <div className="flex flex-col justify-center items-center pt-4">
                            <p className="text-lg 2xl:text-2xl font-black text-[#5C5C5C] [text-shadow:1px_1px_1px_#5C5C5C]">Casa</p>
                            <p className="text-vermelho font-semibold text-xs 2xl:text-base">Jaraguá do Sul, Amizade</p>
                        </div>
                        <div className="flex flex-col items-center justify-center pt-2">
                            <p className="text-vermelho text-lg 2xl:text-2xl font-black [text-shadow:1px_1px_1px_#702632]">R$ 100.000,00</p>
                            <p className="text-[#5C5C5C] text-xs font-black">Cód: 123456</p>
                        </div>
                        <div className='flex flex-col items-center justify-between gap-4 pt-4 px-20'>
                            <div className='flex items-center justify-between border-2 rounded-xl px-2 border-gray-300 gap-20'>
                                <div className='flex items-center gap-2'>
                                    <Image src={'/imagensImovel/imagemDormitorio.png'} alt='Imagem do imóvel' width={30} height={30} />
                                    <p className='text-[#5C5C5C] font-black text-sm'>Dormitórios</p>
                                </div>
                                <div>
                                    <p className='text-vermelho font-black text-sm'>3</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between border-2 w-full rounded-xl p-1 px-2 border-gray-300 gap-20'>
                                <div className='flex items-center gap-4'>
                                    <Image src={'/imagensImovel/imagemBanheiro.png'} alt='Imagem do imóvel' width={23} height={23} />
                                    <p className='text-[#5C5C5C] font-black text-sm'>Banheiros</p>
                                </div>
                                <div>
                                    <p className='text-vermelho font-black text-sm'>3</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between border-2 rounded-xl p-1 px-2 border-gray-300 gap-20'>
                                <div className='flex items-center gap-2'>
                                    <Image src={'/imagensImovel/imagemSuite.png'} alt='Imagem do imóvel' width={23} height={23} />
                                    <p className='text-[#5C5C5C] font-black text-sm'>Dormitórios</p>
                                </div>
                                <div>
                                    <p className='text-vermelho font-black text-sm'>3</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between border-2 rounded-xl px-2 border-gray-300 gap-20'>
                                <div className='flex items-center gap-2'>
                                    <Image src={'/imagensImovel/imagemDormitorio.png'} alt='Imagem do imóvel' width={30} height={30} />
                                    <p className='text-[#5C5C5C] font-black text-sm'>Dormitórios</p>
                                </div>
                                <div>
                                    <p className='text-vermelho font-black text-sm'>3</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between border-2 rounded-xl px-2 border-gray-300 gap-20'>
                                <div className='flex items-center gap-2'>
                                    <Image src={'/imagensImovel/imagemDormitorio.png'} alt='Imagem do imóvel' width={30} height={30} />
                                    <p className='text-[#5C5C5C] font-black text-sm'>Dormitórios</p>
                                </div>
                                <div>
                                    <p className='text-vermelho font-black text-sm'>3</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between border-2 rounded-xl px-2 border-gray-300 gap-20'>
                                <div className='flex items-center gap-2'>
                                    <Image src={'/imagensImovel/imagemDormitorio.png'} alt='Imagem do imóvel' width={30} height={30} />
                                    <p className='text-[#5C5C5C] font-black text-sm'>Dormitórios</p>
                                </div>
                                <div>
                                    <p className='text-vermelho font-black text-sm'>3</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between border-2 rounded-xl px-2 border-gray-300 gap-20'>
                                <div className='flex items-center gap-2'>
                                    <Image src={'/imagensImovel/imagemDormitorio.png'} alt='Imagem do imóvel' width={30} height={30} />
                                    <p className='text-[#5C5C5C] font-black text-sm'>Dormitórios</p>
                                </div>
                                <div>
                                    <p className='text-vermelho font-black text-sm'>3</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
