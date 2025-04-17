"use client"
import { FormularioInput } from "../Calendario/selecaoHorario";
import { useForm } from "react-hook-form";
import type React from "react";
import { CardHorario } from "./cardHorario";

interface FormData {
    mes: string;
}

export function PaginaHistoricoUsuarioChamar() {
    const { register } = useForm<FormData>();

    return (
        <>
            <div className="flex mx-auto md:mx-auto lg:mx-0 w-[115px]">
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
            <div>

                <div className="border-t-2 border-[#702632] mt-1"></div>

                <CardHorario tipo="pendente" horario="8:00 - 9:00" codigo="9978" corretor="kaua" />
                <CardHorario tipo="realizado" horario="8:00 - 9:00" codigo="9978" corretor="kaua" />
                <CardHorario tipo="cancelado" horario="8:00 - 9:00" codigo="9978" corretor="kaua" />
                <CardHorario tipo="pendente" horario="8:00 - 9:00" codigo="9978" corretor="kaua" />
                <CardHorario tipo="realizado" horario="8:00 - 9:00" codigo="9978" corretor="kaua" />
                <CardHorario tipo="cancelado" horario="8:00 - 9:00" codigo="9978" corretor="kaua" />
                <CardHorario tipo="pendente" horario="8:00 - 9:00" codigo="9978" corretor="kaua" />
                <CardHorario tipo="realizado" horario="8:00 - 9:00" codigo="9978" corretor="kaua" />
                <CardHorario tipo="cancelado" horario="8:00 - 9:00" codigo="9978" corretor="kaua" />
                <CardHorario tipo="pendente" horario="8:00 - 9:00" codigo="9978" corretor="kaua" />
                <CardHorario tipo="realizado" horario="8:00 - 9:00" codigo="9978" corretor="kaua" />
                <CardHorario tipo="cancelado" horario="8:00 - 9:00" codigo="9978" corretor="kaua" />
            </div>
        </>
    );
}