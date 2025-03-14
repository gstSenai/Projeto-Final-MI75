"use client"
import { UseFormRegister } from "react-hook-form"
import { FormularioInput } from "../formularioInput"
import { ImageUpload } from "../image-upload"
import { Montserrat } from "next/font/google"

// Carregando a fonte Montserrat
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
            <div className="font-inter flex max-lg:justify-center">
                <div className="flex flex-row items-center max-lg:justify-center">
                    <p className="text-2xl xl:text-3xl font-semibold my-10 max-lg:hidden">Dados do Usuário:</p>
                </div>
            </div>

            <hr className="mb-10  w-full h-2 rounded-2xl bg-vermelho max-lg:h-3"></hr>

            <div className="flex flex-col lg:gap-6">
                <div className="flex lg:gap-10">
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
                <div className="flex lg:gap-10">
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

                <div className="flex lg:gap-10">
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
                        custumizacaoClass="lg:w-full"
                    />
                </div>
            </div>
        </div>
    )
}

