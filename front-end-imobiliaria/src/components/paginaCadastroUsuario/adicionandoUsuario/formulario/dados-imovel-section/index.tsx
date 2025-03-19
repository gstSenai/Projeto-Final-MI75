"use client"
import { UseFormRegister } from "react-hook-form"
import { FormularioInput } from "../formularioInput"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

interface DadosUsuarioSectionProps {
    register: UseFormRegister<any>
}

export function DadosUsuarioSection({ register }: DadosUsuarioSectionProps) {

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
                        custumizacaoClass="w-full"
                    />
                    <FormularioInput
                        placeholder="Sobrenome:"
                        name="usuario.sobrenome"
                        interName='Ex: Souza'
                        register={register}
                        required
                        custumizacaoClass="w-full"
                    />
                    <FormularioInput
                        placeholder="CPF:"
                        name="usuario.cpf"
                        interName='Ex: 123.456.789-00'
                        register={register}
                        required
                        custumizacaoClass="w-full"
                    />
                </div>
                <div className="flex max-lg:flex-col max-lg:gap-4 gap-10">
                    <FormularioInput
                        placeholder="Tipo da Conta:"
                        name="usuario.tipo_conta"
                        required
                        register={register}
                        custumizacaoClass="w-full"
                        options={['Usuario', 'Corretor', 'Administrador', 'Editor']}
                    />
                    <FormularioInput
                        placeholder="Telefone"
                        name="usuario.telefone"
                        interName="Ex: (00) 0000-0000"
                        register={register}
                        required
                        custumizacaoClass="w-full"
                    />
                    <FormularioInput
                        placeholder="Data de Nascimento:"
                        name="usuario.data_nascimento"
                        interName="Ex: 22/02/2005"
                        register={register}
                        required
                        custumizacaoClass="w-full"
                    />
                </div>

                <div className="flex max-lg:flex-col max-lg:gap-4 gap-10">
                    <FormularioInput
                        placeholder="E-mail:"
                        name="usuario.email"
                        interName="Ex: jaja@gmail.com"
                        register={register}
                        required
                        custumizacaoClass="w-full"
                    />
                    <FormularioInput
                        placeholder="Senha:"
                        name="usuario.senha"
                        interName="Ex: 123"
                        register={register}
                        required
                        custumizacaoClass="w-full"
                    />
                </div>
            </div>
        </div>
    )
}

