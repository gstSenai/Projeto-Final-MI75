"use client"
import { useState, useEffect } from "react"
import React from "react"
import { AnimatePresence, motion } from "framer-motion"

import { Botao } from "@/components/botao"
import { FormularioEditarInput } from "./formularioEditarInput"
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormularioImagemEditProprietario } from "./formularioImagemEditProprietario"

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
    imagem_proprietario: z.string().optional(),
})

const FormSchema = z.object({
    proprietario: ProprietarioProps,
})

type ProprietarioProps = z.infer<typeof ProprietarioProps>
export type FormData = z.infer<typeof FormSchema>

interface EditarProprietarioProps {
    selectedProprietarios: ProprietarioProps[]
    onComplete?: () => void
}

export function EditarProprietario({ selectedProprietarios, onComplete }: EditarProprietarioProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger
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
            },
        } : undefined
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagem, setImagem] = useState<File | null>(null)
    const [showModal, setShowModal] = useState(true)
    const [editadoComSucesso, setEditadoComSucesso] = useState(false)
    const [lastEditedProprietario, setLastEditedProprietario] = useState<ProprietarioProps | null>(null)

    const deleteProprietario = async (proprietarioId: number): Promise<void> => {
        try {
            await fetch(`http://localhost:9090/proprietario/delete/${proprietarioId}`, {
                method: 'DELETE'
            });
            setShowModal(false);
            setLastEditedProprietario(null);
            if (onComplete) {
                onComplete();
            }
        } catch (error) {
            console.error("Erro ao deletar proprietário:", error);
            throw error;
        }
    }

    const onSubmitDelete = async () => {
        if (lastEditedProprietario?.id) {
            await deleteProprietario(lastEditedProprietario.id);
        }
    }

    const editarProprietarios = async (data: Partial<ProprietarioProps>, imagem: File | null) => {
        try {
            console.log("📤 Enviando dados para atualização:", data)

            const formData = new FormData()

            const proprietarioData = {
                ...data,
                imagem_proprietario: selectedProprietarios[0].imagem_proprietario
            }

            console.log("Dados do proprietário com imagem:", proprietarioData)

            formData.append("proprietario", JSON.stringify(proprietarioData))

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

    const onSubmitEditProprietarios: SubmitHandler<{ proprietario: ProprietarioProps }> = async (data) => {
        if (isSubmitting) return

        try {
            setIsSubmitting(true)

            const { proprietario } = data

            const proprietarioSelecionadoId = selectedProprietarios[0].id

            const dataNascimento = proprietario.data_nascimento instanceof Date
                ? proprietario.data_nascimento
                : new Date(proprietario.data_nascimento)

            const cpfFormatado = proprietario.cpf.replace(/\D/g, '')
            const telefoneFormatado = proprietario.telefone.replace(/\D/g, '')
            const celularFormatado = proprietario.celular.replace(/\D/g, '')

            const proprietarioAtualizado = {
                ...proprietario,
                id: proprietarioSelecionadoId,
                nome: proprietario.nome,
                sobrenome: proprietario.sobrenome,
                cpf: cpfFormatado,
                telefone: telefoneFormatado,
                celular: celularFormatado,
                data_nascimento: dataNascimento,
                email: proprietario.email,
                imagem_proprietario: selectedProprietarios[0].imagem_proprietario,
                enderecoProprietario: proprietario.enderecoProprietario || selectedProprietarios[0].enderecoProprietario,
            }

            const response = await editarProprietarios(proprietarioAtualizado, imagem || null)
            console.log("Resposta do servidor:", response)

            if (response) {
                setLastEditedProprietario(response);
                setShowModal(false);

                setTimeout(() => {
                    setEditadoComSucesso(true);

                }, 5000);
            } else {
                console.error("Erro: Resposta inválida ao editar proprietário.")
            }
            if (onComplete) onComplete();

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

    const handleClick = async () => {
        const isValid = await trigger(['proprietario', 'proprietario.nome', 'proprietario.sobrenome', 
            'proprietario.cpf', 'proprietario.email', 'proprietario.telefone', 
            'proprietario.celular', 'proprietario.data_nascimento'])
        if (!isValid) {
            console.log("Erro de validação")
            return
        } else {
            handleSubmit(onSubmitEditProprietarios)();
        }
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
                                                        <FormularioImagemEditProprietario
                                                            handleImageUpload={setImagem}
                                                            imagemAtual={proprietario.imagem_proprietario}
                                                        />
                                                        <div className="space-y-4 pt-10">
                                                            <div className="flex flex-col gap-4">
                                                                <div className="w-full">
                                                                    <FormularioEditarInput
                                                                        placeholder="Ex: Caio"
                                                                        name="proprietario.nome"
                                                                        value={proprietario.nome}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errors?.proprietario?.nome}
                                                                        label="Nome:"
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <FormularioEditarInput
                                                                        placeholder="Ex: Souza"
                                                                        name="proprietario.sobrenome"
                                                                        value={proprietario.sobrenome}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errors?.proprietario?.sobrenome}
                                                                        label="Sobrenome:"
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <FormularioEditarInput
                                                                        placeholder=""
                                                                        name="proprietario.cpf"
                                                                        value={proprietario.cpf}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errors?.proprietario?.cpf}
                                                                        label="CPF:"
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <FormularioEditarInput
                                                                        placeholder="Ex: caio@gmail.com"
                                                                        name="proprietario.email"
                                                                        value={proprietario.email}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errors?.proprietario?.email}
                                                                        label="E-mail:"
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <FormularioEditarInput
                                                                        placeholder=""
                                                                        name="proprietario.telefone"
                                                                        value={proprietario.telefone}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errors?.proprietario?.telefone}
                                                                        label="Telefone:"
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <FormularioEditarInput
                                                                        placeholder=""
                                                                        name="proprietario.celular"
                                                                        value={proprietario.celular}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errors?.proprietario?.celular}
                                                                        label="Celular:"
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <FormularioEditarInput
                                                                        placeholder=""
                                                                        name="proprietario.data_nascimento"
                                                                        value={proprietario.data_nascimento}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                                                                        errors={errors?.proprietario?.data_nascimento}
                                                                        label="Data de Nascimento:"
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

            <AnimatePresence>
                {editadoComSucesso && lastEditedProprietario && (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed bottom-10 left-0 z-50"
                    >
                        <div className="bg-vermelho w-72 flex justify-between items-center p-3 rounded-tr-lg rounded-br-lg text-white shadow-lg">
                            <p className="text-center flex-1">Editado com Sucesso!</p>
                            <button
                                onClick={onSubmitDelete}
                                className="underline hover:text-gray-200 transition-colors"
                            >
                                Desfazer
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}


