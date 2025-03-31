"use client"
import { useState } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"

import { EnderecoSection } from "../formulario/endereco-section"
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
    cpf: z.string().min(11, { message: "CPF inválido (formato: 123.456.789-00)" }).max(11),
    tipo_conta: z.string().min(1, {
        message: "Selecione um tipo de conta válido",
    }),
    telefone: z.string().min(10, { message: "Telefone inválido" }),
    data_nascimento: z.string(),
    email: z.string().email({ message: "E-mail inválido" }),
    senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    idEnderecoUsuario: z.number().optional(),
})


const EnderecoProps = z.object({
    id: z.number().optional(),
    cep: z.string().min(1, { message: "CEP é obrigatório" }),
    rua: z.string().min(1, { message: "Rua é obrigatória" }),
    tipo_residencia: z.string().min(1, { message: "Tipo de residência é obrigatório" }),
    numero_imovel: z.coerce.number().min(1, { message: "Número do imóvel é obrigatório" }),
    numero_apartamento: z.coerce.number().optional(),
    bairro: z.string().min(1, { message: "Bairro é obrigatório" }),
    cidade: z.string().min(1, { message: "Cidade é obrigatória" }),
    uf: z.string().min(1, { message: "UF é obrigatório" }),
})


const FormSchema = z.object({
    usuario: UsuarioProps,
    endereco: EnderecoProps
})

type UsuarioData = z.infer<typeof UsuarioProps>
type EnderecoImovelProps = z.infer<typeof EnderecoProps>
type FormData = z.infer<typeof FormSchema>

interface InputDadosUsuarioProps {
    onComplete?: () => void
}

export function Formulario({ onComplete }: InputDadosUsuarioProps) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            usuario: {
                tipo_conta: "",
            },
            endereco: {
                tipo_residencia: "",
            }
        },
    })

    const [showForm, setShowForm] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [lastAddedUsuario, setLastAddedUsuario] = useState<UsuarioData | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [enderecoId, setEnderecoId] = useState<number>()
    const [imagem, setImagem] = useState<File | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagem(e.target.files[0])
        }
    }

    const addEndereco = async (data: EnderecoImovelProps) => {
        try {
            const response = await request("POST", "http://localhost:9090/enderecoUsuario/create", data)

            if (response && typeof response.id !== "undefined") {
                setEnderecoId(response.id)
                return response
            }
            throw new Error(`Falha ao criar o endereço.`);

        } catch (error) {
            console.error("Erro ao adicionar endereço:", error)
            throw error
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
            const { usuario, endereco } = data

            const enderecoResponse = await addEndereco(endereco)

            const usuarioData = {
                ...usuario,
                idEnderecoUsuario: enderecoResponse.id,
            }

            const response = await addUsuario(usuarioData, imagem)

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

                    <EnderecoSection register={register} errors={errors.endereco} setValue={setValue} />

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
