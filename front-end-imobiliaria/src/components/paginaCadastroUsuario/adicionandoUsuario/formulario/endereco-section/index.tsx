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

export function EnderecoSection({ register }: { register: UseFormRegister<any> }) {
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
                <div className="flex lg:gap-10">
                    <FormularioInput
                        placeholder="UF:"
                        name="endereco.uf"
                        register={register}
                        onChange={handleUfChange}
                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                        options={estados}
                        required
                    />
                    <FormularioInput
                        placeholder="Cidade:"
                        name="endereco.cidade"
                        register={register}
                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                        options={cidades}
                        required
                    />
                    <FormularioInput
                        placeholder="Cep:"
                        interName='00000-000'
                        name="endereco.cep"
                        register={register}
                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                        required
                    />
                </div>
                <div className="flex lg:gap-10">
                    <FormularioInput
                        placeholder="Bairro:"
                        name="endereco.bairro"
                        interName=''
                        register={register}
                        custumizacaoClass="w-full p-2  border border-gray-500 rounded"
                        required
                    />
                    <FormularioInput
                        placeholder="Rua:"
                        name="endereco.rua"
                        interName=''
                        register={register}
                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                        required
                    />
                    <FormularioInput
                        placeholder="Número:"
                        name="endereco.numero"
                        interName='Ex: 009'
                        register={register}
                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                        required
                    />
                </div>
                <div className="flex lg:gap-10">
                    <FormularioInput
                        placeholder="Complemento:"
                        name="endereco.complemento"
                        interName=""
                        register={register}
                        custumizacaoClass="w-full p-2 border border-gray-500 rounded"
                    />
                </div>

            </div>
        </>
    );
}
