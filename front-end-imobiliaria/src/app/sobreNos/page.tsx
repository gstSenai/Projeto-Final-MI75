import { Montserrat } from "next/font/google";
import { Footer } from '@/components/footer';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800', '900'],
    display: 'swap',
});

export default function Sobre() {
    return (
        <div className="bg-[#DFDAD0] min-h-screen flex flex-col items-center p-6 font-montserrat">

            <div className="relative w-full max-w-6xl mb-12 p-6">
                <div className="relative rounded-lg overflow-hidden">
                    <img 
                        src="/imgSobreNos/capa.png" 
                        alt="Sobre nós"
                        className="w-max h-max object-cover "
                    />
                    <div className="absolute inset-0 flex items-center p-6">
                        <div className="text-white max-w-md ml-14 ">
                            <h2 className="text-[40px] font-black mb-6">Sobre nós</h2>
                            <p className="text-[15px] w-72">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.        
                        </p>
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
                        <p className="text-black">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse items-center gap-14 mb-28">
                    <img
                        src="/imgSobreNos/visao.png"
                        alt="Visão"
                        className="w-full md:w-[50%] rounded-lg shadow-md"
                    />
                    <div>
                        <h2 className="text-[30px] font-bold mb-2">Visão</h2>
                        <p className="text-black">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.                        </p>
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
    );
}
