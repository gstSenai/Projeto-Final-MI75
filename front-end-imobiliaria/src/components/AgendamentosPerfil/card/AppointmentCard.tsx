import { Calendar, User } from "lucide-react";

interface AppointmentCardProps {
  corretor: string;
  data: string;
  horario: string;
}

export default function AppointmentCard({ corretor, data, horario }: AppointmentCardProps) {
  return (
    <div className="border border-black rounded-2xl p-3 sm:p-4 flex flex-col items-start w-[280px] sm:w-80">
      <div className="flex items-center gap-2 text-black mb-2">
        <img src="/iconPerfil/usuario.png" alt="ícone" className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
        <span className="text-xs sm:text-sm">Corretor: <strong>{corretor}</strong></span>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-3 space-y-2 sm:space-y-0">
        <div className="flex items-center gap-2 text-black">
          <img src="/iconPerfil/calendario.png" alt="ícone" className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          <span className="text-xs sm:text-sm">Data: <strong>{data}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-black">
          <img src="/iconPerfil/relogio.png" alt="ícone" className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          <span className="text-xs sm:text-sm">Horário: <strong>{horario}</strong></span>
        </div>
      </div>
      <button className="mt-3 sm:mt-4 bg-[#702632] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg w-full hover:bg-[#702632] hover:opacity-70 transition text-xs sm:text-sm">
        Visualizar propriedade
      </button>
    </div>
  );
}