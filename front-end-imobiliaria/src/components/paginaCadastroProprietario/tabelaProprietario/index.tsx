"use client"

import { useEffect, useState } from "react"
import { Montserrat } from 'next/font/google'
import { Formulario } from "../adicionandoUsuario/formulario"
import { RemoveProprietario } from "../removerUsuario"
import { EditarProprietario } from "../editandoUsuario"
import { z } from "zod"
import Image from "next/image"
import { FormularioInput } from "../adicionandoUsuario/formulario/formularioInput"
import { useForm } from "react-hook-form"
import { Botao } from "@/components/botao"

// Carregando a fonte Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
})

const ProprietarioProps = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, { message: "O nome é obrigatório" }),
  sobrenome: z.string().min(1, { message: "O sobrenome é obrigatório" }),
  cpf: z.coerce.number().min(11, { message: "CPF inválido" }),
  telefone: z.coerce.number().min(10, { message: "Telefone inválido" }),
  celular: z.coerce.number().min(11, { message: "Celular inválido" }),
  data_nascimento: z.coerce.number().min(1, { message: "Data de nascimento inválida" }),
  email: z.string().email({ message: "E-mail inválido" }),
  enderecoProprietario: z.object({
    id: z.number().optional(),
    cep: z.string().min(8, { message: "CEP inválido" }),
    rua: z.string().min(1, { message: "Rua inválida" }),
    tipo_residencia: z.string().min(1, { message: "Tipo de residência inválido" }),
    numero_imovel: z.coerce.number().min(1, { message: "Número do imóvel inválido" }),
    numero_apartamento: z.coerce.number().min(1, { message: "Número do apartamento inválido" }).optional(),
    bairro: z.string().min(1, { message: "Bairro inválido" }),
    cidade: z.string().min(1, { message: "Cidade inválida" }),
    uf: z.string().min(2, { message: "UF inválida" }),
  }).optional(),
  ImovelProprietarioResponseDTO: z.array(z.object({
    id: z.number().optional(),
    codigo: z.number().optional(),
    nome_propriedade: z.string().min(1, { message: "Nome da propriedade inválido" }),
    tipo_transacao: z.string().min(1, { message: "Tipo de transação inválido" }),
    valor_venda: z.number().min(1, { message: "Valor de venda inválido" }),
    tipo_imovel: z.string().min(1, { message: "Tipo de imóvel inválido" }),
    status_imovel: z.string().min(1, { message: "Status do imóvel inválido" }),
    valor_promocional: z.number().min(1, { message: "Valor promocional inválido" }),
    destaque: z.boolean().optional(),
    visibilidade: z.boolean().optional(),
    valor_iptu: z.number().min(1, { message: "Valor doIPTU inválido" }),
    condominio: z.number().min(1, { message: "Condomínio inválido" }),
    area_construida: z.number().min(1, { message: "Área construída inválida" }),
    area_terreno: z.number().min(1, { message: "Área do terreno inválida" }),
    descricao: z.string().min(1, { message: "Descrição inválida" }),
  })).optional(),
})

type ProprietarioProps = z.infer<typeof ProprietarioProps>

interface ResponseProps {
  content: ProprietarioProps[]
}

