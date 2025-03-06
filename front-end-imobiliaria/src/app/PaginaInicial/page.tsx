import { Montserrat } from 'next/font/google';
import { PesquisaPaginaInicial } from '@/components/PesquisaPaginaInicial';
import Card from '@/components/CardImovel/Card';

// Carregando a fonte Inter
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

import Image from 'next/image';


export default function PaginaInicial() {
    return (
        <div className={`${montserrat.className} pt-3 pb-24 lg:pt-14 lg:pb-52`}>
            <main className="relative flex h-[881px] w-full max-w-[1810px] mx-auto overflow-hidden ">
                <Image className='rounded-lg' src="/PaginaCasaPaginaInicial.png" alt="cidade da Pagina do Editor" layout="fill" objectFit="cover" quality={100} />
                <div className="absolute inset-0 flex flex-col justify-center items-center 2xl:items-start text-white p-8 md:pl-16 2xl:pl-32 gap-11">
                    <h1 className="text-[2.5rem] lg:text-[3.125em] text-center 2xl:text-start font-normal max-w-[800px]">Nós vamos ajudá-lo a encontrar sua <span className='text-[2.5rem] lg:text-[4.375rem] text-center 2xl:text-start font-bold'>Maravilhosa</span> casa</h1>
                    <p className=" text-xl font-normal text-center 2xl:text-start max-w-3xl">Uma ótima plataforma para comprar, vender e alugar seus imóveis sem nenhum agente ou comissões.</p>
                </div>

            </main>
            <section>
                <div className='absolute inset-0 flex flex-col justify-center items-center 2xl:items-start md:pl-16 2xl:pl-[430px] pt-[1100px] lg:pt-[600px] gap-11'>
                    <PesquisaPaginaInicial />
                </div>
                <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-[600px]  2xl:pt-96'>
                    <div className='w-[1000px]'>
                        <h2 className='flex justify-center text-center text-4xl lg:text-5xl font-medium pb-2 opacity-75'>Como Funciona</h2>
                        <p className='flex justify-center text-center text-2xl lg:text-3xl font-medium p-3 opacity-75'>Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.</p>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row 2xl:flex-row items-center justify-center sm:items-center sm:justify-center md:justify-around pt-36'>
                    <div className='flex flex-col items-center w-80 lg:w-[500px] py-10 md:py-10 2xl:py-0'>
                        <Image src="/sistemaDeCompra.png" alt="Sistema de compra" width={110} height={123} />
                        <h2 className='text-[2.8125rem] font-medium opacity-75 text-center leading-tight pt-16 pb-3 min-h-[120px]'>Sistema de Compra</h2>
                        <p className='text-3xl font-medium opacity-75 text-center leading-tight pt-1 pb-3 min-h-[120px]'>Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.</p>
                    </div>
                    <div className='flex flex-col items-center  w-80 lg:w-[500px] py-10 md:py-10 2xl:py-0'>
                        <Image src="/sistemaChat.png" alt="Sistema de chato" width={110} height={123} />
                        <h2 className='text-[2.8125rem] font-medium opacity-75 text-center leading-tight pt-16 pb-3 min-h-[120px]'>Sistema de Chat</h2>
                        <p className='text-3xl font-medium opacity-75 text-center leading-tight pt-1 pb-3 min-h-[120px]'>Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.</p>
                    </div>
                    <div className='flex flex-col items-center  w-80 lg:w-[550px] py-10 md:py-10 2xl:py-0'>
                        <Image src="/segurançaDosClientes.png" alt="Sistema de compra" width={110} height={123} />
                        <h2 className='text-[2.8125rem] font-medium opacity-75 text-center leading-tight pt-16 pb-3 min-h-[120px]'>Segurança dos Clientes</h2>
                        <p className='text-3xl font-medium opacity-75 text-center leading-tight pt-1 pb-3 min-h-[120px]'>Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.</p>
                    </div>
                </div>
            </section>
            <section>
                <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-[600px]  2xl:pt-96'>
                    <div className='w-[1000px]'>
                        <h2 className='flex justify-center text-center text-4xl lg:text-5xl font-medium pb-2 opacity-75'>Imóveis em Destaque</h2>
                        <p className='flex justify-center text-center text-2xl lg:text-3xl font-medium p-3 opacity-75'>Propriedades por localização e Bairro</p>
                    </div>
                </div>


            </section>
            <section>
                <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-[600px]  2xl:pt-96'>
                    <div className='w-[1000px]'>
                        <h2 className='flex justify-center text-center text-4xl lg:text-5xl font-medium pb-2 opacity-75'>Imóveis Adcionados Recentemente</h2>
                        <p className='flex justify-center text-center text-2xl lg:text-3xl font-medium p-3 opacity-75'>Propriedades por localização e Bairro</p>
                    </div>
                </div>
                <Card></Card>

            </section>
            <section>
                <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-[600px]  2xl:pt-96'>
                    <div className='w-[1000px]'>
                        <h2 className='flex justify-center text-center text-4xl lg:text-5xl font-medium pb-2 opacity-75'>Imóveis em Promoção</h2>
                        <p className='flex justify-center text-center text-2xl lg:text-3xl font-medium p-3 opacity-75'>Propriedades por localização e Bairro</p>
                    </div>
                </div>
                <Card></Card>

            </section>
            <section>
                <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-[600px]  2xl:pt-96'>
                    <div className='w-[1000px]'>
                        <h2 className='flex justify-center text-center text-4xl lg:text-5xl font-medium pb-2 opacity-75'>Localidades</h2>
                        <p className='flex justify-center text-center text-2xl lg:text-3xl font-medium p-3 opacity-75'>Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.</p>
                    </div>
                </div>


            </section>


            <footer >
        

            <Image src="/PreFotterInicial.png" alt="cidade da Pagina do Editor" layout="fill" objectFit="cover" quality={100} />
        
        

            </footer>

       </div>
    );



}