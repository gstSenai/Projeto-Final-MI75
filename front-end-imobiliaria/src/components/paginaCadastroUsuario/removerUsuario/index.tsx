"use client"
import { useState } from "react"
import { Botao } from "@/components/botao"
import request from "@/routes/request"

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
    confirmar_senha?: string
    ultimo_acesso?: string
    imovel: string
}

interface RemoveUsuarioProps {
    selectedUsers: UsuarioProps[]
    onComplete?: () => void
}

export function RemoveUsuario({ selectedUsers, onComplete }: RemoveUsuarioProps) {
    const [showModal, setShowModal] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const [lastDeleteUser, setLastDeleteUser] = useState<UsuarioProps | null>(null)

    const addUser = async (data: UsuarioProps) => {
        try {
            const response = await request('POST', 'http://localhost:9090/users/create', data);
            setLastDeleteUser(response);
            return response;
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
            throw error;
        }
    };

    const deleteUsers = async (): Promise<void> => {
        setIsDeleting(true)
        try {
            for (const user of selectedUsers) {
                await request("DELETE", `http://localhost:9090/users/delete/${user.id}`)
            }

            setTimeout(() => {
                setShowModal(false)
                if (onComplete) {
                    onComplete()
                }
            })
        } catch (error) {
            console.error("Erro ao deletar usuários:", error)
        } finally {
            setIsDeleting(false)
        }
    }

    const handleCancel = () => {
        setShowModal(false)
        if (onComplete) {
            onComplete()
        }
    }

    const onSubmitAdd = async () => {
        if (lastDeleteUser) {
            await addUser(lastDeleteUser);
            setShowModal(false);
            setLastDeleteUser(null);
            if (onComplete) {
                onComplete();
            }
        }
    }

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-semibold text-vermelho mb-4">Remover Usuários</h2>
                            <p className="mb-6 text-xl">
                                Tem certeza que deseja remover {selectedUsers.length} usuário(s) selecionado(s)? Esta ação não pode
                                ser desfeita.
                            </p>

                            <div className="max-h-40 overflow-y-auto mb-6 border border-gray-200 rounded-lg p-2">
                                <ul>
                                    {selectedUsers.map((user) => (
                                        <li key={user.id} className="py-1 border-b border-gray-100 last:border-0">
                                            {user.nome} ({user.email})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="flex justify-around items-center gap-10 w-[90%]">
                                <Botao
                                    onClick={handleCancel}
                                    texto="Cancelar"
                                />
                                <Botao
                                    onClick={deleteUsers}
                                    texto={isDeleting ? "Removendo..." : "Remover"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && isDeleting && (
                <div className="w-full bottom-16 pl-10 items-center relative">
                    <div className='bg-vermelho/80 w-72 flex gap-1 p-3 rounded-[20px] text-white'>
                        <p>Adicionado com Sucesso!</p>
                        <button
                            onClick={onSubmitAdd}
                            className='underline '>
                            Desfazer
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}