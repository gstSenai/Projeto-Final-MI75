"use client"
import { FormularioInput } from "../formularioInput"
import { Montserrat } from "next/font/google"
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { useState } from "react"
import { FormData } from "../index"

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

const formatarCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2').slice(0, 9);
};

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
                    label="CEP:"
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
                        if (novoCep.replace(/\D/g, "").length === 8) buscarCep(novoCep);
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
                    errors={errors?.endereco?.uf}
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
                    errors={errors?.endereco?.cidade}
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
                    errors={errors?.endereco?.rua}
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
                    errors={errors?.endereco?.bairro}
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
                    errors={errors?.endereco?.tipo_residencia}
                />
                <FormularioInput
                    placeholder="Número do Imóvel:"
                    name="endereco.numero_imovel"
                    register={register}
                    label="Número do Imóvel:"
                    customizacaoClass="w-full p-2 border border-gray-500 rounded"
                    interName=""
                    required
                    errors={errors?.endereco?.numero_imovel}
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
                    errors={errors?.endereco?.numero_apartamento}
                />
            </div>
        </div>
    )
}

