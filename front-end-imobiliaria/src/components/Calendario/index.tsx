"use client";
import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import clsx from "clsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importando ícones

export default function Calendario() {
    const [dataSelecionada, setDataSelecionada] = useState<Date | null>(new Date());

    const handleChange: CalendarProps["onChange"] = (value) => {
        if (value instanceof Date) {
            setDataSelecionada(value);
        } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Date) {
            setDataSelecionada(value[0]); // Se for um range, pega a primeira data
        }
    };

    return (
        <div>
            <div className="rounded-xl border-white">
                <Calendar
                    onChange={handleChange}
                    value={dataSelecionada}
                    locale="pt-BR"
                    formatShortWeekday={(locale, date) =>
                        ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"][date.getDay()]
                       
                 
                    }
                    prevLabel={
                        <div className="bg-[#F4F1EA] p-4 rounded-[10px]">
                            <FaChevronLeft className="text-[#929090] flex items-center justify-center" />
                        </div>

                    }
                    nextLabel={

                        <div className="bg-[#F4F1EA] p-4 rounded-[10px]">
                            <FaChevronRight className="text-[#929090] flex items-center justify-center" />
                        </div>
                    }
                    prev2Label={null}
                    next2Label={null}
                    className="w-[320px] bg-white rounded-xl p-4"
                    tileClassName={({ date }) =>
                        clsx(
                            "flex justify-center items-center w-10 h-10 rounded-lg text-gray-800 font-medium transition-all",
                            {
                                "bg-[#702632] text-white font-bold":
                                    dataSelecionada && date.toDateString() === dataSelecionada.toDateString(),
                                "hover:bg-[#e0d6c8]": !dataSelecionada || date.toDateString() !== dataSelecionada.toDateString(),
                                "text-red-500": date.getDay() === 0 || date.getDay() === 6, // Fins de semana em vermelho
                            }
                        )
                    }
                    navigationLabel={({ date }) => (
                        <span className="text-lg font-semibold">
                            {date.toLocaleString("pt-BR", { month: "long", year: "numeric" })}
                        </span>
                    )}

                />
            </div>
        </div>
    );
}