"use client"
import { FormularioInput } from "../formularioInput"
import { Montserrat } from "next/font/google"
import { UseFormRegister } from "react-hook-form"

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

interface DadosProprietarioSectionProps {
    register: UseFormRegister<any>
    errors: any
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
                        interName='Ex: Caio'
                        register={register}
                        required
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        errors={errors?.nome}
                    />
                    <FormularioInput
                        placeholder="Sobrenome:"
                        name="proprietario.sobrenome"
                        interName='Ex: Souza'
                        register={register}
                        required
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        errors={errors?.sobrenome}
                    />
                    <FormularioInput
                        placeholder="CPF:"
                        name="proprietario.cpf"
                        interName="Ex: 000.000.000-00"
                        register={register}
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        required
                        maxLength={14}
                        onChange={(e) => {
                            e.target.value = formatarCPF(e.target.value);
                        }}
                        errors={errors?.cpf}
                    />
                </div>

                <div className="flex max-lg:flex-col max-lg:gap-4 gap-10">
                    <FormularioInput
                        placeholder="Telefone"
                        name="proprietario.telefone"
                        interName="Ex: (00) 0000-0000"
                        register={register}
                        required
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        maxLength={14}
                        onChange={(e) => {
                            e.target.value = formatarTelefone(e.target.value);
                        }}
                        errors={errors?.telefone}
                    />
                    <FormularioInput
                        placeholder="Celular"
                        name="proprietario.celular"
                        interName="Ex: (00) 0000-0000"
                        register={register}
                        required
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        maxLength={15}
                        onChange={(e) => {
                            e.target.value = formatarTelefone(e.target.value);
                        }}
                        errors={errors?.celular}
                    />
                    <FormularioInput
                        placeholder="Data de nascimento:"
                        name="proprietario.data_nascimento"
                        interName="Ex: 01/01/2000"
                        register={register}
                        required
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        maxLength={10}
                        onChange={(e) => {
                            e.target.value = formatarData(e.target.value);
                        }}
                        errors={errors?.data_nascimento}
                    />
                    <FormularioInput
                        placeholder="E-mail:"
                        name="proprietario.email"
                        interName="Ex: jaja@gmail.com"
                        register={register}
                        required
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        errors={errors?.email}
                    />
                </div>
            </div>
        </div>
    )
}

