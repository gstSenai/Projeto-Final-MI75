'use client'

import { Montserrat } from 'next/font/google';
import { LoadingWrapper } from '@/components/loading/loadingServer';
import { useEffect, useState } from 'react';
import request from '@/routes/request';

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
import { useAuth } from '@/components/context/AuthContext';

interface Agendamento {
    id: number;
    status: string;
    // Add other properties as needed
}

interface ApiResponse {
    content: Agendamento[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export default function paginaCorretor() {
    const router = useRouter();
    const { userId } = useAuth();
    const [hasNewNotifications, setHasNewNotifications] = useState(false);

    useEffect(() => {
        const checkNewNotifications = async () => {
            try {
                const response = await request('GET', `http://localhost:9090/agendamento/corretor?page=0&size=1`) as ApiResponse;
                if (response && response.content && response.content.length > 0) {
                    const hasPendingNotifications = response.content.some(
                        (agendamento) => agendamento.status === 'PENDENTE'
                    );
                    setHasNewNotifications(hasPendingNotifications);
                }
            } catch (error) {
                console.error('Erro ao verificar notificações:', error);
            }
        };

        checkNewNotifications();
        // Check for new notifications every 30 seconds
        const interval = setInterval(checkNewNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleAgendaClick = () => {
        if (userId) {
            router.push(`/paginaAgenda?userId=${userId}`);
        } else {
            console.error('ID do usuário não encontrado');
        }
    };

    const handleHistoricoClick = () => {
        if (userId) {
            router.push(`/paginaHistorico?userId=${userId}`);
        } else {
            console.error('ID do usuário não encontrado');
        }
    };

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

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8'>
                            <div className='flex flex-col items-center p-6 rounded-xl'>
                                <div className="p-4 rounded-full mb-4">
                                    <Image src="/imagensPaginaEditor-Adm/IconAgenda.png" alt="Gerenciamento de Imóveis" width={75} height={75} className="transition-transform duration-300 hover:scale-110" />
                                </div>

                                <p className='text-lg lg:text-xl font-medium text-gray-700 text-center leading-tight mb-6'>Agenda</p>

                                <div className="w-full space-y-4">
                                    <Botao className='w-full bg-vermelho h-10 hover:bg-vermelho/90 transition-colors duration-300' onClick={handleHistoricoClick} texto="Histórico da Agenda" />
                                    <Botao className='w-full bg-vermelho h-10 hover:bg-vermelho/90 transition-colors duration-300' onClick={handleAgendaClick} texto="Agenda" />
                                </div>
                            </div>

                            <div className='flex flex-col items-center p-6 rounded-xl'>
                                <div className="p-4 rounded-full mb-4">
                                    <Image src="/imagensPaginaEditor-Adm/IconPerfil.png" alt="Cadastro de Proprietários" width={75} height={75} className="transition-transform duration-300 hover:scale-110" />
                                </div>

                                <p className='text-lg lg:text-xl font-medium text-gray-700 text-center leading-tight mb-6'>Perfil</p>

                                <div className="w-full space-y-4">
                                    <Botao className='w-full bg-vermelho h-10 hover:bg-vermelho/90 transition-colors duration-300' onClick={() => router.push("/perfilUsuario/meu-perfil")} texto="Verificar Perfil" />
                                    <div className="h-10"></div>
                                </div>
                            </div>

                            <div className='flex flex-col items-center p-6 rounded-xl'>
                                <div className="p-4 rounded-full mb-4">
                                    <Image src="/imagensPaginaEditor-Adm/iconNotificao.png" alt="Cadastro de Proprietários" width={75} height={75} className="transition-transform duration-300 hover:scale-110" />
                                </div>

                                <p className='text-lg lg:text-xl font-medium text-gray-700 text-center leading-tight mb-6'>Notificações</p>

                                <div className="w-full space-y-4">
                                    <div className="relative">
                                        <Botao 
                                            className={`w-full h-10 transition-colors duration-300 ${
                                                hasNewNotifications 
                                                    ? 'bg-vermelho hover:bg-vermelho/90 animate-pulse' 
                                                    : 'bg-vermelho hover:bg-vermelho/90'
                                            }`} 
                                            onClick={() => router.push("/paginaCorretorNotificacaoAgendar")} 
                                            texto="Notificação"
                                        />
                                        {hasNewNotifications && (
                                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                                        )}
                                    </div>
                                    <div className="h-10"></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </RotaPrivada>
        </LoadingWrapper>
    );
}