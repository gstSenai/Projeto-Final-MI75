import { Montserrat } from "next/font/google";
import { Footer } from '@/components/footer';
import { Header } from "@/components/header";
import { LoadingWrapper } from "@/components/loading/loadingServer";
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800', '900'],
    display: 'swap',
});

export default function Sobre() {
    return (
        <LoadingWrapper>
            <Header />
            <div className={`p-1 md: bg-[#DFDAD0] min-h-screen flex flex-col items-center ${montserrat.className}`}>

                <div className=" md: relative w-full max-w-6xl mb-12 p-6">
                    <div className="w-full md: relative rounded-lg overflow-hidden">
                        <img
                            src="/imgSobreNos/capa.png"
                            alt="Sobre nós"
                            className="h-[500px] md:w-max object-cover "
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
                        <div className="absolute inset-0 flex items-center p-6">
                            <div className="justify-start text-white md:text-white max-w-md  md:ml-14">
                                <h2 className="ml-7 text-[40px] font-black mb-6">Sobre nós</h2>
                                <p className="ml-5 text-balance text-[15px] md:w-96">
                                    Apaixonados por qualidade e inovação.
                                    Criamos experiências autênticas, unindo compromisso e excelência para oferecer o melhor a você.                        </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" w-full max-w-6xl p-6  font-montserrat">

                    <div className="flex flex-col md:flex-row items-center gap-14 mb-28">
                        <img
                            src="/imgSobreNos/missoes.png"
                            alt="Missão"
                            className="w-full md:w-[50%] rounded-lg shadow-md"
                        />
                        <div>
                            <h2 className="text-[30px] font-bold mb-2">Missões</h2>
                            <p className="text-black md:w-[100%] lg:w-[90%]">
                                Nossa missão na HAV Imobiliária é conectar pessoas aos seus sonhos de moradia, oferecendo soluções personalizadas e um atendimento transparente. Buscamos simplificar o processo de compra, venda e locação de imóveis, garantindo segurança jurídica e satisfação em cada negociação. Atuamos com ética, expertise de mercado e compromisso social para construir relacionamentos duradouros com nossos clientes.</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row-reverse items-center gap-14 mb-28">
                        <img
                            src="/imgSobreNos/visao.png"
                            alt="Visão"
                            className="w-full md:w-[50%] rounded-lg shadow-md"
                            width={100}
                            height={100}
                        />
                        <div>
                            <h2 className="text-[30px] font-bold mb-2">Visão</h2>
                            <p className="text-black md:w-[100%] lg:w-[90%]">
                                Almejamos ser reconhecidos como a imobiliária de referência em Jaraguá do Sul e região, destacando-nos pela excelência no atendimento, inovação tecnológica e conhecimento profundo do mercado imobiliário. Nossa visão é expandir nossas operações mantendo os valores de integridade, profissionalismo e atenção às reais necessidades de cada cliente, tornando-nos parceiros confiáveis em todas as etapas da jornada imobiliária.</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="text-left leading-[30px] text-black">
                            <h2 className="text-[30px] font-bold mb-2">Sede da HAV Imobiliária</h2>
                            <p>HAV Imobiliária</p>
                            <p>Centro, Jaraguá do Sul</p>
                            <p>CEP 89253-030</p>
                            <p>SC, Brasil</p>
                            <p>contato@havimobiliaria.com.br</p>
                        </div>
                        <div className="flex items-center">
                            <img
                                src="/imgSobreNos/HAV.png"
                                alt="HAV Imobiliária"
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