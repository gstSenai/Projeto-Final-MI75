"use client"

interface DescricaoProps {
    className?: string
}

export function Descricao({ className = "" }: DescricaoProps) {
    return (
        <div className={`bg-white rounded-[20px] border border-black px-5 py-8 ${className}`}>
            <form action="text" className="flex gap-5">
                <img src="/iconsForms/canetaEditar.png" alt="Editar" className="h-8 lg:h-6 ml-4" />
                <textarea
                    placeholder="Descrição"
                    name="descrição"
                    className="text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl h-60 max-lg:text-black outline-none w-full resize-none overflow-auto"
                />
            </form>
        </div>
    )
}

