"use client"

import { Montserrat } from "next/font/google";
import { Footer } from '@/components/footer';
import { Header } from "@/components/header";
import { LoadingWrapper } from "@/components/loading/loadingServer";
import { useLanguage } from '@/components/context/LanguageContext';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800', '900'],
    display: 'swap',
});

export default function Sobre() {
    const { translate } = useLanguage();
    
    return (
        <LoadingWrapper>
            <Header />
            <div className={`p-1 md: bg-[#DFDAD0] min-h-screen flex flex-col items-center ${montserrat.className}`}>

                <div className=" md: relative w-full max-w-6xl mb-12 p-6">
                    <div className="w-full md: relative rounded-lg overflow-hidden">
                        <img
                            src="/imgSobreNos/capa.png"
                            alt={translate('sobre_nos.titulo')}
                            className="h-[500px] md:w-max object-cover "
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
                        <div className="absolute inset-0 flex items-center p-6">
                            <div className="justify-start text-white md:text-white max-w-md  md:ml-14">
                                <h2 className="ml-7 text-[40px] font-black mb-6">{translate('sobre_nos.titulo')}</h2>
                                <p className="ml-5 text-balance text-[15px] md:w-96">
                                    {translate('sobre_nos.subtitulo')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" w-full max-w-6xl p-6  font-montserrat">

                    <div className="flex flex-col md:flex-row items-center gap-14 mb-28">
                        <img
                            src="/imgSobreNos/missoes.png"
                            alt={translate('sobre_nos.missoes.titulo')}
                            className="w-full md:w-[50%] rounded-lg shadow-md"
                        />
                        <div>
                            <h2 className="text-[30px] font-bold mb-2">{translate('sobre_nos.missoes.titulo')}</h2>
                            <p className="text-black md:w-[100%] lg:w-[90%]">
                                {translate('sobre_nos.missoes.texto')}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row-reverse items-center gap-14 mb-28">
                        <img
                            src="/imgSobreNos/visao.png"
                            alt={translate('sobre_nos.visao.titulo')}
                            className="w-full md:w-[50%] rounded-lg shadow-md"
                            width={100}
                            height={100}
                        />
                        <div>
                            <h2 className="text-[30px] font-bold mb-2">{translate('sobre_nos.visao.titulo')}</h2>
                            <p className="text-black md:w-[100%] lg:w-[90%]">
                                {translate('sobre_nos.visao.texto')}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="text-left leading-[30px] text-black">
                            <h2 className="text-[30px] font-bold mb-2">{translate('sobre_nos.sede.titulo')}</h2>
                            <p>{translate('sobre_nos.sede.nome')}</p>
                            <p>{translate('sobre_nos.sede.endereco')}</p>
                            <p>{translate('sobre_nos.sede.cep')}</p>
                            <p>{translate('sobre_nos.sede.estado')}</p>
                            <p>{translate('sobre_nos.sede.email')}</p>
                        </div>
                        <div className="flex items-center">
                            <img
                                src="/imgSobreNos/HAV.png"
                                alt={translate('sobre_nos.sede.nome')}
                                className="w-48 h-48"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </LoadingWrapper>
    );
}