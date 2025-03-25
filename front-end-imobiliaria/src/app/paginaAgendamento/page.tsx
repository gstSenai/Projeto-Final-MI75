import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Montserrat } from "next/font/google";
import Calendario from '@/components/Calendario';
import { Botao } from '@/components/Botao';

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
            <Image className="absolute opacity-[7%] mt-auto xl:mt-[40%] ml-auto xl:ml-[2.5%] -z-10 invisible sm:invisible md:invisible lg:visible" src="/formularios/logoGrande.png" alt="Gerenciamento de Imóveis" width={686} height={722} />
            <div className={`${montserrat.className} max-lg:px-4 px-20  py-12 sm:py-12 md:py-10 lg:py-14 xl:py-20`}>
                <section>

                    <div>
                        <div className="flex justify-between items-center md:pt-16 lg:pt-20 xl:pt-28 2xl:pt-32 pb-6 md:pb-10 lg:pb-14 xl:pb-16 2xl:pb-24">
                            <div>
                                <h1 className="font-bold text-xl md:text-3xl 2xl:text-5xl">Agendamentos</h1>
                                <div className="border-t-2 border-[#702632] w-[220px] md:w-[220px] 2xl:w-[220px] mt-6"></div>
                            </div>
                            <div>
                                <Image className="relative invisible lg:visible" src="/formularios/logoPequena.png" alt="Gerenciamento de Imóveis" width={88} height={90} />
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row justify-between pb-36 lg:pb-40 xl:pb-44 2xl:pb-56'>
                            <Calendario />
                            <div className='pt-11 sm:pt-14 md:pt-20 lg:pt-28 sm:px-1 md:px-5 lg:px-10'>
                                <h2 className='center md:text-lg lg:text-xl xl:text-3xl 2xl:text-5xl font-bold text-center text-[#702632]'>Escolha a data, o horário e o corretor para agendar sua visita!</h2>
                                <div className='flex justify-center'>


                                    
                                    <button className='bg-[#702632] p-3 px-10 lg:p-3 lg:px-10 xl:p-3 xl:px-14 2xl:p-5 2xl:px-14 rounded-[20px] '>
                                        <p className='text-white font-medium text-base md:text-lg lg:text-xl xl:text-2xl'>Agendar visita</p>
                                    </button>
                                </div>

                            </div>


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


//-z-10