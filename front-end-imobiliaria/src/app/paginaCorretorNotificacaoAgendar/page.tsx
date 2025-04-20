"use client"
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LoadingWrapper } from '@/components/loading/loadingServer';
import Image from 'next/image';
import { CorretorNotificacaoAgendar } from '@/components/corretorNotificacaoAgendar';


import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '800'],
    display: 'swap',
});

export default function paginaCorretorNotificacaoAgendar() {
    return (
        <>
            <LoadingWrapper>
                <header>
                    <Header />
                </header>
                <div className={`${montserrat.className} pt-10 px-6 max-lg:px-6 lg:px-20 xl:px-16`}>
                    <section className='py-10'>
                        <div>
                            <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Notificações Agendamentos</h1>
                            <div className="border-t-2 border-[#702632] w-[130px] mt-1"></div>
                        </div>

                        <div className='flex flex-col px-[75px] pt-8 justify-center'>
                            <CorretorNotificacaoAgendar cidade='Itapema' bairro='Amizade' horario='12:00' horarios='12:00 - 12:30' codigo='4057' />
                            <CorretorNotificacaoAgendar cidade='Itapema' bairro='Amizade' horario='12:00' horarios='12:00 - 12:30' codigo='4057' />
                            <CorretorNotificacaoAgendar cidade='Itapema' bairro='Amizade' horario='12:00' horarios='12:00 - 12:30' codigo='4057' />
                            <CorretorNotificacaoAgendar cidade='Itapema' bairro='Amizade' horario='12:00' horarios='12:00 - 12:30' codigo='4057' />
                        </div>
                        <div className="flex justify-center py-10">
                            <button className='bg-[#702632] hover:brightness-110 transition text-white rounded-lg  px-6 py-2 '><p>Ver mais</p></button>
                        </div>
                    </section>
                </div>
                <footer>
                    <Footer />
                </footer>
            </LoadingWrapper>
        </>
    );
}