import { Montserrat } from 'next/font/google';
import { Botao } from '@/components/Botao';
import Image from 'next/image';

// Carregando a fonte Inter
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});


export default function PaginaEditor() {
    return (
        <div className={`${montserrat.className} pt-3 pb-24 lg:pt-14 lg:pb-52`}>
            <main className="relative flex h-[811px] w-full max-w-[1810px] mx-auto overflow-hidden ">
                <Image className='rounded-lg' src="/imagensPaginaEditor-Adm/cidadePaginaEditor.png" alt="cidade da Pagina do Editor" layout="fill" objectFit="cover" quality={100}/>
                <div className="absolute inset-0 flex flex-col justify-center items-center 2xl:items-start text-white p-8 md:pl-16 2xl:pl-32">
                    <h1 className="text-[2.5rem] lg:text-[4.375rem] text-center 2xl:text-start font-bold">Bem-vindo à Área do Editor!</h1>
                    {/* Linha vermelha */}
                    <div className="border-t-8 border-[#702632] w-[265px] md:w-[405px] 2xl:w-[405px] my-6"></div>
                    <p className=" text-2xl lg:text-3xl  font-normal text-center 2xl:text-start max-w-4xl">Aqui você encontra todas as ferramentas necessárias para gerenciar todos os imóveis junto de ferramentas de cadastro de imóveis.</p>
                </div>
            </main>
            <section>
                <h2 className='flex justify-center text-center text-5xl lg:text-6xl font-medium p-24'>Explore nossos recursos:</h2>
                <div className='flex flex-col lg:flex-row 2xl:flex-row items-center justify-center  sm:items-center sm:justify-center md:justify-around ' >
                    <div className='flex flex-col items-center w-80  py-10 md:py-10 2xl:py-0'>
                        <Image src="/imagensPaginaEditor-Adm/imagensPaginaEDADM/gerenciamentoImoveis.png" alt="Gerenciamento de Imóveis" width={110} height={123} />
                        <p className='text-4xl font-medium opacity-75 text-center leading-tight py-16 min-h-[120px]'>Gerenciamento de Imóveis</p>
                        <Botao texto="Gerenciar" />
                    </div>
                    <div className='flex flex-col items-center w-80 py-10 md:py-10 2xl:py-0'>
                        <Image src="/gerenciamentoProprietarios.png" alt="Cadastro de Imóveis" width={110} height={123} />
                        <p className='text-4xl  font-medium opacity-75 text-center leading-tight py-16 min-h-[120px]'>Gerenciamento de Proprietários</p>
                        <Botao texto="Gerenciar" />
                    </div>
                    <div className='flex flex-col items-center w-80 py-10 md:py-10 2xl:py-0'>
                        <Image src="/imagensPaginaEditor-Adm/cadastroImoveis.png" alt="Gerenciamento de Imóveis" width={110} height={123} />
                        <p className='text-4xl  font-medium opacity-75 text-center leading-tight py-16 min-h-[120px]'>Cadastrar Imóveis</p>
                        <Botao texto="Gerenciar" />
                    </div>
                </div>
            </section>
        </div>
    );
}

//sm: md: lg: 2xl: