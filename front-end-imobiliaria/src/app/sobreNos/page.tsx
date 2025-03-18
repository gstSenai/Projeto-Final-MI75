import { Footer } from "@/components/footer";
import { Header } from '@/components/header';
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '800'],
  display: 'swap',
});
import { Montserrat } from 'next/font/google';

export default function Sobre() {
  return (
    <div>
      <Header />
      <main className={`${montserrat.className} max-lg:px-4 px-20 py-12 sm:py-12 md:py-10 lg:py-14 xl:py-20 `}>
        <div className="relative flex h-[881px] w-full rounded-[20px] mx-auto overflow-hidden pb-24 lg:pt-14 lg:pb-52 ">
          <Image
            className='' src="/imgSobreNos/ImagemSobreNos.png" alt="cidade da Pagina do Editor" layout="fill" objectFit="cover" quality={100}
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center 2xl:items-start text-white p-8 md:pl-16 2xl:pl-32 gap-11">
            <h1 className="text-[2.5rem] md:text-[3.6rem] lg:text-[4.6rem] xl:text-[5.4rem] text-center font-extrabold 2xl:text-start max-w-[800px]">
              Sobre nós
            </h1>
            <p className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-center 2xl:text-start max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
        </div>
      </main>
      <div className={`${montserrat.className}bg-[#e3ddd6] min-h-screen flex justify-center py-12 sm:py-12 md:py-10 lg:py-14 xl:py-20 px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20`}>
        <div className={`${montserrat.className}`}>
          {/* Missões */}
          <div className="flex flex-col md:flex-row items-center gap-14 mb-28">
            <img
              src="imgSobreNos/missoes.png"
              alt="Missão"
              className="w-full md:w-[50%] h-auto md:h-[500px] rounded-lg shadow-md object-cover"
            />
            <div>
              <h2 className=" text-3xl lg:text-4xl xl:text-6xl font-bold pb-4">Missões</h2>
              <p className="text-black font-normal sm:text-lg md:text-xl lg:text-2xl xl:text-[1.75rem]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            </div>
          </div>

          {/* Visão */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-14 mb-8 ">
            <img
              src="/imgSobreNos/visao.png"
              alt="Visão"
              className="w-full md:w-[50%] h-auto md:h-[500px] rounded-lg shadow-md object-cover"
            />
            <div>
              <h2 className=" text-3xl lg:text-4xl xl:text-6xl font-bold pb-4">Visão</h2>
              <p className="text-black font-normal sm:text-lg md:text-xl lg:text-2xl xl:text-[1.75rem]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
            </div>
          </div>

          {/* Sede */}
          <div className="text-left mt-20 leading-[30px] text-black">
            <h2 className=" text-3xl lg:text-4xl xl:text-6xl font-bold pb-4">Sede da HAV Imobiliária</h2>
            <div className="text-black font-normal sm:text-lg md:text-xl lg:text-2xl xl:text-[1.75rem]">
              <p className="pb-4">HAV Imobiliária</p>
              <p className="pb-4">Centro, Jaraguá do Sul</p>
              <p className="pb-4">CEP 89253-030</p>
              <p className="pb-4">SC, Brasil</p>
              <p>contato@havimobiliaria.com.br</p>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
