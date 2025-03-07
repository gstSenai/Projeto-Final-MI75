"use client"
import React, { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormularioInput } from '../formularioInput';

interface EnderecoSectionProps {
    register: UseFormRegister<any>;
}

export function EnderecoSection({ register }: EnderecoSectionProps) {
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

    return (
        <>
            <div className="font-inter flex justify-between max-lg:justify-center">
                <div className="flex flex-row items-center max-lg:justify-center">
                    <p className="text-2xl xl:text-4xl font-semibold my-10 max-lg:hidden">Endereço:</p>
                </div>
            </div>
            <div className="flex flex-col lg:gap-10">
                <div className="flex lg:gap-16">
                    <FormularioInput
                        placeholder="UF:"
                        name="uf"
                        showOptions
                        register={register}
                        custumizacaoClass="lg:w-[20%]"
                        options={estados}
                    />
                    <FormularioInput
                        placeholder="Cidade:"
                        name="cidade"
                        showOptions
                        register={register}
                        custumizacaoClass="lg:w-[45.5%]"
                        options={cidades}
                    />
                    <FormularioInput
                        placeholder="Cep:"
                        name="cep"
                        register={register}
                        custumizacaoClass="lg:w-[32.5%]"
                    />
                </div>
                <div className="flex lg:gap-16">
                    <FormularioInput
                        placeholder="Bairro:"
                        name="bairro"
                        register={register}
                        custumizacaoClass="lg:w-1/3" 
                    />
                    <FormularioInput
                        placeholder="Rua:"
                        name="rua"
                        register={register}
                        custumizacaoClass="lg:w-1/3" 
                    />
                    <FormularioInput
                        placeholder="Número:"
                        name="numero"
                        register={register}
                        custumizacaoClass="lg:w-1/3" 
                    />
                </div>
                <div className="flex lg:gap-16">
                    <FormularioInput
                        placeholder="Nome da Propriedade:"
                        name="nome da propriedade"
                        register={register}
                        custumizacaoClass="lg:w-full" 
                    />
                </div>
                <div className="flex lg:gap-16">
                    <FormularioInput
                        placeholder="Complemento:"
                        name="complemento"
                        register={register}
                        custumizacaoClass="lg:w-full h-40" 
                    />
                </div>
            </div>
        </>
    );
}
