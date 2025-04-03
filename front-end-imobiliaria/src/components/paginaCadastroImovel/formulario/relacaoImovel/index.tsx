"use client"
import { UseFormRegister, UseFormSetValue } from "react-hook-form"
import { RelacaoCorretorImovel } from "./relacaoCorretorImovel"
import { RelacaoProprietarioImovel } from "./relacaoProprietarioImovel"

interface RelacaoImovelProps {
    register: UseFormRegister<any>
    errors: any
    setValue: UseFormSetValue<any>
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
                                name="imovel.usuario"
                                register={register}
                                className="w-full h-40"
                                errors={errors?.imovel?.usuario} 
                                onUsuarioAdicionado={onUsuarioAdicionado}
                            />
                            <RelacaoProprietarioImovel
                                placeholder="Proprietários"
                                name="imovel.proprietarios"
                                register={register}
                                setValue={setValue}
                                className="w-full h-40"
                                errors={errors?.imovel?.proprietarios}
                                onProprietarioAdicionado={onProprietarioAdicionado}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

