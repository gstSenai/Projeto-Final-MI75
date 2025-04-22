"use client"
import { ImoveisDisponiveis } from '@/components/numeroAtualizaveis/ImoveisDisponiveis';
import { ImoveisAlugados } from '@/components/numeroAtualizaveis/ImoveisAlugados';
import { ImoveisVendidos } from '@/components/numeroAtualizaveis/ImoveisVendidos';
import { PesquisaPaginaInicial } from '@/components/paginaInicial/pesquisaPaginaInicial';
import { Montserrat } from 'next/font/google';
import Carrossel from '@/components/paginaInicial/carrossel';
import BotaoImagemTexto from '@/components/paginaInicial/botaoImageTexto/index';
import { useLanguage } from '@/components/context/LanguageContext';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card } from '@/components/cardImovel/index';
import Image from 'next/image';
import { LoadingWrapper } from '@/components/loading/loadingServer';
import AtualizarComponents from '@/components/blocoDeAtualizacoes';
import { useImoveis } from '@/hooks/useImoveis';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '800'],
    display: 'swap',
});

export default function PaginaInicial() {
    const { translate } = useLanguage();
    const { imoveis: imoveisDestaque, loading: loadingDestaque } = useImoveis('destaque');
    const { imoveis: imoveisPromocao, loading: loadingPromocao } = useImoveis('promocao');
    const { imoveis: imoveisRecentes, loading: loadingRecentes } = useImoveis('recente');

    return (
        <LoadingWrapper>
            <Header />

            <div className={`${montserrat.className} pt-8`}>
                <main className='max-lg:px-2 px-20'>
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
                <div className="relative flex justify-center lg:-ml-[500px] xl:-ml-[700px] -mt-[10rem] max-sm:px-10 lg:-mt-[10rem] z-10">
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
                        <div className='flex flex-col lg:flex-row justify-center pt-4 xl:pt-16 pb-12'>
                            {loadingDestaque ? (
                                <div className="flex justify-center items-center">
                                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#702632]"></div>
                                </div>
                            ) : imoveisDestaque.length > 0 ? (
                                <Carrossel type='ajusteTriplo'>
                                    {imoveisDestaque.map((imovel) => (
                                        <Card
                                            key={imovel.id}
                                            titulo={imovel.titulo}
                                            cidade={imovel.cidade}
                                            numero_quartos={imovel.numero_quartos}
                                            numero_suites={imovel.numero_suites}
                                            numero_banheiros={imovel.numero_banheiros}
                                            preco={imovel.preco}
                                            codigo={imovel.codigo}
                                            destaque={imovel.destaque as "Destaque" | "Promoção" | "Adicionado Rec." | "Não Destaque"}
                                        />
                                    ))}
                                </Carrossel>
                            ) : (
                                <div className="flex justify-center items-center">
                                    <p className="text-xl font-semibold text-gray-600">Nenhum imóvel em destaque encontrado</p>
                                </div>
                            )}
                        </div>
                    </section>
                    <section>
                        <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-28 xl:pt-32 2xl:pt-40'>
                            <div className='w-[1000px] xl:w-[800px]'>
                                <h2 className='flex justify-center text-center text-2xl lg:text-3xl xl:text-2xl font-medium pb-2 opacity-75'>{translate('imoveis_recentes')}</h2>
                                <p className='flex justify-center text-center text-xl lg:text-3xl xl:text-2xl font-medium p-3 opacity-75'>{translate('propriedades_localizacao')}</p>
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row justify-center gap-10 pt-4 xl:pt-24 pb-12'>
                            {loadingRecentes ? (
                                <div className="flex justify-center items-center">
                                    <div className="animate-spin rounded-full h-32 w-30 border-b-2 border-[#702632]"></div>
                                </div>
                            ) : imoveisRecentes.length > 0 ? (
                                imoveisRecentes.slice(0, 3).map((imovel) => (
                                    <Card
                                        key={imovel.id}
                                        titulo={imovel.titulo}
                                        cidade={imovel.cidade}
                                        numero_quartos={imovel.numero_quartos}
                                        numero_suites={imovel.numero_suites}
                                        numero_banheiros={imovel.numero_banheiros}
                                        preco={imovel.preco}
                                        codigo={imovel.codigo}
                                        destaque={imovel.destaque as "Destaque" | "Promoção" | "Adicionado Rec." | "Não Destaque"}
                                    />
                                ))
                            ) : (
                                <div className="flex justify-center items-center">
                                    <p className="text-xl font-semibold text-gray-600">Nenhum imóvel recente encontrado</p>
                                </div>
                            )}
                        </div>
                    </section>
                    <section>
                        <div className='flex items-center justify-center sm:items-center sm:justify-center md:justify-around pt-28 xl:pt-32 2xl:pt-40'>
                            <div className='w-[1000px] xl:w-[800px]'>
                                <h2 className='flex justify-center text-center text-2xl lg:text-3xl xl:text-2xl font-medium pb-2 opacity-75'>{translate('imoveis_promocao')}</h2>
                                <p className='flex justify-center text-center text-xl lg:text-3xl xl:text-2xl font-medium p-3 opacity-75'>{translate('propriedades_localizacao')}</p>
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row justify-center gap-10 pt-4 xl:pt-24 pb-12'>
                            {loadingPromocao ? (
                                <div className="flex justify-center items-center">
                                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#702632]"></div>
                                </div>
                            ) : imoveisPromocao.length > 0 ? (
                                imoveisPromocao.slice(0, 3).map((imovel) => (
                                    <Card
                                        key={imovel.id}
                                        titulo={imovel.titulo}
                                        cidade={imovel.cidade}
                                        numero_quartos={imovel.numero_quartos}
                                        numero_suites={imovel.numero_suites}
                                        numero_banheiros={imovel.numero_banheiros}
                                        preco={imovel.preco}
                                        codigo={imovel.codigo}
                                        destaque={imovel.destaque as "Destaque" | "Promoção" | "Adicionado Rec." | "Não Destaque"}
                                    />
                                ))
                            ) : (
                                <div className="flex justify-center items-center">
                                    <p className="text-xl font-semibold text-gray-600">Nenhum imóvel em promoção encontrado</p>
                                </div>
                            )}
                        </div>
                    </section>
                </section>
             
                <footer className='bg-[#6d2431]'>
                    <div className="relative flex h-[600px] md:h-[400px] lg:h-[300px] xl:h-[300px] w-full mx-auto overflow-hidden pb-44 pt-0 lg:pt-14 lg:pb-44">
                        <Image src="/paginaInicial/fotosDamainEfotter/PreFotterInicial.png" alt="Fundo Vermelho" layout="fill" objectFit="cover" quality={100} className="absolute top-[-50px] lg:top-[-30px]" />
                        <div className="relative inset-0 flex flex-col md:flex-row 2xl:flex-row items-center justify-center sm:items-center sm:justify-center md:justify-around self-center 2xl:items-start text-white p-8 mx-auto gap-10 lg:gap-20 xl:gap-32">
                            <div className='flex text-center items-center gap-7'>
                                <Image
                                    src="/paginaInicial/inconeImoveisACV/imoveisCadastros.png"
                                    alt="imoveis Cadastrados" objectFit="cover"
                                    width={70} height={74} quality={100} />
                                <div className='flex flex-col text-start'>
                                    <ImoveisDisponiveis />
                                </div>
                            </div>

                            <div className='flex text-center items-center gap-7'>
                                <Image src="/paginaInicial/inconeImoveisACV/imoveisVendidos.png"
                                    alt="Imoveis Vendidos" objectFit="cover"
                                    width={70} height={74} quality={100} />
                                <div className='flex flex-col text-start'>
                                    <ImoveisVendidos />
                                </div>
                            </div>

                            <div className='flex text-center items-center gap-7'>
                                <Image src="/paginaInicial/inconeImoveisACV/imoveisAlugados.png"
                                    alt="Imoveis Alugados" objectFit="cover"
                                    width={70} height={74} quality={100} />
                                <div className='flex flex-col text-start'>
                                    <ImoveisAlugados />
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div className='relative md:-mt-[80px] lg:-mt-[60px] xl:-mt-[50px]'>
                        <Footer />
                    </div>
                </footer>
            </div>
        </LoadingWrapper>
    );
}

