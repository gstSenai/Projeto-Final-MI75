import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import TabelaImovel from "@/components/paginaCadastroImovel/tabelaImovel"

export default function CadastroImovel() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#DFDAD0] pt-24 2xl:px-20 xl:px-20 lg:px-10 px-10">
        <div className="font-inter flex">
          <div className="flex flex-col">
            <p className="text-2xl xl:text-3xl font-semibold max-lg:hidden">Cadastrar imóvel</p>
            <p className="text-2xl font-semibold lg:hidden">Cadastro</p>

            <hr className="mt-4 mb-20 w-40 h-1 rounded-2xl bg-vermelho "></hr>

          </div>
        </div>

        <TabelaImovel />
      </div>
      <Footer />
    </>
  )
}

