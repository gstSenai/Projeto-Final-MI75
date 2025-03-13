'use client'

import React, { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormularioInput } from '../formularioInput';

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
            <div className="font-inter flex-col justify-between max-lg:justify-center">
                <hr className="mt-16 mb-4 w-full h-2 rounded-2xl bg-vermelho max-lg:h-3 max-lg:mt-10"></hr>
                <div className="flex flex-row items-center max-lg:justify-center">
                    <p className="text-2xl xl:text-4xl font-semibold my-10 max-lg:hidden">Endereço:</p>
                </div>
            </div>
            <div className="flex flex-col lg:gap-10">
                <div className="flex lg:gap-16">
                    <FormularioInput
                        placeholder="UF:"
                        name="endereco.uf"
                        showOptions
                        register={register}
                        onChange={handleUfChange}
                        custumizacaoClass="lg:w-[20%]"
                        options={estados}
                        required={true}
                    />
                    <FormularioInput
                        placeholder="Cidade:"
                        name="endereco.cidade"
                        showOptions
                        register={register}
                        custumizacaoClass="lg:w-[45.5%]"
                        options={cidades}
                        required={true}
                    />
                    <FormularioInput
                        placeholder="Cep:"
                        name="endereco.cep"
                        register={register}
                        custumizacaoClass="lg:w-[32.5%]"
                        required={true}
                    />
                </div>
                <div className="flex lg:gap-16">
                    <FormularioInput
                        placeholder="Bairro:"
                        name="endereco.bairro"
                        register={register}
                        custumizacaoClass="lg:w-1/3"
                        required={true}
                    />
                    <FormularioInput
                        placeholder="Rua:"
                        name="endereco.rua"
                        register={register}
                        custumizacaoClass="lg:w-1/3"
                        required={true}
                    />
                    <FormularioInput
                        placeholder="Número:"
                        name="endereco.numero"
                        register={register}
                        custumizacaoClass="lg:w-1/3"
                        required={true}
                    />
                </div>
                <div className="flex lg:gap-16">
                    <FormularioInput
                        placeholder="Complemento:"
                        name="endereco.complemento"
                        register={register}
                        custumizacaoClass="lg:w-full h-40"
                    />
                </div>
            </div>
        </>
    );
}
