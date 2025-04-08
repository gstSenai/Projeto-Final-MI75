"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"

import { DadosProprietarioSection } from "./dados-imovel-section"
import { Botao } from "@/components/botao"
import request from "@/routes/request"
import { FormularioImagem } from "./formularioImagem"
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { EnderecoProprietarioSection } from "./endereco-proprietario-section"

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
})

const EnderecoProps = z.object({
    id: z.number().optional(),
    cep: z.string().min(8, { message: "CEP inválido" }),
    rua: z.string().min(1, { message: "Rua inválida" }),
    tipo_residencia: z.string().min(1, { message: "Tipo de residência inválido" }),
    numero_imovel: z.coerce.number().min(1, { message: "Número do imóvel inválido" }),
    numero_apartamento: z.coerce.number().optional(),
    bairro: z.string().min(1, { message: "Bairro inválido" }),
    cidade: z.string().min(1, { message: "Cidade inválida" }),
    uf: z.string().min(2, { message: "UF inválida" }),
})


const FormSchema = z.object({
    proprietario: ProprietarioProps,
    endereco: EnderecoProps,
})

type EnderecoData = z.infer<typeof EnderecoProps>
type ProprietarioData = z.infer<typeof ProprietarioProps>
type FormData = z.infer<typeof FormSchema>


interface InputDadosUsuarioProps {
    onComplete?: () => void
}

export function Formulario({ onComplete }: InputDadosUsuarioProps) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
        },
    })

    const [showForm, setShowForm] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [lastAddedProprietario, setLastAddedProprietario] = useState<ProprietarioData | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagem, setImagem] = useState<File | null>(null)
    const [currentSection, setCurrentSection] = useState<'dados' | 'endereco'>('dados')

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagem(e.target.files[0])
        }
    }

    const addEndereco = async (data: EnderecoData) => {
        try {
            const response = await request("POST", "http://localhost:9090/enderecoProprietario/create", data)

            if (!response || typeof response.id === "undefined") {
                throw new Error("Falha ao criar o endereço: resposta inválida do servidor");
            }

            setValue("endereco.id", response.id)
            return response

        } catch (error) {
            console.error("Erro ao adicionar endereço:", error)
            throw new Error(`Erro ao adicionar endereço: ${error instanceof Error ? error.message : "Erro desconhecido"}`)
        }
    }

    const addProprietario = async (proprietario: ProprietarioData, imagem: File | null) => {
        try {
            const formData = new FormData();
            formData.append("proprietario", JSON.stringify(proprietario));

            if (imagem) {
                formData.append("imagem", imagem);
            }

            const response = await fetch("http://localhost:9090/proprietario/create", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Falha na requisição: ${response.status} - ${await response.text()}`);
            }

            const data = await response.json();
            if (!data) {
                throw new Error('Resposta vazia do servidor');
            }

            setLastAddedProprietario(data);
            return data;
        } catch (error) {
            console.error("Erro detalhado ao adicionar proprietário:", error);
            throw new Error(`Erro ao adicionar proprietário: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    }

    const deleteUsuario = async (userId: number): Promise<void> => {
        try {
            await request("DELETE", `http://localhost:9090/proprietario/delete/${userId}`)
        } catch (error) {
            console.error("Erro ao deletar imóvel:", error)
            throw error
        }
    }

    const onSubmitUsuario = async (data: FormData) => {
        if (isSubmitting) return;
        
        try {
            setIsSubmitting(true);
            const { proprietario, endereco } = data;

            if (!endereco || !proprietario) {
                throw new Error("Dados incompletos do formulário");
            }

            console.log("Enviando endereço:", endereco);
            const enderecoResponse = await addEndereco(endereco);

            if (!enderecoResponse || !enderecoResponse.id) {
                throw new Error("Falha ao criar endereço");
            }

            const proprietarioData = {
                ...proprietario,
                enderecoProprietario: enderecoResponse,
            };

            console.log("Enviando proprietário:", proprietarioData);
            const response = await addProprietario(proprietarioData, imagem);
            console.log("Resposta do proprietário:", response);

            if (response) {
                setShowForm(false);
                setShowModal(true);
                if (onComplete) onComplete();
                setTimeout(() => setShowModal(false), 5000);
            }
        } catch (error) {
            console.error("Erro detalhado ao salvar usuário:", error);
            alert(`Erro ao salvar usuário: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
        } finally {
            setIsSubmitting(false);
        }
    }

    const onSubmitDelete = async () => {
        if (lastAddedProprietario && lastAddedProprietario.id) {
            await deleteUsuario(lastAddedProprietario.id)
            setShowModal(false)
            setLastAddedProprietario(null)
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
                    <div className="bg-white rounded-2xl p-4 max-w-4xl w-full max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-2xl font-semibold text-vermelho">Cadastrar Proprietário</h2>
                            <button
                                className="bg-[#DFDAD0] py-1.5 px-3 rounded-full text-vermelho lg:text-xl transition-transform duration-300 hover:scale-110
                             hover:bg-vermelho hover:text-[#DFDAD0]"
                                onClick={() => setShowForm(false)}
                            >
                                X
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-1 pr-2">
                            <div className="space-y-4">
                                {currentSection === 'dados' && (
                                    <div>
                                        <div className="space-y-4">
                                            <FormularioImagem handleImageChange={handleImageChange} />
                                            <DadosProprietarioSection register={register} errors={errors.proprietario} />
                                        </div>
                                        <div className="flex justify-between mt-4">
                                            <Botao 
                                                className="max-lg:text-sm bg-vermelho h-9" 
                                                onClick={() => setShowForm(false)} 
                                                texto="Cancelar" 
                                            />
                                            <Botao 
                                                className="max-lg:text-sm bg-vermelho h-9" 
                                                onClick={() => setCurrentSection('endereco')} 
                                                texto="Próximo" 
                                            />
                                        </div>
                                    </div>
                                )}

                                {currentSection === 'endereco' && (
                                    <div>
                                        <EnderecoProprietarioSection setValue={setValue} register={register} errors={errors.proprietario} />
                                        <div className="flex justify-between mt-4">
                                            <Botao 
                                                className="max-lg:text-sm bg-vermelho h-9" 
                                                onClick={() => setCurrentSection('dados')} 
                                                texto="Voltar" 
                                            />
                                            <Botao 
                                                className="max-lg:text-sm bg-vermelho h-9" 
                                                onClick={handleSubmit(onSubmitUsuario)} 
                                                texto="Salvar cadastro" 
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <AnimatePresence>
                {showModal && lastAddedProprietario && (
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
