"use client"
import { FormularioInput } from "../formularioInput"
import { Montserrat } from "next/font/google"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { FormData } from "../index"

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});


interface DadosUsuarioSectionProps {
    register: UseFormRegister<FormData>
    errors: FieldErrors<FormData>
}

const formatarTelefone = (value: string) => {
    const numeros = value.replace(/\D/g, '').slice(0, 11);
    if (numeros.length <= 11) {
        if (numeros.length <= 10) {
            return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
};

export function DadosUsuarioSection({ register, errors }: DadosUsuarioSectionProps) {
    return (
        <div className={`flex flex-col ${montserrat.className}`}>
            <div className="flex flex-col gap-6">
                <div className="flex max-lg:flex-col max-lg:gap-4 gap-10">
                    <FormularioInput
                        placeholder="Nome:"
                        name="usuario.nome"
                        interName='Ex: Caio'
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.usuario?.nome}
                    />
                    <FormularioInput
                        placeholder="Sobrenome:"
                        name="usuario.sobrenome"
                        interName='Ex: Souza'
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.usuario?.sobrenome}
                    />
                    <FormularioInput
                        placeholder="Tipo da Conta:"
                        name="usuario.tipo_conta"
                        required
                        register={register}
                        customizacaoClass="w-full"
                        options={['Usuario', 'Corretor', 'Administrador', 'Editor']}
                        errors={errors?.usuario?.tipo_conta}
                    />
                </div>

                <div className="flex max-lg:flex-col max-lg:gap-4 gap-10">
                    <FormularioInput
                        placeholder="Telefone"
                        name="usuario.telefone"
                        interName="Ex: (00) 0000-0000"
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.usuario?.telefone}
                        onChange={(e) => {
                            e.target.value = formatarTelefone(e.target.value);
                        }}
                    />
                    <FormularioInput
                        placeholder="E-mail:"
                        name="usuario.email"
                        interName="Ex: jaja@gmail.com"
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.usuario?.email}
                    />
                    <FormularioInput
                        placeholder="Senha:"
                        name="usuario.senha"
                        interName="Ex: 123"
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.usuario?.senha}
                    />
                </div>
            </div>
        </div>
    )
}

