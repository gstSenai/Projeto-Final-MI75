import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Montserrat } from "next/font/google";
import Calendario from '@/components/Calendario';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});




export default function paginaAgendamento() {
    return (
        <>
            <header>
                <Header />
            </header>
            <div className={`${montserrat.className} max-lg:px-4 px-20  py-12 sm:py-12 md:py-10 lg:py-14 xl:py-20`}>
                <section>
                    <div>
                        <div className="flex justify-between items-center pt-32 pb-24">
                            <div>
                                <h1 className="font-bold text-xl md:text-3xl 2xl:text-5xl">Agendamentos</h1>
                                <div className="border-t-2 border-[#702632] w-[220px] md:w-[220px] 2xl:w-[220px] mt-6"></div>
                            </div>
                            <div>
                                <Image className="relative invisible lg:visible" src="/formularios/logoPequena.png" alt="Gerenciamento de Imóveis" width={88} height={90} />
                            </div>
                        </div>
                        <div>
                            <Calendario />



                            <h2 className="z-0 text-[#702632]  w-80 lg:w-[650px] text-center font-bold text-xl md:text-2xl lg:text-3xl xl:text-5xl ">Escolha a data, o horário e o corretor para agendar sua visita!</h2>
                            {/* <Image className="relative opacity-[7%] -z-10" src="/formularioContato/logoGrande.png" alt="Gerenciamento de Imóveis" width={911} height={833} /> */}
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