"use client"

import { useEffect, useState } from "react"
import { Montserrat } from 'next/font/google'
import request from "@/routes/request"
import { Formulario } from "../adicionandoUsuario/formulario"
import { RemoveUsuario } from "../removerUsuario"
import { EditarUsuario } from "../editandoUsuario"
import { z } from "zod"


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
    cpf: z.string().min(11, { message: "CPF inválido (formato: 123.456.789-00)" }).max(11),
    tipo_conta: z.string().min(1, {
        message: "Selecione um tipo de conta válido",
    }),
    telefone: z.string().min(10, { message: "Telefone inválido" }),
    data_nascimento: z.string(),
    email: z.string().email({ message: "E-mail inválido" }),
    senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    idEnderecoUsuario: z.number().optional(),
})


const EnderecoProps = z.object({
    id: z.number().optional(),
    cep: z.string().min(1, { message: "CEP é obrigatório" }),
    rua: z.string().min(1, { message: "Rua é obrigatória" }),
    tipo_residencia: z.string().min(1, { message: "Tipo de residência é obrigatório" }),
    numero_imovel: z.coerce.number().min(1, { message: "Número do imóvel é obrigatório" }),
    numero_apartamento: z.coerce.number().optional(),
    bairro: z.string().min(1, { message: "Bairro é obrigatório" }),
    cidade: z.string().min(1, { message: "Cidade é obrigatória" }),
    uf: z.string().min(1, { message: "UF é obrigatório" }),
})


type UsuarioProps = z.infer<typeof UsuarioProps>
type EnderecoProps = z.infer<typeof EnderecoProps>

interface ResponseProps {
  content: UsuarioProps[]
}

export default function TabelaUsuario() {
  const [selectedUsuarios, setSelectedUsuarios] = useState<UsuarioProps[]>([])
  const [usuarios, setUsuarios] = useState<ResponseProps | null>(null)
  const [adicionar, setAdicionar] = useState(false)
  const [remover, setRemover] = useState(false)
  const [editar, setEditar] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleAddUsuario = () => {
    setAdicionar(!adicionar)
    setEditar(false)
    setRemover(false)
    if (adicionar) {
      refreshData()
    }
  }

  const handleRemoveUsuario = () => {
    if (selectedUsuarios.length === 0) {
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

  const handleEditusuario = () => {
    if (selectedUsuarios.length === 0) {
      alert("Selecione um imóvel para editar")
      return
    } else if (selectedUsuarios.length > 1) {
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

  const getUsuario = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const usuariosGet = await request("GET", "http://localhost:9090/usuario/getAll")
      setUsuarios(usuariosGet)
    } catch (error) {
      console.error("Error fetching usuarios:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = () => {
    setRefreshTrigger((atualizar) => atualizar + 1)
    setSelectedUsuarios([])
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
    getUsuario()
    setAdicionar(false)
    setEditar(false)
    setRemover(false)
  }, [refreshTrigger])

  return (
    <>
      <div className="flex flex-col gap-10 sm:flex-col lg:flex-row font-montserrat">
        <div className="bg-[#F4ECE4] shadow-lg rounded-[20px] overflow-hidden basis-5/6 w-full">
          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-vermelho text-white sticky top-0 z-10">
                  <th className="max-lg:text-sm whitespace-nowrap p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Nome</p>
                  </th>
                  <th className="max-lg:text-sm whitespace-nowrap p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>E-mail</p>
                  </th>
                  <th className="max-lg:text-sm whitespace-nowrap p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>CPF</p>
                  </th>
                  <th className="max-lg:text-sm whitespace-nowrap p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Tipo Conta</p>
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
                  usuarios?.content?.map((usuario) => {
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
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 max-w-[20rem] truncate whitespace-nowrap overflow-hidden">
                          {usuario.email}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {usuario.cpf}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {usuario.tipo_conta}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50 truncate whitespace-nowrap overflow-hidden">
                          {usuario.telefone}
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
            className="w-40 h-[50px] transition-transform duration-300 hover:scale-110 m-4 bg-[#016E2F] text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading}
          >
            <div className="pl-5 flex items-center gap-3 justify-start ">
              <img src="./iconsForms/sinalAdd.png" alt="sinal de adição" className="w-4" />
              <p className="text-lg font-medium">Adicionar</p>
            </div>
          </button>

          <button
            onClick={handleRemoveUsuario}
            className="w-40 h-[50px] transition-transform duration-300 hover:scale-110 m-4 bg-vermelho text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading}
          >
            <div className="pl-5 flex items-center gap-3 justify-start">
              <img src="./iconsForms/sinalRemove.png" alt="sinal de remoção" className="w-4" />
              <p className="text-lg font-medium">Remover</p>
            </div>
          </button>

          <button
            onClick={handleEditusuario}
            className="w-40 h-[50px] transition-transform duration-300 hover:scale-110 m-4 bg-[#252422] text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading || selectedUsuarios.length !== 1}
          >
            <div className="pl-5 flex items-center gap-3 justify-start">
              <img src="./iconsForms/canetaEditarBranco.png" alt="sinal de edição" className="w-4" />
              <p className="text-lg font-medium">Editar</p>
            </div>
          </button>
        </div>
      </div>

      {adicionar && <Formulario onComplete={refreshData} />}
      {remover && <RemoveUsuario selectedUsers={selectedUsuarios} onComplete={refreshData} />}
      {editar && <EditarUsuario selectedUsuarios={selectedUsuarios} onComplete={refreshData} />}
    </>
  )
}
