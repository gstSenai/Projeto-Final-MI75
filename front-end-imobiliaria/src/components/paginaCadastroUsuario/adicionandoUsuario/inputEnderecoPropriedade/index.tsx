"use client"
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

export function InputEnderecoPropriedade() {
    const [uf, setUf] = useState<string>('');
    const [residencia, setResidencia] = useState<string>('');
    const [cidade, setCidade] = useState<string>('');
    const [cidades, setCidades] = useState<string[]>([]);

    const estados = ['SP', 'RJ', 'MG', 'BA', 'PR'];
    const tiposResidencia = ["Casa", "Apartamento", "Terreno"]

    type Estado = 'SP' | 'RJ' | 'MG' | 'BA' | 'PR';

    const cidadesPorEstado: Record<Estado, string[]> = {
        'SP': ['São Paulo', 'Campinas', 'Santos'],
        'RJ': ['Rio de Janeiro', 'Niterói', 'Petrópolis'],
        'MG': ['Belo Horizonte', 'Juiz de Fora', 'Uberlândia'],
        'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
        'PR': ['Curitiba', 'Londrina', 'Maringá']
    };

    useEffect(() => {
        if (uf && cidadesPorEstado[uf as Estado]) {
            setCidades(cidadesPorEstado[uf as Estado]);
            setCidade('');
        }
    }, [uf]);

    return (
        <div className="flex flex-col lg:gap-10">
            <div className="flex lg:gap-16">
                <FormularioInput
                    placeholder="UF:"
                    name="UF:"
                    showOptions
                    custumizacaoClass="lg:w-[20%]"
                    options={estados}
                    onChange={setUf}
                    value={uf} 
                />
                <FormularioInput
                    placeholder="Cidade:"
                    name="Cidade:"
                    showOptions
                    custumizacaoClass="lg:w-[45.5%]"
                    options={cidades}
                    onChange={setCidade}
                    value={cidade}
                />
                <FormularioInput
                    placeholder="Cep:"
                    name="cep"
                    custumizacaoClass="lg:w-[32.5%]"
                />
            </div>
            <div className="flex lg:gap-16">
                <FormularioInput placeholder="Bairro:" name="bairro" custumizacaoClass="lg:w-1/3" />
                <FormularioInput placeholder="Rua:" name="rua" custumizacaoClass="lg:w-1/3" />
                <FormularioInput placeholder="Número:" name="número" custumizacaoClass="lg:w-1/3" />
            </div>
            <div className="flex lg:gap-16">
            <FormularioInput
                    placeholder="Tipo de residência:"
                    name="Tipo de residência:"
                    showOptions
                    custumizacaoClass="lg:w-full"
                    options={tiposResidencia}
                    onChange={setResidencia}
                    value={residencia} 
                />
            </div>
        </div>
    );
}
