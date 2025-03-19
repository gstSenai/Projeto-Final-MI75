import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function paginaAgendamento() {
    return(
        <>
        <header>
        <Header />
        </header>
        <div className='px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20'>
        <section>

        <h2 className="z-0 text-[#702632] absolute w-auto lg:w-[650px] text-center font-bold text-xl lg:text-3xl xl:text-5xl 2xl:text-[64px]">Escolha a data, o horário e o corretor para agendar sua visita!</h2>
                    <Image className="relative opacity-[7%] -z-10" src="/formularioContato/logoGrande.png" alt="Gerenciamento de Imóveis" width={911} height={833} />




        </section>
        </div>
        <footer>
        <Footer />
        </footer>
        </>
    );
};