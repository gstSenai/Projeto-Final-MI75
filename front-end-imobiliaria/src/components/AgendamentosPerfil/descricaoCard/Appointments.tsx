import AppointmentCard from "../card/AppointmentCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const appointments = [
  { corretor: "Gustavo Costa", data: "22/02/2025", horario: "15:40h" },
  { corretor: "Gustavo Costa", data: "08/07/2018", horario: "09:30h" },
];

export default function Appointments() {
  return (
    <div className=" py-10 px-6">
      <h2 className="mb-6 relative text-xl font-semibold pb-2 after:content-[''] after:block after:w-16 after:h-[2px] after:w-[70px] after:bg-[#702632] after:mt-1">Agendamentos</h2>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full bg-white hover:bg-gray-400 transition">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-6">
          {appointments.map((appointment, index) => (
            <AppointmentCard key={index} {...appointment} />
          ))}
        </div>
        <button className="p-2 rounded-full bg-white hover:bg-gray-400 transition">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
