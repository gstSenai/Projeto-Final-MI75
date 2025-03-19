"use client"
import { useState } from "react"
import type React from "react"

import { useForm } from "react-hook-form"
import { EnderecoSection } from "../formulario/endereco-section"
import { DadosUsuarioSection } from "./dados-imovel-section"
import { Botao } from "@/components/botao"
import request from "@/routes/request"
import { FormularioImagem } from "./formularioImagem"

interface UsuarioProps {
    id: number
    nome: string
    sobrenome: string
    cpf: string
    tipo_conta: string
    telefone: string
    data_nascimento: string
    email: string
    senha: string
    idEnderecoUsuario: number
}

interface EnderecoImovelProps {
    id: number
    cep: string
    rua: string
    tipo_residencia: string
    numero_imovel: number
    numero_apartamento: number
    bairro: string
    cidade: string
    uf: string
}

interface InputDadosUsuarioProps {
    onComplete?: () => void
}

export function Formulario({ onComplete }: InputDadosUsuarioProps) {
    const { register, handleSubmit } = useForm<{ usuario: UsuarioProps; endereco: EnderecoImovelProps }>()
    const [showForm, setShowForm] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [lastAddedUsuario, setLastAddedUsuario] = useState<UsuarioProps | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [enderecoId, setEnderecoId] = useState<number>()
    const [imageFile, setImageFile] = useState<File | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0])
        }
    }

    const addEndereco = async (data: EnderecoImovelProps) => {
        try {
            const response = await request("POST", "http://localhost:9090/enderecoUsuario/create", data)
            if (response && response.id) {
                setEnderecoId(response.id)
                return response
            }
            throw new Error(`Falha ao criar o endereço: ${response.status}`)
        } catch (error) {
            console.error("Erro ao adicionar endereço:", error)
            throw error
        }
    }

    const addUsuario = async (usuario: UsuarioProps, imagem: File | null) => {
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

    const onSubmitUsuario = async (data: { usuario: UsuarioProps; endereco: EnderecoImovelProps }) => {
        if (isSubmitting) return
        try {
            setIsSubmitting(true)
            const { usuario, endereco } = data

            const enderecoResponse = await addEndereco(endereco)

            const usuarioData = {
                ...usuario,
                idEnderecoUsuario: enderecoResponse.id,
            }

            const response = await addUsuario(usuarioData, imageFile)

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
                    <div className="font-inter flex">
                        <div className="flex flex-row items-center">
                            <p className="text-2xl xl:text-3xl font-semibold mt-10 mb-5">Dados do Usuário:</p>
                        </div>
                    </div>

                    <hr className="mb-10 w-full h-2 rounded-2xl bg-vermelho"></hr>
                    
                    <FormularioImagem
                        handleImageChange={handleImageChange}
                    />
                    <DadosUsuarioSection register={register} />

                    <EnderecoSection register={register} />
                    <div className="flex items-center gap-16 mt-10">
                        <div className="flex max-sm:gap-12 max-lg:gap-36 gap-[40rem] w-full">
                            <Botao className="max-lg:text-base" onClick={() => console.log()} texto="Cancelar" />
                            <Botao className="max-lg:text-base" onClick={handleSubmit(onSubmitUsuario)} texto="Salvar cadastro" />
                        </div>
                    </div>
                </>
            )}
            {showModal && lastAddedUsuario && (
                <div className="w-full bottom-16 pl-10 items-center relative">
                    <div className="bg-vermelho w-72 flex gap-1 p-3 rounded-[20px] text-white">
                        <p>Adicionado com Sucesso!</p>
                        <button onClick={onSubmitDelete} className="underline">
                            Desfazer
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

