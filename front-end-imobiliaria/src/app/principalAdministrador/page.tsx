import { Montserrat } from 'next/font/google';


// Carregando a fonte Inter
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

import { Botao } from '@/components/botao';
import Image from 'next/image';
import { Header } from '@/components/header';

export default function PaginaAdministrador() {
    return (
        <>
            <div className={`${montserrat.className} pb-24 pt-3 lg:pt-14 lg:pb-52`}>
                <main className="relative flex h-[811px] w-full max-w-[1810px] mx-auto overflow-hidden ">
                    <Image src="/imagensPaginaEDADM/montanhaPaginaAdministrador.png" alt="cidade da Pagina do Editor" layout="fill" objectFit="cover" quality={100} />
                    <div className="absolute inset-0 flex flex-col justify-center items-center 2xl:items-start text-white p-8 md:pl-16 2xl:pl-32">
                        <h1 className="text-[2.5rem] lg:text-[4.375rem] text-center 2xl:text-start font-bold">Bem-vindo à Área do Administrador!</h1>
                        {/* Linha vermelha */}
                        <div className="border-t-8 border-[#702632] w-[265px] md:w-[405px] 2xl:w-[405px] my-6"></div>
                        <p className=" text-2xl lg:text-3xl  font-normal text-center 2xl:text-start max-w-4xl">Aqui você encontra todas as ferramentas necessárias para gerenciar todos os imóveis, usuários, cadastro de imóveis e Relatórios e Análises de dados.</p>
                    </div>
                </main>
                <section>
                    <h2 className='flex justify-center text-center text-5xl lg:text-6xl font-medium p-24'>Explore nossos recursos:</h2>
                    <div className='flex flex-col lg:flex-row 2xl:flex-row items-center justify-center  sm:items-center sm:justify-center md:justify-around ' >
                        <div className='flex flex-col items-center w-80  py-10 md:py-10 2xl:py-0'>
                            <Image src="/gerenciamentoImoveis.png" alt="Gerenciamento de Imóveis" width={110} height={123} />
                            <p className='text-4xl font-medium opacity-75 text-center leading-tight py-16 min-h-[120px]'>Gerenciamento de Imóveis</p>
                            <Botao texto="Gerenciar" />
                        </div>
                        <div className='flex flex-col items-center w-80 py-10 md:py-10 2xl:py-0'>
                            <Image src="/gerenciamentoProprietarios.png" alt="Cadastro de Imóveis" width={110} height={123} />
                            <p className='text-4xl  font-medium opacity-75 text-center leading-tight py-16 min-h-[120px]'>Gerenciamento de Proprietários</p>
                            <Botao texto="Gerenciar" />
                        </div>
                        <div className='flex flex-col items-center w-80 py-10 md:py-10 2xl:py-0'>
                            <Image src="/cadastroImoveis.png" alt="Gerenciamento de Imóveis" width={110} height={123} />
                            <p className='text-4xl  font-medium opacity-75 text-center leading-tight py-16 min-h-[120px]'>Cadastrar Imóveis</p>
                            <Botao texto="Gerenciar" />
                        </div>
                    </div>
                </section>
                <section className='pt-3 lg:pt-48'>
                    <div className='flex flex-col lg:flex-row 2xl:flex-row items-center justify-center  sm:items-center sm:justify-evenly md:justify-evenly ' >
                        <div className='flex flex-col items-center w-80  py-10 md:py-10 2xl:py-0'>
                            <Image src="/gerenciamentoImoveis.png" alt="Relatório de analise" width={110} height={123} />
                            <p className='text-4xl font-medium opacity-75 text-center leading-tight py-16 min-h-[120px]'>Relatórios e Análises</p>
                            <Botao texto="Gerenciar" />
                        </div>
                        <div className='flex flex-col items-center w-80 py-10 md:py-10 2xl:py-0'>
                            <Image src="/imagensPaginaEDADM/gerenciamentoUsuarios.png" alt="Gerenciamento de Usúarios" width={110} height={123} />
                            <p className='text-4xl  font-medium opacity-75 text-center leading-tight py-16 min-h-[120px]'>Gerenciamento de Usúarios</p>
                            <Botao texto="Gerenciar" />
                        </div>
                    </div>
                </section>
            </div>

            <div className="font-montserrat pt-3 pb-24 lg:pt-14 lg:pb-52">
                <main className="relative flex h-[811px] w-full max-w-[1810px] mx-auto overflow-hidden ">

                    <Image src="/montanhaPaginaAdministrador.png" alt="cidade da Pagina do Editor" layout="fill" objectFit="cover" quality={100} />

                    <div className="absolute inset-0 flex flex-col justify-center items-center 2xl:items-start text-white p-8 md:pl-16 2xl:pl-32">
                        <h1 className="text-3xl lg:text-4xl text-center 2xl:text-start font-bold">Bem-vindo à Área do Administrador!</h1>

                        <div className="border-t-4 border-vermelho w-[265px] md:w-[405px] 2xl:w-[405px] my-6"></div>

                        <p className="text-2xl font-normal text-center 2xl:text-start max-w-4xl">
                            Aqui você encontra todas as ferramentas necessárias para gerenciar todos os imóveis, usuários, cadastro de imóveis e Relatórios e Análises de dados.
                        </p>
                    </div>
                </main>

                <section>

                    <h2 className='flex justify-center text-center text-4xl lg:text-4xl font-medium p-24'>Explore nossos recursos:</h2>

                    <div className='flex flex-col lg:flex-row 2xl:flex-row items-center justify-center  sm:items-center sm:justify-center md:justify-around ' >
                        <div className='flex flex-col items-center max-lg:py-4 py-10 md:py-10 2xl:py-0 w-full 2xl:w-96  '>

                            <Image src="/gerenciamentoImoveis.png" alt="Gerenciamento de Imóveis" width={110} height={123} />

                            <p className='text-2xl lg:text-3xl font-medium opacity-75 text-center leading-tight max-lg:py-10 py-10 w-80'>Gerenciamento de Imóveis</p>

                            <Botao className='w-2/5 sm:w-2/12 lg:w-2/5 2xl:w-1/2' texto="Gerenciar" />
                        </div>
                        <div className='flex flex-col items-center max-lg:py-4 py-10 md:py-10 2xl:py-0 w-full 2xl:w-96'>

                            <Image src="/gerenciamentoProprietarios.png" alt="Cadastro de Imóveis" width={110} height={123} />

                            <p className='text-2xl lg:text-3xl font-medium opacity-75 text-center leading-tight max-lg:py-10 py-10 w-80'>Gerenciamento de Proprietários</p>

                            <Botao className='w-2/5 sm:w-2/12 lg:w-2/5 2xl:w-1/2' texto="Gerenciar" />
                        </div>
                        <div className='flex flex-col items-center max-lg:py-4 py-10 md:py-10 2xl:py-0 w-full 2xl:w-96'>

                            <Image src="/cadastroImoveis.png" alt="Gerenciamento de Imóveis" width={110} height={123} />

                            <p className='text-2xl lg:text-3xl font-medium opacity-75 text-center leading-tight max-lg:py-10 py-14 w-80'>Cadastrar Imóveis</p>

                            <Botao className='w-2/5 sm:w-2/12 lg:w-2/5 2xl:w-1/2' texto="Gerenciar" />
                        </div>
                    </div>
                </section>

                <section className='pt-3 lg:pt-32'>
                    <div className='flex flex-col lg:flex-row 2xl:flex-row lg:gap-8 gap-20 items-center justify-center sm:items-center sm:justify-center' >
                        <div className='flex flex-col items-center max-lg:py-4 py-10 md:py-10 2xl:py-0 w-full 2xl:w-96'>

                            <Image src="/gerenciamentoImoveis.png" alt="Relatório de analise" width={110} height={123} />

                            <p className='text-2xl lg:text-3xl font-medium opacity-75 text-center leading-tight max-lg:py-10 py-14 w-80'>Relatórios e Análises</p>

                            <Botao className='w-2/5 sm:w-2/12 lg:w-2/5 2xl:w-1/2' texto="Gerenciar" />
                        </div>
                        <div className='flex flex-col items-center max-lg:py-4 py-10 md:py-10 2xl:py-0 w-full 2xl:w-96'>

                            <Image src="/gerenciamentoUsuarios.png" alt="Gerenciamento de Usúarios" width={110} height={123} />

                            <p className='text-2xl lg:text-3xl font-medium opacity-75 text-center leading-tight max-lg:py-10 py-10 w-80'>Gerenciamento de Usúarios</p>

                            <Botao className='w-2/5 sm:w-2/12 lg:w-2/5 2xl:w-1/2' texto="Gerenciar" />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );


}
