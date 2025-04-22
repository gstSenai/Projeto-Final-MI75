"use client";
import Image from 'next/image';
import { useState } from 'react';

interface PlaceFilterProps {
    tipo: string;
    texto: string;
    onSelect?: (value: string) => void;
}

export default function PlaceFilter({ tipo, texto, onSelect }: PlaceFilterProps) {
    const [selected, setSelected] = useState<(number | string)[]>([]);

    const handleSelection = (value: number | string) => {
        if (selected.includes(value)) {
            setSelected(selected.filter(item => item !== value));
        } else {
            setSelected([...selected, value]);
        }
        onSelect?.(value.toString());
    };

    if (tipo === "NumLocal") {
        const quartos = [1, 2, 3, "4+"];

        return (
            <div className="flex flex-col gap-2 w-64 xl:w-[320px]">
                <p className="font-medium lg:text-lg w-[270px]">{texto}</p>
                <div className="flex bg-[#DFDAD0] rounded-lg overflow-hidden w-64 xl:w-[320px]">
                    {quartos.map((q, index) => (
                        <button
                            key={index}
                            className={`p-2 text-[#702632] border border-[#DFDAD0] 
                                ${selected.includes(q) ? "bg-[#702632] text-white" : ""}
                                ${index !== quartos.length - 1 ? "border-r" : ""}
                                flex-1 transition-all duration-200`}
                            onClick={() => handleSelection(q)}
                        >
                            {q}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (tipo === "TipoLocal") {
        const images = [
            { src: "/paginaInicial/PaginaInicialProcura/escolhaCasa.png", alt: "escolha Casa", label: "Casa" },
            { src: "/paginaInicial/PaginaInicialProcura/escolhaApartamento.png", alt: "escolha Apartamento", label: "Apartamento" },
            { src: "/paginaInicial/PaginaInicialProcura/escolhaTerreno.png", alt: "escolha Terreno", label: "Terreno" }
        ];

        return (
            <div className="flex flex-col gap-2 w-[320px]">
                <p className="font-medium lg:text-lg text-2xl">{texto}</p>
                <div className="flex bg-[#DFDAD0] rounded-lg overflow-hidden w-64 xl:w-[320px]">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            className={`flex p-2 justify-center items-center border overflow-hidden flex-grow transition-all duration-200 
                                ${selected.includes(img.label) ? "border-[#702632]" : "border-transparent"}`}
                            onClick={() => handleSelection(img.label)}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                className="w-6 h-6 object-cover"
                                width={24}
                                height={24}
                            />
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}