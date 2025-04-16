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
                <Image
                    className='absolute -left-28 w-[300px] h-[320px] sm:w-[400px] sm:h-[420px] md:w-[480px] md:h-[500px] -z-10'
                    src="/imagemFundo.png"
                    alt="Imagem logo de fundo"
                    width={558}
                    height={568}
                    quality={100}
                />
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