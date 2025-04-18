<<<<<<< Updated upstream
"use client"
import { ImoveisDisponiveis } from '@/components/NumeroAtualizaveis/ImoveisDisponiveis';
import { ImoveisAlugados } from '@/components/NumeroAtualizaveis/ImoveisAlugados';
import { ImoveisVendidos } from '@/components/NumeroAtualizaveis/ImoveisVendidos';
import { PesquisaPaginaInicial } from '@/components/PaginaInicial/pesquisaPaginaInicial';
import { Montserrat } from 'next/font/google';
import Carrossel from '@/components/PaginaInicial/carrossel';
import BotaoImagemTexto from '@/components/PaginaInicial/BotaoImageTexto/index';
import { useLanguage } from '@/components/context/LanguageContext';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card } from '@/components/CardImovel';
import Image from 'next/image';
import { LoadingWrapper } from '@/components/loading/loadingServer';
=======
import { ImoveisDisponiveis } from '@/components/numeroAtualizaveis/ImoveisDisponiveis';
import { ImoveisAlugados } from '@/components/numeroAtualizaveis/ImoveisAlugados';
import { ImoveisVendidos } from '@/components/numeroAtualizaveis/ImoveisVendidos';
import { PesquisaPaginaInicial } from '@/components/paginaInicial/pesquisaPaginaInicial';
import { Montserrat } from 'next/font/google';
import Carousel from '@/components/paginaInicial/carrossel';
import BotaoImageTexto from '@/components/paginaInicial/botaoImageTexto';
import AtualizarComponents from '@/components/blocoDeAtualizacoes';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card } from '@/components/cardImovel';

>>>>>>> Stashed changes

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '800'],
    display: 'swap',
});

