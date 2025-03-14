"use client"
import { useState } from "react"
import { Botao } from "@/components/botao"
import request from "@/routes/request"
import { FormularioEditarInput } from "../editarImovel/formularioEditarInput";
import { SubmitHandler, useForm } from "react-hook-form";

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
    const { register, handleSubmit, formState: { errors } } = useForm<{ imovel: ImovelProps }>();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showEditTrue, setShowEditTrue] = useState(false)
    const [lastAddedImovel, setLastAddedImovel] = useState<ImovelProps | null>(null)
    const [showModal, setShowModal] = useState(true)
    const [isEditar] = useState(false)

    const editarImovel = async (data: ImovelProps) => {
        try {

            console.log("Sending address imovel:", data);

            for (const imovel of selectedImoveis) {
                const response = await request('PUT', `http://localhost:9090/imovel/update/${imovel.id}`, data)
                return response
            }
        } catch (error) {
            console.error("Erro ao editar imóvel:", error)
            throw error
        }
    }

    const onSubmitEditImovel: SubmitHandler<{ imovel: ImovelProps }> = async (data) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            console.log("Dados recebidos para validação:", data);

            const imovelSelecionado = selectedImoveis[0];

            const imovelAtualizado = {
                ...imovelSelecionado,
                nome_propriedade: data.imovel.nome_propriedade,
                tipo_transacao: data.imovel.tipo_transacao,
                valor_venda: data.imovel.valor_venda || 0,
                tipo_imovel: data.imovel.tipo_imovel,
                status_imovel: data.imovel.status_imovel,
                valor_promocional: data.imovel.valor_promocional,
                destaque: data.imovel.test_destaque === "Sim",
                visibilidade: data.imovel.test_visibilidade === "Público",
                valor_iptu: data.imovel.valor_iptu || 0,
                condominio: data.imovel.condominio || 0,
                area_construida: data.imovel.area_construida || 0,
                area_terreno: data.imovel.area_terreno || 0,
                descricao: data.imovel.descricao || "",
            }

            console.log("Dados do imóvel a serem enviados:", data);

            const response = await editarImovel(imovelAtualizado);
            console.log("Resposta do servidor:", response);
            if (response) {
                setLastAddedImovel(response);
                setShowModal(false);
                setShowEditTrue(true);
            } else {
                console.error("Erro: Resposta inválida ao adicionar imóvel.");
            }

            if (onComplete) onComplete();

            setTimeout(() => setShowEditTrue(false), 5000);
        } catch (error) {
            console.error("Erro ao editar Imóvel:", error);
            alert(`Erro ao editar imóvel: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        } finally {
            setIsSubmitting(false);
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-8 z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-3xl w-full">
                        <div className="flex justify-start w-1/12">
                            <button
                                className="bg-[#DFDAD0] py-2 px-4 rounded-full text-vermelho lg:text-2xl transition-transform duration-300 hover:scale-110
                             hover:bg-vermelho hover:text-[#DFDAD0]"
                                onClick={handleCancel}
                            >X</button>
                        </div>
                        <div className="flex flex-col w-full overflow-y-auto max-h-[80vh] pt-5 px-10">
                            <h2 className="text-3xl font-semibold text-vermelho mb-4">Editar Imóveis</h2>
                            <div>
                                <div className="flex flex-col gap-4">
                                    <div className="bg-slate-500/70 h-[14rem] rounded-lg"></div>
                                    <div className="flex gap-2">
                                        <div className="bg-slate-500/70 w-full h-14 rounded-lg"></div>
                                        <div className="bg-slate-500/70 w-full h-14 rounded-lg"></div>
                                        <div className="bg-slate-500/70 w-full h-14 rounded-lg"></div>
                                        <p>SETA</p>
                                    </div>
                                </div>
                                <div>
                                    <form className="space-y-4">
                                        {selectedImoveis.length > 0 && (
                                            <div>
                                                {selectedImoveis.map((imovel) => (
                                                    <div key={imovel.id} className="space-y-4 pt-10">
                                                        <div className="flex flex-col gap-4">

                                                            <div className="w-full">
                                                                <label htmlFor={`nome_propriedade_${imovel.id}`} className="block text-lg">
                                                                    Nome da Propriedade:
                                                                </label>
                                                                <FormularioEditarInput
                                                                    placeholder=""
                                                                    name="imovel.nome_propriedade"
                                                                    value={imovel.nome_propriedade}
                                                                    register={register}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`tipo_imovel_${imovel.id}`} className="block text-lg">
                                                                    Tipo do imóvel:
                                                                </label>
                                                                <FormularioEditarInput
                                                                    placeholder="Tipo do imóvel:"
                                                                    name="imovel.tipo_imovel"
                                                                    value={imovel.tipo_imovel}
                                                                    register={register}
                                                                    options={["Casa", "Apartamento", "Terreno"]}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full max-h-[80vh] overflow-y-auto">
                                                                <label htmlFor={`tipo_transacao_${imovel.id}`} className="block text-lg">
                                                                    Tipo de Transação:
                                                                </label>
                                                                <FormularioEditarInput
                                                                    placeholder=" Tipo de Transação:"
                                                                    name="imovel.tipo_transacao"
                                                                    value={imovel.tipo_transacao}
                                                                    register={register}
                                                                    options={["Venda", "Locação", "Venda e Locação"]}
                                                                    required
                                                                    custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`valor_venda_${imovel.id}`} className="block text-lg">
                                                                    Valor de Venda  (R$):
                                                                </label>

                                                                <FormularioEditarInput
                                                                    placeholder="Valor de Venda (R$)"
                                                                    name="imovel.valor_venda"
                                                                    value={imovel.valor_venda}
                                                                    register={register}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`valor_venda_${imovel.id}`} className="block text-lg">
                                                                    Valor Promocional (R$):
                                                                </label>

                                                                <FormularioEditarInput
                                                                    placeholder="Valor Promocional (R$)"
                                                                    name="imovel.valor_promocional"
                                                                    value={imovel.valor_promocional}
                                                                    register={register}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`valor_venda_${imovel.id}`} className="block text-lg">
                                                                    Permitir destaque:
                                                                </label>

                                                                <FormularioEditarInput
                                                                    placeholder="Permitir destaque:"
                                                                    name="imovel.test_destaque"
                                                                    value={imovel.destaque}
                                                                    register={register}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                    options={["Sim", "Não"]}
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`visibilidade_${imovel.id}`} className="block text-lg">
                                                                    Visibilidade:
                                                                </label>

                                                                <FormularioEditarInput
                                                                    placeholder="Visibilidade"
                                                                    name="imovel.test_visibilidade"
                                                                    value={imovel.visibilidade}
                                                                    register={register}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                    options={["Pública", "Privada"]}
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`valor_venda_${imovel.id}`} className="block text-lg">
                                                                    Valor do IPTU (R$):
                                                                </label>

                                                                <FormularioEditarInput
                                                                    placeholder="Valor do IPTU (R$)"
                                                                    name="imovel.valor_iptu"
                                                                    value={imovel.valor_promocional}
                                                                    register={register}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`valor_venda_${imovel.id}`} className="block text-lg">
                                                                    Taxa de Condomínio (R$):
                                                                </label>

                                                                <FormularioEditarInput
                                                                    placeholder="Taxa de Condomínio Caso tenha (R$)"
                                                                    name="imovel.condominio"
                                                                    value={imovel.condominio}
                                                                    register={register}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`valor_venda_${imovel.id}`} className="block text-lg">
                                                                    Status do imóvel:
                                                                </label>

                                                                <FormularioEditarInput
                                                                    placeholder="Status do imóvel"
                                                                    name="imovel.status_imovel"
                                                                    value={imovel.status_imovel}
                                                                    register={register}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                    options={["Vendido", "Disponivel"]}
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`valor_venda_${imovel.id}`} className="block text-lg">
                                                                    Área Construída (m²):
                                                                </label>

                                                                <FormularioEditarInput
                                                                    placeholder="Área Construída (m²)"
                                                                    name="imovel.area_construida"
                                                                    value={imovel.area_construida}
                                                                    register={register}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`area_terreno_${imovel.id}`} className="block text-lg">
                                                                    Área do Terreno (m²):
                                                                </label>

                                                                <FormularioEditarInput
                                                                    placeholder="Valor do IPTU (R$)"
                                                                    name="imovel.area_terreno"
                                                                    value={imovel.area_terreno}
                                                                    register={register}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`descricao${imovel.id}`} className="block text-lg">
                                                                    Descrição:
                                                                </label>

                                                                <FormularioEditarInput
                                                                    placeholder="Descrição"
                                                                    name="imovel.descricao"
                                                                    value={imovel.descricao || ""}
                                                                    register={register}
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                            <div className="flex justify-end pt-6">
                                <div className="flex justify-around items-center gap-10 w-[50%]">
                                    <Botao
                                        onClick={handleCancel}
                                        texto="Cancelar"
                                    />
                                    <Botao
                                        onClick={handleSubmit(onSubmitEditImovel)}
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