"use client"

import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { VLibrasButton } from "@/components/VLibrasButton"
import { useLanguage } from '@/components/context/LanguageContext';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

export function Footer() {
    const { translate } = useLanguage();
    
    return (
        <footer className={`${montserrat.className} bg-[#1D1D1D] relative text-white overflow-hidden`}>
            <section className="flex flex-col xl:flex-row p-4 md:p-5 lg:p-7 xl:p-10 pt-10 md:pt-10 lg:pt-14 xl:pt-18 gap-5 xl:gap-10 relative z-10">
                {/* Bloco de Informações */}
                <div className="flex flex-col items-start z-20">
                    <p className="text-base xl:text-lg font-extrabold">{translate('footer.informacoes')}</p>
                    <p className="font-light text-xs md:text-sm xl:max-w-[320px]">
                        {translate('footer.objetivo')}
                    </p>
                    <div className="flex gap-4 pt-4">
                        <Link href="https://facebook.com" target="_blank">
                            <Image src="/iconFooter/facebook.png" alt="facebook" width={20} height={20} className='w-4 h-4 md:w-5 md:h-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7' />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank">
                            <Image src="/iconFooter/linkedin.png" alt="linkedin" width={20} height={20} className='w-4 h-4 md:w-5 md:h-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7' />
                        </Link>
                        <Link href="https://instagram.com" target="_blank">
                            <Image src="/iconFooter/instagram.png" alt="instagram" width={20} height={20} className='w-4 h-4 md:w-5 md:h-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7' />
                        </Link>
                        <Link href="https://whatsapp.com" target="_blank">
                            <Image src="/iconFooter/zap.png" alt="whatsapp" width={20} height={20} className='w-4 h-4 md:w-5 md:h-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7' />
                        </Link>
                    </div>
                </div>

                <div className="z-20">
                    {/* Bloco de Links */}
                    <div className="flex flex-wrap gap-14 md:gap-12 xl:gap-20">
                        {/* Serviços */}
                        <div className="flex flex-col gap-2">
                            <p className="text-base xl:text-lg font-extrabold">{translate('footer.servicos')}</p>
                            <div className="font-light text-xs md:text-sm flex flex-col gap-1.5">
                                <p><a href="#">{translate('footer.avaliacoes')}</a></p>
                                <p><a href="#">{translate('footer.consultoria')}</a></p>
                                <p><a href="#">{translate('footer.regularizacao')}</a></p>
                                <p><a href="#">{translate('footer.investimentos')}</a></p>
                            </div>
                        </div>

                        {/* Contato */}
                        <div className="flex flex-col gap-2">
                            <p className="text-base xl:text-lg font-extrabold">{translate('footer.contato')}</p>
                            <div className="font-light text-xs md:text-sm flex flex-col gap-1.5">
                                <p><a href="#">{translate('footer.suporte')}</a></p>
                                <p><a href="#">{translate('footer.atendimento')}</a></p>
                                <p><a href="#">{translate('footer.faq')}</a></p>
                                <p><a href="#">{translate('footer.reclameAqui')}</a></p>
                            </div>
                        </div>

                        {/* Links Rápidos */}
                        <div className="flex flex-col gap-2">
                            <p className="text-base xl:text-lg font-extrabold">{translate('footer.linksRapidos')}</p>
                            <div className="font-light text-xs md:text-sm flex flex-col gap-1.5">
                                <p><a href="/">{translate('footer.paginaInicial')}</a></p>
                                <p><a href="/sobreNos">{translate('footer.sobreNos')}</a></p>
                                <p><a href="#">{translate('footer.comprar')}</a></p>
                                <p><a href="#">{translate('footer.vender')}</a></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Imagem posicionada no canto direito */}
                <Image
                    src="/iconFooter/imagemFooterLogo.png"
                    alt="Imagem Imóvel"
                    width={300}
                    height={320}
                    className="absolute bottom-14 sm:bottom-8 md:-bottom-2 lg:-bottom-14 2xl:-bottom-14 -right-36 xl:-right-28 md:block z-0"
                />
            </section>

            {/* Rodapé */}
            <section className="relative bg-[#2B2A28] text-white py-2.5 px-2.5 flex justify-center items-center z-20">
                <p className="text-center text-[10px] md:text-xs">
                    <span className="hidden lg:inline">
                        © 2025 HAV Imobiliária. {translate('footer.direitosReservados')} <a href="/PoliticaPrivacidade">{translate('footer.termosUso')}</a> | <a href="/PoliticaPrivacidade">{translate('footer.politicaPrivacidade')}</a> | <a href="/PoliticaPrivacidade">{translate('footer.politicaCookies')}</a>   ''
                    </span>
                    <span className="lg:hidden">
                        © 2025 HAV Imobiliária. {translate('footer.direitosReservados')}
                    </span>
                </p>
            </section>
        </footer>
    );
}