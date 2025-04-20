"use client";

type Compromisso = {
  hora: string;
  horarios: string;
  titulo: string;
  local: string;
  cliente: string;
};

type ListaCompromissosProps = {
  compromissos: Compromisso[];
  selectedDate: string | null;
};

export default function ListaCompromissos({ compromissos, selectedDate }: ListaCompromissosProps) {
  return (
    <div className="flex-1 bg-[#F4F1EA] p-6 rounded-lg shadow-md">
      <h2 className="font-bold text-lg md:text-xl lg:text-2xl mb-4">
        {selectedDate ? `${selectedDate}` : "Selecione uma data"}
      </h2>
      <ul className="space-y-4">
        {compromissos.map((compromisso, index) => (
          <li
            key={index}
            className="bg-[#702632] text-white p-4 rounded-lg shadow-md flex flex-row justify-between items-center"
          >
            <span className="font-bold text-lg">{compromisso.hora}</span>
            <div className="items-center flex flex-row text-sm text-center">
              <span>{compromisso.titulo}</span>
            </div>
            <div className="flex flex-col ml-4">
              <span className="text-sm">{compromisso.horarios}</span>
              <span className="text-sm">{compromisso.local}</span>
              <span className="text-sm">Cliente: {compromisso.cliente}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}