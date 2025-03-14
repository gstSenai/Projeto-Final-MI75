import { Header } from "@/components/header"
import { Formulario } from "@/components/paginaCadastroImovel/formulario"
import TabelaImovel from "@/components/paginaCadastroImovel/tabelaImovel"

export default function CadastroImovel() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#DFDAD0] pt-24 2xl:px-20 xl:px-20 lg:px-10 px-10">
        <div className="font-inter flex justify-between max-lg:justify-center mb-10 ">
          <div className="flex flex-row items-center max-lg:justify-center">
            <p className="text-2xl xl:text-4xl font-semibold max-lg:hidden">Cadastrar imóvel</p>
            <p className="text-3xl font-semibold lg:hidden">Cadastro</p>
          </div>
        </div>

        <TabelaImovel />
      </div>
    </>
  )
}

