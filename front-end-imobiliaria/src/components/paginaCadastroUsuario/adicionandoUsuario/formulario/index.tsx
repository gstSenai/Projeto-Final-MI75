"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Montserrat } from 'next/font/google'

import { DadosUsuarioSection } from "./dados-imovel-section"
import { Botao } from "@/components/botao"
import request from "@/routes/request"
import { FormularioImagem } from "./formularioImagem"
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler } from 'react-hook-form';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

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
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
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

    const onSubmitUsuario: SubmitHandler<FormData> = async (data) => {
        if (isSubmitting) return
        try {
            setIsSubmitting(true)
            const { usuario } = data

            const usuarioData = {
                ...usuario,
            }

            const response = await addUsuario(usuarioData, imagem)
            console.log(response)

            if (response) {
                reset()
                setImagem(null)
                if (onComplete) onComplete()
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
    }, [errors])

    return (
        <div className="space-y-4">
            <div className="flex flex-col items-center gap-4">
                <FormularioImagem handleImageChange={handleImageChange} />
            </div>

            <div className="space-y-4">
                <DadosUsuarioSection register={register} errors={errors.usuario} />
            </div>

            <div className="flex justify-end gap-4 mt-4">
                <Botao 
                    className="bg-vermelho h-10" 
                    onClick={() => {
                        reset()
                        setImagem(null)
                        if (onComplete) onComplete()
                    }} 
                    texto="Cancelar" 
                />
                <Botao 
                    className="bg-vermelho h-10" 
                    onClick={handleSubmit(onSubmitUsuario)} 
                    texto="Salvar" 
                />
            </div>
        </div>
    )
}
