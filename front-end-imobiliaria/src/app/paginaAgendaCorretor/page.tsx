"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LoadingWrapper } from "@/components/loading/loadingServer";
import Calendario from "@/components/calendario/index";
import ListaCompromissos from "@/components/listaCompromissos";
import { useState } from "react";

export default function paginaAgenda() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const compromissos = [
        { hora: "12:00", horarios: "12:00 - 13:30", titulo: "Resort ITAPEMA BEACH", local: "ITAPEMA", cliente: "Andressa" },
        { hora: "15:00", horarios: "12:00 - 13:30", titulo: "Reunião", local: "Imobiliária", cliente: "Luiz" },
        { hora: "12:00", horarios: "12:00 - 13:30", titulo: "Resort ITAPEMA BEACH", local: "ITAPEMA", cliente: "Andressa" },
        { hora: "15:00", horarios: "12:00 - 13:30", titulo: "Reunião", local: "Imobiliária", cliente: "Luiz" },
        { hora: "12:00", horarios: "12:00 - 13:30", titulo: "Resort ITAPEMA BEACH", local: "ITAPEMA", cliente: "Andressa" },
        { hora: "15:00", horarios: "12:00 - 13:30", titulo: "Reunião", local: "Imobiliária", cliente: "Luiz" },
        { hora: "12:00", horarios: "12:00 - 13:30", titulo: "Resort ITAPEMA BEACH", local: "ITAPEMA", cliente: "Andressa" },
        { hora: "15:00", horarios: "12:00 - 13:30", titulo: "Reunião", local: "Imobiliária", cliente: "Luiz" },
    ];

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
    };

    return (
        <>
            <LoadingWrapper>
                <header>
                    <Header />
                </header>
                <div className="pt-10 px-6 max-lg:px-6 lg:px-20 xl:px-16">
                    <div className="flex-1">
                        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Agenda</h1>
                        <div className="border-t-2 border-[#702632] w-[130px] mt-1 mb-4"></div>
                    </div>
                    <section className="flex flex-col lg:flex-row gap-8 pb-9 lg:pb-10 xl:pb-14 2xl:pb-16">
                        {/* Calendário com tamanho reduzido */}
                        <div className="flex-1">
                            <Calendario className="scale-75 max-w-[500px] max-h-[550px] mx-auto" />
                        </div>
      
                        <ListaCompromissos compromissos={compromissos} selectedDate={selectedDate} />
                    </section>
                </div>
                <footer>
                    <Footer />
                </footer>
            </LoadingWrapper>
        </>
    );
}