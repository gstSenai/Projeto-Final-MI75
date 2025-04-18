"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DayCarouselProps {
  onDaySelect: (day: number) => void
  externalMonth?: number
  visibleDays?: number
}

const DayCarousel: React.FC<DayCarouselProps> = ({
  onDaySelect,
  externalMonth,
  visibleDays = 7,
}) => {
  const today = new Date()
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate())
  const [startIndex, setStartIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [dynamicVisibleDays, setDynamicVisibleDays] = useState(visibleDays)

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setContainerWidth(carouselRef.current.offsetWidth)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // Ajusta a quantidade de dias visíveis dinamicamente com base na largura do container
    const calculateVisibleDays = () => {
      if (containerWidth >= 640) {
        return 7; // Telas grandes
      } else if (containerWidth >= 480) {
        return 5; // Telas médias
      } else if (containerWidth >= 360) {
        return 3; // Telas pequenas
      } else {
        return 2; // Telas muito pequenas
      }
    };
    setDynamicVisibleDays(calculateVisibleDays());
    setStartIndex(0); // Resetar o índice ao mudar a quantidade de dias visíveis
  }, [containerWidth]);

  // Sincroniza com o externalMonth quando ele muda
  useEffect(() => {
    if (externalMonth !== undefined) {
      const newMonth = externalMonth
      const newYear =
        externalMonth < currentMonth && currentMonth === 11
          ? currentYear + 1
          : externalMonth > currentMonth && currentMonth === 0
          ? currentYear - 1
          : currentYear
  
      setCurrentMonth(newMonth)
      setCurrentYear(newYear)
      setSelectedDay(null)
      setStartIndex(0)
    }
  }, [externalMonth])
  

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const totalDays = daysInMonth(currentMonth, currentYear)
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1)
  const visibleDaysArray = daysArray.slice(startIndex, startIndex + dynamicVisibleDays)

  const monthName = (month: number) => {
    const formatter = new Intl.DateTimeFormat("pt-BR", { month: "long" })
    return formatter.format(new Date(currentYear, month))
  }

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth - 1
      if (newMonth < 0) {
        setCurrentYear(currentYear - 1)
        return 11
      }
      return newMonth
    })
    setSelectedDay(null)
    setStartIndex(0)
  }

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth + 1
      if (newMonth > 11) {
        setCurrentYear(currentYear + 1)
        return 0
      }
      return newMonth
    })
    setSelectedDay(null)
    setStartIndex(0)
  }

  const handlePrevDays = () => {
    setStartIndex((prev) => Math.max(0, prev - dynamicVisibleDays))
  }

  const handleNextDays = () => {
    setStartIndex((prev) => Math.min(totalDays - dynamicVisibleDays, prev + dynamicVisibleDays))
  }

  const getWeekDay = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day)
    const weekday = date.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "")
    return weekday.charAt(0).toUpperCase() + weekday.slice(1, 3)
  }

  const handleDayClick = (day: number) => {
    setSelectedDay(day)
    onDaySelect(day)
  }

  const canGoBack = startIndex > 0
  const canGoForward = startIndex + dynamicVisibleDays < totalDays

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex items-center justify-center w-full px-2 sm:px-4 mb-2">
        <button onClick={handlePrevMonth} className="p-1 text-gray-700">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold capitalize text-center px-10">
          {monthName(currentMonth)} {currentYear}
        </span>
        <button onClick={handleNextMonth} className="p-1 text-gray-700">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center w-full">
        <button
          onClick={handlePrevDays}
          disabled={!canGoBack}
          className={`p-1 ${canGoBack ? "text-gray-700" : "text-gray-300"}`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div ref={carouselRef} className="flex flex-1 pt-8 justify-between gap-1 px-1 sm:px-2 overflow-hidden">
          {visibleDaysArray.map((day) => {
            const weekDay = getWeekDay(day, currentMonth, currentYear)
            const isSelected = selectedDay === day

            return (
              <button
                key={day}
                data-day={day}
                onClick={() => handleDayClick(day)}
                className={`flex flex-col items-center justify-center rounded-md min-w-[55px] h-14  md:min-w-[60px] md:h-16  transition-colors ${isSelected ? "bg-white text-[#702632] border-2 border-[#702632]" : "bg-[#702632] text-white"
                  }`}
              >
                <span className={`text-xs font-medium text-center ${isSelected ? "text-[#702632]" : "text-white"}`}>
                  {weekDay}
                </span>
                <span className={`text-sm font-bold ${isSelected ? "text-[#702632]" : "text-white"}`}>
                  {day < 10 ? `0${day}` : day}
                </span>
              </button>
            )
          })}
        </div>

        <button
          onClick={handleNextDays}
          disabled={!canGoForward}
          className={`p-1 ${canGoForward ? "text-gray-700" : "text-gray-300"}`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default DayCarousel