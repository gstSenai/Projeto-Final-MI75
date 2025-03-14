"use client"
import { useState } from "react"
import { Botao } from "@/components/botao"
import request from "@/routes/request"

interface ImovelProps {
    id: number;
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
}

interface RemoveImovelProps {
    selectedImoveis: ImovelProps[]
    onComplete?: () => void
}

export function RemoveImovel({ selectedImoveis, onComplete }: RemoveImovelProps) {
    const [showModal, setShowModal] = useState(true)
    const [showModalRemovido, setShowModalRemovido] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteImovel = async (): Promise<void> => {
        setIsDeleting(true)
        try {
            for (const imovel of selectedImoveis) {
                await request('DELETE', `http://localhost:9090/imovel/delete/${imovel.id}`)
            }

            setShowModal(false)
            setShowModalRemovido(true)
            if (onComplete) {
                onComplete()
            }

            setTimeout(() => {
                setShowModalRemovido(false)
            }, 5000)
            setShowModalRemovido(false)
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-semibold text-vermelho mb-4">Remover Imóveis</h2>
                            <p className="mb-6 text-xl">
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
                            <div className="flex justify-around items-center gap-10 w-[90%]">
                                <Botao
                                    onClick={handleCancel}
                                    texto="Cancelar"
                                />
                                <Botao
                                    onClick={deleteImovel}
                                    texto={isDeleting ? "Removendo..." : "Remover"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalRemovido && isDeleting && (
                <div className="w-full bottom-16 pl-10 items-center relative">
                    <div className='bg-vermelho/80 w-72 flex gap-1 p-3 rounded-[20px] text-white'>
                        <p>Removido com Sucesso!</p>
                    </div>
                </div>
            )}
        </>
    )
}