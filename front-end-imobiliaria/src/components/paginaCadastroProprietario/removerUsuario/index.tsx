"use client"
import { useState } from "react"
import { Botao } from "@/components/botao/index"
import request from "@/routes/request"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"

const ProprietarioProps = z.object({
    id: z.number().optional(),
    nome: z.string().min(1, { message: "O nome é obrigatório" }),
    sobrenome: z.string().min(1, { message: "O sobrenome é obrigatório" }),
    cpf: z.string()
        .min(14, { message: "CPF inválido" })
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "Formato de CPF inválido" })
        .transform((cpf) => cpf.replace(/\D/g, '')),
    telefone: z.string()
        .min(11, { message: "Telefone inválido" })
        .regex(/^\(\d{2}\)\s\d{5}-\d{4}$/, { message: "Formato de telefone inválido" })
        .transform((tel) => tel.replace(/\D/g, '')),
    celular: z.string()
        .min(11, { message: "Celular inválido" })
        .regex(/^\(\d{2}\)\s\d{5}-\d{4}$/, { message: "Formato de celular inválido" })
        .transform((cel) => cel.replace(/\D/g, '')),
    data_nascimento: z.string()
        .min(10, { message: "Data deve estar no formato DD/MM/AAAA" })
        .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
            message: "Data deve estar no formato DD/MM/AAAA"
        })
        .transform((data) => {
            const [dia, mes, ano] = data.split('/').map(Number);
            return new Date(ano, mes - 1, dia);
        }),
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
})

type ProprietarioProps = z.infer<typeof ProprietarioProps>

interface RemoveProprietarioProps {
    selectedProprietarios: ProprietarioProps[]
    onComplete?: () => void
}

export function RemoveProprietario({ selectedProprietarios, onComplete }: RemoveProprietarioProps) {
    const [showModal, setShowModal] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)


    const deleteUsers = async (): Promise<void> => {
        setIsDeleting(true)
        try {

            for (const proprietario of selectedProprietarios) {
                await request("DELETE", `http://localhost:9090/proprietario/delete/${proprietario.id}`)
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
            console.error("Erro ao deletar proprietários:", error)
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
                            <h2 className="max-lg:text-2xl text-3xl font-semibold text-vermelho mb-4">Remover Proprietários</h2>
                            <p className="mb-6 max-lg:text-base text-xl">
                                Tem certeza que deseja remover {selectedProprietarios.length} proprietário(s) selecionado(s)? Esta ação não pode
                                ser desfeita.
                            </p>

                            <div className="max-h-40 overflow-y-auto mb-6 border border-gray-200 rounded-lg p-2">
                                <ul>
                                    {selectedProprietarios.map((proprietario) => (
                                        <li key={proprietario.id} className="py-1 border-b border-gray-100 last:border-0">
                                            {proprietario.nome} {proprietario.sobrenome} ({proprietario.email})
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