import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

export function Footer() {
    return (
        <footer className="font-montserrat bg-[#1D1D1D] relative text-white overflow-hidden">
            <section className="flex flex-col xl:flex-row p-6 md:p-8 lg:p-12 xl:p-16 pt-16 md:pt-16 lg:pt-20 xl:pt-24 gap-10 xl:gap-20 relative z-10"> {/* Adicionado z-10 aqui */}

                {/* Bloco de Informações */}
                <div className="flex flex-col items-start z-20"> {/* Adicionado z-20 aqui */}
                    <p className="text-xl xl:text-2xl font-extrabold">Informações</p>
                    <p className="font-light text-sm md:text-base xl:max-w-[450px]">
                        Nosso objetivo é fornecer soluções imobiliárias de alta qualidade, garantindo satisfação e confiança em cada transação.
                    </p>
                    <div className="flex gap-6 pt-6">
                        <Link href="https://facebook.com" target="_blank">
                            <img src="/iconFooter/facebook.png" alt="facebook" className='w-7 h-7 md:w-7 md:h-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10' />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank">
                            <img src="/iconFooter/linkedin.png" alt="linkedin" className='w-7 h-7 md:w-7 md:h-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10' />
                        </Link>
                        <Link href="https://instagram.com" target="_blank">
                            <img src="/iconFooter/instagram.png" alt="instagram" className='w-7 h-7 md:w-7 md:h-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10' />
                        </Link>
                        <Link href="https://whatsapp.com" target="_blank">
                            <img src="/iconFooter/zap.png" alt="whatsapp" className='w-7 h-7 md:w-7 md:h-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10' />
                        </Link>
                    </div>
                </div>

                <div className="z-20"> {/* Adicionado z-20 aqui */}
                    {/* Bloco de Links */}
                    <div className="flex flex-wrap gap-24 md:gap-20 xl:gap-36">
                        {/* Serviços */}
                        <div className="flex flex-col gap-3">
                            <p className="text-xl xl:text-2xl font-extrabold">Serviços</p>
                            <div className="font-light text-sm md:text-base flex flex-col gap-2">
                                <p><a href="#">Avaliações</a></p>
                                <p><a href="#">Consultoria</a></p>
                                <p><a href="#">Regularização</a></p>
                                <p><a href="#">Investimentos</a></p>
                            </div>
                        </div>

                        {/* Contato */}
                        <div className="flex flex-col gap-3">
                            <p className="text-xl xl:text-2xl font-extrabold">Contato</p>
                            <div className="font-light text-sm md:text-base flex flex-col gap-2">
                                <p><a href="#">Suporte</a></p>
                                <p><a href="#">Atendimento</a></p>
                                <p><a href="#">FAQ</a></p>
                                <p><a href="#">Reclame Aqui</a></p>
                            </div>
                        </div>

                        {/* Links Rápidos */}
                        <div className="flex flex-col gap-3">
                            <p className="text-xl xl:text-2xl font-extrabold">Links Rápidos</p>
                            <div className="font-light text-sm md:text-base flex flex-col gap-2">
                                <p><a href="/PaginaInicial">Página Inicial</a></p>
                                <p><a href="/sobreNos">Sobre Nós</a></p>
                                <p><a href="#">Comprar</a></p>
                                <p><a href="#">Vender</a></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Imagem posicionada no canto direito */}
                <Image
                    src="/iconFooter/imagemFooterLogo.png"
                    alt="Imagem Imóvel"
                    width={466}
                    height={490}
                    className="absolute bottom-20 sm:bottom-10 md:-bottom-2 lg:-bottom-20 2xl:-bottom-20 -right-56 xl:-right-44 md:block z-0" // Alterado para z-0
                />
            </section>

            {/* Rodapé */}
            <section className="relative bg-[#2B2A28] text-white py-4 px-4 flex justify-center items-center z-20"> {/* Adicionado z-20 aqui */}
                <p className="text-center text-xs md:text-sm lg:text-base">
                    <span className="hidden lg:inline">
                        © 2024 HAV Imobiliária. Todos os direitos reservados. Este site é protegido por direitos autorais. Reprodução ou distribuição não autorizada é proibida. Termos de Uso | Política de Privacidade | Política de Cookies.
                    </span>
                    <span className="lg:hidden">
                        © 2024 HAV Imobiliária. Todos os direitos reservados.
                    </span>
                </p>
            </section>
        </footer>
    );
}