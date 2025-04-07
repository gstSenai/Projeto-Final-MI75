"use client";

import { useState } from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400",'500', '600', "800"],
  display: "swap",
});

interface FormularioImagemProps {
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormularioImagem({ handleImageChange }: FormularioImagemProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    handleImageChange(event);
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImagePreview(e.target.result as string);
        }
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex ${montserrat.className} flex-col items-center gap-4 mb-10`}>
      <div className="relative bg-gray-100 hover:bg-gray-200 h-56 w-56 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 border-2 border-dashed border-gray-300">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
          </div>
        ) : imagePreview ? (
          <div className="w-full h-full relative">
            <Image
              src={imagePreview}
              alt="Pré-visualização"
              className="w-full h-full object-cover transition-transform duration-200"
              width={100}
              height={100}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="rounded-full w-10 h-10 bg-gray-300 text-gray-600 text-2xl flex items-center justify-center">+</span>
            <span className="text-gray-500 text-sm">Carregar foto</span>
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
