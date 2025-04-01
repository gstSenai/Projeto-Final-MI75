"use client";

import { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "800"],
    display: "swap",
});

interface FormularioImagemEditProps {
    handleImageUpload: (file: File) => void;
    imagemAtual?: string;
}

export function FormularioImagemEdit({ handleImageUpload, imagemAtual }: FormularioImagemEditProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (imagemAtual) {
            const fetchImage = async () => {
                try {
                    const response = await fetch(`http://localhost:9090/usuario/imagem/${imagemAtual}`);
                    if (response.ok) {
                        const blob = await response.blob();
                        const imageUrl = URL.createObjectURL(blob);
                        setImagePreview(imageUrl);
                    }
                } catch (error) {
                    console.error("Erro ao carregar imagem:", error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchImage();
        } else {
            setIsLoading(false);
        }
    }, [imagemAtual]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            handleImageUpload(file);

            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    setImagePreview(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY * -0.01;
        const newScale = Math.min(Math.max(0.5, scale + delta), 3);
        setScale(newScale);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartPosition({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - startPosition.x,
                y: e.clientY - startPosition.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className={`flex ${montserrat.className} flex-col items-center gap-4 mb-10`}>
            <label className="text-xl font-medium text-black">Foto de perfil</label>
            <div className="relative bg-gray-300 hover:bg-gray-400 h-56 w-56 rounded-full flex items-center justify-center overflow-hidden transition border border-gray-500 shadow-lg">
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
                    </div>
                ) : imagePreview ? (
                    <div 
                        className="w-full h-full relative"
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <img
                            src={imagePreview}
                            alt="Pré-visualização"
                            className="w-full h-full object-cover transition-transform duration-200"
                            style={{
                                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`
                            }}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                        <span className="rounded-full w-10 h-10 bg-gray-400 text-white text-2xl flex items-center justify-center">+</span>
                        <span className="text-gray-600 text-sm">Clique para enviar</span>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
            </div>
        </div>
    );
}