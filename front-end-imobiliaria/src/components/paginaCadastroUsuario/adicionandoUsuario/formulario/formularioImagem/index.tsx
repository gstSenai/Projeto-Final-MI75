"use client";

import { useState } from "react";
import { Montserrat } from "next/font/google";
import PanZoom from "react-easy-panzoom";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
});

interface FormularioImagemProps {
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormularioImagem({ handleImageChange }: FormularioImagemProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(event);
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col font-montserrat items-center gap-2 mb-10">
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
