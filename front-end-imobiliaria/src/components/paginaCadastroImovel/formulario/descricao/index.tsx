"use client"

import type { UseFormRegister } from "react-hook-form"

interface DescricaoProps {
    placeholder: string
    name: string
    className?: string
    register: UseFormRegister<any>
    required?: boolean
}

export function Descricao({ className = "", register, name, placeholder, required }: DescricaoProps) {
    return (
        <div className={`bg-white rounded-[20px] border border-black px-5 py-8 ${className}`}>
            <form action="text" className="flex h-full gap-5">
                <textarea
                    {...register(name, { required: required ? `${placeholder} é obrigatório` : false })}
                    className="ax-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl h-full text-black outline-none w-full resize-none overflow-auto"
                />
            </form>
        </div>
    )
}

