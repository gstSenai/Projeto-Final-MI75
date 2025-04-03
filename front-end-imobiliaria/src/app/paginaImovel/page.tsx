import { Montserrat } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BarraStatusImovel } from '@/components/barraStatusImovel';
import Image from 'next/image';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '800'],
    display: 'swap',
});

export default function PaginaImovel() {
    return (
        <>
            <Header />

            <div className='pt-24 px-8 max-lg:px-8 lg:px-12 xl:px-14'>

                <main>
                    <a className='text-[#A1A1A1] text-xl' href="/paginaImoveis">Imóveis  &gt;</a>


                    <div>

                        <h1></h1>
                        <div className='bg-vermelho w-[220px] h-[3px]'></div>
                    </div>


                </main>



                <BarraStatusImovel quantQuartos={3} quantBanheiro={2} quantGaragem={1} quantSuite={1} quantpiscina={1} />


                <footer>
                    <div>
                        <h2 className=''>Imóveis semelhantes</h2>
                        <div className='bg-vermelho w-[220px] h-[3px]'></div>
                    </div>
                </footer>
            </div>
            <Footer />
        </>
    )
}