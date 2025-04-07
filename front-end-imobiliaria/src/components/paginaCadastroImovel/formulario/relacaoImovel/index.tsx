"use client"
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form"
import { RelacaoCorretorImovel } from "./relacaoCorretorImovel"
import { RelacaoProprietarioImovel } from "./relacaoProprietarioImovel"
import { FormData } from "../index"

interface RelacaoImovelProps {
    register: UseFormRegister<FormData>
    errors: FieldErrors<FormData>
    setValue: UseFormSetValue<FormData>
    onProprietarioAdicionado: () => void
    onUsuarioAdicionado: () => void
}

export function RelacaoImovel({ register, errors, setValue, onProprietarioAdicionado, onUsuarioAdicionado }: RelacaoImovelProps) {
    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto">
            <div className="w-full">
                <div className="h-full">
                    <div className="space-y-4">
                        <div className="mt-8">
                            <RelacaoCorretorImovel
                                placeholder="Corretores"
                                name="usuario"
                                register={register}
                                setValue={setValue}
                                className="w-full h-40"
                                errors={errors?.usuario} 
                                onUsuarioAdicionado={onUsuarioAdicionado}
                            />
                            <RelacaoProprietarioImovel
                                placeholder="Proprietários"
                                name="proprietarios"
                                register={register}
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


