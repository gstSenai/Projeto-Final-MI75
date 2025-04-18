
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import TabelaImovel from "@/components/paginaCadastroImovel/tabelaImovel"
import { Montserrat } from "next/font/google"
import { LoadingWrapper } from "@/components/loading/loadingServer"


// Carregando a fonte Montserrat
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '800'],
  display: 'swap',
});

export default function CadastroImovel() {
  return (
    <LoadingWrapper>
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className={`flex-grow bg-[#DFDAD0] ${montserrat.className}`}>
          <div className="2xl:px-20 xl:px-20 lg:px-10 px-10 pt-14">
            <div className="font-inter">
              <div className="flex flex-col">
                <p className="text-2xl xl:text-3xl font-semibold max-lg:hidden">Cadastrar imóvel</p>
                <p className="text-2xl font-semibold lg:hidden">Cadastro</p>
                <hr className="mt-4 mb-20 w-40 h-1 rounded-2xl bg-vermelho"></hr>
                <TabelaImovel />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </LoadingWrapper>
  )
}

