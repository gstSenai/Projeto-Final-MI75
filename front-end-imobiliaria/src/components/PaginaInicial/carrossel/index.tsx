"use client";
import { useState, ReactNode, useRef, Children, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
    children: ReactNode | ReactNode[];
}

export default function Carousel({ children }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false); // Estado para armazenar se é mobile
    const childrenArray = Children.toArray(children); // Transforma children em um array
    const totalSlides = childrenArray.length;
    const carouselRef = useRef<HTMLDivElement>(null);
    let startX = 0;
    let isDragging = false;

    // Efeito para verificar o tamanho da tela apenas no lado do cliente
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Verifica o tamanho da tela ao montar o componente
        handleResize();

        // Adiciona um listener para redimensionamento da tela
        window.addEventListener("resize", handleResize);

        // Remove o listener ao desmontar o componente
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Define o número de itens por visualização com base no tamanho da tela
    const getItemsPerView = () => {
        return isMobile ? 1 : 4; // 1 item no mobile, 4 no desktop
    };

    const itemsPerView = getItemsPerView();

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalSlides - itemsPerView : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= totalSlides - itemsPerView ? 0 : prev + 1));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - startX;
        if (deltaX > 50) {
            prevSlide();
            isDragging = false;
        } else if (deltaX < -50) {
            nextSlide();
            isDragging = false;
        }
    };

    const handleTouchEnd = () => {
        isDragging = false;
    };

    return (
        <div
            className="relative w-full mx-auto mt-16 mb-32 overflow-hidden p-6"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
                {childrenArray.map((child, index) => (
                    <div
                        key={index}
                        className={`${isMobile ? "w-full" : "w-1/4"} flex-shrink-0 px-3`}
                    >
                        {child}
                    </div>
                ))}
            </div>
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white text-gray-800 rounded-full shadow-lg text-sm invisible md:invisible lg:visible"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white text-gray-800 rounded-full shadow-lg text-sm invisible md:invisible lg:visible"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
}