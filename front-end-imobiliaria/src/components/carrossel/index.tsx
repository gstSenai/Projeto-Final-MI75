"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const Carousel: React.FC = () => {
    const images = [
        { src: "/jaragua.png", alt: "Imagem jaraguá", title: "Jaraguá do Sul" },
        { src: "/guaramirim.png", alt: "Imagem guaramirim", title: "Guaramirim" },
        { src: "/curupa.png", alt: "Imagem curupa", title: "Corupá" },
        { src: "/schorder.png", alt: "Imagem schoreder", title: "Schroeder" },
        { src: "/jaragua.png", alt: "Imagem jaraguá", title: "Jaraguá do Sul" },
        { src: "/guaramirim.png", alt: "Imagem guaramirim", title: "Guaramirim" },
        { src: "/curupa.png", alt: "Imagem curupa", title: "Corupá" },
        { src: "/schorder.png", alt: "Imagem schoreder", title: "Schroeder" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(4);
    const containerRef = useRef<HTMLDivElement>(null);
    let touchStartX = 0;
    let touchEndX = 0;

    useEffect(() => {
        const updateItemsPerView = () => {
            if (window.innerWidth < 768) {
                setItemsPerView(1);
            } else {
                setItemsPerView(4);
            }
        };
        updateItemsPerView();
        window.addEventListener("resize", updateItemsPerView);
        return () => window.removeEventListener("resize", updateItemsPerView);
    }, []);

    const maxIndex = Math.max(0, images.length - itemsPerView);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX - touchEndX > 20) {
            nextImage();
        } else if (touchEndX - touchStartX > 20) {
            prevImage();
        }
    };

    return (
        <div className="flex items-center justify-center space-x-4 pb-20 pt-10">
            <button
                onClick={prevImage}
                className="p-2 bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center hidden md:block"
            >
                {"<"}
            </button>
            <div
                className="flex overflow-hidden"
                style={{ width: `${itemsPerView * (window.innerWidth < 768 ? 280 : 420)}px` }}
                ref={containerRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="flex transition-transform duration-300"
                    style={{
                        transform: `translateX(-${currentIndex * (window.innerWidth < 768 ? 280 : 420)}px)`,
                        width: `${images.length * (window.innerWidth < 768 ? 280 : 420)}px`
                    }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="relative w-[280px] h-[270px] md:w-[420px] md:h-[420px] flex-shrink-0">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={390}
                                height={270}
                                quality={100}
                                className="object-cover"
                            />
                            <h2 className="absolute inset-0 flex items-center justify-center text-2xl text-white font-medium bg-opacity-50">
                                {image.title}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={nextImage}
                className="p-2 bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center hidden md:block"
            >
                {">"}
            </button>
        </div>
    );
};

export default Carousel;