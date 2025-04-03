"use client"

import type { UseFormRegister } from "react-hook-form"
import { useEffect, useState } from "react"

type UsuarioType = {
    id?: number
    nome: string
    sobrenome: string
    tipo_conta: string
    email: string
    senha: string
}

type FormData = {
    imovel: {
        corretores: UsuarioType[]
    }
}

interface RelacaoCorretorImovelProps {
    placeholder: string
    name: "imovel.corretores"
    className?: string
    register: UseFormRegister<FormData>
    required?: boolean
}

export function RelacaoCorretorImovel({ className = "", register, name, placeholder, required }: RelacaoCorretorImovelProps) {
    const [corretores, setCorretores] = useState<UsuarioType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCorretores = async () => {
            try {
                const response = await fetch("http://localhost:9090/usuario/corretores")
                if (!response.ok) {
                    throw new Error("Erro ao buscar corretores")
                }
                const data = await response.json()
                if (Array.isArray(data)) {
                    setCorretores(data)
                } else {
                    console.error("Resposta da API não é um array:", data)
                    setCorretores([])
                }
            } catch (err) {
                setError("Erro ao carregar corretores")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchCorretores()
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col font-montserrat w-full">
                <div className="rounded-2xl w-full flex flex-col p-2 sm:p-4">
                    <div className="flex flex-col items-start mb-4 sm:mb-5">
                        <label className="text-lg sm:text-xl font-medium text-black">Corretores Disponíveis</label>
                    </div>
                    <div className={`bg-white  rounded-[20px] border border-black px-3 sm:px-5 py-4 sm:py-8 ${className}`}>
                        <p className="text-center">Carregando corretores...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col font-montserrat w-full">
                <div className="rounded-2xl w-full flex flex-col p-2 sm:p-4">
                    <div className="flex flex-col items-start mb-4 sm:mb-5">
                        <label className="text-lg sm:text-xl font-medium text-black">Corretores Disponíveis</label>
                    </div>
                    <div className={`bg-white rounded-[20px] border border-black px-3 sm:px-5 py-4 sm:py-8 ${className}`}>
                        <p className="text-center text-red-500">{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col font-montserrat w-full h-full">
            <div className="rounded-2xl w-full  h-full flex flex-col p-2 sm:p-4">
                <div className="flex flex-col items-start mb-4 sm:mb-5">
                    <label className="text-lg sm:text-xl font-medium text-black">Corretores Disponíveis</label>
                </div>
                <div className={`bg-white  h-full rounded-[20px] border border-black px-3 sm:px-5 py-4 sm:py-8 ${className}`}>
                    <div className="w-full h-full">
                        {!corretores || corretores.length === 0 ? (
                            <p className="text-center text-gray-500">Nenhum corretor disponível</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {corretores.map((corretor) => (
                                    corretor.tipo_conta === "Corretor" && (
                                        <div 
                                            key={corretor.id} 
                                            className="flex items-center gap-3 p-3 sm:p-4 border-2 border-gray-200 rounded-xl hover:border-vermelho hover:bg-vermelho hover:text-white transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
                                        >
                                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-white/20">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-base sm:text-lg group-hover:text-white truncate">{corretor.nome}</div>
                                                <div className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-200 truncate">{corretor.email}</div>
                                            </div>
                                            <input
                                                type="radio"
                                                id={`corretor-${corretor.id}`}
                                                value={corretor.id}
                                                {...register(name, { required: required ? `${placeholder} é obrigatório` : false })}
                                                className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-vermelho border-gray-300 rounded-full focus:ring-vermelho group-hover:border-white group-hover:ring-white"
                                            />
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

