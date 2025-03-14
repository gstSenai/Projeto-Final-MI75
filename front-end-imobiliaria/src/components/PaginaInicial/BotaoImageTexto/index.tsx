"use client";
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
        <img
          src={src}
          alt={texto}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isClicked ? "opacity-100 brightness-125" : "opacity-90 brightness-100"
          }`}
        />
        {/* Overlay escuro para melhorar a legibilidade do texto */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          {/* Texto centralizado */}
          <span className="text-white text-2xl font-bold text-center">{texto}</span>
        </div>
      </button>
    );
  };

export default BotaoImageTexto;