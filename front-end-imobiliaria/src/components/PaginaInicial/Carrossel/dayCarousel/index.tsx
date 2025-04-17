"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import type React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FormData {
    mes: string;
}

interface DayCarouselProps {
    onDaySelect: (day: number) => void;
}

export function DayCarousel({ onDaySelect }: DayCarouselProps) {// Export the component
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    const daysInMonth = useCallback((month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    }, []);

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
                <span className="font-semibold">{monthName(currentMonth)} {currentYear}</span>
                <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-200">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
            <div ref={carouselRef} className="flex overflow-x-auto scroll-smooth gap-2 p-2">
                {daysArray.map((day) => (
                    <button
                        key={day}
                        data-day={day}
                        onClick={() => handleDayClick(day)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                            selectedDay === day ? 'bg-[#702632] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {day < 10 ? `0${day}` : day}
                    </button>
                ))}
            </div>
        </div>
    );
}