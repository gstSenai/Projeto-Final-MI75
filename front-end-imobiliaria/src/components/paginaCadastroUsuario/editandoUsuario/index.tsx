"use client"
import { useState, useEffect } from "react"
import React from "react"

import { Botao } from "@/components/botao"
import { FormularioEditarInput } from "../editandoUsuario/formularioEditarInput"
import { FormularioImagemEdit } from "../editandoUsuario/formularioImagemEdit"
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const UsuarioProps = z.object({
    id: z.number().optional(),
    username: z.string().min(1, { message: "O nome é obrigatório" }),
    tipo_conta: z.string().min(1, {
        message: "Selecione um tipo de conta válido",
    }),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    imagem_usuario: z.string().optional(),
})

const FormSchema = z.object({
    usuario: UsuarioProps,
})

type UsuarioData = z.infer<typeof UsuarioProps>
type FormData = z.infer<typeof FormSchema>

interface EditarUsuarioData {
    selectedUsuarios: UsuarioData[]
    onComplete?: () => void
}

export function EditarUsuario({ selectedUsuarios, onComplete }: EditarUsuarioData) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: selectedUsuarios?.[0] ? {
            usuario: {
                username: selectedUsuarios[0].username,
                tipo_conta: selectedUsuarios[0].tipo_conta,
                email: selectedUsuarios[0].email,
                password: selectedUsuarios[0].password,
            },
        } : undefined
    })


    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagem, setImagem] = useState<File | null>(null)
    const [showModal, setShowModal] = useState(true)
    const [editadoComSucesso, setEditadoComSucesso] = useState(false)


    const editarUsers = async (data: Partial<UsuarioData>, imagem: File | null) => {
        try {
            console.log("📤 Enviando dados para atualização:", data)

            const formData = new FormData()

            formData.append("usuario", JSON.stringify(data))

            if (imagem) {
                formData.append("imagem", imagem)
            }

            const response = await fetch(`http://localhost:9090/usuario/update/${data.id}`, {
                method: "PUT",
                body: formData,
            })


            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`)
            }

            const responseData = await response.json()
            console.log("✅ Usuário atualizado com sucesso:", responseData)

            return responseData
        } catch (error) {
            console.error("❌ Erro ao editar usuário:", error)
            throw error
        }
    }

    const onSubmitEditUsers: SubmitHandler<{ usuario: UsuarioData }> = async (data) => {
        if (isSubmitting) return

        try {
            setIsSubmitting(true)

            console.log("Dados recebidos para validação:", data)

            const { usuario } = data

            const usuarioSelecionadoId = selectedUsuarios[0].id

            const usuarioAtualizado = {
                ...usuario,
                id: usuarioSelecionadoId,
                username: usuario.username,
                tipo_conta: usuario.tipo_conta,
                email: usuario.email,
                password: usuario.password,
                imagem_usuario: selectedUsuarios[0].imagem_usuario,
            }

            console.log("Dados do usuário a serem enviados:", usuarioAtualizado)

            const response = await editarUsers(usuarioAtualizado, imagem || null)
            console.log("Resposta do servidor:", response)
            if (response) {
                setShowModal(false)
                setEditadoComSucesso(true)

                setTimeout(() => {
                    setEditadoComSucesso(false)
                    if (onComplete) onComplete()
                }, 5000)
            } else {
                console.error("Erro: Resposta inválida ao adicionar usuário.")
            }

        } catch (error) {
            console.error("Erro ao editar usuário:", error)
            alert(`Erro ao editar usuário: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
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
        handleSubmit(onSubmitEditUsers)();
    };

    useEffect(() => {
        if (selectedUsuarios && selectedUsuarios.length > 0) {
            console.log("Dados do usuário:", selectedUsuarios)
            console.log(errors)
        }
    }, [selectedUsuarios, errors])


    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-8 z-50">
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
                            <div className="flex items-center justify-center">
                                <h1 className="text-3xl font-semibold text-vermelho mb-4">Editar Dados do Usuário</h1>
                            </div>
                            <div>
                                <div>
                                    <form className="space-y-4">
                                        {selectedUsuarios.length > 0 && (
                                            <div>
                                                {selectedUsuarios.map((usuario) => (
                                                    <React.Fragment key={usuario.id}>
                                                        <FormularioImagemEdit
                                                            handleImageUpload={setImagem}
                                                            imagemAtual={usuario.imagem_usuario}
                                                        />
                                                        <div className="space-y-4 pt-10">
                                                            <div className="flex flex-col gap-4">
                                                                <div className="w-full">
                                                                    <FormularioEditarInput
                                                                        label="Nome"
                                                                        placeholder="Ex: Caio"
                                                                        name="usuario.username"
                                                                        value={usuario.username}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        errors={errors?.usuario?.username}
                                                                    />
                                                                </div>
                                                               

                                                                <div className="w-full">
                                                                    <FormularioEditarInput
                                                                        label="Tipo da Conta"
                                                                        placeholder=""
                                                                        name="usuario.tipo_conta"
                                                                        value={usuario.tipo_conta}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        options={["Usuario", "Corretor", "Administrador", "Editor"]}
                                                                        errors={errors?.usuario?.tipo_conta}
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <FormularioEditarInput
                                                                        label="E-mail"
                                                                        placeholder="Ex: caio@gmail.com"
                                                                        name="usuario.email"
                                                                        value={usuario.email}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        errors={errors?.usuario?.email}
                                                                    />
                                                                </div>

                                                                <div className="w-full">
                                                                    <FormularioEditarInput
                                                                        label="Senha"
                                                                        placeholder=""
                                                                        name="usuario.password"
                                                                        value={usuario.password}
                                                                        register={register}
                                                                        required
                                                                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                                                                        errors={errors?.usuario?.password}
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
                                    <Botao 
                                        type="button"
                                        onClick={handleCancel} 
                                        texto="Cancelar" 
                                        className="bg-vermelho h-10" 
                                    />
                                    <Botao 
                                        type="submit"
                                        onClick={handleClick}
                                        texto={isSubmitting ? "Editando..." : "Editar"} 
                                        className="bg-vermelho h-10"
                                        disabled={isSubmitting}
                                    />
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


