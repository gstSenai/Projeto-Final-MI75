"use client"
import { useState, useEffect } from "react"
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
    id_endereco: EnderecoImovelProps
    caracteristicas: ImovelCaracteristicas
}

interface ImovelCaracteristicas {
    id?: number
    idImovel: number
    numero_quartos: number
    numero_banheiros: number
    numero_suites: number
    numero_vagas: number
    test_piscina?: string
    piscina: boolean
    numero_salas: number
}

interface EnderecoImovelProps {
    id: number
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    complemento?: string
}


interface EditarImovelProps {
    selectedImoveis: ImovelProps[]
    selectedImoveisCaracteristicas: ImovelCaracteristicas[]
    onComplete?: () => void
}

export function EditarImovel({ selectedImoveis, onComplete }: EditarImovelProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<{ imovel: ImovelProps; imovelCaracteristicas: ImovelCaracteristicas; endereco: EnderecoImovelProps }>();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showEditTrue, setShowEditTrue] = useState(false)
    const [lastAddedImovel, setLastAddedImovel] = useState<ImovelProps | null>(null)
    const [caracteristicasImovel, setCaracteristicasImovel] = useState<number>()
    const [showModal, setShowModal] = useState(true)
    const [isEditar] = useState(false)
    const [showEditImovel, setShowEditImovel] = useState(false)
    const [showEditEndereco, setShowEditEndereco] = useState(false)
    const [imovelCaracteristicas, setImovelCaracteristicas] = useState<ImovelCaracteristicas | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0)

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

    const getCaracImovel = async (id: number) => {
        try {
            const response = await request('GET', `http://localhost:9090/caracteristicaImovel/getById/${id}`)
            return response;
        } catch (error) {
            console.error("Erro ao editar imóvel:", error)
            throw error
        }
    }

    const editarCaracImovel = async (data: ImovelCaracteristicas) => {
        try {

            console.log("Sending address imovel:", data);

            for (const imovelCaracteristicas of selectedImoveis) {
                const response = await request('PUT', `http://localhost:9090/caracteristicaImovel/update/${imovelCaracteristicas.id}`, data)
                return response
            }
        } catch (error) {
            console.error("Erro ao editar imóvel:", error)
            throw error
        }
    }


    const editarEndereco = async (data: EnderecoImovelProps) => {
        try {
            console.log("📤 Enviando endereço do usuário:", data);

            for (const imovel of selectedImoveis) {
                if (!imovel.id_endereco || !imovel.id_endereco.id) {
                    console.warn("⚠️ Usuário sem endereço cadastrado:", imovel);
                    continue;
                }

                const enderecoAtualizado = {
                    idImovel: imovel.id_endereco.id,
                    cep: data.cep,
                    rua: data.rua,
                    numero: data.numero,
                    bairro: data.bairro,
                    cidade: data.cidade,
                    uf: data.uf,
                    complemento: data.complemento,
                };

                const response = await request("PUT", `http://localhost:9090/endereco/update/${imovel.id_endereco.id}`, enderecoAtualizado);
                console.log("✅ Endereço atualizado com sucesso:", response);
                return response
            }
        } catch (error) {
            console.error("❌ Erro ao editar endereço:", error);
            throw error;
        }
    };


    const onSubmitEditImovel: SubmitHandler<{ imovel: ImovelProps; imovelCaracteristicas: ImovelCaracteristicas; }> = async (data) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            console.log("Dados recebidos para validação:", data);

            const { imovel, imovelCaracteristicas } = data;

            const imovelSelecionado = selectedImoveis[0];
            const imovelSelecionadoEndereco = selectedImoveis[0].id_endereco

            const imovelAtualizado = {
                ...imovelSelecionado,
                nome_propriedade: imovel.nome_propriedade,
                tipo_transacao: imovel.tipo_transacao,
                valor_venda: imovel.valor_venda || 0,
                tipo_imovel: imovel.tipo_imovel,
                status_imovel: imovel.status_imovel,
                valor_promocional: imovel.valor_promocional,
                destaque: imovel.test_destaque === "Sim",
                visibilidade: imovel.test_visibilidade === "Público",
                valor_iptu: imovel.valor_iptu || 0,
                condominio: imovel.condominio || 0,
                area_construida: imovel.area_construida || 0,
                area_terreno: imovel.area_terreno || 0,
                descricao: imovel.descricao || "",
                id_endereco: {
                    ...imovelSelecionadoEndereco
                },
            }

            console.log("Dados do imóvel a serem enviados:", data);

            const response = await editarImovel(imovelAtualizado);

            if (response) {
            } else {
                throw new Error("Erro ao criar imóvel, id não retornado.");
            }

            console.log("Resposta do servidor:", response);

            const imovelCaracAtualizado = {
                id: imovelCaracteristicas?.id,
                idImovel: response.id,
                numero_quartos: imovelCaracteristicas?.numero_quartos ?? 0,
                numero_banheiros: imovelCaracteristicas?.numero_banheiros ?? 0,
                numero_suites: imovelCaracteristicas?.numero_suites ?? 0,
                numero_vagas: imovelCaracteristicas?.numero_vagas ?? 0,
                piscina: imovelCaracteristicas?.test_piscina === "Sim",
                numero_salas: imovelCaracteristicas?.numero_salas ?? 0
            };


            const responseCarac = await editarCaracImovel(imovelCaracAtualizado)

            setCaracteristicasImovel(responseCarac)
            console.log("Resposta do servidor:", responseCarac);

            if (response) {
                setLastAddedImovel(response[0]);
                setShowModal(false);
                setShowEditTrue(true);
            } else {
                console.error("Erro: Resposta inválida ao adicionar imóvel.");
            }

            const imovelAtualizadoCompleto = {
                ...imovelSelecionado,
                nome_propriedade: imovel.nome_propriedade,
                tipo_transacao: imovel.tipo_transacao,
                valor_venda: imovel.valor_venda || 0,
                tipo_imovel: imovel.tipo_imovel,
                status_imovel: imovel.status_imovel,
                valor_promocional: imovel.valor_promocional,
                destaque: imovel.test_destaque === "Sim",
                visibilidade: imovel.test_visibilidade === "Público",
                valor_iptu: imovel.valor_iptu || 0,
                condominio: imovel.condominio || 0,
                area_construida: imovel.area_construida || 0,
                area_terreno: imovel.area_terreno || 0,
                descricao: imovel.descricao || "",
                id_endereco: {
                    ...imovelSelecionadoEndereco
                },
                caracteristicasImovel: {
                    ...imovelCaracAtualizado
                }
            }

            console.log("Dados do imóvel a serem enviados:", data);

            const responseAtualizadaCompleto = await editarImovel(imovelAtualizado);

            if (responseAtualizadaCompleto) {
            } else {
                throw new Error("Erro ao criar imóvel, id não retornado.");
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

    const onSubmitEditUsersEndereco: SubmitHandler<{ endereco: EnderecoImovelProps }> = async (data) => {
        if (isSubmitting) return

        try {
            setIsSubmitting(true)

            console.log("Dados recebidos para validação:", data)

            const imovelSelecionado = selectedImoveis[0]

            const endereco = {
                ...imovelSelecionado,
                idImovel: imovelSelecionado.id,
                cep: data.endereco.cep,
                rua: data.endereco.rua,
                numero: data.endereco.numero,
                bairro: data.endereco.bairro,
                cidade: data.endereco.cidade,
                uf: data.endereco.uf,
                complemento: data.endereco.complemento,
            }

            console.log("Dados do usuário a serem enviados:", data)

            const response = await editarEndereco(endereco)
            console.log("Resposta do servidor:", response)
            if (response) {
                setShowModal(false)
                setShowEditTrue(true)
            } else {
                console.error("Erro: Resposta inválida ao adicionar usuário.")
            }

            if (onComplete) onComplete()

            setTimeout(() => setShowEditTrue(false), 5000)
        } catch (error) {
            console.error("Erro ao editar usuário:", error)
            alert(`Erro ao editar usuário: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    const refreshData = () => {
        setRefreshTrigger((atualizar) => atualizar + 1)
    }

    const handleEditarImovelDados = () => {
        setShowEditImovel(!showEditImovel)
        setShowEditEndereco(false)
        if (showEditImovel) {
            refreshData()
        }
    }

    const handleEditarImovelEndereco = () => {
        setShowEditEndereco(!showEditEndereco)
        setShowEditImovel(false)
        if (showEditEndereco) {
            refreshData()
        }
    }

    const handleCancel = () => {
        setShowModal(false)
        if (onComplete) {
            onComplete()
        }
    }

    useEffect(() => {
        if (selectedImoveis.length > 0) {
            const imovelSelecionado = selectedImoveis[0];
            getCaracImovel(imovelSelecionado.id).then((caracteristicas) => {
                setImovelCaracteristicas(caracteristicas);
            });
        }
    }, [selectedImoveis]);


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
                                                                    custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`numero_quartos_${imovel.id}`} className="block text-lg">
                                                                    Número de Quartos:
                                                                </label>
                                                                <FormularioEditarInput
                                                                    placeholder="Número de Quartos:"
                                                                    name="imovelCaracteristicas.numero_quartos"
                                                                    value={imovel.caracteristicas.numero_quartos}
                                                                    register={register}
                                                                    icon={{ type: "dormitorio" }}
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`numero_suites_${imovel.id}`} className="block text-lg">
                                                                    Número de Suítes:
                                                                </label>
                                                                <FormularioEditarInput
                                                                    placeholder="Número de Suítes:"
                                                                    name="imovelCaracteristicas.numero_suites"
                                                                    value={imovel.caracteristicas.numero_suites}
                                                                    register={register}
                                                                    icon={{ type: "suite" }}
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`test_piscina_${imovel.id}`} className="block text-lg">
                                                                    Contém Piscina:
                                                                </label>
                                                                <FormularioEditarInput
                                                                    placeholder="Contém Piscina:"
                                                                    name="imovelCaracteristicas.test_piscina"
                                                                    value={imovel.caracteristicas.piscina}
                                                                    register={register}
                                                                    icon={{ type: "praia" }}
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                    options={["Sim", "Não"]}
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`numero_banheiros_${imovel.id}`} className="block text-lg">
                                                                    Número de Banheiros:
                                                                </label>
                                                                <FormularioEditarInput
                                                                    placeholder="Número de Banheiros:"
                                                                    name="imovelCaracteristicas.numero_banheiros"
                                                                    value={imovel.caracteristicas.numero_banheiros}
                                                                    register={register}
                                                                    icon={{ type: "banheiro" }}
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`numero_vagas_${imovel.id}`} className="block text-lg">
                                                                    Vagas de Garagem:
                                                                </label>
                                                                <FormularioEditarInput
                                                                    placeholder="Vagas de Garagem:"
                                                                    name="imovelCaracteristicas.numero_vagas"
                                                                    value={imovel.caracteristicas.numero_vagas}
                                                                    register={register}
                                                                    icon={{ type: "garagem" }}
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <label htmlFor={`numero_salas_${imovel.id}`} className="block text-lg">
                                                                    Número de Salas:
                                                                </label>
                                                                <FormularioEditarInput
                                                                    placeholder="Número de Salas:"
                                                                    name="imovelCaracteristicas.numero_salas"
                                                                    value={imovel.caracteristicas.numero_salas}
                                                                    register={register}
                                                                    icon={{ type: "sala" }}
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
                    </div >
                </div >
            )
            }
        </>
    )
}