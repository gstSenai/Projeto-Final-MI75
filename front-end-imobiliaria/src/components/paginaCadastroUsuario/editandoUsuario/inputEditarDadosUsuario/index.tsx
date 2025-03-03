"use client";
import React, { useState } from "react";

interface FormularioInputProps {
    placeholder: string;
    name: string;
    showOptions?: boolean;
    custumizacaoClass: string;
    options?: string[];
    onChange?: (value: string) => void;
    value?: string;
}

function FormularioInput({
    placeholder,
    name,
    showOptions = false,
    custumizacaoClass,
    options,
    onChange,
    value,
}: FormularioInputProps) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => setIsClicked(true);
    const handleBlur = () => setIsClicked(false);

    return (
        <form
            action="text"
            className={`flex items-center lg:max-h-[58px] xl:max-h-[60px] 2xl:max-h-[62px] max-lg:justify-center gap-6 xl:py-4 2xl:py-6 py-3.5 bg-white border border-black rounded-2xl max-lg:bg-transparent max-lg:border-transparent max-lg:p-0 ${custumizacaoClass}`}
        >
            <img
                src="/iconsForms/canetaEditar.png"
                alt="Editar"
                className="lg:h-6 ml-4"
                onClick={handleClick}
            />
            {options ? (
                <select
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    className={`appearance-none text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full bg-transparent ${isClicked ? "text-red-500" : ""}`}
                    onBlur={handleBlur}
                    onFocus={handleClick}
                >
                    <option value="" disabled className="text-gray-400">
                        {name}
                    </option>
                    {options.map((option, index) => (
                        <option key={index} value={option} className="text-black">
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type="text"
                    placeholder={placeholder}
                    name={name}
                    className={`text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full ${isClicked ? "text-black" : ""}`}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    onBlur={handleBlur}
                    onFocus={handleClick}
                />
            )}
            {showOptions && (
                <img
                    src="/iconsForms/botaoOpcoes.png"
                    alt="Botão Opções"
                    className="ml-auto mr-4 lg:h-6"
                />
            )}
        </form>
    );
}

interface InputEditandoDadosUsuarioProps {
    selectedData: (string | number)[];
}

export function InputEditandoDadosUsuario({
    selectedData = []
}: InputEditandoDadosUsuarioProps) {
    const [formData, setFormData] = useState<(string | number)[]>(selectedData);

    const handleInputChange = (index: number, value: string) => {
        const newData = [...formData];
        newData[index] = value;
        setFormData(newData);
    };

    return (
        <div className="flex flex-col lg:gap-10">
            <div className="flex lg:gap-16">
                <FormularioInput
                    placeholder="Nome:"
                    name="Nome:"
                    custumizacaoClass="lg:w-[20%]"
                    value={String(formData[0] || "")}
                    onChange={(value) => handleInputChange(0, value)}
                />
                <FormularioInput
                    placeholder="Sobrenome:"
                    name="Sobrenome:"
                    custumizacaoClass="lg:w-[45.5%]"
                    value={String(formData[1] || "")}
                    onChange={(value) => handleInputChange(1, value)}
                />
                <FormularioInput
                    placeholder="CPF:"
                    name="CPF"
                    custumizacaoClass="lg:w-[32.5%]"
                    value={String(formData[2] || "")}
                    onChange={(value) => handleInputChange(2, value)}
                />
            </div>
            <div className="flex lg:gap-16">
                <FormularioInput
                    placeholder="Email:"
                    name="Email"
                    custumizacaoClass="lg:w-1/3"
                    value={String(formData[3] || "")}
                    onChange={(value) => handleInputChange(3, value)}
                />
                <FormularioInput
                    placeholder="Senha:"
                    name="Senha"
                    custumizacaoClass="lg:w-1/3"
                    value={String(formData[4] || "")}
                    onChange={(value) => handleInputChange(4, value)}
                />
                <FormularioInput
                    placeholder="Confirmação de senha:"
                    name="Confirmação de senha"
                    custumizacaoClass="lg:w-1/3"
                    value={String(formData[5] || "")}
                    onChange={(value) => handleInputChange(5, value)}
                />
            </div>
            <div className="flex lg:gap-16">
                <FormularioInput
                    placeholder="Celular:"
                    name="Celular"
                    custumizacaoClass="lg:w-1/3"
                    value={String(formData[6] || "")}
                    onChange={(value) => handleInputChange(6, value)}
                />
                <FormularioInput
                    placeholder="Telefone:"
                    name="Telefone"
                    custumizacaoClass="lg:w-1/3"
                    value={String(formData[7] || "")}
                    onChange={(value) => handleInputChange(7, value)}
                />
                <FormularioInput
                    placeholder="Dia do cadastro:"
                    name="Dia do cadastro"
                    custumizacaoClass="lg:w-1/3"
                    value={String(formData[8] || "")}
                    onChange={(value) => handleInputChange(8, value)}
                />
            </div>
            <div className="flex lg:gap-16">
                <FormularioInput
                    placeholder="Data de Nascimento:"
                    name="Data de Nascimento"
                    custumizacaoClass="lg:w-[50%]"
                    value={String(formData[9] || "")}
                    onChange={(value) => handleInputChange(9, value)}
                />
                <FormularioInput
                    placeholder="Último acesso:"
                    name="Último acesso"
                    custumizacaoClass="lg:w-[50%]"
                    value={String(formData[10] || "")}
                    onChange={(value) => handleInputChange(10, value)}
                />
            </div>
        </div>
    );
}