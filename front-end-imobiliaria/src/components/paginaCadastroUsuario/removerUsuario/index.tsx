"use client"
import { useState } from "react"
import { Botao } from "@/components/botao"
import request from "@/routes/request"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"

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
    const [showSuccessModal, setShowSuccessModal] = useState(false)


    const deleteUsers = async (): Promise<void> => {
        setIsDeleting(true)
        try {
            
            for (const user of selectedUsers) {
                await request("DELETE", `http://localhost:9090/usuario/delete/${user.id}`)
            }

            setShowModal(false)
            setShowSuccessModal(true)
            if (onComplete) {
                onComplete()
            }
            setTimeout(() => {
                setShowSuccessModal(false)
            }, 5000)
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
                                    className="bg-vermelho h-10"
                                />
                                <Botao
                                    onClick={deleteUsers}
                                    texto={isDeleting ? "Removendo..." : "Remover"}
                                    className="bg-vermelho h-10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed bottom-10 left-0 z-50"
                    >
                        <div className="bg-vermelho w-72 flex gap-1 p-3 rounded-tr-lg rounded-br-lg text-white shadow-lg">
                            <p className="text-center">Removido com Sucesso!</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}