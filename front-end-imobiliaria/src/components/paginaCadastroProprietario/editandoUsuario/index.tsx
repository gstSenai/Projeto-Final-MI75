"use client"
import { useState, useEffect } from "react"
import React from "react"

import { Botao } from "@/components/botao"
import { FormularioEditarInput } from "../editandoUsuario/formularioEditarInput"
import { FormularioImagemEdit } from "../editandoUsuario/formularioImagemEdit"
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
    imagem_proprietario: z.string().optional(),
    enderecoProprietario: z.object({
        id: z.number().optional(),
        cep: z.string().min(8, { message: "CEP inválido" }),
        rua: z.string().min(1, { message: "Rua inválida" }),
        tipo_residencia: z.string().min(1, { message: "Tipo de residência inválido" }),
        numero_imovel: z.coerce.number().min(1, { message: "Número do imóvel inválido" }),
        numero_apartamento: z.coerce.number().min(1, { message: "Número do apartamento inválido" }),
        bairro: z.string().min(1, { message: "Bairro inválido" }),
        cidade: z.string().min(1, { message: "Cidade inválida" }),
        uf: z.string().min(2, { message: "UF inválida" }),
    }).optional(),
    ImovelProprietarioResponseDTO: z.array(z.object({
        id: z.number().optional(),
        codigo: z.number().optional(),
        nome_propriedade: z.string().min(1, { message: "Nome da propriedade inválido" }),
        tipo_transacao: z.string().min(1, { message: "Tipo de transação inválido" }),
        valor_venda: z.number().min(1, { message: "Valor de venda inválido" }),
        tipo_imovel: z.string().min(1, { message: "Tipo de imóvel inválido" }),
        status_imovel: z.string().min(1, { message: "Status do imóvel inválido" }),
        valor_promocional: z.number().min(1, { message: "Valor promocional inválido" }),
        destaque: z.boolean().optional(),
        visibilidade: z.boolean().optional(),
        valor_iptu: z.number().min(1, { message: "Valor doIPTU inválido" }),
        condominio: z.number().min(1, { message: "Condomínio inválido" }),
        area_construida: z.number().min(1, { message: "Área construída inválida" }),
        area_terreno: z.number().min(1, { message: "Área do terreno inválida" }),
        descricao: z.string().min(1, { message: "Descrição inválida" }),
    })).optional(),
})

const FormSchema = z.object({
    proprietario: ProprietarioProps,
})

type ProprietarioData = z.infer<typeof ProprietarioProps>
export type FormData = z.infer<typeof FormSchema>

interface EditarProprietarioData {
    selectedProprietarios: ProprietarioData[]
    onComplete?: () => void
}

