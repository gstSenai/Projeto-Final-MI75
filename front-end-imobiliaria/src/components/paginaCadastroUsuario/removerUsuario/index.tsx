"use client"
import { useState } from "react"
import { Botao } from "@/components/botao"
import request from "@/routes/request"
import { z } from "zod"

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

type UsuarioProps = z.infer<typeof UsuarioProps>

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
            const response = await request('POST', 'http://localhost:9090/usuario/create', data);
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
                await request("DELETE", `http://localhost:9090/usuario/delete/${user.id}`)
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
                <div className="fixed inset-0  max-sm:px-4 max-lg:px-10  bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                        <div className="flex flex-col">
                            <h2 className="max-lg:text-2xl text-3xl font-semibold text-vermelho mb-4">Remover Usuários</h2>
                            <p className="mb-6 max-lg:text-base text-xl">
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
                            <div className="flex justify-around items-center max-sm:gap-4 gap-10 w-[90%]">
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
                        <p>Removido com Sucesso!</p>
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