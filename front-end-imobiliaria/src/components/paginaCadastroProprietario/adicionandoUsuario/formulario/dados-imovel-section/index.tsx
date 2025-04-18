"use client"
import { FormularioInput } from "../formularioInput"
import { Montserrat } from "next/font/google"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { FormData } from "../index"

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

interface DadosProprietarioSectionProps {
    register: UseFormRegister<FormData>
    errors: FieldErrors<FormData>
}

const formatarCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
};

const formatarTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').slice(0, 15);
};

const formatarData = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    let formattedDate = numbers;
    if (numbers.length > 2) formattedDate = numbers.replace(/^(\d{2})/, '$1/');
    if (numbers.length > 4) formattedDate = numbers.replace(/^(\d{2})(\d{2})/, '$1/$2/');
    if (numbers.length > 8) formattedDate = numbers.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3');
    return formattedDate.slice(0, 10);
};

export function DadosProprietarioSection({ register, errors }: DadosProprietarioSectionProps) {
    return (
        <div className={`flex flex-col ${montserrat.className}`}>
            <div className="flex flex-col gap-6">
                <div className="flex max-lg:flex-col max-lg:gap-4 gap-10">
                    <FormularioInput
                        placeholder="Nome:"
                        name="proprietario.nome"
                        label="Nome:"
                        interName=""
                        register={register}
                        required
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        errors={errors?.proprietario?.nome}
                    />
                    <FormularioInput
                        placeholder="Sobrenome:"
                        name="proprietario.sobrenome"
                        label="Sobrenome:"
                        interName=""
                        register={register}
                        required
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        errors={errors?.proprietario?.sobrenome}
                    />
                    <FormularioInput
                        placeholder="CPF:"
                        name="proprietario.cpf"
                        label="CPF:"
                        interName=""
                        register={register}
                        required
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        maxLength={14}
                        onChange={(e) => {
                            e.target.value = formatarCPF(e.target.value);
                        }}
                        errors={errors?.proprietario?.cpf}
                    />
                </div>

                <div className="flex max-lg:flex-col max-lg:gap-4 gap-10">
                    <FormularioInput
                        placeholder="Data de nascimento:"
                        name="proprietario.data_nascimento"
                        label="Data de nascimento:"
                        interName=""
                        register={register}
                        required
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        maxLength={10}
                        onChange={(e) => {
                            e.target.value = formatarData(e.target.value);
                        }}
                        errors={errors?.proprietario?.data_nascimento}
                    />
                    <FormularioInput
                        placeholder="Telefone"
                        name="proprietario.telefone"
                        label="Telefone:"
                        interName=""
                        register={register}
                        required
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        maxLength={15}
                        onChange={(e) => {
                            e.target.value = formatarTelefone(e.target.value);
                        }}
                        errors={errors?.proprietario?.telefone}
                    />
                    <FormularioInput
                        placeholder="Celular"
                        name="proprietario.celular"
                        label="Celular:"
                        interName=""
                        register={register}
                        required
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        maxLength={15}
                        onChange={(e) => {
                            e.target.value = formatarTelefone(e.target.value);
                        }}
                        errors={errors?.proprietario?.celular}
                    />
                </div>

                <div className="flex max-lg:flex-col max-lg:gap-4 gap-10">
                    <FormularioInput
                        placeholder="E-mail:"
                        name="proprietario.email"
                        label="E-mail:"
                        interName=""
                        register={register}
                        required
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        errors={errors?.proprietario?.email}
                    />
                </div>
            </div>
        </div>
    )
}

