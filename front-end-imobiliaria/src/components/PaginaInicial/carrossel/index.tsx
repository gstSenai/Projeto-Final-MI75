"use client";
import { useState, ReactNode, useRef, Children, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  type: string;
  children: ReactNode | ReactNode[];
}

export default function Carousel({ type, children }: CarouselProps) {
  if (type === "ajusteTriplo") {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState<"left" | "right">("right");
    const [isAnimating, setIsAnimating] = useState(false);
    const childrenArray = Children.toArray(children);
    const totalSlides = childrenArray.length;
    const carouselRef = useRef<HTMLDivElement>(null);

    // Touch handling variables
    const startXRef = useRef(0);
    const isDraggingRef = useRef(false);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        if (!isAnimating) {
          handleSlideChange("right", (prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
        }
      }, 10000);
      return () => clearInterval(interval);
    }, [currentIndex, totalSlides, isAnimating]);

    const handleSlideChange = (direction: "left" | "right", indexUpdater: (prev: number) => number) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setTransitionDirection(direction);
      setCurrentIndex(indexUpdater);

      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    };

    const prevSlide = () => {
      handleSlideChange("left", (prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const nextSlide = () => {
      handleSlideChange("right", (prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      startXRef.current = e.touches[0].clientX;
      isDraggingRef.current = true;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDraggingRef.current || isAnimating) return;

      const deltaX = e.touches[0].clientX - startXRef.current;
      if (deltaX > 50) {
        prevSlide();
        isDraggingRef.current = false;
      } else if (deltaX < -50) {
        nextSlide();
        isDraggingRef.current = false;
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const getVisibleSlides = () => {
      const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      const nextIndex = (currentIndex + 1) % totalSlides;
    
      return (
        <div className="relative w-full flex justify-center items-center h-[500px] overflow-visible">
          <div className="relative flex justify-center items-center w-full max-w-6xl mx-auto h-full">
            
            {/* Slide anterior - posicionado à esquerda */}
            <div
              key={`prev-${prevIndex}`}
              className={`absolute w-[40%] px-3 opacity-50 scale-90 transition-all duration-500 ease-in-out z-10 ${
                isAnimating
                  ? transitionDirection === "right"
                    ? "animate-fade-in-left"
                    : "animate-fade-out-right"
                  : ""
              }`}
              style={{ left: '5%', transform: 'translateX(-50%) scale(0.95)' }}
            >
              {childrenArray[prevIndex]}
            </div>
    
            {/* Slide atual - centralizado */}
            <div
              key={`current-${currentIndex}`}
              className={`relative w-[40%] mx-auto px-3 z-20 transition-all duration-500 ease-in-out ${
                isAnimating
                  ? transitionDirection === "right"
                    ? "animate-slide-left"
                    : "animate-slide-right"
                  : ""
              }`}
              style={{ transform: 'scale(1)' }}
            >
              {childrenArray[currentIndex]}
            </div>
    
            {/* Próximo slide - posicionado à direita */}
            <div
              key={`next-${nextIndex}`}
              className={`absolute w-[30%] px-3 opacity-50 scale-90 transition-all duration-500 ease-in-out z-10 ${
                isAnimating
                  ? transitionDirection === "right"
                    ? "animate-fade-out-right"
                    : "animate-fade-in-left"
                  : ""
              }`}
              style={{ right: '5%', transform: 'translateX(50%) scale(0.95)' }}
            >
              {childrenArray[nextIndex]}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="relative w-full mx-auto my-8 overflow-hidden">
        <div
          className="relative w-full flex justify-center items-center"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex justify-center items-center">
            {isMobile ? (
              <div className="w-full px-4 animate-fade-in">{childrenArray[currentIndex]}</div>
            ) : (
              getVisibleSlides()
            )}
          </div>

          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white text-gray-800 rounded-full shadow-lg text-sm invisible md:visible hover:scale-110 transition-transform disabled:opacity-50"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white text-gray-800 rounded-full shadow-lg text-sm invisible md:visible hover:scale-110 transition-transform disabled:opacity-50"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-16 gap-8">
          {childrenArray.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  handleSlideChange(index > currentIndex ? "right" : "left", () => index);
                }
              }}
              disabled={isAnimating}
              className={`h-1 rounded-full transition-all duration-300 ${index === currentIndex ? "w-12 md:w-12 lg:w-24 bg-vermelho" : "w-12 md:w-12 lg:w-24 bg-white"
                }`}
            />
          ))}
        </div>

        <style jsx global>{`
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-70%) scale(0.95); }
  to { opacity: 0.5; transform: translateX(-50%) scale(0.95); }
}
@keyframes fadeOutLeft {
  from { opacity: 0.5; transform: translateX(-50%) scale(0.95); }
  to { opacity: 0; transform: translateX(-70%) scale(0.9); }
}
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(70%) scale(0.95); }
  to { opacity: 0.5; transform: translateX(50%) scale(0.95); }
}
@keyframes fadeOutRight {
  from { opacity: 0.5; transform: translateX(50%) scale(0.95); }
  to { opacity: 0; transform: translateX(70%) scale(0.9); }
}
@keyframes slideLeft {
  from { transform: translateX(30px) scale(1); }
  to { transform: translateX(0) scale(1); }
}
@keyframes slideRight {
  from { transform: translateX(-30px) scale(1); }
  to { transform: translateX(0) scale(1); }
}
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in-left {
            animation: fadeInLeft 0.5s ease-in-out forwards;
          }
          .animate-fade-out-left {
            animation: fadeOutLeft 0.5s ease-in-out forwards;
          }
          .animate-fade-in-right {
            animation: fadeInRight 0.5s ease-in-out forwards;
          }
          .animate-fade-out-right {
            animation: fadeOutRight 0.5s ease-in-out forwards;
          }
          .animate-slide-left {
            animation: slideLeft 0.5s ease-in-out forwards;
          }
          .animate-slide-right {
            animation: slideRight 0.5s ease-in-out forwards;
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
          .carousel-slide {
            opacity: 0.5;
            transform: scale(0.9);
            transition: all 0.5s ease-in-out;
          }
          .carousel-slide.current {
            opacity: 1;
            transform: scale(1);
          }
        `}</style>
      </div>
    );
  }









  if (type = "ajusteNormal") {
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
}