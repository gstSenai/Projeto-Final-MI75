"use client"

import { useEffect, useState } from "react"
import { Montserrat } from 'next/font/google'
import { InputDadosUsuario } from "../../paginaCadastroUsuario/adicionandoUsuario/inputDadosUsuario"
import { InputEditandoDadosUsuario } from "../../paginaCadastroUsuario/editandoUsuario/inputEditarDadosUsuario"
import request from "@/routes/request"
import { Formulario } from "../formulario"
import { ListaDeCadastros } from "../formularioEscrito"
import { RemoveImovel } from "../removerImovel"
import { EditarImovel } from "../editarImovel"
// import { RemoveUsuario } from "../removerUsuario"
// import { InputEnderecoPropriedade } from "../adicionandoUsuario/inputEnderecoPropriedade"

// Carregando a fonte Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
})

interface ImovelProps {
  id: number
  codigo?: number
  nome_propriedade: string
  tipo_transacao: string
  valor_venda: number
  tipo_imovel: string
  status_imovel: string
  valor_promocional: number
  test_destaque?: string
  test_visibilidade?: string
  destaque: boolean
  visibilidade: boolean
  valor_iptu: number
  condominio: number
  area_construida: number
  area_terreno: number
  descricao?: string
}

interface ResponseProps {
  content: ImovelProps[]
}

export default function TabelaImovel() {
  const [selectedImoveis, setSelectedImoveis] = useState<ImovelProps[]>([])
  const [imoveis, setImoveis] = useState<ResponseProps | null>(null)
  const [adicionar, setAdicionar] = useState(false)
  const [remover, setRemover] = useState(false)
  const [editar, setEditar] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleAddImovel = () => {
    setAdicionar(!adicionar)
    setEditar(false)
    setRemover(false)
    if (adicionar) {
      refreshData()
    }
  }

  const handleRemoveImovel = () => {
    if (selectedImoveis.length === 0) {
      alert("Selecione pelo menos um imóvel para remover")
      return
    }

    setAdicionar(false)
    setEditar(false)
    setRemover(!remover)
    if (remover) {
      refreshData()
    }
  }

  const handleEditImovel = () => {
    if (selectedImoveis.length === 0) {
      alert("Selecione um imóvel para editar")
      return
    } else if (selectedImoveis.length > 1) {
      alert("Pode editar um imóvel por vez")
      return
    }

    setAdicionar(false)
    setRemover(false)
    setEditar(!editar)
    if (editar) {
      refreshData()
    }
  }

  const getImoveis = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const imoveisGet = await request("GET", "http://localhost:9090/imovel/getAll")
      setImoveis(imoveisGet)
    } catch (error) {
      console.error("Error fetching Imoveis:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = () => {
    setRefreshTrigger((atualizar) => atualizar + 1)
    setSelectedImoveis([])
  }

  const toggleImoveiselection = (imovel: ImovelProps) => {
    setSelectedImoveis(prevSelected => {
      const isSelected = prevSelected.some(u => u.id === imovel.id)

      if (isSelected) {
        return prevSelected.filter(u => u.id !== imovel.id)
      } else {
        return [...prevSelected, imovel]
      }
    })
  }

  useEffect(() => {
    getImoveis()
    setAdicionar(false)
    setEditar(false)
    setRemover(false)
  }, [refreshTrigger])

  return (
    <>
      <div className="flex flex-col gap-10 sm:flex-col md:flex-col lg:flex-row">
        <div className="bg-[#F4ECE4] shadow-lg rounded-[20px] overflow-hidden basis-5/6 w-full">
          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-vermelho text-white sticky top-0 z-10">
                  <th className="p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Código</p>
                  </th>
                  <th className="p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Nome da Propriedade</p>
                  </th>
                  <th className="p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Tipo de imóvel</p>
                  </th>
                  <th className="p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Tipo Transação</p>
                  </th>
                  <th className="p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Estado</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center border border-[#E0D6CE]">
                      Carregando...
                    </td>
                  </tr>
                ) : (
                  imoveis?.content?.map((imovel) => {
                    const isSelected = selectedImoveis.some(u => u.id === imovel.id)
                    return (
                      <tr
                        key={imovel.id}
                        className={`cursor-pointer border-b border-[#E0D6CE] ${isSelected ? "bg-vermelho text-white" : "bg-[#FAF6ED] hover:bg-vermelho hover:bg-opacity-30"
                          }`}
                        onClick={() => toggleImoveiselection(imovel)}
                      >
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {imovel.codigo}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 max-w-[20rem] truncate whitespace-nowrap overflow-hidden">
                          {imovel.nome_propriedade}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {imovel.tipo_imovel}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {imovel.tipo_transacao}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {imovel.destaque}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
          {selectedImoveis.length > 0 && (
            <div className="p-3 bg-[#FAF6ED] border-t border-[#E0D6CE]">
              <p className="text-vermelho font-medium">{selectedImoveis.length} imóvel(s) selecionado(s)</p>
            </div>
          )}
        </div>
        <div className="flex flex-col basis-1/6 justify-center items-center pt-11 sm:pt-11 md:pt-14 lg:pt-0 w-full ">
          <button
            onClick={handleAddImovel}
            className="w-36 lg:h-[50px] m-4 bg-[#016E2F] text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading}
          >
            <div className="pl-5 flex items-center gap-3 justify-start ">
              <img src="./iconsForms/sinalAdd.png" alt="sinal de adição" className="lg:w-4" />
              <p className="text-lg font-medium">Adicionar</p>
            </div>
          </button>

          <button
            onClick={handleRemoveImovel}
            className="w-36 lg:h-[50px] m-4 bg-vermelho text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading}
          >
            <div className="pl-5 flex items-center gap-3 justify-start">
              <img src="./iconsForms/sinalRemove.png" alt="sinal de remoção" className="lg:w-4" />
              <p className="text-lg font-medium">Remover</p>
            </div>
          </button>

          <button
            onClick={handleEditImovel}
            className="w-36 lg:h-[50px] m-4 bg-[#252422] text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading || selectedImoveis.length !== 1}
          >
            <div className="pl-5 flex items-center gap-3 justify-start">
              <img src="./iconsForms/canetaEditarBranco.png" alt="sinal de edição" className="lg:w-4" />
              <p className="text-lg font-medium">Editar</p>
            </div>
          </button>
        </div>
      </div>
      <ListaDeCadastros
        textos={[
          "ID do Imóvel: [Gerado automaticamente]",
          "Telefone: telefone do Proprietário/Imobiliária",
          "Dono: Nome do Proprietário/Imobiliária",
          "Email: Email do Proprietário/Imobiliária",
        ]}
      />

      {adicionar && <Formulario onComplete={refreshData} />}
      {remover && <RemoveImovel selectedImoveis={selectedImoveis} onComplete={refreshData} />}
      {editar && <EditarImovel selectedImoveis={selectedImoveis} onComplete={refreshData} />}
    </>
  )
}
