"use client"
import { Botao } from '@/components/botao';
import React, { useState, useEffect } from 'react';

interface FormularioInputProps {
    placeholder: string;
    name: string;
    showOptions?: boolean;
    custumizacaoClass: string;
    options?: string[];
    onChange?: (value: string) => void;
    value?: string;
}

function FormularioInput({ placeholder, name, showOptions = false, custumizacaoClass, options, onChange, value }: FormularioInputProps) {
    return (
        <form action="text" className={`flex items-center lg:h-[50px] max-lg:justify-center gap-6 xl:py-4 2xl:py-6 py-3.5 bg-white border border-black rounded-2xl max-lg:bg-transparent max-lg:border-transparent max-lg:p-0 ${custumizacaoClass}`}>
            <img src="/iconsForms/canetaEditar.png" alt="Editar" className="lg:h-6 ml-4" />
            {options ? (
                <select
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    className="appearance-none text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full bg-transparent"
                >
                    <option value="" disabled className="text-gray-400">{name}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option} className="text-black">{option}</option>
                    ))}
                </select>
            ) : (
                <input
                    type="text"
                    placeholder={placeholder}
                    name={name}
                    className="text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full"
                    value={value} // Valor do input
                    onChange={(e) => onChange && onChange(e.target.value)}
                />
            )}
            {showOptions && <img src="/iconsForms/botaoOpcoes.png" alt="Botão Opções" className="ml-auto mr-4 lg:h-6" />}
        </form>
    );
}

export function InputProcurarUsuario() {
    return (
        <div className="flex flex-col lg:gap-5 mb-10">
            <div className="flex lg:gap-16">
                <FormularioInput
                    placeholder="Nome:"
                    name="Nome:"
                    custumizacaoClass="lg:w-[25%]"
                />
                <FormularioInput
                    placeholder="CPF:"
                    name="CPF"
                    custumizacaoClass="lg:w-[25%]"
                />
                <FormularioInput
                    placeholder="Email:"
                    name="Email"
                    custumizacaoClass="lg:w-[25%]" />
                <div className='w-1/6'>
                    <Botao texto="Procurar" />
                </div>
            </div>

        </div>
    );
}
