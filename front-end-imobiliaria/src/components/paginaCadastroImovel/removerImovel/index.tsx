"use client"
import { useState } from "react"
import { Botao } from "@/components/botao/index"
import request from "@/routes/request"
import { motion, AnimatePresence } from "framer-motion"

interface ImovelProps {
    id: number;
    codigo?: number
    nome_propriedade: string
    tipo_transacao: string
    valor_venda: number
    tipo_imovel: string
    status_imovel: string
    valor_promocional: number
    destaque?: string
    test_visibilidade?: string
    visibilidade: boolean
    valor_iptu: number
    condominio: number
    area_construida: number
    area_terreno: number
    descricao?: string
}

interface RemoveImovelProps {
    selectedImoveis: ImovelProps[]
    onComplete?: () => void
}

export function RemoveImovel({ selectedImoveis, onComplete }: RemoveImovelProps) {
    const [showModal, setShowModal] = useState(true)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteImovel = async (): Promise<void> => {
        setIsDeleting(true)
        try {
            for (const imovel of selectedImoveis) {
                await request('DELETE', `http://localhost:9090/imovel/delete/${imovel.id}`)
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
            console.error("Erro ao deletar imóveis:", error)
            throw error;
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
                            <h2 className="max-lg:text-2xl text-3xl font-semibold text-vermelho mb-4">Remover Imóveis</h2>
                            <p className="mb-6 max-lg:text-base text-xl">
                                Tem certeza que deseja remover {selectedImoveis.length} imóveis(s) selecionado(s)? Esta ação não pode
                                ser desfeita.
                            </p>

                            <div className="max-h-40 overflow-y-auto mb-6 border border-gray-200 rounded-lg p-2">
                                <ul>
                                    {selectedImoveis.map((imovel) => (
                                        <li key={imovel.id} className="py-1 border-b border-gray-100 last:border-0">
                                            {imovel.nome_propriedade} ({imovel.tipo_transacao})
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
                                    onClick={deleteImovel}
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