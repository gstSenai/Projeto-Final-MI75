"use client"

import React, { useState } from "react"
import type { UseFormRegister, UseFormSetValue } from "react-hook-form"

import { FormularioInput } from "../formularioInput"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "800"],
    display: "swap",
})

const formatarCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2').slice(0, 9);
};

interface DadosEnderecoUsuarioSectionProps {
    register: UseFormRegister<any>
    setValue: UseFormSetValue<any>
    errors: any
}

export function EnderecoSection({ register, setValue, errors }: DadosEnderecoUsuarioSectionProps) {
    const [cep, setCep] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const buscarCep = async (cepValue: string) => {
        const cepFormatado = cepValue.replace(/\D/g, "")
        if (cepFormatado.length !== 8) return

        setIsLoading(true)

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`)
            const data = await response.json()

            if (data.erro) {
                alert("CEP não encontrado. Verifique o número informado.")
                return
            }

            setValue("endereco.uf", data.uf || "")
            setValue("endereco.cidade", data.localidade || "")
            setValue("endereco.bairro", data.bairro || "")
            setValue("endereco.rua", data.logradouro || "")
        } catch (error) {
            alert("Erro ao buscar o CEP. Tente novamente mais tarde.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={`flex flex-col mt-6 lg:gap-4 ${montserrat.className}`}>
            <div className="flex max-lg:flex-col max-lg:gap-4 gap-10">
                <FormularioInput
                    placeholder="CEP:"
                    name="endereco.cep"
                    interName='00000-000'
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    required
                    errors={errors?.endereco?.cep}
                    maxLength={9}
                    onChange={(e) => {
                        const novoCep = formatarCEP(e.target.value);
                        e.target.value = novoCep;
                        setCep(novoCep);
                        if (novoCep.replace(/\D/g, "").length === 8) buscarCep(novoCep);
                    }}
                />
                <FormularioInput
                    placeholder="UF:"
                    name="endereco.uf"
                    interName="Ex: SC"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    required
                    errors={errors?.endereco?.uf}
                    disabled={isLoading}
                />
                <FormularioInput
                    placeholder="Cidade:"
                    name="endereco.cidade"
                    interName="Ex: Joinville"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    required
                    errors={errors?.endereco?.cidade}
                    disabled={isLoading}
                />
            </div>
            <div className="flex max-lg:flex-col max-lg:gap-4 max-lg:pt-4 gap-10">
                <FormularioInput
                    placeholder="Rua:"
                    name="endereco.rua"
                    interName="Ex: Rua das Flores"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    required
                    errors={errors?.endereco?.rua}
                    disabled={isLoading}
                />
                <FormularioInput
                    placeholder="Bairro:"
                    name="endereco.bairro"
                    interName="Ex: Centro"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    required
                    errors={errors?.endereco?.bairro}
                    disabled={isLoading}
                />
                <FormularioInput
                    placeholder="Número do Imóvel:"
                    name="endereco.numero"
                    register={register}
                    interName="Ex: 100"
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    required
                    errors={errors?.endereco?.numero}
                />
            </div>
            <div className="flex max-lg:flex-col max-lg:gap-4 max-lg:pt-4 gap-10">
                <FormularioInput
                    placeholder="Número Apartamento (Caso tenha):"
                    name="endereco.numero_apartamento"
                    register={register}
                    required
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    interName="Ex: 100"
                    errors={errors?.endereco?.numero_apartamento}
                />
            </div>
        </div>
    )
}