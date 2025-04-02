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
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const childrenArray = Children.toArray(children);
    const totalSlides = childrenArray.length;
    const carouselRef = useRef(null);
    const intervalRef = useRef<NodeJS.Timeout>();
    let startX = 0;
    let isDragging = false;

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
      // Limpa o intervalo anterior se existir
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Configura um novo intervalo
      intervalRef.current = setInterval(() => {
        if (!isAnimating && !isDragging) {
          handleSlideChange(1); // Avança para o próximo slide
        }
      }, 5000); // 5 segundos
      
      // Limpa o intervalo ao desmontar
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [currentIndex, totalSlides, isAnimating, isDragging]);

    const handleSlideChange = (direction: number) => {
      if (isAnimating) return;
      
      setIsAnimating(true);
      setCurrentIndex((prev) => {
        const newIndex = prev + direction;
        if (newIndex < 0) return totalSlides - 1;
        if (newIndex >= totalSlides) return 0;
        return newIndex;
      });

      // Reseta a animação após a transição
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    };

    const prevSlide = () => handleSlideChange(-1);
    const nextSlide = () => handleSlideChange(1);

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      // Pausa o intervalo durante o arrasto
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging || isAnimating) return;
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
      // Reinicia o intervalo após o arrasto
      intervalRef.current = setInterval(() => {
        if (!isAnimating) {
          handleSlideChange(1);
        }
      }, 5000);
    };

    const getVisibleSlides = () => {
      const slides = [];
      const prev = (currentIndex - 1 + totalSlides) % totalSlides;
      const next = (currentIndex + 1) % totalSlides;

      slides.push(
        <div 
          key="prev" 
          className={`w-full md:w-1/3 flex-shrink-0 px-3 transition-all duration-500 ease-in-out ${
            isAnimating ? 'opacity-30 scale-90' : 'opacity-50 scale-90'
          }`}
        >
          {childrenArray[prev]}
        </div>
      );
      
      slides.push(
        <div 
          key="current" 
          className={`w-full md:w-1/3 flex-shrink-0 px-3 z-10 transition-all duration-500 ease-in-out ${
            isAnimating ? 'opacity-70 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {childrenArray[currentIndex]}
        </div>
      );
      
      slides.push(
        <div 
          key="next" 
          className={`w-full md:w-1/3 flex-shrink-0 px-3 transition-all duration-500 ease-in-out ${
            isAnimating ? 'opacity-30 scale-90' : 'opacity-50 scale-90'
          }`}
        >
          {childrenArray[next]}
        </div>
      );

      return slides;
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
              <div 
                className={`w-full px-4 transition-opacity duration-500 ${
                  isAnimating ? 'opacity-70' : 'opacity-100'
                }`}
              >
                {childrenArray[currentIndex]}
              </div>
            ) : (
              getVisibleSlides()
            )}
          </div>

          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white text-gray-800 rounded-full shadow-lg text-sm invisible lg:visible hover:scale-110 transition-transform"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white text-gray-800 rounded-full shadow-lg text-sm invisible lg:visible hover:scale-110 transition-transform"
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
                if (!isAnimating && index !== currentIndex) {
                  handleSlideChange(index - currentIndex);
                }
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "w-12 md:w-12 lg:w-24 bg-vermelho" 
                  : "w-12 md:w-12 lg:w-24 bg-white hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
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