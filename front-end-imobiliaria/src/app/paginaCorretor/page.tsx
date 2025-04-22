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

export default function paginaCorretor() {
    const router = useRouter();
    return (
        <LoadingWrapper>
            <RotaPrivada userAutorizado={['administrador', 'corretor']}>
                <Header />

                <div className={`${montserrat.className} pt-3 pb-24 lg:pt-14 lg:pb-52`}>
                    <main className="relative flex h-[500px] xl:h-[450px] rounded-[20px] mx-auto overflow-hidden pb-24 lg:pt-14 lg:pb-52 w-11/12 shadow-lg transition-all duration-300 hover:shadow-xl">
                        <Image
                            src="/imagensPaginaEditor-Adm/imagemAreaCorretor.png"
                            alt="cidade da Pagina do Corretor"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            priority
                            className="object-cover transition-transform duration-700 hover:scale-105 "
                        />

                        <div className="absolute inset-0 flex flex-col justify-center items-center 2xl:items-start text-white p-8 md:pl-16 2xl:pl-32 bg-gradient-to-r from-black/20 to-transparent">
                            <h1 className="text-xl lg:text-2xl text-center 2xl:text-start font-bold mb-4">Bem-vindo à Área do Corretor!</h1>

                            <div className="border-t-4 border-vermelho w-[265px] md:w-[405px] 2xl:w-[405px] my-6 transform transition-all duration-300 hover:w-[300px] md:hover:w-[450px]"></div>

                            <p className="text-lg lg:text-xl font-normal text-center 2xl:text-start max-w-4xl leading-relaxed">
                                Aqui você encontra todas as ferramentas necessárias para gerenciar seus imóveis, acompanhar negociações e atender seus clientes com excelência. Nosso objetivo é facilitar sua rotina e potencializar seus resultados.
                            </p>
                        </div>
                    </main>

                    <section className="mt-16">
                        <h2 className='flex justify-center text-center text-2xl lg:text-3xl font-medium py-10 text-gray-800'>Explore nossos recursos:</h2>

                        <div className='flex flex-col sm:flex-row justify-center items-center gap-8 px-4 md:px-8'>
                            <div className='flex flex-col items-center p-6 rounded-xl w-full sm:w-auto'>
                                <div className="p-4 rounded-full mb-4">
                                    <Image src="/imagensPaginaEditor-Adm/IconAgenda.png" alt="Gerenciamento de Imóveis" width={75} height={75} className="transition-transform duration-300 hover:scale-110" />
                                </div>

                                <p className='text-lg lg:text-xl font-medium text-gray-700 text-center leading-tight mb-6'>Agenda</p>


                                <Botao className='w-[300px] bg-vermelho h-12 hover:bg-vermelho/90 transition-colors duration-300' onClick={() => router.push("/paginaHistoricoCorretor")} texto="Histórico da Agenda" />

                                <div className='pt-6'>
                                    <Botao className='w-[300px] bg-vermelho h-12 hover:bg-vermelho/90 transition-colors duration-300' onClick={() => router.push("/paginaAgendaCorretor")} texto="Agenda" />
                                </div>

                            </div>

                            <div className='flex flex-col items-center p-6 rounded-xl w-full sm:w-auto'>
                                <div className="p-4 rounded-full mb-4">
                                    <Image src="/imagensPaginaEditor-Adm/IconPerfil.png" alt="Cadastro de Proprietários" width={75} height={75} className="transition-transform duration-300 hover:scale-110" />
                                </div>

                                <p className='text-lg lg:text-xl font-medium text-gray-700 text-center leading-tight mb-6'>Perfil</p>



                                <Botao className='w-[300px] bg-vermelho h-12 hover:bg-vermelho/90 transition-colors duration-300' onClick={() => router.push("/perfilUsuario/meu-perfil")} texto="Verificar Perfil" />


                                <div className='pt-6 opacity-0'>
                                    <Botao className='w-[300px] bg-vermelho h-12 hover:bg-vermelho/90 transition-colors duration-300' onClick={() => router.push("/cadastroProprietario")} texto="Chat" />
                                </div>

                            </div>
                            <div className='flex flex-col items-center p-6 rounded-xl w-full sm:w-auto'>
                                <div className="p-4 rounded-full mb-4">
                                    <Image src="/imagensPaginaEditor-Adm/iconNotificao.png" alt="Cadastro de Proprietários" width={75} height={75} className="transition-transform duration-300 hover:scale-110" />
                                </div>

                                <p className='text-lg lg:text-xl font-medium text-gray-700 text-center leading-tight mb-6'>Notificações</p>

                                <Botao className='w-[300px] bg-vermelho h-12 hover:bg-vermelho/90 transition-colors duration-300' onClick={() => router.push("/paginaCorretorNotificacaoAgendar")} texto="Notificação" />

                                {/* Div vazia para manter a mesma altura dos outros cards */}
                                <div className='pt-6 opacity-0'>
                                    <Botao className='w-[300px] h-12' texto="Notificação" onClick={() => router.push("/paginaCorretorNotificacaoAgendar")}  />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </RotaPrivada>
        </LoadingWrapper>
    );
}