export default function PaginaInicial() {
    const { translate } = useLanguage();

    return (
        <LoadingWrapper>
            <Header />

            <div className={`${montserrat.className} pt-8`}>
                <main className='max-lg:px-4 px-20'>
                    <div className="relative flex h-[881px] xl:h-[700px] w-full rounded-[20px] mx-auto overflow-hidden pb-24 lg:pt-14 lg:pb-52">
                        <Image
                            className='' src="/paginaInicial/fotosDamainEfotter/PaginaCasaPaginaInicial.png" alt="cidade da Pagina do Editor" layout="fill" objectFit="cover" quality={100}
                        />
                        <div className="absolute inset-0 flex flex-col justify-center items-center 2xl:items-start text-white p-8 md:pl-16 2xl:pl-32 gap-11">
                            <h1 className="text-[2.5rem] lg:text-[3.125rem] xl:text-[2.8rem] text-center 2xl:text-start font-normal max-w-[800px]">
                                {translate('encontre_sua_casa')}
                                <span className='text-[2.5rem] lg:text-[4.375rem] xl:text-[3.5rem] text-center 2xl:text-start font-bold'> {translate('casa_maravilhosa')}</span> {translate('casa')}
                            </h1>
                            <p className="text-xl xl:text-lg font-normal text-center 2xl:text-start max-w-3xl">
                                {translate('plataforma_descricao')}
                            </p>
                        </div>
                    </div>
                </main>
                <div className="relative flex justify-center xl:-ml-[700px] mt-[5rem] lg:-mt-[10rem] z-10">
                    <PesquisaPaginaInicial />
                </div>
                <section className='px-4 sm:px-8 md:px-10 lg:px-14 xl:px-16'>
                    <section>
                        <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-40 xl:pt-32 2xl:pt-56'>
                            <div className='w-[1000px] xl:w-[800px]'>
                                <h2 className='flex justify-center text-center text-2xl lg:text-4xl xl:text-3xl font-medium pb-2 opacity-75'>{translate('como_funciona')}</h2>
                                <p className='flex justify-center text-center text-xl lg:text-3xl xl:text-2xl font-medium p-3 opacity-75'>{translate('plataforma_funciona')}</p>
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row 2xl:flex-row items-center justify-center sm:items-center sm:justify-center md:justify-around pt-36 xl:pt-24 gap-3'>
                            <div className='flex flex-col items-center w-80 lg:w-[500px] xl:w-[350px] py-10 md:py-10 2xl:py-0'>
                                <Image src="/paginaInicial/simobolosCCS/sistemaDeCompra.png" alt="Sistema de compra" width={110} height={123} />
                                <h2 className='text-2xl lg:text-3xl xl:text-2xl font-medium opacity-75 text-center leading-tight pt-16 pb-3 min-h-[120px]'>{translate('sistema_compra')}</h2>
                                <p className='text-lg xl:text-base font-medium opacity-75 text-center leading-tight pt-1 pb-3 min-h-[120px]'>{translate('sistema_compra_desc')}</p>
                            </div>
                            <div className='flex flex-col items-center  w-80 lg:w-[500px] xl:w-[350px] py-10 md:py-10 2xl:py-0'>
                                <Image src="/paginaInicial/simobolosCCS/sistemaChat.png" alt="Sistema de chat" width={110} height={123} />
                                <h2 className='text-2xl lg:text-3xl xl:text-2xl font-medium opacity-75 text-center leading-tight pt-16 pb-3 min-h-[120px]'>{translate('sistema_chat')}</h2>
                                <p className='text-lg xl:text-base font-medium opacity-75 text-center leading-tight pt-1 pb-3 min-h-[120px]'>{translate('sistema_chat_desc')}</p>
                            </div>
                            <div className='flex flex-col items-center  w-80 lg:w-[550px] xl:w-[350px] py-10 md:py-10 2xl:py-0'>
                                <Image src="/paginaInicial/simobolosCCS/segurançaDosClientes.png" alt="Sistema de compra" width={110} height={123} />
                                <h2 className='text-2xl lg:text-3xl xl:text-2xl font-medium opacity-75 text-center leading-tight pt-16 pb-3 min-h-[120px]'>{translate('seguranca_clientes')}</h2>
                                <p className='text-lg xl:text-base font-medium opacity-75 text-center leading-tight pt-1 pb-3 min-h-[120px]'>{translate('seguranca_desc')}</p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-28 xl:pt-32 2xl:pt-40'>
                            <div className='w-[1000px] xl:w-[800px]'>
                                <h2 className='flex justify-center text-center text-2xl lg:text-3xl xl:text-2xl font-medium pb-2 opacity-75'>{translate('imoveis_destaque')}</h2>
                                <p className='flex justify-center text-center text-xl lg:text-3xl xl:text-2xl font-medium p-3 opacity-75'>{translate('propriedades_localizacao')}</p>
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row justify-center pt-36 xl:pt-16 pb-12'>
                            <Carrossel type='ajusteTriplo'>
                                <Card titulo="Casa com 3 quartos" cidade="Jaraguá Do Sul" qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={6545644} codigo={455445} />
                                <Card titulo="Casa com 3 quartos" cidade="São Paulo" qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={3443423} codigo={2331212} />
                                <Card titulo="Casa com 3 quartos" cidade="Corupa" qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={2121321} codigo={3323} />
                            </Carrossel>
                        </div>
                    </section>
                    <section>
                        <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-28 xl:pt-32 2xl:pt-40'>
                            <div className='w-[1000px] xl:w-[800px]'>
                                <h2 className='flex justify-center text-center text-2xl lg:text-3xl xl:text-2xl font-medium pb-2 opacity-75'>{translate('imoveis_recentes')}</h2>
                                <p className='flex justify-center text-center text-xl lg:text-3xl xl:text-2xl font-medium p-3 opacity-75'>{translate('propriedades_localizacao')}</p>
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row justify-evenly pt-36 xl:pt-24 pb-12'>
                            <Card titulo="Casa com 3 quartos" cidade="São Paulo" qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo={12131} />
                            <Card titulo="Casa com 3 quartos" cidade="São Paulo" qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo={12131} />
                            <Card titulo="Casa com 3 quartos" cidade="São Paulo" qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo={12131} />
                        </div>
                    </section>
                    <section>
                        <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-28 xl:pt-32 2xl:pt-40'>
                            <div className='w-[1000px] xl:w-[800px]'>
                                <h2 className='flex justify-center text-center text-2xl lg:text-3xl xl:text-2xl font-medium pb-2 opacity-75'>{translate('imoveis_promocao')}</h2>
                                <p className='flex justify-center text-center text-xl lg:text-3xl xl:text-2xl font-medium p-3 opacity-75'>{translate('propriedades_localizacao')}</p>
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row justify-evenly pt-36 xl:pt-24 pb-12'>
                            <Card titulo="Casa com 3 quartos" cidade="São Paulo" qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo={12131} />
                            <Card titulo="Casa com 3 quartos" cidade="São Paulo" qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo={12131} />
                            <Card titulo="Casa com 3 quartos" cidade="São Paulo" qtdDormitorios={3} qtdSuite={1} qtdBanheiros={2} preco={750000} codigo={12131} />
                        </div>
                    </section>
                </section>
                <section>
                    <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-28 xl:pt-32 2xl:pt-40'>
                        <div className='w-[1000px] xl:w-[800px]'>
                            <h2 className='flex justify-center text-center text-2xl lg:text-3xl xl:text-2xl font-medium pb-2 opacity-75'>{translate('localidades')}</h2>
                            <p className='flex justify-center text-center text-xl lg:text-2xl xl:text-xl font-medium p-3 opacity-75'>{translate('plataforma_funciona')}</p>
                        </div>
                    </div>

                    <Carrossel type={"ajusteNormal"}>
                        <BotaoImagemTexto src="/paginaInicial/ImagensCidade/Jaragua.png" texto="Jaraguá do Sul" />
                        <BotaoImagemTexto src="/paginaInicial/ImagensCidade/guaramirim.png" texto="Guaramirim" />
                        <BotaoImagemTexto src="/paginaInicial/ImagensCidade/curupa.png" texto="Corupá" />
                        <BotaoImagemTexto src="/paginaInicial/ImagensCidade/schorder.png" texto="Schroeder" />
                        <BotaoImagemTexto src="/paginaInicial/ImagensCidade/Jaragua.png" texto="Jaraguá do Sul" />
                        <BotaoImagemTexto src="/paginaInicial/ImagensCidade/guaramirim.png" texto="Guaramirim" />
                        <BotaoImagemTexto src="/paginaInicial/ImagensCidade/curupa.png" texto="Corupá" />
                        <BotaoImagemTexto src="/paginaInicial/ImagensCidade/schorder.png" texto="Schroeder" />
                    </Carrossel>
                </section>
                <footer className='bg-[#6d2431]'>
                    <div className="relative flex h-[400px] sm:h-[400px] md:h-[400px] lg:h-[300px] xl:h-[300px] w-full mx-auto overflow-hidden pb-44 pt-0 lg:pt-14 lg:pb-44">
                        <Image src="/paginaInicial/fotosDamainEfotter/PreFotterInicial.png" alt="Fundo Vermelho" layout="fill" objectFit="cover" quality={100} className="absolute top-[-50px] lg:top-[-30px]" />
                        <div className="relative inset-0 flex flex-col lg:flex-row 2xl:flex-row items-center justify-center sm:items-center sm:justify-center md:justify-around self-center 2xl:items-start text-white p-8 mx-auto gap-10 lg:gap-20 xl:gap-32">
                            <div className='flex text-center items-center gap-7'>
                                <Image
                                    src="/paginaInicial/inconeImoveisACV/imoveisCadastros.png"
                                    alt="imoveis Cadastrados" objectFit="cover"
                                    width={70} height={74} quality={100} />
                                <div className='flex flex-col text-start'>
                                    <ImoveisDisponiveis />
                                    <p>Imóveis Cadastrados</p>
                                </div>
                            </div>

                            <div className='flex text-center items-center gap-7'>
                                <Image src="/paginaInicial/inconeImoveisACV/imoveisVendidos.png"
                                    alt="Imoveis Vendidos" objectFit="cover"
                                    width={70} height={74} quality={100} />
                                <div className='flex flex-col text-start'>
                                    <ImoveisVendidos />
                                    <p>Imóveis Vendidos</p>
                                </div>
                            </div>

                            <div className='flex text-center items-center gap-7'>
                                <Image src="/paginaInicial/inconeImoveisACV/imoveisAlugados.png"
                                    alt="Imoveis Alugados" objectFit="cover"
                                    width={70} height={74} quality={100} />
                                <div className='flex flex-col text-start'>
                                    <ImoveisAlugados />
                                    <p>Imóveis Alugados</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex justify-center -mt-[8rem] lg:mt-[-6rem] xl:mt-[-6rem] z-20 max-lg:px-4 px-20">
                        {/* AtualizarComponents removed */}
                    </div>
                    <div className='relative md:-mt-[80px] lg:-mt-[60px] xl:-mt-[50px]'>
                        <Footer />
                    </div>
                </footer>
            </div>
        </LoadingWrapper>
    );
}

