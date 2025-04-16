"use client"
import { FormularioInput } from "../Calendario/selecaoHorario";
import { useForm } from "react-hook-form";
import type React from "react";

interface FormData {
    horario: string;
}

export function PaginaHistoricoUsuarioChamar() {
    const { register } = useForm<FormData>();

    return (
        <>
            <div className="flex w-[115px]">
                <FormularioInput
                    name="Més"
                    interName="Més"
                    register={register}
                    customizacaoClass="w-[300px] p-2 rounded rounded-full text-white border border-[#702632] bg-[#702632]"
                    required
                    options={[
                        "Janeiro", "Fevereiro", "Março", "Abril",
                        "Maio", "Junho", "Julho", "Agosto",
                        "Setembro", "Outubro", "Novembro", "Dezembro"
                    ]}
                />
            </div>

        </>                                                                                                                                          
    );
}