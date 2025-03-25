import { Card } from '@/components/cardImovel/index';
import { ImoveisAlugados } from '@/components/numeroAtualizaveis/ImoveisAlugados';
import { ImoveisDisponiveis } from '@/components/numeroAtualizaveis/ImoveisDisponiveis';
import { ImoveisVendidos } from '@/components/numeroAtualizaveis/ImoveisVendidos';
import { PesquisaPaginaInicial } from '@/components/PaginaInicial/PesquisaPaginaInicial';
import { Montserrat } from 'next/font/google';
import Carousel from '@/components/PaginaInicial/carrossel';
import BotaoImageTexto from '@/components/PaginaInicial/BotaoImageTexto';
import AtualizarComponents from '@/components/atualizarComponents';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';


// Carregando a fonte Inter
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '800'],
    display: 'swap',
});

import Image from 'next/image';
import { Car } from 'lucide-react';


export default function PaginaInicial() {
    return (
      <>
      <Header/>
        <div className={`${montserrat.className} pt-3`}>
            <main className='max-lg:px-4 px-20'>
                <div className="relative flex h-[881px] w-full rounded-[20px] mx-auto overflow-hidden pb-24 lg:pt-14 lg:pb-52 ">
                    <Image
                        className='' src="/PaginaCasaPaginaInicial.png" alt="cidade da Pagina do Editor" layout="fill" objectFit="cover" quality={100}
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
                </div>
            </main>
            <div className="relative flex justify-center xl:-ml-[700px] mt-[5rem] lg:-mt-[15rem] z-10">
                <PesquisaPaginaInicial />
            </div>
            <section className='px-2 sm:px-8 md:px-10 lg:px-14 xl:px-20'>
                <section>
                    <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-40  2xl:pt-56'>
                        <div className='w-[1000px]'>
                            <h2 className='flex justify-center text-center text-2xl lg:text-4xl font-medium pb-2 opacity-75'>Como Funciona</h2>
                            <p className='flex justify-center text-center text-xl lg:text-3xl font-medium p-3 opacity-75'>Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.</p>
                        </div>
                    </div>
                    <div className='flex flex-col lg:flex-row 2xl:flex-row items-center justify-center sm:items-center sm:justify-center md:justify-around pt-36 gap-3'>
                        <div className='flex flex-col items-center w-80 lg:w-[500px] py-10 md:py-10 2xl:py-0'>
                            <Image src="/sistemaDeCompra.png" alt="Sistema de compra" width={110} height={123} />
                            <h2 className='text-2xl lg:text-3xlfont-medium opacity-75 text-center leading-tight pt-16 pb-3 min-h-[120px]'>Sistema de Compra</h2>
                            <p className='text-lg font-medium opacity-75 text-center leading-tight pt-1 pb-3 min-h-[120px]'>Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.</p>
                        </div>
                        <div className='flex flex-col items-center  w-80 lg:w-[500px] py-10 md:py-10 2xl:py-0'>
                            <Image src="/sistemaChat.png" alt="Sistema de chat" width={110} height={123} />
                            <h2 className='text-2xl lg:text-3xlfont-medium opacity-75 text-center leading-tight pt-16 pb-3 min-h-[120px]'>Sistema de Chat</h2>
                            <p className='text-lg font-medium opacity-75 text-center leading-tight pt-1 pb-3 min-h-[120px]'>Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.</p>
                        </div>
                        <div className='flex flex-col items-center  w-80 lg:w-[550px] py-10 md:py-10 2xl:py-0'>
                            <Image src="/segurançaDosClientes.png" alt="Sistema de compra" width={110} height={123} />
                            <h2 className='text-2xl lg:text-3xlfont-medium opacity-75 text-center leading-tight pt-16 pb-3 min-h-[120px]'>Segurança dos Clientes</h2>
                            <p className='text-lg font-medium opacity-75 text-center leading-tight pt-1 pb-3 min-h-[120px]'>Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.</p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-[600px]  2xl:pt-96'>
                        <div className='w-[1000px]'>
                            <h2 className='flex justify-center text-center text-2xl lg:text-3xl font-medium pb-2 opacity-75'>Imóveis em Destaque</h2>
                            <p className='flex justify-center text-center text-xl lg:text-3xl font-medium p-3 opacity-75'>Propriedades por localização e Bairro</p>
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-evenly pt-36 pb-12'>
                    <Card  titulo="Casa com 3 quartos"cidade="São Paulo"qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo= {12131}/>
                    <Card  titulo="Casa com 3 quartos"cidade="São Paulo"qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo= {12131}/>
                    <Card  titulo="Casa com 3 quartos"cidade="São Paulo"qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo= {12131}/>
                    </div>
                </section>
                <section>
                    <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-[600px]  2xl:pt-96'>
                        <div className='w-[1000px]'>
                            <h2 className='flex justify-center text-center text-2xl lg:text-3xl font-medium pb-2 opacity-75'>Imóveis Adcionados Recentemente</h2>
                            <p className='flex justify-center text-center text-xl lg:text-3xl font-medium p-3 opacity-75'>Propriedades por localização e Bairro</p>
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-evenly pt-36 pb-12'>
                    <Card  titulo="Casa com 3 quartos"cidade="São Paulo"qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo= {12131}/>
                    <Card  titulo="Casa com 3 quartos"cidade="São Paulo"qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo= {12131}/>
                    <Card  titulo="Casa com 3 quartos"cidade="São Paulo"qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo= {12131}/>
                    </div>
                </section>
                <section>
                    <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-[600px]  2xl:pt-96'>
                        <div className='w-[1000px]'>
                            <h2 className='flex justify-center text-center text-2xl lg:text-3xl font-medium pb-2 opacity-75'>Imóveis em Promoção</h2>
                            <p className='flex justify-center text-center text-xl lg:text-3xl font-medium p-3 opacity-75'>Propriedades por localização e Bairro</p>
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-evenly pt-36 pb-12'>
                    <Card  titulo="Casa com 3 quartos"cidade="São Paulo"qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo= {12131}/>
                    <Card  titulo="Casa com 3 quartos"cidade="São Paulo"qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo= {12131}/>
                    <Card  titulo="Casa com 3 quartos"cidade="São Paulo"qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo= {12131}/>
                    </div>
                </section>
            </section>
            <section>
                <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-[600px]  2xl:pt-96'>
                    <div className='w-[1000px]'>
                        <h2 className='flex justify-center text-center text-2xl lg:text-3xl  font-medium pb-2 opacity-75'>Localidades</h2>
                        <p className='flex justify-center text-center text-xl lg:text-2xl font-medium p-3 opacity-75'>Uma ótima plataforma para comprar e alugar seus imóveis com agentes e comissões muito bem preparadas.</p>
                    </div>
                </div>

                <Carousel>
                    <BotaoImageTexto src="/jaragua.png" texto="Jaraguá do Sul" />
                    <BotaoImageTexto src="/guaramirim.png" texto="Guaramirim" />
                    <BotaoImageTexto src="/curupa.png" texto="Corupá" />
                    <BotaoImageTexto src="/schorder.png" texto="Schroeder" />
                    <BotaoImageTexto src="/jaragua.png" texto="Jaraguá do Sul" />
                    <BotaoImageTexto src="/guaramirim.png" texto="Guaramirim" />
                    <BotaoImageTexto src="/curupa.png" texto="Corupá" />
                    <BotaoImageTexto src="/schorder.png" texto="Schroeder" />
                </Carousel>
            </section>
            <footer >
                <div className="relative flex h-[945.95px] md:h-[945.95px] lg:h-[630px] w-full mx-auto overflow-hidden pb-24 lg:pt-14 lg:pb-52">
                    {/* Ajuste na posição da imagem de fundo */}
                    <Image src="/PreFotterInicial.png" alt="Fundo Vermelho" layout="fill" objectFit="cover" quality={100} className="absolute top-[-50px] lg:top-[-30px]" /* Move a imagem para cima */ />

                    <div className="relative inset-0 flex flex-col lg:flex-row 2xl:flex-row items-center justify-center sm:items-center sm:justify-center md:justify-around self-center 2xl:items-start text-white p-8 mx-auto gap-20 lg:gap-20 xl:gap-48">
                        <div className='flex text-center items-center gap-7'>
                            <Image src="/imoveisCadastros.png" alt="imoveis Cadastrados" objectFit="cover" width={106} height={108} quality={100} />
                            <div className='flex flex-col text-start'>
                                <ImoveisDisponiveis />
                                <p>Imoveis Cadastrados</p>
                            </div>
                        </div>

                        <div className='flex text-center items-center gap-7'>
                            <Image src="/imoveisVendidos.png" alt="Imoveis Vendidos" objectFit="cover" width={106} height={108} quality={100} />
                            <div className='flex flex-col text-start'>
                                <ImoveisVendidos />
                                <p>Imoveis Vendidos</p>
                            </div>
                        </div>

                        <div className='flex text-center items-center gap-7'>
                            <Image src="/imoveisAlugados.png" alt="Imoveis Alugados" objectFit="cover" width={106} height={108} quality={100} />
                            <div className='flex flex-col text-start'>
                                <ImoveisAlugados />
                                <p>Imoveis Alugados</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex justify-center -mt-[16rem] lg:-mt-[9rem] z-10 max-lg:px-4 px-20">
                    <AtualizarComponents />

                </div>
            
            </footer>

        </div>
        <Footer/>
        </>
    );



}



<div className='flex flex-wrap justify-evenly pt-36 pb-12'>
<Card  titulo="Casa com 3 quartos"cidade="São Paulo"qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo= {12131}/>
<Card  titulo="Casa com 3 quartos"cidade="São Paulo"qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo= {12131}/>
<Card  titulo="Casa com 3 quartos"cidade="São Paulo"qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo= {12131}/>
</div>