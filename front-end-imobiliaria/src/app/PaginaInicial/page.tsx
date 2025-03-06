import { Montserrat } from 'next/font/google';
import { PesquisaPaginaInicial } from '@/components/PesquisaPaginaInicial';
import Card from '@/components/CardImovel/Card';
import { CincoEstrelas } from '@/components/NumeroAtualizaveis/CincoEstrelas';
import { ImoveisDisponiveis } from '@/components/NumeroAtualizaveis/ImoveisDisponiveis';
import { ImoveisVendidos } from '@/components/NumeroAtualizaveis/ImoveisVendidos';

// Carregando a fonte Inter
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

import Image from 'next/image';


export default function PaginaInicial() {
    return (
        <div className={`${montserrat.className} pt-3 `}>
            <main className="relative flex h-[881px] w-full max-w-[1810px] mx-auto overflow-hidden pb-24 lg:pt-14 lg:pb-52 ">
                <Image
                    className='rounded-lg' src="/PaginaCasaPaginaInicial.png" alt="cidade da Pagina do Editor" layout="fill" objectFit="cover" quality={100}
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center 2xl:items-start text-white p-8 md:pl-16 2xl:pl-32 gap-11">
                    <h1 className="text-[2.5rem] lg:text-[3.125em] text-center 2xl:text-start font-normal max-w-[800px]">
                        Nós vamos ajudá-lo a encontrar sua
                        <span className='text-[2.5rem] lg:text-[4.375rem] text-center 2xl:text-start font-bold'> Maravilhosa</span> casa
                    </h1>
                    <p className="text-xl font-normal text-center 2xl:text-start max-w-3xl">
                        Uma ótima plataforma para comprar, vender e alugar seus imóveis sem nenhum agente ou comissões.
                    </p>
                </div>
            </main>

            {/* Posicionando a pesquisa logo abaixo da imagem de fundo */}
            <div className="relative flex justify-center xl:-ml-[700px] -mt-[15rem] z-10">
                <PesquisaPaginaInicial />
            </div>
            <section>

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
                        <Image src="/sistemaChat.png" alt="Sistema de chat" width={110} height={123} />
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
                <div>

                    <Card></Card>

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
            <footer className="relative flex  w-full h-[400px] overflow-hidden">

                <Image src="/PreFotterInicial.png" alt="Fundo Vermelho" layout="fill" objectFit="cover" quality={100}
                />

                <div className="absolute inset-0 flex flex-col lg:flex-row 2xl:flex-row items-center justify-center sm:items-center sm:justify-center md:justify-around self-center 2xl:items-start text-white p-8 md:pl-16 2xl:pl-32 gap-11">

                    <div  className='flex text-center items-center gap-7'>
                        <Image src="/imoveisCadastros.png" alt="imoveis Cadastrados" objectFit="cover" width={106} height={108} quality={100} />
                        <div className='flex flex-col  text-start'>
                            <ImoveisDisponiveis/>
                            <p>Imoveis Cadastrados</p>
                        </div>
                    </div>

                    <div className='flex text-center items-center gap-7'>
                        <Image src="/imoveisVendidos.png" alt="Imoveis Vendidos" objectFit="cover" width={106} height={108} quality={100} />
                        <div className='flex flex-col  text-start'>
                            <ImoveisVendidos/>
                            <p>Imoveis Vendidos</p>
                        </div>
                    </div>

                    <div  className='flex text-center items-center gap-7'>
                        <Image src="/numeroCincoEstrelas.png" alt="Cincos estrelas" objectFit="cover" width={106} height={108} quality={100} />
                        <div className='flex flex-col text-start'>
                            <CincoEstrelas/>
                            <p>Cincos estrelas</p>
                        </div>
                    </div>


                </div>
            </footer>

        </div>
    );



}