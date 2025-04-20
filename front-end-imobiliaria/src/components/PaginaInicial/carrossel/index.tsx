"use client";
import { useState, ReactNode, useRef, Children, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  type: string;
  children: ReactNode | ReactNode[];
}

export default function Carousel({ type, children }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const childrenArray = Children.toArray(children);
  const totalSlides = childrenArray.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  let startX = 0;
  let isDragging = false;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSlideChange = useCallback((direction: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return totalSlides - 1;
      if (newIndex >= totalSlides) return 0;
      return newIndex;
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating, totalSlides]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!isAnimating && !isDragging) {
        handleSlideChange(1);
      }
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, totalSlides, isAnimating, isDragging, handleSlideChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isAnimating) return;
    const deltaX = e.touches[0].clientX - startX;
    if (deltaX > 50) {
      handleSlideChange(-1);
      isDragging = false;
    } else if (deltaX < -50) {
      handleSlideChange(1);
      isDragging = false;
    }
  };

  const handleTouchEnd = () => {
    isDragging = false;
    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        handleSlideChange(1);
      }
    }, 5000);
  };

  const getVisibleSlides = () => {
    const slides = [];
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    const next = (currentSlide + 1) % totalSlides;

    slides.push(
      <div
        key="prev"
        className={`w-full sm:w-1/2 md:w-1/6 flex-shrink-0 px-2 sm:px-3 transition-all duration-500 ease-in-out ${
          isAnimating ? 'opacity-30 scale-90' : 'opacity-50 scale-90'
        }`}
      >
        {childrenArray[prev]}
      </div>
    );

    slides.push(
      <div
        key="current"
        className={`w-full sm:w-1/2 md:w-1/6 flex-shrink-0 px-2 sm:px-3 z-10 transition-all duration-500 ease-in-out ${
          isAnimating ? 'opacity-70 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {childrenArray[currentSlide]}
      </div>
    );

    slides.push(
      <div
        key="next"
        className={`w-full sm:w-1/2 md:w-1/6 flex-shrink-0 px-2 sm:px-3 transition-all duration-500 ease-in-out ${
          isAnimating ? 'opacity-30 scale-90' : 'opacity-50 scale-90'
        }`}
      >
        {childrenArray[next]}
      </div>
    );

    return slides;
  };

  if (type === "ajusteTriplo") {
    return (
      <div className="relative w-full mx-auto my-8 overflow-hidden">
        <div
          className="relative w-full flex justify-center items-center"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex justify-center items-center w-full">
            {isMobile ? (
              <div
                className={`w-full px-4 transition-opacity duration-500 ${
                  isAnimating ? 'opacity-70' : 'opacity-100'
                }`}
              >
                {childrenArray[currentSlide]}
              </div>
            ) : (
              getVisibleSlides()
            )}
          </div>

          <button
            onClick={() => handleSlideChange(-1)}
            disabled={isAnimating}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white text-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hidden sm:block"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => handleSlideChange(1)}
            disabled={isAnimating}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white text-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hidden sm:block"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-4">
          {childrenArray.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating && index !== currentSlide) {
                  handleSlideChange(index - currentSlide);
                }
              }}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 sm:w-12 bg-vermelho"
                  : "w-8 sm:w-12 bg-white hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === "ajusteNormal") {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const childrenArray = Children.toArray(children);
    const totalSlides = childrenArray.length;
    const carouselRef = useRef<HTMLDivElement>(null);
    let startX = 0;
    let isDragging = false;

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getItemsPerView = () => {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 768) return 2;
      if (window.innerWidth < 1024) return 3;
      return 4;
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
        className="relative w-full mx-auto mt-16 mb-32 overflow-hidden p-4 sm:p-6"
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
              className={`${
                isMobile 
                  ? "w-full" 
                  : window.innerWidth < 768 
                    ? "w-1/2" 
                    : window.innerWidth < 1024 
                      ? "w-1/3" 
                      : "w-1/4"
              } flex-shrink-0 px-2 sm:px-3`}
            >
              {child}
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white text-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hidden sm:block"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white text-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hidden sm:block"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    );
  }

  return null;
}
