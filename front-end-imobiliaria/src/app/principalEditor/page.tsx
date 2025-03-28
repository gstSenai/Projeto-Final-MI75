import { Montserrat } from 'next/font/google';
import { Botao } from '@/components/botao';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// Carregando a fonte Montserrat
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

export default function PaginaEditor() {
    return (
        <>
            <Header />

            <div className={`${montserrat.className} pt-3 pb-24 lg:pt-14 lg:pb-52`}>
                <main className="relative flex h-[811px] w-full max-w-[1810px] mx-auto overflow-hidden ">
                    <Image className='rounded-lg' src="/cidadePaginaEditor.png" alt="cidade da Pagina do Editor" layout="fill" objectFit="cover" quality={100} />
                    <div className="absolute inset-0 flex flex-col justify-center items-center 2xl:items-start text-white p-8 md:pl-16 2xl:pl-32">
                        <h1 className="text-3xl lg:text-4xl text-center 2xl:text-start font-bold">Bem-vindo à Área do Editor!</h1>
                        {/* Linha vermelha */}
                        <div className="border-t-8 border-[#702632] w-[265px] md:w-[405px] 2xl:w-[405px] my-6"></div>
                        <p className="text-2xl font-normal text-center 2xl:text-start max-w-4xl">Aqui você encontra todas as ferramentas necessárias para gerenciar todos os imóveis junto de ferramentas de cadastro de imóveis.</p>
                    </div>
                </main>
                <section>
                    <h2 className='flex justify-center text-center text-4xl lg:text-4xl font-medium p-24'>Explore nossos recursos:</h2>
                    <div className='flex flex-col lg:flex-row 2xl:flex-row items-center justify-center  sm:items-center sm:justify-center md:justify-around ' >
                        <div className='flex flex-col items-center max-lg:py-4 py-10 md:py-10 2xl:py-0 w-full 2xl:w-96'>
                            <Image src="/gerenciamentoImoveis.png" alt="Gerenciamento de Imóveis" width={110} height={123} />
                            <p className='text-2xl lg:text-3xl font-medium opacity-75 text-center leading-tight max-lg:py-10 py-10 w-80'>Gerenciamento de Imóveis</p>
                            <Botao className='w-2/5 sm:w-2/12 lg:w-2/5 2xl:w-1/2 bg-vermelho h-10' texto="Gerenciar" />
                        </div>
                        <div className='flex flex-col items-center max-lg:py-4 py-10 md:py-10 2xl:py-0 w-full 2xl:w-96'>
                            <Image src="/gerenciamentoProprietarios.png" alt="Cadastro de Imóveis" width={110} height={123} />
                            <p className='text-2xl lg:text-3xl font-medium opacity-75 text-center leading-tight max-lg:py-10 py-10 w-80'>Gerenciamento de Proprietários</p>
                            <Botao className='w-2/5 sm:w-2/12 lg:w-2/5 2xl:w-1/2 bg-vermelho h-10' texto="Gerenciar" />
                        </div>
                        <div className='flex flex-col items-center max-lg:py-4 py-10 md:py-10 2xl:py-0 w-full 2xl:w-96'>
                            <Image src="/cadastroImoveis.png" alt="Gerenciamento de Imóveis" width={110} height={123} />
                            <p className='text-2xl lg:text-3xl font-medium opacity-75 text-center leading-tight max-lg:py-10 py-10 w-80'>Cadastrar Imóveis</p>
                            <Botao className='w-2/5 sm:w-2/12 lg:w-2/5 2xl:w-1/2 bg-vermelho h-10' texto="Gerenciar" />
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>

    );
}
