import { Header } from "@/components/header"
import { ListaDeCadastros } from "@/components/paginaCadastroImovel/formularioEscrito"
import { Formulario } from "@/components/paginaCadastroImovel/formulario"
import TabelaImovel from "@/components/paginaCadastroImovel/tabelaImovel"

export default function CadastroImovel() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#DFDAD0] pt-14">
        <div className="font-inter flex justify-between max-lg:justify-center mb-10 2xl:px-20 xl:px-20 lg:px-10 px-10">
          <div className="flex flex-row items-center max-lg:justify-center">
            <p className="text-2xl xl:text-4xl font-semibold max-lg:hidden">Cadastrar imóvel</p>
            <p className="text-3xl font-semibold lg:hidden">Cadastro</p>
          </div>
          <div className="flex flex-row items-center max-lg:hidden">
            <p className="text-vermelho text-lg xl:text-2xl">Voltar ao menu</p>
          </div>
        </div>

        <TabelaImovel />

        <ListaDeCadastros
          textos={[
            "ID do Imóvel: [Gerado automaticamente]",
            "Telefone: telefone do Proprietário/Imobiliária",
            "Dono: Nome do Proprietário/Imobiliária",
            "Email: Email do Proprietário/Imobiliária",
          ]}
        />

        <hr className="mt-16 mb-4 w-full h-2 rounded-2xl bg-vermelho max-lg:h-3 max-lg:mt-10"></hr>

        <Formulario />
      </div>
    </>
  )
}

