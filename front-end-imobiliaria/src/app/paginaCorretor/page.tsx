'use client'

import { Montserrat } from 'next/font/google';
import { LoadingWrapper } from '@/components/loading/loadingServer';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

import { Botao } from '@/components/botao/index';
import Image from 'next/image';
import { Header } from '@/components/header';
import { useRouter } from 'next/navigation';
import RotaPrivada from '@/components/RotaPrivada';

export default function PaginaAdministrador() {
    const router = useRouter();
    return (
        <LoadingWrapper>
            <RotaPrivada userAutorizado={['Administrador', 'Corretor']}>
                <Header />

                <div className={`${montserrat.className} pt-3 pb-24 lg:pt-14 lg:pb-52`}>
                    <main className="relative flex h-[500px] xl:h-[450px]  rounded-[20px] mx-auto overflow-hidden pb-24 lg:pt-14 lg:pb-52 w-11/12 shadow-lg transition-all duration-300 hover:shadow-xl">
                        <Image src="/imagensPaginaEditor-Adm/montanhaPaginaAdministrador.png" alt="cidade da Pagina do Editor" layout="fill" objectFit="cover" quality={100} className="transition-transform duration-700 hover:scale-105" />

                        <div className="absolute inset-0 flex flex-col justify-center items-center 2xl:items-start text-white p-8 md:pl-16 2xl:pl-32 bg-gradient-to-r from-black/20 to-transparent">
                            <h1 className="text-xl lg:text-2xl text-center 2xl:text-start font-bold mb-4">Bem-vindo à Área do Administrador!</h1>

                            <div className="border-t-4 border-vermelho w-[265px] md:w-[405px] 2xl:w-[405px] my-6 transform transition-all duration-300 hover:w-[300px] md:hover:w-[450px]"></div>

                            <p className="text-lg lg:text-xl font-normal text-center 2xl:text-start max-w-4xl leading-relaxed">
                                Aqui você encontra todas as ferramentas necessárias para gerenciar todos os imóveis, usuários, cadastro de imóveis e Relatórios e Análises de dados.
                            </p>
                        </div>
                    </main>

                    <section className="mt-16">
                        <h2 className='flex justify-center text-center text-2xl lg:text-3xl font-medium py-10 text-gray-800'>Explore nossos recursos:</h2>

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-8'>
                            <div className='flex flex-col items-center p-6 rounded-xl'>
                                <div className="p-4 rounded-full mb-4">
                                    <Image src="/imagensPaginaEditor-Adm/gerenciamentoImoveis.png" alt="Gerenciamento de Imóveis" width={75} height={75} className="transition-transform duration-300 hover:scale-110" />
                                </div>

                                <p className='text-lg lg:text-xl font-medium text-gray-700 text-center leading-tight mb-6 lg:whitespace-nowrap'>Cadastro Imóveis</p>

                                <Botao className='w-full bg-vermelho h-10 hover:bg-vermelho/90 transition-colors duration-300' onClick={() => router.push("/cadastroImovel")} texto="Gerenciar" />
                            </div>

                            <div className='flex flex-col items-center p-6 rounded-xl'>
                                <div className="p-4 rounded-full mb-4">
                                    <Image src="/imagensPaginaEditor-Adm/gerenciamentoProprietarios.png" alt="Cadastro de Proprietários" width={75} height={75} className="transition-transform duration-300 hover:scale-110" />
                                </div>

                                <p className='text-lg lg:text-xl font-medium text-gray-700 text-center leading-tight mb-6'>Cadastro Proprietários</p>

                                <Botao className='w-full bg-vermelho h-10 hover:bg-vermelho/90 transition-colors duration-300' onClick={() => router.push("/cadastroProprietario")} texto="Gerenciar" />
                            </div>

                            <div className='flex flex-col items-center p-6 rounded-xl'>
                                <div className="p-4 rounded-full mb-4">
                                    <Image src="/imagensPaginaEditor-Adm/gerenciamentoUsuarios.png" alt="Gerenciamento de Usúarios" width={75} height={75} className="transition-transform duration-300 hover:scale-110" />
                                </div>

                                <p className='text-lg lg:text-xl font-medium text-gray-700 text-center leading-tight mb-6'>Cadastro Usúarios</p>

                                <Botao className='w-full bg-vermelho h-10 hover:bg-vermelho/90 transition-colors duration-300' onClick={() => router.push("/cadastroUsuario")} texto="Gerenciar" />
                            </div>

                            <div className='flex flex-col items-center p-6 rounded-xl'>
                                <div className="p-4 rounded-full mb-4">
                                    <Image src="/imagensPaginaEditor-Adm/cadastroImoveis.png" alt="Relatório de analise" width={75} height={75} className="transition-transform duration-300 hover:scale-110" />
                                </div>

                                <p className='text-lg lg:text-xl font-medium text-gray-700 text-center leading-tight mb-6'>Relatórios e Análises</p>

                                <Botao className='w-full bg-vermelho h-10 hover:bg-vermelho/90 transition-colors duration-300' onClick={() => router.push("/paginaRelatoriosAnalises")} texto="Gerenciar" />
                            </div>
                        </div>
                    </section>
                </div>
            </RotaPrivada>
        </LoadingWrapper>
    );


}
