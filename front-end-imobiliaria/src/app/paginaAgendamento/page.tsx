import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function paginaAgendamento() {
    return (
        <>
            <header>
                <Header />
            </header>
            <div className='px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20'>
                <section>
                    <div>
                        <div className="flex justify-between">
                            <div>
                                <h1 className="font-bold text-xl md:text-3xl 2xl:text-5xl">Formulário para contato</h1>
                                <div className="border-t-2 border-[#702632] w-[265px] md:w-[405px] 2xl:w-[630px] my-2"></div>
                            </div>
                            <div>
                                <Image className="relative invisible lg:visible" src="/formularios/logoPequena.png" alt="Gerenciamento de Imóveis" width={88} height={90} />
                            </div>
                        </div>
                        <div>

                            <h2 className="z-0 text-[#702632] absolute w-auto lg:w-[650px] text-center font-bold text-xl lg:text-3xl xl:text-5xl 2xl:text-[64px]">Entre em contato conosco através do formulário ao lado.</h2>
                            <Image className="relative opacity-[7%] -z-10" src="/formularioContato/logoGrande.png" alt="Gerenciamento de Imóveis" width={911} height={833} />





                        </div>
                    </div>
                </section>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
};