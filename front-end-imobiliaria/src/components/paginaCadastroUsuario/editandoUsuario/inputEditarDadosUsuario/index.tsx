"use client"

import type React from "react"

import { useState } from "react"
import request from "@/routes/request"

interface InputEditandoDadosUsuarioProps {
    userId: number
    userData: {
        nome: string
        email: string
        telefone: string
        cpf: string
        tipo_conta: string
    }
    onComplete: () => void
}

export function InputEditandoDadosUsuario({ userId, userData, onComplete }: InputEditandoDadosUsuarioProps) {
    const [formData, setFormData] = useState({
        nome: userData.nome,
        email: userData.email,
        telefone: userData.telefone,
        cpf: userData.cpf,
        tipo_conta: userData.tipo_conta,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage("")

        try {
            const response = await request("PUT", `http://localhost:9090/users/update/${userId}`, formData)
            setMessage("Usuário atualizado com sucesso!")
            setTimeout(() => {
                onComplete()
            }, 1500)
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error)
            setMessage("Erro ao atualizar usuário. Tente novamente.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-vermelho p-6 rounded-[20px] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-center mb-6 text-white">Editar Usuário</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">Nome</label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">Telefone</label>
                            <input
                                type="tel"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">CPF</label>
                            <input
                                type="text"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-white"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">Tipo de Conta</label>
                            <select
                                name="tipo_conta"
                                value={formData.tipo_conta}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Selecione o tipo</option>
                                <option value="Cliente">Cliente</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Corretor">Corretor</option>
                            </select>
                        </div>
                    </div>

                    {message && (
                        <div
                            className={`p-2 text-center rounded ${message.includes("sucesso") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                            {message}
                        </div>
                    )}

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onComplete}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                            disabled={isLoading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#016E2F] text-white rounded-md hover:bg-[#015024]"
                            disabled={isLoading}
                        >
                            {isLoading ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

