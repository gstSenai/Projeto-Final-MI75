"use client"
import { FormularioInput } from "../formularioInput"
import { Montserrat } from "next/font/google"
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { useState } from "react"

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

interface FormData {
    endereco?: {
        cep: string;
        uf: string;
        cidade: string;
        bairro: string;
        rua: string;
        tipo_residencia: string;
        numero_imovel: string;
        numero_apartamento: string;
    };
        cep: string;
        uf: string;
        cidade: string;
        bairro: string;
        rua: string;
        tipo_residencia: string;
        numero_imovel: string;
        numero_apartamento: string;
}



interface EnderecoProprietarioSectionProps {
    register: UseFormRegister<FormData>
    setValue: UseFormSetValue<FormData>
    errors: FieldErrors<FormData>
}

export function EnderecoProprietarioSection({ register, setValue, errors }: EnderecoProprietarioSectionProps) {
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
            console.error("Erro ao buscar o CEP:", error)
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
                    label="CEP:"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    interName=""
                    required
                    errors={errors?.cep}
                    onChange={(e) => {
                        const novoCep = e.target.value
                        if (novoCep.replace(/\D/g, "").length === 8) buscarCep(novoCep)
                    }}
                />
                <FormularioInput
                    placeholder="UF:"
                    name="endereco.uf"
                    label="UF:"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    interName=""
                    required
                    errors={errors?.uf}
                    disabled={isLoading}
                />
                <FormularioInput
                    placeholder="Cidade:"
                    name="endereco.cidade"
                    label="Cidade:"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    interName=""
                    required
                    errors={errors?.cidade}
                    disabled={isLoading}
                />
                <FormularioInput
                    placeholder="Rua:"
                    name="endereco.rua"
                    label="Rua:"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    interName=""
                    required
                    errors={errors?.rua}
                    disabled={isLoading}
                />
            </div>
            <div className="flex max-lg:flex-col max-lg:gap-4 max-lg:pt-4 gap-10">
                <FormularioInput
                    placeholder="Bairro:"
                    name="endereco.bairro"
                    label="Bairro:"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    interName=""
                    required
                    errors={errors?.bairro}
                    disabled={isLoading}
                />
                <FormularioInput
                    placeholder="Tipo de Residência:"
                    name="endereco.tipo_residencia"
                    label="Tipo de Residência:"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    options={["Casa", "Apartamento"]}
                    interName="*"
                    required
                    errors={errors?.tipo_residencia}
                />
                <FormularioInput
                    placeholder="Número do Imóvel:"
                    name="endereco.numero_imovel"
                    register={register}
                    label="Número do Imóvel:"
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    interName=""
                    required
                    errors={errors?.numero_imovel}
                />
            </div>
            <div className="flex max-lg:flex-col max-lg:gap-4 max-lg:pt-4 gap-10">
                <FormularioInput
                    placeholder="Número Apartamento (Caso tenha):"
                    name="endereco.numero_apartamento"
                    register={register}
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    interName=""
                    label="Número Apartamento (Caso tenha):"
                    errors={errors?.numero_apartamento}
                />
            </div>
        </div>
    )
}

