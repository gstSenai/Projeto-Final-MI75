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
            <section className="flex flex-col xl:flex-row p-6 md:p-8 lg:p-12 xl:p-16 pt-16 md:pt-16 lg:pt-20 xl:pt-24  gap-10 xl:gap-20 relative">

                {/* Bloco de Informações */}
                <div className="flex flex-col items-start">
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

                {/* Bloco de Links */}
                <div className="flex flex-wrap gap-8 md:gap-20 xl:gap-36">
                    {/* Serviços */}
                    <div className='flex gap-20 md:gap-20 xl:gap-36'>
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
                    </div>
                    {/* Links Rápidos */}
                    <div className="flex flex-col gap-3">
                        <p className="text-xl xl:text-2xl font-extrabold">Links Rápidos</p>
                        <div className="font-light text-sm md:text-base flex flex-col gap-2">
                            <p><a href="#">Página Inicial</a></p>
                            <p><a href="#">Sobre Nós</a></p>
                            <p><a href="#">Comprar</a></p>
                            <p><a href="#">Vender</a></p>
                        </div>
                    </div>
                </div>

                {/* Imagem posicionada no canto direito */}
                <Image
                    src="/iconFooter/imagemFooterLogo.png"
                    alt="Imagem Imóvel"
                    width={466}
                    height={490}
                    className="absolute  bottom-2 -right-60 xl:-bottom-20 xl:-right-44 md:block"
                />

            </section>

            {/* Rodapé */}
            <section className="relative bg-[#2B2A28]  text-white py-4 px-4 flex justify-center items-center">

                <p className="text-center text-xs md:text-sm lg:text-base">
                    © 2024 HAV Imobiliária. Todos os direitos reservados. Este site é protegido por direitos autorais. Reprodução ou distribuição não autorizada é proibida. Termos de Uso | Política de Privacidade | Política de Cookies.
                </p>
            </section>
        </footer>
    );
}



/*
 <footer className="font-montserrat bg-[#000000]/80 h-[450px] relative">
                <div className="flex justify-between">
                    <section className="pt-24 pl-10 pr-10 flex flex-row gap-32">
                        <div className="text-white flex flex-col gap-3">
                            <p className="text-xl xl:text-2xl 2xl:text-3xl font-extrabold">Informações</p>
                            <p className="font-light lg:text-[0.9rem] xl:text-2xl xl:min-w-[400px] xl:max-w-[585px]">Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                            <div className='flex gap-8 pt-8'>
                                <Link href="https://facebook.com" target="_blank">
                                    <img src="/iconFooter/facebook.png" alt='facebook' className='' />
                                </Link>
                                <Link href="https://linkedin.com" target="_blank">
                                    <img src="/iconFooter/linkedin.png" alt='facebook' className='' />
                                </Link>
                                <Link href="https://instagram.com" target="_blank">
                                    <img src="/iconFooter/instagram.png" alt='facebook' className='' />
                                </Link>
                                <Link href="https://whatsapp.com" target="_blank">
                                    <img src="/iconFooter/zap.png" alt='facebook' className='' />
                                </Link>
                            </div>
                        </div>
                        <div className="text-white lg:flex lg:flex-col lg:gap-3 whitespace-nowrap">
                            <p className="lg:text-2xl text-xl xl:text-3xl font-extrabold">Serviços</p>
                            <div className="font-light lg:flex lg:flex-col lg:gap-3 gap-2 text-[0.9rem]">
                                <p className='lg:text-xl xl:text-2xl'><a href="#">Avaliações</a></p>
                                <p className='lg:text-xl xl:text-2xl'><a href="#">Consultoria</a></p>
                                <p className='lg:text-xl xl:text-2xl'><a href="#">Regularização</a></p>
                                <p className='lg:text-xl xl:text-2xl'><a href="#">Investimentos</a></p>
                            </div>
                        </div>
                        <div className="text-white flex flex-col gap-3 whitespace-nowrap">
                            <p className="lg:text-2xl text-xl  xl:text-3xl font-extrabold">Contato</p>
                            <div className="font-light lg:flex lg:flex-col lg:gap-3 gap-2 text-[0.9rem]">
                                <p className='lg:text-xl xl:text-2xl'><a href="#">Suporte</a></p>
                                <p className='lg:text-xl xl:text-2xl'><a href="#">Atendimento</a></p>
                                <p className='lg:text-xl xl:text-2xl'><a href="#">FAQ</a></p>
                                <p className='lg:text-xl xl:text-2xl'><a href="#">Reclame aqui</a></p>
                            </div>
                        </div>
                        <div className="text-white flex flex-col gap-3 z-10 whitespace-nowrap">
                            <p className="lg:text-2xl text-xl xl:text-3xl font-extrabold">Links Rápidos</p>
                            <div className="font-light lg:flex lg:flex-col lg:gap-3 gap-2 text-[0.9rem]">
                                <p className='lg:text-xl xl:text-2xl'><a href="#">Página inicial</a></p>
                                <p className='lg:text-xl xl:text-2xl'><a href="#">Sobre nós</a></p>
                                <p className='lg:text-xl xl:text-2xl'><a href="#">Comprar</a></p>
                                <p className='lg:text-xl xl:text-2xl'><a href="#">Vender</a></p>
                            </div>
                        </div>
                    </section>
                    <div className="flex right-0 absolute top-0  lg:p-[2px]">
                        <img src="/iconFooter/imagemFooterLogo.png" alt="Imagem footer" className="object-cover" />
                    </div>
                </div>

                <div className="flex justify-center items-center bg-black h-[50px] w-full absolute bottom-0 lg:px-auto">
                    <p className="text-white text-center text-[0.9rem] lg:text-base">© 2024 HAV Imobiliária. Todos os direitos reservados.
                        Este site é
                        protegido por direitos autorais.
                        Reprodução ou distribuição não autorizada é proibida.
                        Termos de Uso | Política de Privacidade | Política de Cookies.</p>
                </div>
            </footer>
*/