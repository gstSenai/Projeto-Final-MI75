import { Montserrat } from 'next/font/google';

// Carregando a fonte Inter
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <>
            <div>
                <div className={`${montserrat.className} flex place-content-between bg-[#1D1D1D] max-h-[285px]`}>
                    <div className='text-white pt-[60px] pl-[30px] max-w-[27%]'>
                        <h2 className='text-[20px] font-extrabold'>Informações</h2>
                        <p className='text-[12px] pt-[5px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                        <div className='flex gap-8 pt-8'>
                            <Link href="https://facebook.com" target="_blank">
                                <Image src="/iconsFooter/facebookImage.png" alt='facebook' width={28} height={28} />
                            </Link>
                            <Link href="https://linkedin.com" target="_blank">
                                <Image src="/iconsFooter/linkedinImage.png" alt='facebook' width={28} height={28} />
                            </Link>
                            <Link href="https://instagram.com" target="_blank">
                                <Image src="/iconsFooter/instagramImage.png" alt='facebook' width={28} height={28} />
                            </Link>
                            <Link href="https://whatsapp.com" target="_blank">
                                <Image src="/iconsFooter/whatsappImage.png" alt='facebook' width={28} height={28} />
                            </Link>
                        </div>
                    </div>
                    <div className='flex gap-10 mr-8'>
                        <div className='text-white pt-[60px] pl-[30px] max-w-[46%] flex flex-col gap-1'>
                            <h2 className='text-[20px] font-extrabold'>Serviços</h2>
                            <a href="#" className="text-white hover:underline">Avaliações</a>
                            <a href="#" className="text-white hover:underline">Consultoria</a>
                            <a href="#" className="text-white hover:underline">Regularização</a>
                            <a href="#" className="text-white hover:underline">Investimentos</a>
                        </div>
                        <div className='text-white pt-[60px] pl-[30px] max-w-[46%] flex flex-col gap-1'>
                            <h2 className='text-[20px] font-extrabold'>Contato</h2>
                            <a href="#" className="text-white hover:underline">Suporte</a>
                            <a href="#" className="text-white hover:underline">Atendimento</a>
                            <a href="#" className="text-white hover:underline">FAQ</a>
                            <a href="#" className="text-white hover:underline">Reclame Aqui</a>
                        </div>
                        <div className='text-white pt-[60px] pl-[30px] max-w-[46%] flex flex-col gap-1'>
                            <h2 className='text-[20px] font-extrabold'>Links Rápidos</h2>
                            <a href="#" className="text-white hover:underline">Página Inicial</a>
                            <a href="#" className="text-white hover:underline">Sobre Nós</a>
                            <a href="#" className="text-white hover:underline">Comprar</a>
                        </div>
                    </div>
                    <div>
                        <Image src="/iconsFooter/logoFooter.png" alt='logo footer' width={285} height={285} />
                    </div>
                </div>
                <div className={`${montserrat.className} flex bg-[#1D1D1D] opacity-90 h-[40px] items-center justify-center`}>
                    <p className='text-white text-[11px]'>© 2024 HAV Imobiliária. Todos os direitos reservados. Este site é protegido por direitos autorais. Reprodução ou distribuição não autorizada é proibida. Termos de Uso | Política de Privacidade | Política de Cookies.</p>
                </div>
            </div>
        </>
    )
}