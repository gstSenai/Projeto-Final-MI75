"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/components/calendario/cn";

type CalendarProps = {
  locale?: string;
  className?: string;
  onDateChange?: (date: string) => void; // <- aqui
};

export default function CustomCalendar({ locale = "pt-BR", className, onDateChange }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysFromPrevMonth = firstDayOfMonth;
  const lastDayPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
  const monthName = currentDate.toLocaleString(locale, { month: "long" });
  const weekdays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  const isPast = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(currentYear, currentMonth, day);
    return date < today;
  };

  const handleDateClick = (day: number, isPrevMonth = false, isNextMonth = false) => {
    let month = currentMonth;
    let year = currentYear;
  
    if (isPrevMonth) {
      month = month - 1;
      if (month < 0) {
        month = 11;
        year = year - 1;
      }
    }
  
    if (isNextMonth) {
      month = month + 1;
      if (month > 11) {
        month = 0;
        year = year + 1;
      }
    }
  
    const newDate = new Date(year, month, day);
  
    if (newDate >= new Date(new Date().setHours(0, 0, 0, 0))) {
      setSelectedDate(newDate);
      
      // Enviar no formato ISO (YYYY-MM-DD)
      onDateChange?.(newDate.toISOString().split('T')[0]);
    }
  };
  

  const renderCalendarDays = () => {
    const days = [];

    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const day = lastDayPrevMonth - i;
      days.push(
        <div key={`prev-${day}`} className="flex justify-center items-center py-2">
          <button
            onClick={() => handleDateClick(day, true)}
            disabled={isPast(day)}
            className={cn(
              "flex justify-center items-center w-8 h-8 rounded-lg text-gray-300 font-medium transition-all",
              isPast(day) ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            )}
          >
            {day}
          </button>
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

      days.push(
        <div key={`current-${day}`} className="flex justify-center items-center py-2">
          <button
            onClick={() => handleDateClick(day)}
            disabled={isPast(day)}
            className={cn(
              "flex justify-center items-center w-8 h-8 lg:w-10 lg:h-10 rounded-lg font-medium transition-all",
              isSelected(day)
                ? "bg-[#702632] text-white"
                : isPast(day)
                ? "opacity-50 cursor-not-allowed text-gray-500"
                : isWeekend
                ? "text-red-500 hover:bg-gray-100"
                : "text-gray-800 hover:bg-gray-100",
              isToday(day) && !isSelected(day) && "border border-[#702632]"
            )}
          >
            {day}
          </button>
        </div>
      );
    }

    const totalDaysDisplayed = days.length;
    const remainingCells = 42 - totalDaysDisplayed;

    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="flex justify-center items-center py-2">
          <button
            onClick={() => handleDateClick(day, false, true)}
            className="flex justify-center items-center w-12 h-12 rounded-lg text-gray-300 font-medium transition-all hover:bg-gray-100"
          >
            {day}
          </button>
        </div>
      );
    }

    return days;
  };

  return (
    <div className={cn("bg-white rounded-xl p-6 xl:p-12 shadow-sm w-full h-full max-w-[955px] max-h-[827px]", className)}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} className="bg-[#F4F1EA] p-3 md:p-4 lg:p-5 xl:p-2 2xl:p-3 rounded-[10px] flex items-center justify-center shadow-md">
          <ChevronLeft className="text-gray-400" />
        </button>

        <h2 className="text-base md:text-lg lg:text-xl font-medium text-gray-800 capitalize">
          {monthName} {currentYear}
        </h2>

        <button onClick={nextMonth} className="bg-[#F4F1EA] p-3 md:p-4 lg:p-5 xl:p-2 2xl:p-3 rounded-[10px] flex items-center justify-center shadow-md">
          <ChevronRight className="text-gray-400" /> 
        </button>
      </div>

      <div className="bg-[#A79E9E] p-[0.5px] mb-2"></div>

      <div className="grid grid-cols-7 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="flex justify-center items-center h-8 text-xs text-gray-300 font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">{renderCalendarDays()}</div>
    </div>
  );
}
