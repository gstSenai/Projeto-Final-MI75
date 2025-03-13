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

interface EditarImovelProps {
    selectedImoveis: ImovelProps[]
    onComplete?: () => void
}

export function EditarImovel({ selectedImoveis, onComplete }: EditarImovelProps) {
    const [showModal, setShowModal] = useState(true)
    const [isEditar, setIsEditar] = useState(false)

    const editarImovel = async (): Promise<void> => {
        setIsEditar(true)
        try {
            for (const imovel of selectedImoveis) {
                await request('PUT', `http://localhost:9090/imovel//update/${imovel.id}`)
            }

            setTimeout(() => {
                setShowModal(false)
                if (onComplete) {
                    onComplete()
                }
            })
        } catch (error) {
            console.error("Erro ao deletar imóveis:", error)
            throw error;
        } finally {
            setIsEditar(false)
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
                            <h2 className="text-3xl font-semibold text-vermelho mb-4">Editar Imóveis</h2>
                            <p className="mb-6 text-xl">
                                Essa ação permitirá modificar os detalhes do imóvel, como preço, descrição e outras informações.
                                Após a edição, as alterações serão salvas permanentemente.
                            </p>

                            {/* Lista de imóveis selecionados */}
                            <div className="max-h-40 overflow-y-auto mb-6 border border-gray-200 rounded-lg p-2">
                                <ul>
                                    {selectedImoveis.map((imovel) => (
                                        <li key={imovel.id} className="py-1 border-b border-gray-100 last:border-0">
                                            {imovel.nome_propriedade} ({imovel.tipo_transacao})
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Formulário de Edição */}
                            <form className="space-y-4">
                                {selectedImoveis.length > 0 && (
                                    <div>
                                        {selectedImoveis.map((imovel) => (
                                            <div key={imovel.id} className="space-y-4">
                                                {/* Nome da Propriedade */}
                                                <div>
                                                    <label htmlFor={`nome_propriedade_${imovel.id}`} className="block text-lg">
                                                        Nome da Propriedade:
                                                    </label>
                                                    <input
                                                        id={`nome_propriedade_${imovel.id}`}
                                                        name="nome_propriedade"
                                                        type="text"
                                                        value={imovel.nome_propriedade}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    />
                                                </div>

                                                {/* Tipo de Transação */}
                                                <div>
                                                    <label htmlFor={`tipo_transacao_${imovel.id}`} className="block text-lg">
                                                        Tipo de Transação:
                                                    </label>
                                                    <input
                                                        id={`tipo_transacao_${imovel.id}`}
                                                        name="tipo_transacao"
                                                        type="text"
                                                        value={imovel.tipo_transacao}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    />
                                                </div>

                                                {/* Valor de Venda */}
                                                <div>
                                                    <label htmlFor={`valor_venda_${imovel.id}`} className="block text-lg">
                                                        Valor de Venda:
                                                    </label>
                                                    <input
                                                        id={`valor_venda_${imovel.id}`}
                                                        name="valor_venda"
                                                        type="number"
                                                        value={imovel.valor_venda}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    />
                                                </div>

                                                {/* Descrição */}
                                                <div>
                                                    <label htmlFor={`descricao_${imovel.id}`} className="block text-lg">
                                                        Descrição:
                                                    </label>
                                                    <textarea
                                                        id={`descricao_${imovel.id}`}
                                                        name="descricao"
                                                        value={imovel.descricao || ""}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </form>

                            <div className="flex justify-center mt-4">
                                <div className="flex justify-around items-center gap-10 w-[90%]">
                                    <Botao
                                        onClick={handleCancel}
                                        texto="Cancelar"
                                    />
                                    <Botao
                                        onClick={editarImovel}
                                        texto={isEditar ? "Editando..." : "Editar"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    )
}