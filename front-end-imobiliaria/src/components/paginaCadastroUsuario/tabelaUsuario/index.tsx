"use client"

import { useEffect, useState } from "react"
import { Montserrat } from 'next/font/google'
import { RemoveUsuario } from "../removerUsuario"
import { EditarUsuario } from "../editandoUsuario"
import { z } from "zod"
import Image from "next/image"
import { FormularioInput } from "../adicionandoUsuario/formulario/formularioInput"
import { useForm } from "react-hook-form"
import { Botao } from "@/components/botao"
import { FormularioUsuarioModal } from "@/components/modal/FormularioUsuarioModal"

// Carregando a fonte Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
})

const UsuarioProps = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, { message: "O nome é obrigatório" }),
  sobrenome: z.string().min(1, { message: "O sobrenome é obrigatório" }),
  tipo_conta: z.string().min(1, {
    message: "Selecione um tipo de conta válido",
  }),
  email: z.string().email({ message: "E-mail inválido" }),
  senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  ativo: z.boolean().optional(),
})

type UsuarioProps = z.infer<typeof UsuarioProps>

interface ResponseProps {
  content: UsuarioProps[]
}

export default function TabelaUsuario() {
  const { register, watch, reset } = useForm({
    defaultValues: {
      "usuario.nome": "",
      "usuario.email": "",
      "usuario.tipo_conta": "",
    }
  });
  const [selectedUsuarios, setSelectedUsuarios] = useState<UsuarioProps[]>([])
  const [usuariosFiltros, setUsuariosFiltros] = useState<ResponseProps | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [remover, setRemover] = useState(false)
  const [editar, setEditar] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleAddUsuario = () => {
    setIsModalOpen(true)
  }

  const handleRemoveUsuario = () => {
    if (selectedUsuarios.length === 0) {
      alert("Selecione pelo menos um usuário para remover")
      return
    }

    setRemover(!remover)
    if (remover) {
      refreshData()
    }
  }

  const handleEditUsuario = () => {
    if (selectedUsuarios.length === 0) {
      alert("Selecione um usuário para editar")
      return
    } else if (selectedUsuarios.length > 1) {
      alert("Pode editar um usuário por vez")
      return
    }

    setEditar(!editar)
    if (editar) {
      refreshData()
    }
  }

  const getUsuario = async (searchNome?: string, searchEmail?: string, searchTipoConta?: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:9090/usuario/getAll");
      const data = await response.json();

      const usuariosFiltrados = {
        content: data.content.filter((usuario: UsuarioProps) => {
          const matchNome = !searchNome || usuario.nome.toLowerCase().includes(searchNome.toLowerCase());
          const matchEmail = !searchEmail || usuario.email.toLowerCase().includes(searchEmail.toLowerCase());
          const matchTipoConta = !searchTipoConta || usuario.tipo_conta.toLowerCase().includes(searchTipoConta.toLowerCase());

          return matchNome && matchEmail && matchTipoConta;
        })
      };

      setUsuariosFiltros(usuariosFiltrados);
    } catch (error) {
      console.error("Error fetching usuarios:", error)
      setUsuariosFiltros({ content: [] })
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  const toggleUsuarioselection = (usuario: UsuarioProps) => {
    setSelectedUsuarios(prevSelected => {
      const isSelected = prevSelected.some(u => u.id === usuario.id)

      if (isSelected) {
        return prevSelected.filter(u => u.id !== usuario.id)
      } else {
        return [...prevSelected, usuario]
      }
    })
  }

  useEffect(() => {
    getUsuario();
    setRemover(false)
    setEditar(false)
  }, [refreshTrigger]);

  return (
    <>
      <div className={`flex flex-col gap-10 sm:flex-col lg:flex-row ${montserrat.className}`}>
        <div className="bg-[#F4ECE4] shadow-lg rounded-[20px] overflow-hidden w-full lg:w-5/6">
          <div className="overflow-x-auto max-h-[350px]">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-vermelho text-white sticky top-0 z-[5]">
                  <th className="max-lg:text-sm whitespace-nowrap p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Nome</p>
                  </th>
                  <th className="max-lg:text-sm whitespace-nowrap p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>E-mail</p>
                  </th>
                  <th className="max-lg:text-sm whitespace-nowrap p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Tipo Conta</p>
                  </th>
                  <th className="max-lg:text-sm whitespace-nowrap p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Telefone</p>
                  </th>
                  <th className="max-lg:text-sm whitespace-nowrap p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Ativo</p>
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
                  usuariosFiltros?.content?.map((usuario) => {
                    const isSelected = selectedUsuarios.some(u => u.id === usuario.id)
                    return (
                      <tr
                        key={usuario.id}
                        className={`cursor-pointer border-b border-[#E0D6CE] ${isSelected ? "bg-vermelho text-white" : "bg-[#FAF6ED] hover:bg-vermelho hover:bg-opacity-30"
                          }`}
                        onClick={() => toggleUsuarioselection(usuario)}
                      >
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {usuario.nome}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {usuario.sobrenome}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 max-w-[20rem] truncate whitespace-nowrap overflow-hidden">
                          {usuario.email}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {usuario.tipo_conta}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {usuario.ativo ? "Ativo" : "Inativo"}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
          {selectedUsuarios.length > 0 && (
            <div className="p-3 bg-[#FAF6ED] border-t border-[#E0D6CE]">
              <p className="text-vermelho font-medium">{selectedUsuarios.length} Usuário(s) selecionado(s)</p>
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
            onClick={handleEditUsuario}
            className="w-36 h-10 transition-transform duration-300 hover:scale-110 m-4 bg-[#252422] text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading || selectedUsuarios.length !== 1}
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
                    const currentNome = watch("usuario.nome");
                    const currentEmail = watch("usuario.email");
                    const currentTipoConta = watch("usuario.tipo_conta");
                    getUsuario(currentNome, currentEmail, currentTipoConta);
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
      {remover && <RemoveUsuario selectedUsers={selectedUsuarios} onComplete={refreshData} />}
      {editar && <EditarUsuario selectedUsuarios={selectedUsuarios} onComplete={refreshData} />}
      <FormularioUsuarioModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={refreshData}
      />
    </>
  )
}