export default function TabelaProprietario() {
  const { register, watch, reset } = useForm({
    defaultValues: {
      "proprietario.nome": "",
      "proprietario.email": "",
    }
  });
  const [selectedProprietarios, setSelectedProprietarios] = useState<ProprietarioProps[]>([])
  const [proprietariosFiltros, setProprietariosFiltros] = useState<ResponseProps | null>(null)
  const [adicionar, setAdicionar] = useState(false)
  const [remover, setRemover] = useState(false)
  const [editar, setEditar] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  const handleAddUsuario = () => {
    setAdicionar(!adicionar)
    setEditar(false)
    setRemover(false)
    if (adicionar) {
      refreshData()
    }
  }

  const handleRemoveUsuario = () => {
    if (selectedProprietarios.length === 0) {
      alert("Selecione pelo menos um proprietário para remover")
      return
    }

    setAdicionar(false)
    setEditar(false)
    setRemover(!remover)
    if (remover) {
      refreshData()
    }
  }

  const handleEditusuario = () => {
    if (selectedProprietarios.length === 0) {
      alert("Selecione um proprietário para editar")
      return
    } else if (selectedProprietarios.length > 1) {
      alert("Pode editar um proprietário por vez")
      return
    }

    setAdicionar(false)
    setRemover(false)
    setEditar(!editar)
    if (editar) {
      refreshData()
    }
  }

  const getUsuario = async (searchNome?: string, searchEmail?: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:9090/proprietario/getAll");
      const data = await response.json();

      const proprietariosFiltrados = {
        content: data.content.filter((proprietario: ProprietarioProps) => {
          const matchNome = !searchNome || proprietario.nome.toLowerCase().includes(searchNome.toLowerCase());
          const matchEmail = !searchEmail || proprietario.email.toLowerCase().includes(searchEmail.toLowerCase());

          return matchNome && matchEmail;
        })
      };

      setProprietariosFiltros(proprietariosFiltrados);
    } catch (error) {
      console.error("Error fetching proprietarios:", error)
      setProprietariosFiltros({ content: [] })
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = () => {
    setAdicionar(false)
    setRemover(false)
    setEditar(false)
    setSelectedProprietarios([])
    getUsuario()
  }

  const toggleProprietarioselection = (proprietario: ProprietarioProps) => {
    setSelectedProprietarios(prevSelected => {
      const isSelected = prevSelected.some(u => u.id === proprietario.id)

      if (isSelected) {
        return prevSelected.filter(u => u.id !== proprietario.id)
      } else {
        return [...prevSelected, proprietario]
      }
    })
  }

  useEffect(() => {
    getUsuario();
  }, []);

  return (
    <>
      <div className={`flex flex-col gap-10 sm:flex-col lg:flex-row ${montserrat.className}`}>
        <div className="bg-[#F4ECE4] shadow-lg rounded-[20px] overflow-hidden w-full lg:w-5/6">
          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-vermelho text-white sticky top-0 z-[5]">
                  <th className="max-lg:text-sm whitespace-nowrap p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Nome</p>
                  </th>
                  <th className="max-lg:text-sm whitespace-nowrap p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Sobrenome</p>
                  </th>
                  <th className="max-lg:text-sm whitespace-nowrap p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>E-mail</p>
                  </th>
                  <th className="max-lg:text-sm whitespace-nowrap p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>CPF</p>
                  </th>
                  <th className="max-lg:text-sm whitespace-nowrap p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Telefone</p>
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
                  proprietariosFiltros?.content?.map((proprietario) => {
                    const isSelected = selectedProprietarios.some(u => u.id === proprietario.id)
                    return (
                      <tr
                        key={proprietario.id}
                        className={`cursor-pointer border-b border-[#E0D6CE] ${isSelected ? "bg-vermelho text-white" : "bg-[#FAF6ED] hover:bg-vermelho hover:bg-opacity-30"
                          }`}
                        onClick={() => toggleProprietarioselection(proprietario)}
                      >
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {proprietario.nome}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {proprietario.sobrenome}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 max-w-[20rem] truncate whitespace-nowrap overflow-hidden">
                          {proprietario.email}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {proprietario.cpf}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {proprietario.telefone}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
          {selectedProprietarios.length > 0 && (
            <div className="p-3 bg-[#FAF6ED] border-t border-[#E0D6CE]">
              <p className="text-vermelho font-medium">{selectedProprietarios.length} Proprietário(s) selecionado(s)</p>
            </div>
          )}
        </div>

        <div className="flex flex-col basis-1/6 justify-center items-center pt-11 sm:pt-11 md:pt-14 lg:pt-0 w-full ">
          <button
            onClick={handleAddUsuario}
            className="w-36 h-10 transition-transform duration-300 hover:scale-110 m-4 bg-[#016E2F] text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading}
          >
            <div className="pl-5 flex items-center gap-3 justify-start">
              <Image src="/iconsForms/sinalAdd.png" alt="sinal de adição" width={10} height={10} />
              <span className="text-base font-medium">Adicionar</span>
            </div>
          </button>

          <button
            onClick={handleRemoveUsuario}
            className="w-36 h-10 transition-transform duration-300 hover:scale-110 m-4 bg-vermelho text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading}
          >
            <div className="pl-5 flex items-center gap-3 justify-start">
              <Image src="/iconsForms/sinalRemove.png" alt="sinal de remoção" width={10} height={10} />
              <span className="text-base font-medium">Remover</span>
            </div>
          </button>

          <button
            onClick={handleEditusuario}
            className="w-36 h-10 transition-transform duration-300 hover:scale-110 m-4 bg-[#252422] text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading || selectedProprietarios.length !== 1}
          >
            <div className="pl-5 flex items-center gap-3 justify-start">
              <Image src="/iconsForms/canetaEditarBranco.png" alt="sinal de edição" width={15} height={15} />
              <span className="text-base font-medium">Editar</span>
            </div>
          </button>

          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="w-36 h-10 transition-transform duration-300 hover:scale-110 m-4 bg-vermelho text-white rounded-[20px] text-center inline-block align-middle"
          >
            <div className="pl-5 flex items-center gap-3 justify-start">
              <Image src="/iconFiltro/filtro.png" alt="filtro" width={15} height={15} />
              <span className="text-base font-medium">Filtro</span>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <FormularioInput
                      placeholder="Nome:"
                      name="usuario.nome"
                      interName='Ex: Caio'
                      register={register}
                      required
                      customizacaoClass="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <FormularioInput
                      placeholder="E-mail:"
                      name="usuario.email"
                      interName='Ex: caio@gmail.com'
                      register={register}
                      required
                      customizacaoClass="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <FormularioInput
                      placeholder="Tipo de Conta:"
                      name="usuario.tipo_conta"
                      interName=''
                      register={register}
                      required
                      customizacaoClass="w-full"
                      options={['Usuario', 'Administrador', 'Corretor', 'Editor']}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-10 mt-10 h-10">
                <Botao
                  texto="Limpar"
                  onClick={() => {
                    reset();
                    getUsuario();
                    setTimeout(() => {
                      setShowSidebar(false);
                    }, 100);
                  }}
                  className="text-base bg-vermelho"
                />
                <Botao
                  texto="Pesquisar"
                  onClick={() => {
                    const currentNome = watch("proprietario.nome");
                    const currentEmail = watch("proprietario.email");
                    getUsuario(currentNome, currentEmail);
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
      </div>
      {adicionar && <Formulario onComplete={refreshData} />}
      {remover && <RemoveProprietario selectedProprietarios={selectedProprietarios} onComplete={refreshData} />}
      {editar && <EditarProprietario selectedProprietarios={selectedProprietarios} onComplete={refreshData} />}
    </>
  )
}
