"use client";
import { useState } from 'react';


interface PlaceFilterProps {
    texto: string;
    tipo: string;
}

const PlaceFilter = ({ texto, tipo }: PlaceFilterProps) => {
    const [selected, setSelected] = useState<number | string | null>(null);

    if (tipo === "NumLocal") {
        const quartos = [1, 2, 3, "4+"];

        return (
            <div className="flex flex-col gap-2 w-[320px]">
                <p className="font-medium lg:font-bold text-2xl">{texto}</p>
                <div className="flex bg-[#DFDAD0] rounded-lg overflow-hidden w-64 xl:w-[320px]">
                    {quartos.map((q, index) => (
                        <button
                            key={index}
                            className={`p-2 text-[#702632] border border-[#DFDAD0] 
                                ${selected === q ? "bg-[#702632] text-white" : ""}
                                ${index !== quartos.length - 1 ? "border-r" : ""}
                                ${q === "4+" ? "flex-grow-[2]" : "flex-1"}
                                flex-grow transition-all duration-200`}
                            onClick={() => setSelected(q)}
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
            { src: "/escolhaCasa.png", alt: "escolha Casa", label: "Casa" },
            { src: "/escolhaApartamento.png", alt: "escolha Apartamento", label: "Apartamento" },
            { src: "/escolhaTerreno.png", alt: "escolha Terreno", label: "Terreno" }
        ];

        return (
            <div className="flex flex-col gap-2 w-[320px]">
                <p className="font-medium lg:font-bold text-2xl">{texto}</p>
                <div className="flex bg-[#DFDAD0] rounded-lg overflow-hidden w-64 xl:w-[320px] ">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            className={`flex p-2 justify-center items-center  border overflow-hidden flex-grow transition-all duration-200 
                                ${selected === img.alt ? "border-[#702632]" : "border-transparent"}`}
                            onClick={() => setSelected(img.alt)}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className=" w-6 h-6 object-cover "
                            />
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return null;
};

export default PlaceFilter;
