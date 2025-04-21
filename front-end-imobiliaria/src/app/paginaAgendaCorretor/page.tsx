"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LoadingWrapper } from "@/components/loading/loadingServer";
import Calendario from "@/components/calendario/index";
import ListaCompromissos from "@/components/listaCompromissos";
import { useEffect, useState } from "react";

type Compromisso = {
  hora: string;
  horarios: string;
  titulo: string;
  local: string;
  cliente: string;
  data: string; // novo campo
};

export default function PaginaAgenda() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [compromissos, setCompromissos] = useState<Compromisso[]>([]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    fetch("http://localhost:9090/agendamento/getAll")
      .then((res) => res.json())
      .then((data) => {
        const compromissosFormatados = data.map((item: any) => ({
          hora: item.horario.substring(0, 5),
          horarios: `Horário: ${item.horario}`,
          titulo: `Imóvel: ${item.imovel?.nome ?? "N/A"}`,
          local: `Endereço: ${item.imovel?.endereco ?? "N/A"}`,
          cliente: item.usuario?.nome ?? "Desconhecido",
          data: item.data,
        }));
        setCompromissos(compromissosFormatados);
      });
  }, []);

  const compromissosFiltrados = compromissos.filter((compromisso) => {
    if (!selectedDate) return false;
    return compromisso.data === selectedDate;
  });

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
            <div className="flex-1">
              <Calendario className="scale-75 max-w-[500px] max-h-[550px] mx-auto" onDateChange={handleDateChange} />
            </div>

            <ListaCompromissos compromissos={compromissosFiltrados} selectedDate={selectedDate} />
          </section>
        </div>
        <footer>
          <Footer />
        </footer>
      </LoadingWrapper>
    </>
  );
}
