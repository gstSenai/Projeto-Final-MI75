"use client";
import Image from "next/image";
import React, { useState } from "react";

interface BotaoImageTextoProps {
  src: string;
  texto: string;
  onClick?: () => void;
}

const BotaoImageTexto: React.FC<BotaoImageTextoProps> = ({ src, texto, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Imagem de fundo */}
      <Image
        src={src}
        alt={texto}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isClicked ? "opacity-100 scale-110" : "opacity-90 scale-100"
          }`}
        width={400}
        height={300}
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <span className="text-white text-2xl font-medium text-center">{texto}</span>
      </div>
    </button>
  );
};

export default BotaoImageTexto;