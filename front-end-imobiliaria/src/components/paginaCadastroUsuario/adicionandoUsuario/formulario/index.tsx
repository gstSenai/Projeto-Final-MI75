"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"

import { DadosUsuarioSection } from "./dados-imovel-section"
import { Botao } from "@/components/botao"
import request from "@/routes/request"
import { FormularioImagem } from "./formularioImagem"
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const UsuarioProps = z.object({
    id: z.number().optional(),
    nome: z.string().min(1, { message: "O nome é obrigatório" }),
    sobrenome: z.string().min(1, { message: "O sobrenome é obrigatório" }),
    tipo_conta: z.string().min(1, {
        message: "Selecione um tipo de conta válido",
    }),
    email: z.string().email({ message: "E-mail inválido" }),
    senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
})



const FormSchema = z.object({
    usuario: UsuarioProps,
})

type UsuarioData = z.infer<typeof UsuarioProps>
type FormData = z.infer<typeof FormSchema>

interface InputDadosUsuarioProps {
    onComplete?: () => void
}

export function Formulario({ onComplete }: InputDadosUsuarioProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            usuario: {
                tipo_conta: "",
            },
        },
    })

    const [showForm, setShowForm] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [lastAddedUsuario, setLastAddedUsuario] = useState<UsuarioData | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagem, setImagem] = useState<File | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagem(e.target.files[0])
        }
    }

    const addUsuario = async (usuario: UsuarioData, imagem: File | null) => {
        try {
            const formData = new FormData()

            formData.append("usuario", JSON.stringify(usuario))

            if (imagem) {
                formData.append("imagem", imagem)
            }

            const response = await fetch("http://localhost:9090/usuario/create", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error(`Falha na requisição: ${response.status}`)
            }

            const data = await response.json()
            setLastAddedUsuario(data)
            return data
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error)
            throw error
        }
    }

    const deleteUsuario = async (userId: number): Promise<void> => {
        try {
            await request("DELETE", `http://localhost:9090/usuario/delete/${userId}`)
        } catch (error) {
            console.error("Erro ao deletar imóvel:", error)
            throw error
        }
    }

    const onSubmitUsuario = async (data: FormData) => {
        if (isSubmitting) return
        try {
            setIsSubmitting(true)
            const { usuario } = data

            const usuarioData = {
                ...usuario,
            }

            console.log(usuarioData)
            const response = await addUsuario(usuarioData, imagem)
            console.log(response)

            if (response) {
                setShowForm(false)
                setShowModal(true)
                if (onComplete) onComplete()
                setTimeout(() => setShowModal(false), 5000)
            }
        } catch (error) {
            console.error("Erro ao salvar usuário:", error)
            alert(`Erro ao salvar usuário: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
        } finally {
            setIsSubmitting(false)
        }
    }

    const onSubmitDelete = async () => {
        if (lastAddedUsuario && lastAddedUsuario.id) {
            await deleteUsuario(lastAddedUsuario.id)
            setShowModal(false)
            setLastAddedUsuario(null)
            if (onComplete) onComplete()
        }
    }

    useEffect(() => {
        console.log(errors)
        console.log(register)
    }, [errors, register])

    return (
        <>
            {showForm && (
                <>
                    <div className="font-inter flex mt-20">
                        <div className="flex flex-row items-center">
                            <p className="text-2xl xl:text-3xl font-semibold mt-10 mb-5">Dados do Usuário:</p>
                        </div>
                    </div>

                    <hr className="mb-10 w-full h-2 rounded-2xl bg-vermelho"></hr>

                    <FormularioImagem handleImageChange={handleImageChange} />

                    <DadosUsuarioSection register={register} errors={errors.usuario} />

                    <div className="flex items-center gap-16 mt-10 mb-20">
                        <div className="flex max-sm:gap-12 max-lg:gap-36 gap-[40rem] w-full">
                            <Botao className="max-lg:text-base bg-vermelho h-10" onClick={() => console.log()} texto="Cancelar" />
                            <Botao className="max-lg:text-base bg-vermelho h-10" onClick={handleSubmit(onSubmitUsuario)} texto="Salvar cadastro" />
                        </div>
                    </div>
                </>
            )}
            <AnimatePresence>
                {showModal && lastAddedUsuario && (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed bottom-10 left-0 z-50"
                    >
                        <div className="bg-vermelho w-72 flex gap-1 p-3 rounded-tr-lg rounded-br-lg text-white shadow-lg">
                            <p className="text-center">Adicionado com Sucesso!</p>
                            <button onClick={onSubmitDelete} className="underline hover:text-gray-200">
                                Desfazer
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
