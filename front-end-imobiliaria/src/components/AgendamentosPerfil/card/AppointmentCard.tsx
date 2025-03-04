import { Calendar, User } from "lucide-react";

interface AppointmentCardProps {
  corretor: string;
  data: string;
  horario: string;
}

export default function AppointmentCard({ corretor, data, horario }: AppointmentCardProps) {
  return (
    <div className="border border-black rounded-2xl  p-4  flex flex-col items-start w-80">
      <div className="flex items-center gap-2 text-black mb-2">
        <img src="./public/iconPerfil/user-profile-01.png" alt="ícone" className="w-4 h-4" />
        <span className="text-sm">Corretor: <strong>{corretor}</strong></span>
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-2 text-black">
          <img src="./public/iconPerfil/clock-01.png" alt="ícone" className="w-4 h-4" />
          <span className="text-sm">Data: <strong>{data}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-black">
          <img src="./public/iconPerfil/clock-01.png" alt="ícone" className="w-4 h-4" />
          <span className="text-sm">Horário: <strong>{horario}</strong></span>
      </div>
      </div>
      <button className="mt-4 bg-[#702632] text-white px-4 py-2 rounded-lg w-fullhover:bg-[#702632] hover:opacity-70 transition">
        Visualizar propriedade
      </button>
    </div>
  );
}