export function EditarProprietario({ selectedProprietarios, onComplete }: EditarProprietarioData) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: selectedProprietarios?.[0] ? {
            proprietario: {
                nome: selectedProprietarios[0].nome,
                sobrenome: selectedProprietarios[0].sobrenome,
                cpf: selectedProprietarios[0].cpf,
                telefone: selectedProprietarios[0].telefone,
                celular: selectedProprietarios[0].celular,
                data_nascimento: selectedProprietarios[0].data_nascimento,
                email: selectedProprietarios[0].email,
                enderecoProprietario: selectedProprietarios[0].enderecoProprietario,
                ImovelProprietarioResponseDTO: selectedProprietarios[0].ImovelProprietarioResponseDTO,
            },
        } : undefined
    })


    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagem, setImagem] = useState<File | null>(null)
    const [showModal, setShowModal] = useState(true)


    const editarProprietarios = async (data: Partial<ProprietarioData>, imagem: File | null) => {
        try {
            console.log("📤 Enviando dados para atualização:", data)

            const formData = new FormData()

            formData.append("proprietario", JSON.stringify(data))

            if (imagem) {
                formData.append("imagem", imagem)
            }

            const response = await fetch(`http://localhost:9090/proprietario/update/${data.id}`, {
                method: "PUT",
                body: formData,
            })


            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`)
            }

            const responseData = await response.json()
            console.log("✅ Proprietário atualizado com sucesso:", responseData)

            return responseData
        } catch (error) {
            console.error("❌ Erro ao editar proprietário:", error)
            throw error
        }
    }

    const onSubmitEditProprietarios: SubmitHandler<{ proprietario: ProprietarioData }> = async (data) => {
        if (isSubmitting) return

        try {
            setIsSubmitting(true)

            console.log("Dados recebidos para validação:", data)

            const { proprietario } = data

            const proprietarioSelecionadoId = selectedProprietarios[0].id

            const proprietarioAtualizado = {
                ...proprietario,
                id: proprietarioSelecionadoId,
                nome: proprietario.nome,
                sobrenome: proprietario.sobrenome,
                cpf: proprietario.cpf,
                telefone: proprietario.telefone,
                celular: proprietario.celular,
                data_nascimento: proprietario.data_nascimento,
                email: proprietario.email,
                enderecoProprietario: proprietario.enderecoProprietario,
                ImovelProprietarioResponseDTO: proprietario.ImovelProprietarioResponseDTO,
            }

            console.log("Dados do proprietário a serem enviados:", proprietarioAtualizado)

            const response = await editarProprietarios(proprietarioAtualizado, imagem || null)
            console.log("Resposta do servidor:", response)
            if (response) {
                setShowModal(false)
            } else {
                console.error("Erro: Resposta inválida ao adicionar proprietário.")
            }

            if (onComplete) onComplete()

        } catch (error) {
            console.error("Erro ao editar proprietário:", error)
            alert(`Erro ao editar proprietário: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        setShowModal(false)
        if (onComplete) {
            onComplete()
        }
    }

    const handleClick = () => {
        console.log("Botão clicado!");
        handleSubmit(onSubmitEditProprietarios)();
    };

    useEffect(() => {
        if (selectedProprietarios && selectedProprietarios.length > 0) {
            console.log("Dados do proprietário:", selectedProprietarios)
            console.log(errors)
        }
    }, [selectedProprietarios, errors])


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
                            >
                                X
                            </button>
                        </div>

                        <div className="flex flex-col w-full overflow-y-auto max-h-[80vh] pt-5 px-10">
                            <div className="flex items-center justify-center">
                                <h1 className="text-3xl font-semibold text-vermelho mb-4">Editar Dados do Usuário</h1>
                            </div>
                            <div>
                                <div>
                                    <form className="space-y-4">
                                        {selectedProprietarios.length > 0 && (
                                            <div>
                                                {selectedProprietarios.map((proprietario) => (
                                                    <React.Fragment key={proprietario.id}>
                                                        <FormularioImagemEdit
                                                            handleImageUpload={setImagem}
                                                            imagemAtual={proprietario.imagem_proprietario}
                                                        />
                                                        <div className="space-y-4 pt-10">
                                                            <div className="flex flex-col gap-4">
                                                                <div className="w-full">
                                                                    <label htmlFor={`nome_${proprietario.id}`} className="block text-lg">
                                                                        Nome:
                                                                    </label>
                                                                    <FormularioEditarInput
                                                                        placeholder="Ex: Caio"
                                                                        name="proprietario.nome"
                                                                        value={proprietario.nome}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errors?.proprietario?.nome}
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <label htmlFor={`sobrenome_${proprietario.id}`} className="block text-lg">
                                                                        Sobrenome:
                                                                    </label>
                                                                    <FormularioEditarInput
                                                                        placeholder="Ex: Souza"
                                                                        name="proprietario.sobrenome"
                                                                        value={proprietario.sobrenome}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errors?.proprietario?.sobrenome}
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <label htmlFor={`cpf_${proprietario.id}`} className="block text-lg">
                                                                        CPF:
                                                                    </label>

                                                                    <FormularioEditarInput
                                                                        placeholder=""
                                                                        name="proprietario.cpf"
                                                                        value={proprietario.cpf}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errors?.proprietario?.cpf}
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <label htmlFor={`email_${proprietario.id}`} className="block text-lg">
                                                                        E-mail:
                                                                    </label>

                                                                    <FormularioEditarInput
                                                                        placeholder="Ex: caio@gmail.com"
                                                                        name="proprietario.email"
                                                                        value={proprietario.email}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errors?.proprietario?.email}
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <label htmlFor={`telefone_${proprietario.id}`} className="block text-lg">
                                                                        Telefone:
                                                                    </label>

                                                                    <FormularioEditarInput
                                                                        placeholder=""
                                                                        name="proprietario.telefone"
                                                                        value={proprietario.telefone}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errors?.proprietario?.telefone}
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <label htmlFor={`celular_${proprietario.id}`} className="block text-lg">
                                                                        Celular:
                                                                    </label>

                                                                    <FormularioEditarInput
                                                                        placeholder=""
                                                                        name="proprietario.telefone"
                                                                        value={proprietario.celular}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errors?.proprietario?.celular}
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <label htmlFor={`data_nascimento_${proprietario.id}`} className="block text-lg">
                                                                        Data de Nascimento:
                                                                    </label>

                                                                    <FormularioEditarInput
                                                                        placeholder=""
                                                                        name="proprietario.data_nascimento"
                                                                        value={proprietario.data_nascimento}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errors?.proprietario?.data_nascimento}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                            <div className="flex justify-end pt-6">
                                <div className="flex justify-around items-center gap-10 w-[50%]">
                                    <Botao onClick={handleCancel} texto="Cancelar" className="bg-vermelho h-10" />
                                    <Botao
                                        onClick={handleClick}
                                        texto="Editar"
                                        className="bg-vermelho h-10"
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


