import Link from 'next/link';

export function Footer() {
    return (
        <>
            <footer className="font-montserrat bg-[#000000]/80 h-[450px] relative">
                <div className="flex justify-between">
                    <section className="pt-24 pl-10 pr-10 flex flex-row gap-32">
                        <div className="text-white flex flex-col gap-3">
                            <p className="text-xl lg:text-2xl 2xl:text-4xl font-extrabold">Informações</p>
                            <p className="font-light lg:text-[0.9rem] xl:text-2xl xl:max-w-[585px]">Lorem ipsum dolor sit amet, consectetur adipiscing
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
                        <div className="text-white lg:flex lg:flex-col lg:gap-3">
                            <p className="lg:text-2xl text-xl font-extrabold">Serviços</p>
                            <div className="font-light lg:flex lg:flex-col lg:gap-3 gap-2 text-[0.9rem]">
                                <p><a href="#">Avaliações</a></p>
                                <p><a href="#">Consultoria</a></p>
                                <p><a href="#">Regularização</a></p>
                                <p><a href="#">Investimentos</a></p>
                            </div>
                        </div>
                        <div className="text-white flex flex-col gap-3">
                            <p className="lg:text-2xl text-xl font-extrabold">Contato</p>
                            <div className="font-light lg:flex lg:flex-col lg:gap-3 gap-2 text-[0.9rem]">
                                <p><a href="#">Suporte</a></p>
                                <p><a href="#">Atendimento</a></p>
                                <p><a href="#">FAQ</a></p>
                                <p><a href="#">Reclame aqui</a></p>
                            </div>
                        </div>
                        <div className="text-white flex flex-col gap-3 z-10">
                            <p className="lg:text-2xl text-xl font-extrabold">Links Rápidos</p>
                            <div className="font-light lg:flex lg:flex-col lg:gap-3 gap-2 text-[0.9rem]">
                                <p><a href="#">Página inicial</a></p>
                                <p><a href="#">Sobre nós</a></p>
                                <p><a href="#">Comprar</a></p>
                                <p><a href="#">Vender</a></p>
                            </div>
                        </div>
                    </section>
                    <div className="flex right-0 absolute top-0  lg:p-[2px]">
                        <img src="/iconFooter/imagemFooterLogo.png" alt="Imagem footer" className="object-cover" />
                    </div>
                </div>

                <div className="flex justify-center items-center bg-black h-[50px] w-full absolute bottom-0 lg:px-10">
                    <p className="text-white text-center text-[0.9rem] lg:text-base">© 2024 HAV Imobiliária. Todos os direitos reservados.
                        Este site é
                        protegido por direitos autorais.
                        Reprodução ou distribuição não autorizada é proibida.
                        Termos de Uso | Política de Privacidade | Política de Cookies.</p>
                </div>
            </footer>
        </>
    )
}