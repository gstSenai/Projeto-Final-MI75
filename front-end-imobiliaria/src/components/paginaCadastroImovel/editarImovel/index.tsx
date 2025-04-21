"use client"
import { useEffect, useState } from "react"
import { Botao } from "@/components/botao/index"
import request from "@/routes/request"
import { FormularioEditarInput } from "../editarImovel/formularioEditarInput"
import { type SubmitHandler, useForm } from "react-hook-form"
import { Montserrat } from "next/font/google"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

const ImovelProps = z.object({
    id: z.number().optional(),
    codigo: z.coerce.number().optional(),
    nome_propriedade: z.string().min(1, { message: "Nome da propriedade é obrigatório" }),
    tipo_transacao: z.string().min(1, { message: "Tipo de transação é obrigatório" }),
    valor_venda: z.coerce.number().min(1, { message: "Valor de venda é obrigatório" }),
    tipo_imovel: z.string().min(1, { message: "Tipo de imóvel é obrigatório" }),
    status_imovel: z.string().min(1, { message: "Status do imóvel é obrigatório" }),
    valor_promocional: z.coerce.number().min(1, { message: "Valor promocional é obrigatório" }),
    test_destaque: z.string().optional(),
    test_visibilidade: z.string().optional(),
    destaque: z.boolean().default(false),
    visibilidade: z.boolean().default(false),
    valor_iptu: z.coerce.number().min(1, { message: "Valor do IPTU é obrigatório" }),
    condominio: z.coerce.number().min(1, { message: "Valor do condomínio é obrigatório" }),
    area_construida: z.coerce.number().min(1, { message: "Área construída é obrigatória" }),
    area_terreno: z.coerce.number().min(1, { message: "Área do terreno é obrigatória" }),
    descricao: z.string().optional(),
    id_endereco: z.object({
        id: z.number(),
        cep: z.string(),
        rua: z.string(),
        numero: z.string(),
        bairro: z.string(),
        cidade: z.string(),
        uf: z.string(),
        complemento: z.string().nullable().optional()
    }),
    id_caracteristicasImovel: z.object({
        id: z.number(),
        numero_quartos: z.number(),
        numero_banheiros: z.number(),
        numero_suites: z.number(),
        numero_vagas: z.number(),
        piscina: z.boolean(),
        numero_salas: z.number()
    })
})

const ImovelCaracteristicas = z.object({
    id: z.number(),
    numero_quartos: z.coerce.number().min(0, { message: "Número de quartos deve ser maior ou igual a zero" }),
    numero_banheiros: z.coerce.number().min(0, { message: "Número de banheiros deve ser maior ou igual a zero" }),
    numero_suites: z.coerce.number().min(0, { message: "Número de suítes deve ser maior ou igual a zero" }),
    numero_vagas: z.coerce.number().min(0, { message: "Número de vagas deve ser maior ou igual a zero" }),
    test_piscina: z.string().optional(),
    piscina: z.boolean().default(false),
    numero_salas: z.coerce.number().min(0, { message: "Número de salas deve ser maior ou igual a zero" }),
})


const EnderecoImovelProps = z.object({
    id: z.number().optional(),
    cep: z.string().min(1, { message: "CEP é obrigatório" }),
    rua: z.string().min(1, { message: "Rua é obrigatória" }),
    numero: z.string().min(1, { message: "Número é obrigatório" }),
    bairro: z.string().min(1, { message: "Bairro é obrigatório" }),
    cidade: z.string().min(1, { message: "Cidade é obrigatória" }),
    uf: z.string().min(1, { message: "UF é obrigatória" }),
    complemento: z.string().optional(),
})

const FormSchema = z.object({
    imovel: ImovelProps,
    imovelCaracteristicas: ImovelCaracteristicas,
    endereco: EnderecoImovelProps
})

type ImovelProps = z.infer<typeof ImovelProps>
type ImovelCaracteristicas = z.infer<typeof ImovelCaracteristicas>
type EnderecoImovelProps = z.infer<typeof EnderecoImovelProps>
type FormData = z.infer<typeof FormSchema>


interface EditarImovelProps {
    selectedImoveis: ImovelProps[]
    onComplete?: () => void
}

