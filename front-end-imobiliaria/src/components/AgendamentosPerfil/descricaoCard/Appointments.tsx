'use client';
import AppointmentCard from "../card/AppointmentCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Montserrat } from 'next/font/google';
import { useState, useEffect } from 'react';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

const appointments = [
  { corretor: "Gustavo Costa", data: "22/02/2025", horario: "15:40h" },
  { corretor: "Gustavo Costa", data: "08/07/2018", horario: "09:30h" },
  { corretor: "Maria Silva", data: "25/02/2025", horario: "14:00h" },
  { corretor: "João Santos", data: "01/03/2025", horario: "10:15h" },
];

export default function Appointments() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // sm breakpoint
        setItemsPerPage(1);
      } else {
        setItemsPerPage(2);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < appointments.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleAppointments = appointments.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="font-montserrat py-6 sm:py-10 max-w-5xl mx-auto px-2 sm:px-4">
      <div className="pb-3 sm:pb-4 mb-6 sm:mb-8">
        <div className="sm:flex sm:justify-between sm:items-center">
          <h2 className="text-xl sm:text-2xl font-semibold">Agendamentos</h2>
          <button className="hidden sm:block text-base text-[#702632] font-medium relative hover:border-b-2 hover:border-[#702632]">
            Visualizar agenda
          </button>
        </div>
        <div className="w-16 sm:w-20 h-0.5 bg-[#702632] mt-2"></div>
        <button className="sm:hidden text-sm text-[#702632] font-medium mt-3 hover:border-b-2 hover:border-[#702632]">
          Visualizar agenda
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <button 
          className={`p-1.5 sm:p-2 rounded-full bg-white shadow-sm transition ${
            currentIndex === 0 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100 cursor-pointer'
          }`}
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="flex gap-4 sm:gap-6 justify-center transition-transform duration-300 ease-in-out">
          {visibleAppointments.map((appointment, index) => (
            <AppointmentCard key={currentIndex + index} {...appointment} />
          ))}
        </div>
        <button 
          className={`p-1.5 sm:p-2 rounded-full bg-white shadow-sm transition ${
            currentIndex + itemsPerPage >= appointments.length 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100 cursor-pointer'
          }`}
          onClick={nextSlide}
          disabled={currentIndex + itemsPerPage >= appointments.length}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
      
      {/* Indicadores de página */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
        {Array.from({ length: Math.ceil(appointments.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * itemsPerPage)}
            className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all ${
              index === currentIndex / itemsPerPage 
                ? 'bg-[#702632] w-3 sm:w-4' 
                : 'bg-[#9E8E93]'
            }`}
            aria-label={`Ir para página ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
