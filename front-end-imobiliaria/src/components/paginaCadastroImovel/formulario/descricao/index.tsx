"use client"

import type { UseFormRegister, FieldValues, Path } from "react-hook-form"

interface DescricaoProps<T extends FieldValues = FieldValues> {
    placeholder: string
    name: Path<T>
    className?: string
    register: UseFormRegister<T>
    required?: boolean
}

export function Descricao<T extends FieldValues = FieldValues>({ className = "", register, name, placeholder, required }: DescricaoProps<T>) {
    return (
        <div className="flex flex-col font-montserrat w-full">
            <div className="rounded-2xl w-full flex flex-col p-2 sm:p-4">
                <div className="flex flex-col items-start mb-4 sm:mb-5">
                    <label className="text-lg sm:text-xl font-medium text-black">Descrição do Imóvel</label>
                </div>
                <div className={`bg-white rounded-[20px] border border-black px-3 sm:px-5 py-4 sm:py-8 ${className}`}>
                    <div className="w-full h-full flex flex-col">
                        <textarea
                            {...register(name as Path<T>, { required: required ? `${placeholder} é obrigatório` : false })}
                            className="text-sm sm:text-base md:text-lg h-full text-black outline-none w-full resize-none overflow-auto font-montserrat"
                            placeholder="Digite aqui a descrição detalhada do imóvel..."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