export function EditarImovel({ selectedImoveis, onComplete }: EditarImovelProps) {
    console.log("🚀 Componente EditarImovel montado")
    console.log("📋 Imóveis selecionados:", selectedImoveis)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            imovel: {
                tipo_imovel: "",
                tipo_transacao: "",
                test_destaque: "",
                status_imovel: "",
                test_visibilidade: "",
                destaque: false,
                visibilidade: false,
                valor_venda: 0,
                valor_promocional: 0,
                valor_iptu: 0,
                condominio: 0,
                area_construida: 0,
                area_terreno: 0,
                nome_propriedade: "",
                descricao: "",
                id_endereco: {
                    id: 0,
                    cep: "",
                    rua: "",
                    numero: "",
                    bairro: "",
                    cidade: "",
                    uf: "",
                    complemento: undefined
                },
                id_caracteristicasImovel: {
                    id: 0,
                    numero_quartos: 0,
                    numero_banheiros: 0,
                    numero_suites: 0,
                    numero_vagas: 0,
                    piscina: false,
                    numero_salas: 0
                }
            },
        },
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showModal, setShowModal] = useState(true)
    const [editadoComSucesso, setEditadoComSucesso] = useState(false)

    const editarImovel = async (data: Partial<ImovelProps>) => {
        try {
            console.log("Sending address imovel:", data)

            const responses = await Promise.all(
                selectedImoveis.map(async (imovel) => {
                    const caracteristicasImovel = data.id_caracteristicasImovel;

                    const imoveisAtualizado = {
                        ...imovel,
                        ...data,
                        enderecoUsuario: imovel.id_endereco,
                        id_caracteristicasImovel: caracteristicasImovel
                    }

                    if (caracteristicasImovel) {
                        const caracteristicasResponse = await request(
                            "POST",
                            `http://localhost:9090/caracteristicaImovel/create`,
                            caracteristicasImovel
                        );

                        if (caracteristicasResponse) {
                            imoveisAtualizado.id_caracteristicasImovel = caracteristicasResponse as ImovelCaracteristicas;
                        }
                    }

                    return request("PUT", `http://localhost:9090/imovel/update/${imovel.id}`, imoveisAtualizado)
                }),
            )
            return responses
        } catch (error) {
            console.error("Erro ao editar imóvel:", error)
            throw error
        }
    }

    const onSubmitEditImovel: SubmitHandler<FormData> = async (data) => {
        console.log("📝 Iniciando submissão do formulário")
        console.log("📦 Dados recebidos:", data)
        if (isSubmitting) {
            console.log("⚠️ Submissão já em andamento")
            return
        }

        try {
            setIsSubmitting(true)

            console.log("Dados recebidos para validação:", data)

            const { imovel, imovelCaracteristicas } = data

            const imovelSelecionado = selectedImoveis[0]
            const imovelSelecionadoEndereco = selectedImoveis[0].id_endereco

            const caracteristicasAtualizadas = {
                id: imovelSelecionado.id_caracteristicasImovel?.id || 0,
                numero_quartos: imovelCaracteristicas.numero_quartos || 0,
                numero_banheiros: imovelCaracteristicas.numero_banheiros || 0,
                numero_suites: imovelCaracteristicas.numero_suites || 0,
                numero_vagas: imovelCaracteristicas.numero_vagas || 0,
                piscina: imovelCaracteristicas.test_piscina === "Sim",
                numero_salas: imovelCaracteristicas.numero_salas || 0
            }

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
                    ...imovelSelecionadoEndereco,
                },
                id_caracteristicasImovel: caracteristicasAtualizadas
            }

            console.log("Dados do imóvel a serem enviados:", imovelAtualizado)

            const response = await editarImovel(imovelAtualizado)

            if (response) {
                setShowModal(false)
                setEditadoComSucesso(true)

                setTimeout(() => {
                    setEditadoComSucesso(false)
                    if (onComplete) onComplete()
                }, 5000)
            } else {
                throw new Error("Erro ao editar imóvel, id não retornado.")
            }

        } catch (error) {
            console.error("Erro ao editar Imóvel:", error)
            alert(`Erro ao editar imóvel: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        console.log("❌ Modal cancelado")
        setShowModal(false)
        if (onComplete) {
            console.log("✅ Callback onComplete executado")
            onComplete()
        }
    }

    useEffect(() => {
        console.log("🔄 useEffect - selectedImoveis:", selectedImoveis)
        console.log("❌ Erros do formulário:", errors)

        if (selectedImoveis.length > 0) {
            console.log("🏠 Primeiro imóvel selecionado:", selectedImoveis[0])
        }
    }, [selectedImoveis, errors])

    useEffect(() => {
        console.log("🔄 useEffect - selectedImoveis:", selectedImoveis[0])
        if (selectedImoveis.length > 0) {
            const imovel = selectedImoveis[0];

            setValue("imovel", {
                ...imovel,
                test_destaque: imovel.destaque ? "Sim" : "Não",
                test_visibilidade: imovel.visibilidade ? "Pública" : "Privada",
                id_caracteristicasImovel: imovel.id_caracteristicasImovel
            });

            setValue("endereco", {
                cep: imovel.id_endereco?.cep || "",
                rua: imovel.id_endereco?.rua || "",
                numero: imovel.id_endereco?.numero || "",
                bairro: imovel.id_endereco?.bairro || "",
                cidade: imovel.id_endereco?.cidade || "",
                uf: imovel.id_endereco?.uf || "",
                complemento: imovel.id_endereco?.complemento || ""
            });

            setValue("imovelCaracteristicas", {
                id: imovel.id_caracteristicasImovel?.id || 0,
                numero_quartos: imovel.id_caracteristicasImovel?.numero_quartos || 0,
                numero_banheiros: imovel.id_caracteristicasImovel?.numero_banheiros || 0,
                numero_suites: imovel.id_caracteristicasImovel?.numero_suites || 0,
                numero_vagas: imovel.id_caracteristicasImovel?.numero_vagas || 0,
                test_piscina: imovel.id_caracteristicasImovel?.piscina ? "Sim" : "Não",
                piscina: imovel.id_caracteristicasImovel?.piscina || false,
                numero_salas: imovel.id_caracteristicasImovel?.numero_salas || 0
            });
        }
    }, [selectedImoveis, setValue]);

    return (
        <>
            {showModal && (
                <div className={`${montserrat.className} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-8 z-50`}>
                    <div className="bg-white rounded-2xl p-8 max-w-3xl w-full">
                        <div className="flex justify-start w-1/12">
                            <button
                                className="bg-[#DFDAD0] px-3 py-1 rounded-full text-vermelho lg:text-base transition-transform duration-300 hover:scale-110
                             hover:bg-vermelho hover:text-[#DFDAD0]"
                                onClick={handleCancel}
                            >
                                X
                            </button>
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
                                    <form onSubmit={handleSubmit(onSubmitEditImovel)} className="space-y-4">
                                        {selectedImoveis.length > 0 && (
                                            <div>
                                                {selectedImoveis.map((imovel) => (
                                                    <div key={imovel.id} className="space-y-4 pt-10">
                                                        <div className="flex flex-col gap-4">
                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Nome da Propriedade:"
                                                                    placeholder="Nome da Propriedade:"
                                                                    name="imovel.nome_propriedade"
                                                                    value={imovel.nome_propriedade}
                                                                    register={register}
                                                                    errors={errors?.imovel?.nome_propriedade}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Tipo do imóvel:"
                                                                    placeholder="Tipo do imóvel:"
                                                                    name="imovel.tipo_imovel"
                                                                    value={imovel.tipo_imovel}
                                                                    register={register}
                                                                    errors={errors?.imovel?.tipo_imovel}
                                                                    options={["Casa", "Apartamento", "Terreno"]}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full max-h-[80vh] overflow-y-auto">
                                                                <FormularioEditarInput
                                                                    label="Tipo de Transação:"
                                                                    placeholder=" Tipo de Transação:"
                                                                    name="imovel.tipo_transacao"
                                                                    value={imovel.tipo_transacao}
                                                                    register={register}
                                                                    errors={errors?.imovel?.tipo_transacao}
                                                                    options={["Venda", "Locação", "Venda e Locação"]}
                                                                    required
                                                                    custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Valor de Venda (R$):"
                                                                    placeholder="Valor de Venda (R$)"
                                                                    name="imovel.valor_venda"
                                                                    value={imovel.valor_venda}
                                                                    register={register}
                                                                    errors={errors?.imovel?.valor_venda}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Valor Promocional (R$):"
                                                                    placeholder="Valor Promocional (R$)"
                                                                    name="imovel.valor_promocional"
                                                                    value={imovel.valor_promocional}
                                                                    register={register}
                                                                    errors={errors?.imovel?.valor_promocional}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Permitir destaque:"
                                                                    placeholder="Permitir destaque:"
                                                                    name="imovel.test_destaque"
                                                                    value={imovel.destaque ? "Sim" : "Não"}
                                                                    register={register}
                                                                    errors={errors?.imovel?.test_destaque}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                    options={["Sim", "Não"]}
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Visibilidade:"
                                                                    placeholder="Visibilidade"
                                                                    name="imovel.test_visibilidade"
                                                                    value={imovel.visibilidade ? "Pública" : "Privada"}
                                                                    register={register}
                                                                    errors={errors?.imovel?.test_visibilidade}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                    options={["Pública", "Privada"]}
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Valor do IPTU (R$):"
                                                                    placeholder="Valor do IPTU (R$)"
                                                                    name="imovel.valor_iptu"
                                                                    value={imovel.valor_promocional}
                                                                    register={register}
                                                                    errors={errors?.imovel?.valor_iptu}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Taxa de Condomínio (R$):"
                                                                    placeholder="Taxa de Condomínio Caso tenha (R$)"
                                                                    name="imovel.condominio"
                                                                    value={imovel.condominio}
                                                                    register={register}
                                                                    errors={errors?.imovel?.condominio}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Status do imóvel:"
                                                                    placeholder="Status do imóvel"
                                                                    name="imovel.status_imovel"
                                                                    value={imovel.status_imovel}
                                                                    register={register}
                                                                    errors={errors?.imovel?.status_imovel}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                    options={["Vendido", "Disponivel"]}
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Área Construída (m²):"
                                                                    placeholder="Área Construída (m²)"
                                                                    name="imovel.area_construida"
                                                                    value={imovel.area_construida}
                                                                    icon={{ type: "areaCT" }}
                                                                    register={register}
                                                                    errors={errors?.imovel?.area_construida}
                                                                    required
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Área do Terreno (m²):"
                                                                    placeholder="Valor do IPTU (R$)"
                                                                    name="imovel.area_terreno"
                                                                    icon={{ type: "areaCT" }}
                                                                    value={imovel.area_terreno}
                                                                    register={register}
                                                                    errors={errors?.imovel?.area_terreno}
                                                                    required
                                                                    custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Número de Quartos:"
                                                                    placeholder="Número de Quartos:"
                                                                    name="imovelCaracteristicas.numero_quartos"
                                                                    value={imovel.id_caracteristicasImovel?.numero_quartos || 0}
                                                                    register={register}
                                                                    errors={errors?.imovelCaracteristicas?.numero_quartos}
                                                                    icon={{ type: "dormitorio" }}
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Número de Suítes:"
                                                                    placeholder="Número de Suítes:"
                                                                    name="imovelCaracteristicas.numero_suites"
                                                                    value={imovel.id_caracteristicasImovel?.numero_suites || 0}
                                                                    register={register}
                                                                    errors={errors?.imovelCaracteristicas?.numero_suites}
                                                                    icon={{ type: "suite" }}
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Contém Piscina:"
                                                                    placeholder="Contém Piscina:"
                                                                    name="imovelCaracteristicas.test_piscina"
                                                                    value={imovel.id_caracteristicasImovel?.piscina ? "Sim" : "Não"}
                                                                    register={register}
                                                                    errors={errors?.imovelCaracteristicas?.test_piscina}
                                                                    icon={{ type: "praia" }}
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                    options={["Sim", "Não"]}
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Número de Banheiros:"
                                                                    placeholder="Número de Banheiros:"
                                                                    name="imovelCaracteristicas.numero_banheiros"
                                                                    value={imovel.id_caracteristicasImovel?.numero_banheiros || 0}
                                                                    register={register}
                                                                    errors={errors?.imovelCaracteristicas?.numero_banheiros}
                                                                    icon={{ type: "banheiro" }}
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Vagas de Garagem:"
                                                                    placeholder="Vagas de Garagem:"
                                                                    name="imovelCaracteristicas.numero_vagas"
                                                                    value={imovel.id_caracteristicasImovel?.numero_vagas || 0}
                                                                    register={register}
                                                                    errors={errors?.imovelCaracteristicas?.numero_vagas}
                                                                    icon={{ type: "garagem" }}
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Número de Salas:"
                                                                    placeholder="Número de Salas:"
                                                                    name="imovelCaracteristicas.numero_salas"
                                                                    value={imovel.id_caracteristicasImovel?.numero_salas || 0}
                                                                    register={register}
                                                                    errors={errors?.imovelCaracteristicas?.numero_salas}
                                                                    icon={{ type: "sala" }}
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>

                                                            <div className="w-full">
                                                                <FormularioEditarInput
                                                                    label="Descrição:"
                                                                    placeholder="Descrição"
                                                                    name="imovel.descricao"
                                                                    value={imovel.descricao || ""}
                                                                    register={register}
                                                                    errors={errors?.imovel?.descricao}
                                                                    custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end pt-6">
                                                            <div className="flex justify-around items-center gap-10 w-[50%]">
                                                                <Botao
                                                                    type="button"
                                                                    onClick={handleCancel}
                                                                    texto="Cancelar"
                                                                    className="bg-vermelho h-10"
                                                                />
                                                                <Botao
                                                                    type="submit"
                                                                    texto={isSubmitting ? "Editando..." : "Editar"}
                                                                    className="bg-vermelho h-10"
                                                                    disabled={isSubmitting}
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
                        </div>
                    </div>
                </div>
            )}

            {editadoComSucesso && (
                <div className="fixed bottom-10 left-0 z-50">
                    <div className="bg-vermelho w-52 flex gap-1 p-3 rounded-tr-lg rounded-br-lg text-white shadow-lg">
                        <p className="text-center">Editado com Sucesso!</p>
                    </div>
                </div>
            )}
        </>
    )
}


