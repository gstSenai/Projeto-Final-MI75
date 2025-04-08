"use client"

import { useState } from 'react';
import Image from 'next/image';

export default function ConfirmarFavorito() {
    const [favorito, setFavorito] = useState(false);
    const [mostrarMensagem, setMostrarMensagem] = useState(false);

    const handleClick = () => {
        setMostrarMensagem(true);
    };

    const confirmarAcao = () => {
        setFavorito(!favorito);
        setMostrarMensagem(false);
    };

    const cancelarAcao = () => {
        setMostrarMensagem(false);
    };

    return (
        <div className="absolute justify-end">
            <div className="bg-[#DFDAD0] rounded-full w-14 h-14 flex items-center justify-center">
                <Image
                    onClick={handleClick}
                    src={favorito ? "/favoritos/coracaoPrenchido.png" : "/favoritos/coracaoVazio.png"}
                    alt={favorito ? "Coração Cheio" : "Coração Vazio"}
                    width={30}
                    height={30}
                    className="cursor-pointer"
                />
            </div>

            {mostrarMensagem && (
                <div className="mt-6 bg-[#DFDAD0] p-4 rounded-lg text-center w-80 shadow-md">
                    <p className="mb-4 text-gray-800 font-semibold">
                        {favorito ? "Deseja remover o imóvel dos favoritos?" : "Deseja favoritar este imóvel ?"}
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            className="bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-4 rounded"
                            onClick={confirmarAcao}
                        >
                            Confirmar
                        </button>
                        <button
                            className="bg-rose-700 hover:bg-rose-800 text-white font-bold py-1 px-4 rounded"
                            onClick={cancelarAcao}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
