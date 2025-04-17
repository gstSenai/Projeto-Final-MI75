import { useState, useCallback, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DayCarouselProps {
  onDaySelect: (day: number) => void;
  externalMonth?: number; // <- nova prop
}

export function DayCarousel({ onDaySelect, externalMonth }: DayCarouselProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
  const carouselRef = useRef<HTMLDivElement>(null);

  const daysInMonth = useCallback((month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);

  useEffect(() => {
    if (externalMonth !== undefined && externalMonth !== currentMonth) {
      setCurrentMonth(externalMonth);
      setSelectedDay(null); // limpa seleção ao trocar mês
    }
  }, [externalMonth]);

  const getWeekDay = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day);
    return date.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "");
  };

  const monthName = useCallback((month: number) => {
    const formatter = new Intl.DateTimeFormat('pt-BR', { month: 'long' });
    return formatter.format(new Date(currentYear, month));
  }, [currentYear]);

  const daysArray = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth - 1;
      if (newMonth < 0) {
        setCurrentYear(currentYear - 1);
        return 11;
      }
      return newMonth;
    });
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth + 1;
      if (newMonth > 11) {
        setCurrentYear(currentYear + 1);
        return 0;
      }
      return newMonth;
    });
    setSelectedDay(null);
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    onDaySelect(day);
  };

  useEffect(() => {
    if (carouselRef.current && selectedDay) {
      const selectedElement = carouselRef.current.querySelector(`[data-day="${selectedDay}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedDay]);

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-200">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold capitalize">{monthName(currentMonth)} {currentYear}</span>
        <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-200">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto scroll-smooth gap-4 p-2 items-center"
      >
        {daysArray.map((day) => {
          const weekDay = getWeekDay(day, currentMonth, currentYear);
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              data-day={day}
              onClick={() => handleDayClick(day)}
              className={`flex flex-col items-center justify-center rounded-md w-14 h-14 transition-colors ${
                isSelected ? 'bg-[#702632] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-xs font-semibold text-center mb-1 text-[#702632] dark:text-gray-400 ${isSelected ? 'text-white' : ''}">
                {weekDay.charAt(0).toUpperCase() + weekDay.slice(1)}
              </span>
              <span className="text-sm font-medium">{day < 10 ? `0${day}` : day}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}