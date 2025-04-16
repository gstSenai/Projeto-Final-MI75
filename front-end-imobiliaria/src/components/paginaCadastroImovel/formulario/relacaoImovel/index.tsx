"use client"
import { UseFormSetValue, FieldErrors } from "react-hook-form"
import { RelacaoCorretorImovel } from "./relacaoCorretorImovel"
import { RelacaoProprietarioImovel } from "./relacaoProprietarioImovel"
import { FormData } from "../index"

interface RelacaoImovelProps {
    setValue: UseFormSetValue<FormData>
    errors: FieldErrors<FormData>
    onProprietarioAdicionado: () => void
    onUsuarioAdicionado: () => void
}

export function RelacaoImovel({ setValue, errors, onProprietarioAdicionado, onUsuarioAdicionado }: RelacaoImovelProps) {
    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto">
            <div className="w-full">
                <div className="h-full">
                    <div className="space-y-4">
                        <div className="mt-8">
                            <RelacaoCorretorImovel
                                placeholder="Corretores"
                                setValue={setValue}
                                className="w-full h-40"
                                errors={errors?.usuario} 
                                onUsuarioAdicionado={onUsuarioAdicionado}
                            />
                            <RelacaoProprietarioImovel
                                placeholder="Proprietários"
                                setValue={setValue}
                                className="w-full h-40"
                                errors={errors?.proprietarios}
                                onProprietarioAdicionado={onProprietarioAdicionado}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


