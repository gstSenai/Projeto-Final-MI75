"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormularioInput } from "../../Calendario/selecaoHorario";
import { CardHorario } from "../cardHorario";
import DayCarousel from "../../PaginaInicial/carrossel/dayCarousel/index"; // ajuste esse path se necessário

interface FormData {
  mes: string;
}

export function PaginaHistoricoUsuarioChamar() {
    const { register, watch } = useForm<FormData>();
    const selectedMonthName = watch("mes");
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
    const handleDaySelect = (day: number) => {
      setSelectedDay(day);
    };
  
    // Convertendo o nome do mês para número (0-11)
    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril",
      "Maio", "Junho", "Julho", "Agosto",
      "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const selectedMonth = monthNames.indexOf(selectedMonthName || "Janeiro");
  
    return (
      <>

        <div className="mb-6">
          <DayCarousel
            onDaySelect={handleDaySelect}
            externalMonth={selectedMonth}
          />
        </div>
  
        <div className="border-t-2 border-[#702632] mt-1 mb-4"></div>
  
        {selectedDay ? (
          <div>
            <p className="text-gray-700 font-semibold mb-2">
            </p>
            <CardHorario tipo="pendente" horario="8:00 - 9:00" codigo="9978" corretor="Kaua" />
            <CardHorario tipo="realizado" horario="10:00 - 11:00" codigo="2234" corretor="Kaua" />
            <CardHorario tipo="cancelado" horario="14:00 - 15:00" codigo="3345" corretor="Kaua" />
          </div>
        ) : (
          <p className="text-gray-400">Selecione um dia para ver os horários.</p>
        )}
      </>
    );
  }
  