'use client'

import React, { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormularioInput } from '../formularioInput';
import { Montserrat } from "next/font/google"

// Carregando a fonte Montserrat
const inter = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

interface DadosEnderecoUsuarioSectionProps {
    register: UseFormRegister<any>
    errors: any
}


export function EnderecoSection({ register, errors }: DadosEnderecoUsuarioSectionProps) {
    const [uf, setUf] = useState<string>('');
    const [cidade, setCidade] = useState<string>('');
    const [cidades, setCidades] = useState<string[]>([]);

    const estados = ['SC'];

    type Estado = 'SC';

    const cidadesPorEstado: Record<Estado, string[]> = {
        'SC': ['Jaraguá do Sul', 'Joinville', 'Corupá']
    };

    useEffect(() => {
        if (uf && cidadesPorEstado[uf as Estado]) {
            setCidades(cidadesPorEstado[uf as Estado]);
            setCidade('');
        }
    }, [uf]);

    const handleUfChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        if (event.target instanceof HTMLSelectElement) {
            setUf(event.target.value);
        } else if (event.target instanceof HTMLInputElement) {
            setCidade(event.target.value);
        }
    };

    return (
        <>
            <div className="flex flex-col mt-6 lg:gap-4 font-montserrat">
                <div className="flex max-lg:flex-col max-lg:gap-4 gap-10">
                    <FormularioInput
                        placeholder="CEP:"
                        interName='00000-000'
                        name="endereco.cep"
                        register={register}
                        customizacaoClass="w-full p-2  border border-gray-500 rounded"
                        required
                        errors={errors?.cep}
                    />
                    <FormularioInput
                        placeholder="UF:"
                        name="endereco.uf"
                        register={register}
                        onChange={handleUfChange}
                        customizacaoClass="w-full p-2  border border-gray-500 rounded"
                        options={estados}
                        required
                        errors={errors?.uf}
                    />
                    <FormularioInput
                        placeholder="Cidade:"
                        name="endereco.cidade"
                        register={register}
                        customizacaoClass="w-full p-2  border border-gray-500 rounded"
                        options={cidades}
                        required
                        errors={errors?.cidade}
                    />
                    <FormularioInput
                        placeholder="Rua:"
                        name="endereco.rua"
                        interName=''
                        register={register}
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        required
                        errors={errors?.rua}
                    />

                </div>
                <div className="flex max-lg:flex-col max-lg:gap-4 max-lg:pt-4 gap-10">
                    <FormularioInput
                        placeholder="Bairro:"
                        name="endereco.bairro"
                        interName=''
                        register={register}
                        customizacaoClass="w-full p-2  border border-gray-500 rounded"
                        required
                        errors={errors?.bairro}
                    />
                    <FormularioInput
                        placeholder="Tipo de Residência:"
                        name="endereco.tipo_residencia"
                        interName=""
                        register={register}
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        options={["Casa", "Apartamento"]}
                        required
                        errors={errors?.tipo_residencia}
                    />
                    <FormularioInput
                        placeholder="Número do Imovel:"
                        name="endereco.numero_imovel"
                        interName='Ex: 009'
                        register={register}
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        required
                        errors={errors?.numero_imovel}
                    />
                </div>
                <div className="flex max-lg:flex-col max-lg:gap-4 max-lg:pt-4 gap-10">
                    <FormularioInput
                        placeholder="Número Apartamento (Caso tenha):"
                        name="endereco.numero_apartamento"
                        interName="Ex: 009"
                        register={register}
                        customizacaoClass="w-full p-2 border border-gray-500 rounded"
                        errors={errors?.numero_apartamento}
                    />
                </div>

            </div>
        </>
    );
}
