"use client";

import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { VLibrasButton } from "@/components/VLibrasButton";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '800'],
  display: 'swap',
});

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${montserrat.className} bg-[#1D1D1D] relative text-white overflow-hidden`}>
      <section className="flex flex-col xl:flex-row p-4 md:p-5 lg:p-7 xl:p-10 pt-10 gap-5 xl:gap-10 relative z-10">
        {/* Bloco de Informações */}
        <div className="flex flex-col items-start z-20">
          <p className="text-base xl:text-lg font-extrabold">Informações</p>
          <p className="font-light text-xs md:text-sm xl:max-w-[320px]">
            Nosso objetivo é fornecer soluções imobiliárias de alta qualidade, garantindo satisfação e confiança em cada transação.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="https://facebook.com" target="_blank">
              <Image src="/iconFooter/facebook.png" alt="facebook" width={20} height={20} className="w-5 h-5 xl:w-7 xl:h-7" />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <Image src="/iconFooter/linkedin.png" alt="linkedin" width={20} height={20} className="w-5 h-5 xl:w-7 xl:h-7" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Image src="/iconFooter/instagram.png" alt="instagram" width={20} height={20} className="w-5 h-5 xl:w-7 xl:h-7" />
            </Link>
            <Link href="https://whatsapp.com" target="_blank">
              <Image src="/iconFooter/zap.png" alt="whatsapp" width={20} height={20} className="w-5 h-5 xl:w-7 xl:h-7" />
            </Link>
          </div>
        </div>

        {/* Bloco de Links */}
        <div className="z-20">
          <div className="flex flex-wrap gap-14 md:gap-12 xl:gap-20">
            {/* Serviços */}
            <div className="flex flex-col gap-2">
              <p className="text-base xl:text-lg font-extrabold">Serviços</p>
              <div className="font-light text-xs md:text-sm flex flex-col gap-1.5">
                <Link href="#">Avaliações</Link>
                <Link href="#">Consultoria</Link>
                <Link href="#">Regularização</Link>
                <Link href="#">Investimentos</Link>
              </div>
            </div>

            {/* Contato */}
            <div className="flex flex-col gap-2">
              <p className="text-base xl:text-lg font-extrabold">Contato</p>
              <div className="font-light text-xs md:text-sm flex flex-col gap-1.5">
                <Link href="#">Suporte</Link>
                <Link href="#">Atendimento</Link>
                <Link href="#">FAQ</Link>
                <Link href="#">Reclame Aqui</Link>
              </div>
            </div>

            {/* Links Rápidos */}
            <div className="flex flex-col gap-2">
              <p className="text-base xl:text-lg font-extrabold">Links Rápidos</p>
              <div className="font-light text-xs md:text-sm flex flex-col gap-1.5">
                <Link href="/">Página Inicial</Link>
                <Link href="/sobreNos">Sobre Nós</Link>
                <Link href="#">Comprar</Link>
                <Link href="#">Vender</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Imagem decorativa */}
        <Image
          src="/iconFooter/imagemFooterLogo.png"
          alt="Imagem Imóvel"
          width={300}
          height={320}
          className="absolute bottom-14 sm:bottom-8 md:-bottom-2 lg:-bottom-14 2xl:-bottom-14 -right-36 xl:-right-28 z-0"
        />
      </section>

      {/* Rodapé final */}
      <section className="relative bg-[#2B2A28] text-white py-2.5 px-2.5 flex justify-center items-center z-20 text-center">
        <div className="text-[10px] md:text-xs space-y-1">
          <p className="lg:hidden">
            &copy; {currentYear} HAV Imóveis. Todos os direitos reservados.
          </p>
          <p className="hidden lg:inline">
            &copy; {currentYear} HAV Imobiliária. Todos os direitos reservados. Este site é protegido por direitos autorais. Reprodução ou distribuição não autorizada é proibida.{' '}
            <Link href="/PoliticaPrivacidade">Termos de Uso</Link> |{' '}
            <Link href="/PoliticaPrivacidade">Política de Privacidade</Link> |{' '}
            <Link href="/PoliticaPrivacidade">Política de Cookies</Link>.
          </p>
        </div>
      </section>
    </footer>
  );
}
