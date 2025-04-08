"use client"
import { FormularioInput } from "../formularioInput"
import { Montserrat } from "next/font/google"
import { UseFormRegister } from "react-hook-form"

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

interface DadosUsuarioSectionProps {
    register: UseFormRegister<any>
    errors: any
}

export function DadosUsuarioSection({ register, errors }: DadosUsuarioSectionProps) {
    return (
        <div className="flex flex-col font-montserrat">
            <div className="flex flex-col gap-6">
                <div className="flex max-lg:flex-col max-lg:gap-4 gap-10">
                    <FormularioInput
                        placeholder="Nome:"
                        name="usuario.nome"
                        interName='Ex: Caio'
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.nome}
                    />
                    <FormularioInput
                        placeholder="Sobrenome:"
                        name="usuario.sobrenome"
                        interName='Ex: Souza'
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.sobrenome}
                    />
                    <FormularioInput
                        placeholder="CPF:"
                        name="usuario.cpf"
                        interName='Ex: 123.456.789-00'
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.cpf}
                    />
                </div>
                <div className="flex max-lg:flex-col max-lg:gap-4 gap-10">
                    <FormularioInput
                        placeholder="Tipo da Conta:"
                        name="usuario.tipo_conta"
                        required
                        register={register}
                        customizacaoClass="w-full"
                        options={['Usuario', 'Corretor', 'Administrador', 'Editor']}
                        errors={errors?.tipo_conta}
                    />
                    <FormularioInput
                        placeholder="Telefone"
                        name="usuario.telefone"
                        interName="Ex: (00) 0000-0000"
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.telefone}
                    />
                    <FormularioInput
                        placeholder="Data de Nascimento:"
                        name="usuario.data_nascimento"
                        interName="Ex: 22/02/2005"
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.data_nascimento}
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
                        errors={errors?.email}
                    />
                    <FormularioInput
                        placeholder="Senha:"
                        name="usuario.senha"
                        interName="Ex: 123"
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.senha}
                    />
                </div>
            </div>
        </div>
    )
}

