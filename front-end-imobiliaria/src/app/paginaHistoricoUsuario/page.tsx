"use client"
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LoadingWrapper } from '@/components/loading/loadingServer';
import { PaginaHistoricoUsuarioChamar } from '@/components/paginaHistorico';
import Image from 'next/image';

export default function PaginaHistoricoUsuario() {
    return (
        <>
            <LoadingWrapper>
                <header>
                    <Header />
                </header>
                <div className='pt-10 px-6 max-lg:px-6 lg:px-20 xl:px-16'>
                    <section>
                        <div>
                            <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Histórico de Agendamentos</h1>
                            <div className="border-t-2 border-[#702632] w-[130px] mt-1"></div>
                        </div>
                        <div className='px-[75px] pt-8 pb-44'>
                            <PaginaHistoricoUsuarioChamar />
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