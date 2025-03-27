"use client";

import { useState } from "react";
import { Montserrat } from "next/font/google";
import PanZoom from "react-easy-panzoom";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "800"],
    display: "swap",
});

interface FormularioImagemEditProps {
    handleImageUpload: (file: File) => void; // Espera uma função que recebe um File
}

export function FormularioImagemEdit({ handleImageUpload }: FormularioImagemEditProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null); // Estado para a pré-visualização da imagem

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            handleImageUpload(file); // Passa o arquivo para a função handleImageUpload

            // Cria uma URL temporária para a pré-visualização da imagem
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    setImagePreview(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={`flex ${montserrat.className} flex-col items-center gap-2 mb-10`}>
            <label className="text-xl font-medium text-black">Foto de perfil</label>
            <div className="relative cursor-pointer bg-gray-300 hover:bg-gray-400 h-56 w-56 rounded-full flex items-center justify-center overflow-hidden transition border border-gray-500 shadow-lg">
                {imagePreview ? (
                    <PanZoom>
                        <img
                            src={imagePreview}
                            alt="Pré-visualização"
                            className="w-full h-full object-cover"
                        />
                    </PanZoom>
                ) : (
                    <span className="text-gray-600 text-sm">Clique para enviar</span>
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