import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Sobre() {
  return (
    <>
      <Header />

      <div className="bg-[#DFDAD0] min-h-screen flex justify-center p-6 ">
        <div className="max-w-4xl w-full  p-6  ">
          {/* Missões */}
          <div className="flex flex-col md:flex-row items-center gap-14 mb-28">
            <img
              src="imgSobreNos/missoes.png"
              alt="Missão"
              className="w-full md:w-[50%] rounded-lg shadow-md"
            />
            <div>
              <h2 className="text-[30px] font-bold mb-2">Missões</h2>
              <p className="text-black">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.              </p>
            </div>
          </div>

          {/* Visão */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-14 mb-8 ">
            <img
              src="/imgSobreNos/visao.png"
              alt="Visão"
              className="w-full md:w-[50%] rounded-lg shadow-md"
            />
            <div>
              <h2 className="text-[30px] font-bold mb-2">Visão</h2>
              <p className="text-black">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.              </p>
            </div>
          </div>

          {/* Sede */}
          <div className="text-left mt-20 leading-[30px] text-black">
            <h2 className="text-[30px] font-bold mb-2">Sede da HAV Imobiliária</h2>
            <p >HAV Imobiliária</p>
            <p >Centro, Jaraguá do Sul</p>
            <p >CEP 89253-030</p>
            <p >SC, Brasil</p>
            <p >contato@havimobiliaria.com.br</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
