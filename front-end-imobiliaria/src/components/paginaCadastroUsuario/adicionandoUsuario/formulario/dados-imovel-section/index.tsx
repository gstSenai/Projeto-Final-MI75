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

