import { Montserrat } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import BarraStatusImovel from '@/components/barraStatusImovel';
import { Card } from '@/components/cardImovel/index';
import AgendarCorretor from '@/components/agendarCorretor';
import { LoadingWrapper } from '@/components/loading/loadingServer';


const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '800'],
    display: 'swap',
});

export default function PaginaImovel() {
    return (
        <LoadingWrapper>
            <Header />

            <div className={`pt-24 px-8 max-lg:px-8 lg:px-8 xl:px-10 ${montserrat.className}`}>

                <main>
                    <a className='opacity-40 text-xl' href="/paginaImoveis">Imóveis  &gt;</a>


                    <div>

                        <h1></h1>
                        <div className='bg-vermelho w-[220px] h-[3px]'></div>
                    </div>


                </main>
                <section>
                    <div className="flex justify-center lg:justify-start">
                        <BarraStatusImovel id={1} />
                    </div>

                    <div className="flex justify-center lg:justify-start">
                        <AgendarCorretor id={3} />
                    </div>

                </section>
                <section>
                    <div className='pl-0 md:pl-0 lg:pl-20 text-center md:text-center lg:text-start flex flex-col items-center md:items-center lg:items-start'>
                        <h2 className='font-bold text-xl'>Imóveis semelhantes</h2>
                        <div className='bg-vermelho w-[110px] h-[3px]'></div>
                    </div>

                </section>
            </div>
            <Footer />
        </LoadingWrapper>
    )
}

