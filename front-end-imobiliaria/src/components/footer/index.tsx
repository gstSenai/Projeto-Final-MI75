import { Montserrat } from 'next/font/google';
import Link from 'next/link';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

export function Footer() {
    return (
        <>
            <footer className="font-montserrat bg-[#000000]/80 max-lg:h-[1000px] h-[450px] relative">
                <div className="flex justify-between">
                    <section className="pt-24 px-10 max-lg:px-20  max-sm:px-8 flex flex-row max-lg:flex-col max-xl:gap-16 max-2xl:gap-20 gap-32">
                        <div className="text-white flex flex-col gap-3">
                            <p className="text-3xl font-extrabold">Informações</p>
                            <p className="font-light text-xl xl:text-2xl xl:min-w-[400px] xl:max-w-[585px] max-sm:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                            <div className='flex max-sm:gap-10 max-lg:gap-12 gap-8 pt-8'>
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
                        <div className='flex max-lg:justify-between max-md:gap-10 max-sm:gap-5 max-xl:gap-16 max-2xl:gap-20 gap-32'>
                            <div className="text-white lg:flex lg:flex-col lg:gap-3 whitespace-nowrap">
                                <p className="text-2xl xl:text-3xl font-extrabold  mb-3">Serviços</p>
                                <div className="font-light lg:flex lg:flex-col gap-3 text-xl ">
                                    <p className='max-sm:text-base lg:text-xl xl:text-2xl max-lg:mb-3'><a href="#">Avaliações</a></p>
                                    <p className='max-sm:text-base lg:text-xl xl:text-2xl max-lg:mb-3'><a href="#">Consultoria</a></p>
                                    <p className='max-sm:text-base lg:text-xl xl:text-2xl max-lg:mb-3'><a href="#">Regularização</a></p>
                                    <p className='max-sm:text-base lg:text-xl xl:text-2xl max-lg:mb-3'><a href="#">Investimentos</a></p>
                                </div>
                            </div>
                            <div className="text-white flex flex-col gap-3 whitespace-nowrap">
                                <p className="text-2xl xl:text-3xl font-extrabold">Contato</p>
                                <div className="font-light lg:flex lg:flex-col gap-3 text-xl ">
                                    <p className='max-sm:text-base lg:text-xl xl:text-2xl max-lg:mb-3'><a href="#">Suporte</a></p>
                                    <p className='max-sm:text-base lg:text-xl xl:text-2xl max-lg:mb-3'><a href="#">Atendimento</a></p>
                                    <p className='max-sm:text-base lg:text-xl xl:text-2xl max-lg:mb-3'><a href="#">FAQ</a></p>
                                    <p className='max-sm:text-base lg:text-xl xl:text-2xl max-lg:mb-3'><a href="#">Reclame aqui</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="text-white flex flex-col gap-3 z-10 whitespace-nowrap">
                            <p className="text-2xl xl:text-3xl font-extrabold">Links Rápidos</p>
                            <div className="font-light lg:flex lg:flex-col gap-3 text-xl">
                                <p className='max-sm:text-base lg:text-xl xl:text-2xl max-lg:mb-3'><a href="#">Página inicial</a></p>
                                <p className='max-sm:text-base lg:text-xl xl:text-2xl max-lg:mb-3'><a href="#">Sobre nós</a></p>
                                <p className='max-sm:text-base lg:text-xl xl:text-2xl max-lg:mb-3'><a href="#">Comprar</a></p>
                                <p className='max-sm:text-base lg:text-xl xl:text-2xl max-lg:mb-3'><a href="#">Vender</a></p>
                            </div>
                        </div>
                    </section>
                    <div className="flex right-0 absolute top-0 lg:p-[2px] max-lg:transform max-lg:translate-y-[300px] max-md:translate-y-[350px] max-sm:translate-y-[400px]">
                        <img src="/iconFooter/imagemFooterLogo.png" alt="Imagem footer" className="object-cover" />
                    </div>
                </div>

                <div className="flex justify-center items-center bg-black h-[50px] w-full absolute bottom-0 lg:px-10">
                    <p className="text-white text-center max-lg:text-sm lg:text-base max-lg:hidden">© 2024 HAV Imobiliária. Todos os direitos reservados.
                        Este site é
                        protegido por direitos autorais.
                        Reprodução ou distribuição não autorizada é proibida.
                        Termos de Uso | Política de Privacidade | Política de Cookies.</p>
                        <p className='text-white text-center max-lg:text-sm lg:text-base lg:hidden'>© 2024 HAV Imobiliária. Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    )
}