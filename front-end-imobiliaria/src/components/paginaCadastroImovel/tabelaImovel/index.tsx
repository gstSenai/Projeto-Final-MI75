"use client"

import { useEffect, useState } from "react"
import { Montserrat } from 'next/font/google'
import { Formulario } from "../formulario"
import { RemoveImovel } from "../removerImovel"
import { EditarImovel } from "../editarImovel"
import Image from "next/image"
import { Botao } from "@/components/botao"
import { FormularioInput } from "@/components/paginaCadastroUsuario/adicionandoUsuario/formulario/formularioInput"
import { useForm } from "react-hook-form"
import { FiltroImovel } from "@/components/filtroImovel"


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
  idEndereco: {
    id: number
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    complemento?: string
  }
  id_caracteristicasImovel: {
    id: number
    numero_quartos: number
    numero_banheiros: number
    numero_suites: number
    numero_vagas: number
    piscina: boolean
    numero_salas: number
  }
}

interface ResponseProps {
  content: ImovelProps[]
}

interface FormValues {
  "imovel.nome_propriedade": string;
  "imovel.venda_valor": number;
}

export default function TabelaImovel() {
  const { register, watch, reset } = useForm<FormValues>({
    defaultValues: {
      "imovel.nome_propriedade": "",
      "imovel.venda_valor": 0,
    }
  });
  const [selectedImoveis, setSelectedImoveis] = useState<ImovelProps[]>([])
  const [imoveis, setImoveis] = useState<ResponseProps | null>(null)
  const [adicionar, setAdicionar] = useState(false)
  const [remover, setRemover] = useState(false)
  const [editar, setEditar] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [showSidebar, setShowSidebar] = useState(false)
  const [valorMin, setValorMin] = useState(0);
  const [valorMax, setValorMax] = useState(1000000);

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

  const getImoveis = async (searchNome?: string, searchValorMin?: number, searchValorMax?: number) => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:9090/imovel/getAll");
      const data = await response.json();

      const imoveisFiltrados = {
        content: data.content.filter((imovel: ImovelProps) => {
          const matchNome = !searchNome || imovel.nome_propriedade.toLowerCase().includes(searchNome.toLowerCase())

          const valorImovel = imovel.valor_venda;
          const valorMin = searchValorMin || 0;
          const valorMax = searchValorMax || Infinity;
          const matchValor = valorImovel >= valorMin && valorImovel <= valorMax;

          return matchNome && matchValor;
        })
      }

      setImoveis(imoveisFiltrados)
    } catch (error) {
      console.error("Error fetching Imoveis:", error)
      setImoveis({ content: [] })
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
      <div className={`flex flex-col gap-10 sm:flex-col md:flex-col lg:flex-row ${montserrat.className}`}>

        <div className="bg-[#F4ECE4] shadow-lg rounded-[20px] overflow-hidden basis-5/6 w-full">
          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-vermelho text-white sticky top-0 z-10">
                  <th className="p-4 text-center font-bold border border-[#E0D6CE] whitespace-nowrap">
                    <p>Código</p>
                  </th>
                  <th className="p-4 text-center font-bold border border-[#E0D6CE] whitespace-nowrap">
                    <p>Nome da Propriedade</p>
                  </th>
                  <th className="p-4 text-center font-bold border border-[#E0D6CE] whitespace-nowrap">
                    <p>Tipo de imóvel</p>
                  </th>
                  <th className="p-4 text-center font-bold border border-[#E0D6CE] whitespace-nowrap">
                    <p>Tipo Transação</p>
                  </th>
                  <th className="p-4 text-center font-bold border border-[#E0D6CE] whitespace-nowrap">
                    <p>Status</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center border border-[#E0D6CE] whitespace-nowrap">
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
                          {imovel.status_imovel}
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
            className="w-36 h-10 transition-transform duration-300 hover:scale-110 m-4 bg-[#016E2F] text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading}
          >
            <div className="pl-5 flex items-center gap-3 justify-start ">
              <Image src="/iconsForms/sinalAdd.png" alt="sinal de adição" width={10} height={10} />
              <p className="text-base font-medium">Adicionar</p>
            </div>
          </button>

          <button
            onClick={handleRemoveImovel}
            className="w-36 h-10 transition-transform duration-300 hover:scale-110 m-4 bg-vermelho text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading}
          >
            <div className="pl-5 flex items-center gap-3 justify-start">
              <Image src="/iconsForms/sinalRemove.png" alt="sinal de remoção" width={10} height={10} />
              <p className="text-base font-medium">Remover</p>
            </div>
          </button>

          <button
            onClick={handleEditImovel}
            className="w-36 h-10 transition-transform duration-300 hover:scale-110 m-4 bg-[#252422] text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading || selectedImoveis.length !== 1}
          >
            <div className="pl-5 flex items-center gap-3 justify-start">
              <Image src="/iconsForms/canetaEditarBranco.png" alt="sinal de edição" width={15} height={15} />
              <p className="text-base font-medium">Editar</p>
            </div>
          </button>

          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="w-36 h-10 transition-transform duration-300 hover:scale-110 m-4 bg-vermelho text-white rounded-[20px] text-center inline-block align-middle"
          >
            <div className="pl-5 flex items-center gap-3 justify-start">
              <Image src="/iconFiltro/filtro.png" alt="filtro" width={15} height={15} />
              <p className="text-base font-medium">Filtro</p>
            </div>
          </button>
        </div>

        <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-[10] ${showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`fixed top-0 left-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-[20] ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-vermelho">Filtros de Busca</h2>
                </div>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <div className="flex justify-start w-1/12">
                    <div
                      className="bg-[#DFDAD0] px-3 py-1 rounded-full text-vermelho lg:text-base transition-transform duration-300 hover:scale-110
                             hover:bg-vermelho hover:text-[#DFDAD0] cursor-pointer"
                      onClick={() => {
                        setTimeout(() => {
                          setShowSidebar(false);
                        }, 100);
                      }}
                    >
                      X
                    </div>
                  </div>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <FormularioInput
                      placeholder="Nome:"
                      name="imovel.nome_propriedade"
                      interName='Ex: Casa'
                      register={register}
                      required
                      customizacaoClass="w-full"
                    />
                  </div>

                  <div className="space-y-4">
                    <FiltroImovel
                      min={0}
                      max={1000000}
                      name="imovel.valor_venda"
                      register={register}
                      onChange={(min, max) => {
                        setValorMin(min);
                        setValorMax(max);
                      }}
                      className="mt-2"
                    />
                  </div>

                </div>
                <div className="flex gap-10 mt-10 h-10">
                  <Botao
                    texto="Limpar"
                    onClick={() => {
                      reset();
                      getImoveis();
                      setTimeout(() => {
                        setShowSidebar(false);
                      }, 100);
                    }}
                    className="text-base bg-vermelho"
                  />
                  <Botao
                    texto="Pesquisar"
                    onClick={() => {
                      const currentNome = watch("imovel.nome_propriedade");
                      getImoveis(currentNome, valorMin, valorMax);
                      setTimeout(() => {
                        setShowSidebar(false);
                      }, 100);
                    }}
                    className="text-base bg-vermelho"
                  />
                </div>
              </div>

            </div>
          </div>
        </div >
      </div >

      {adicionar && <Formulario onComplete={refreshData} />}
      {remover && <RemoveImovel selectedImoveis={selectedImoveis} onComplete={refreshData} />}
      {editar && <EditarImovel selectedImoveis={selectedImoveis} onComplete={refreshData} />}
    </>
  )
}
