"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { EnderecoSection } from "../endereco-section"
import { DadosImovelSection } from "../dados-imovel-section"
import { Checkbox } from "../checkbox"
import request from "@/routes/request"

interface ImovelProps {
    id: number
    codigo: number
    nome_propriedade: string
    tipo_transacao: string
    valor_venda: number
    tipo_imovel: string
    status_imovel: string
    valor_promocional: number
    destaque: boolean
    visibilidade: boolean
    valor_iptu: number
    condominio: number
    area_construida: number
    area_terreno: number
    descricao: string
    id_endereco: EnderecoImovelProps
}

interface EnderecoImovelProps {
    id: number
    uf: string
    cidade: string
    cep: string
    bairro: string
    rua: string
    numero: string
    tipo_residencia: string
}

interface InputDadosImovelProps {
    onComplete?: () => void;
}

export function Formulario({ onComplete }: InputDadosImovelProps) {
    const { register, handleSubmit } = useForm<EnderecoImovelProps>()
    const [selectedVenda, setSelectedVenda] = useState(false)
    const [selectedLocacao, setSelectedLocacao] = useState(false)

    const addEndereco = async (data: EnderecoImovelProps) => {
        try {
            const response = await request("POST", "http://localhost:9090/users/create", data)
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error)
            throw error
        }
    }

    const addImovel = async (data: ImovelProps) => {
        try {
            const response = await request("POST", "http://localhost:9090/imovel/create", data)
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error)
            throw error
        }
    }

    return (
        <>
            <EnderecoSection register={register} />

            <div className="font-inter flex max-lg:justify-center">
                <div className="flex flex-row items-center max-lg:justify-center">
                    <p className="text-2xl xl:text-3xl font-semibold my-10 max-lg:hidden">Tipo de Transação:</p>
                </div>
                <Checkbox label="Venda" checked={selectedVenda} onChange={() => setSelectedVenda(!selectedVenda)} />
                <Checkbox label="Locação" checked={selectedLocacao} onChange={() => setSelectedLocacao(!selectedLocacao)} />
            </div>

            {selectedVenda && !selectedLocacao && <DadosImovelSection register={register} />}

            {!selectedVenda && selectedLocacao && <DadosImovelSection register={register} />}
        </>
    )
}

