"use client"

import { useEffect, useState } from "react"
import { Montserrat } from 'next/font/google'
import { InputDadosUsuario } from "../../paginaCadastroUsuario/adicionandoUsuario/inputDadosUsuario"
import { InputEditandoDadosUsuario } from "../../paginaCadastroUsuario/editandoUsuario/inputEditarDadosUsuario"
import request from "@/routes/request"
import { RemoveUsuario } from "../removerUsuario"
import { InputEnderecoPropriedade } from "../adicionandoUsuario/inputEnderecoPropriedade"

// Carregando a fonte Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
})

interface TableProps {
  headers: string[]
  data: (string | number)[][]
}

interface ImovelProps {
  id: number
  nome_propriedade: string
  tipo_transacao: string
  valor_venda: number
  tipo_imovel: string
  status_imovel: string
  valor_promocional: number
  destaque?: boolean
  visibilidade: boolean
  condominio: number
  area_construida: number
  area_terreno: number
  descricao: string
}

interface UsuarioProps {
  id: number
  nome: string
  sobrenome: string
  cpf: string
  tipo_conta: string
  telefone: string
  data_nascimento: Date
  email: string
  senha: string
  imovel: string
}

interface ResponseProps {
  content: UsuarioProps[]
}

export default function GenericTable() {
  const [selectedUsers, setSelectedUsers] = useState<UsuarioProps[]>([])
  const [users, setUsers] = useState<ResponseProps | null>(null)
  const [adicionar, setAdicionar] = useState(false)
  const [remover, setRemover] = useState(false)
  const [editar, setEditar] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleAddUser = () => {
    setAdicionar(!adicionar)
    setEditar(false)
    setRemover(false)
    if (adicionar) {
      refreshData()
    }
  }

  const handleRemoveUser = () => {
    if (selectedUsers.length === 0) {
      alert("Selecione pelo menos um usuário para remover")
      return
    }

    setAdicionar(false)
    setEditar(false)
    setRemover(!remover)
    if (remover) {
      refreshData()
    }
  }

  const handleEditUser = () => {
    if (selectedUsers.length === 0) {
      alert("Selecione um usuário para editar")
      return
    } else if (selectedUsers.length > 1) {
      alert("Pode editar um usuário por vez")
      return
    }

    setAdicionar(false)
    setRemover(false)
    setEditar(!editar)
    if (editar) {
      refreshData()
    }
  }

  const getUsers = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      const usersGet = await request("GET", "http://localhost:9090/users/getAll")
      setUsers(usersGet)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = () => {
    setRefreshTrigger((atualizar) => atualizar + 1)
    setSelectedUsers([])
  }

  const toggleUserSelection = (user: UsuarioProps) => {
    setSelectedUsers(prevSelected => {
      const isSelected = prevSelected.some(u => u.id === user.id)

      if (isSelected) {
        return prevSelected.filter(u => u.id !== user.id)
      } else {
        return [...prevSelected, user]
      }
    })
  }

  useEffect(() => {
    getUsers()
  }, [refreshTrigger])

  return (
    <>
      <div className="flex flex-col 2xl:px-20 xl:px-20 lg:px-10 px-10 mb-20 sm:flex-col md:flex-col lg:flex-row 2xl:flex-row">
        <div className="bg-[#F4ECE4] shadow-lg rounded-[20px] overflow-hidden basis-5/6">
          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-vermelho text-white sticky top-0 z-10">
                  <th className="p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Nome</p>
                  </th>
                  <th className="p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>E-mail</p>
                  </th>
                  <th className="p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Telefone</p>
                  </th>
                  <th className="p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>CPF</p>
                  </th>
                  <th className="p-4 text-center font-bold border border-[#E0D6CE]">
                    <p>Tipo da Conta</p>
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
                  users?.content?.map((user) => {
                    const isSelected = selectedUsers.some(u => u.id === user.id)
                    return (
                      <tr
                        key={user.id}
                        className={`cursor-pointer border-b border-[#E0D6CE] ${isSelected ? "bg-vermelho text-white" : "bg-[#FAF6ED] hover:bg-vermelho hover:bg-opacity-30"
                          }`}
                        onClick={() => toggleUserSelection(user)}
                      >
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50">
                          {user.nome}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50">
                          {user.email}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50">
                          {user.telefone}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50">
                          {user.cpf}
                        </td>
                        <td className="p-4 text-center border border-[#E0D6CE] bg-opacity-50">
                          {user.tipo_conta}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
          {selectedUsers.length > 0 && (
            <div className="p-3 bg-[#FAF6ED] border-t border-[#E0D6CE]">
              <p className="text-vermelho font-medium">{selectedUsers.length} usuário(s) selecionado(s)</p>
            </div>
          )}
        </div>
        <div className="flex flex-col basis-1/6 justify-center items-center pt-11 sm:pt-11 md:pt-14 lg:pt-0 w-full ">
          <button
            onClick={handleAddUser}
            className="w-36 lg:h-[50px] m-4 bg-[#016E2F] text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading}
          >
            <div className="pl-5 flex items-center gap-3 justify-start ">
              <img src="./iconsForms/sinalAdd.png" alt="sinal de adição" className="lg:w-4" />
              <p className="text-lg font-medium">Adicionar</p>
            </div>
          </button>

          <button
            onClick={handleRemoveUser}
            className="w-36 lg:h-[50px] m-4 bg-vermelho text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading}
          >
            <div className="pl-5 flex items-center gap-3 justify-start">
              <img src="./iconsForms/sinalRemove.png" alt="sinal de remoção" className="lg:w-4" />
              <p className="text-lg font-medium">Remover</p>
            </div>
          </button>

          <button
            onClick={handleEditUser}
            className="w-36 lg:h-[50px] m-4 bg-[#252422] text-white rounded-[20px] text-center inline-block align-middle"
            disabled={isLoading || selectedUsers.length !== 1}
          >
            <div className="pl-5 flex items-center gap-3 justify-start">
              <img src="./iconsForms/canetaEditarBranco.png" alt="sinal de edição" className="lg:w-4" />
              <p className="text-lg font-medium">Editar</p>
            </div>
          </button>
        </div>
      </div>

      {adicionar && (
        <>
          <div>
            <InputDadosUsuario onComplete={refreshData} />
          </div>
        </>
      )}
      {remover && <RemoveUsuario selectedUsers={selectedUsers} onComplete={refreshData} />}
    </>
  )
}
