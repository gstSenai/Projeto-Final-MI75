"use client"

import type { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form"
import { useEffect, useState } from "react"
import { FormData } from "../../index"

type UsuarioType = {
    id?: number
    nome: string
    sobrenome: string
    tipo_conta: string
    email: string
    senha: string
    ativo: boolean
    imagem_usuario: string
}

interface RelacaoCorretorImovelProps {
    placeholder: string
    name?: keyof FormData
    register?: UseFormRegister<FormData>
    setValue: UseFormSetValue<FormData>
    className?: string
    errors?: FieldErrors<FormData>
    onUsuarioAdicionado: () => void
}

export function RelacaoCorretorImovel({ className = "", setValue, errors, onUsuarioAdicionado }: RelacaoCorretorImovelProps) {
    const [usuarios, setUsuarios] = useState<UsuarioType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedCorretor, setSelectedCorretor] = useState<number | null>(null)   

    useEffect(() => {
        const fetchCorretores = async () => {
            try {
                const response = await fetch("http://localhost:9090/usuario/corretores")
                if (!response.ok) {
                    throw new Error(`Erro ao buscar corretores: ${response.status}`)
                }
                const data = await response.json()
                console.log("Resposta da API de corretores:", data)
                
                if (Array.isArray(data)) {
                    setUsuarios(data)
                } else if (data && typeof data === 'object') {
                    const arrayData = Object.values(data).find(value => Array.isArray(value))
                    if (arrayData) {
                        setUsuarios(arrayData)
                    } else {
                        console.error("Nenhum array encontrado na resposta:", data)
                        setUsuarios([])
                    }
                } else {
                    console.error("Resposta da API não é um objeto ou array:", data)
                    setUsuarios([])
                }
            } catch (err) {
                setError("Erro ao carregar corretores")
                console.error("Erro detalhado:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchCorretores()
    }, [])

    const handleCorretorSelect = (usuario: UsuarioType) => {
        setSelectedCorretor(usuario.id || null);
        onUsuarioAdicionado();
        setValue("usuario", {
            ...usuario,
            senha: usuario.senha,
            ativo: usuario.ativo !== undefined ? usuario.ativo : true
        });
        console.log("Corretor selecionado:", usuario);
    };

    const handleLimpar = () => {
        setSelectedCorretor(null);
        setValue("usuario", {} as UsuarioType);
    };

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
            <div className="rounded-2xl w-full h-full flex flex-col p-2 sm:p-4">
                <div className="flex flex-col items-start mb-4 sm:mb-5">
                    <label className="text-lg sm:text-xl font-medium text-black">Corretores Disponíveis</label>
                    <div className="flex flex-row-reverse w-full gap-2 mt-2">
                        <button
                            onClick={handleLimpar}
                            className="px-4 py-2 bg-vermelho text-white rounded-lg hover:bg-vermelho/80 transition-colors"
                        >
                            Limpar
                        </button>
                    </div>
                </div>
                <div className={`bg-white h-full rounded-[20px] border border-black px-3 sm:px-5 py-4 sm:py-8 ${className}`}>
                    <div className="w-full h-full">
                        {!usuarios || usuarios.length === 0 ? (
                            <p className="text-center text-gray-500">Nenhum corretor encontrado</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {usuarios.map((usuario) => (
                                    usuario.tipo_conta === "Corretor" && (
                                        <div 
                                            key={usuario.id} 
                                            className={`flex items-center gap-3 p-3 sm:p-4 border-2 ${selectedCorretor === usuario.id ? 'border-vermelho bg-vermelho text-white' : 'border-gray-200 hover:border-vermelho hover:bg-vermelho hover:text-white'} rounded-xl transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md`}
                                            onClick={() => handleCorretorSelect(usuario)}
                                        >
                                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-white/20">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-base sm:text-lg group-hover:text-white truncate">{usuario.nome}</div>
                                                <div className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-200 truncate">{usuario.email}</div>
                                            </div>
                                            <input
                                                type="radio"
                                                id={`corretor-${usuario.id}`}
                                                value={usuario.id}
                                                checked={selectedCorretor === usuario.id}
                                                onChange={() => handleCorretorSelect(usuario)}
                                                className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-vermelho border-gray-300 rounded-full focus:ring-vermelho group-hover:border-white group-hover:ring-white"
                                            />
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {errors && !selectedCorretor && <span className="text-red-500 text-sm mt-2">Por favor, selecione um corretor</span>}
                {selectedCorretor && usuarios.map((usuario) => 
                    usuario.id === selectedCorretor && (
                        <div key={usuario.id} className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Corretor selecionado:</p>
                            <p className="font-medium text-vermelho">{usuario.nome} {usuario.sobrenome}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

