"use client"

import { useState } from 'react';
import Image from 'next/image';

interface Selectfavoritar {
    usuarioId: number,
    imovelId: number
}

export default function ConfirmarFavorito({ usuarioId, imovelId }: Selectfavoritar) {
    const [favorito, setFavorito] = useState(false);
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClick = () => {
        setMostrarMensagem(true);
        setError(null);
    };

    const confirmarAcao = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            if (!favorito) {
                const response = await fetch("http://localhost:9090/favoritos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ usuarioId, imovelId }),
                });
                
                if (!response.ok) {
                    throw new Error('Failed to add favorite');
                }
            } else {
                const response = await fetch(`http://localhost:9090/favoritos/${usuarioId}/${imovelId}`, {
                    method: "DELETE",
                });
                
                if (!response.ok) {
                    throw new Error('Failed to remove favorite');
                }
            }
            setFavorito(!favorito);
            setMostrarMensagem(false);
        } catch (error) {
            console.error("Erro ao atualizar favorito:", error);
            setError('Erro ao atualizar favorito. Por favor tente de novo.');
        } finally {
            setIsLoading(false);
        }
    };

    const cancelarAcao = () => {
        setMostrarMensagem(false);
        setError(null);
    };

    return (
        <>
            <div className="absolute top-2 right-2 z-20">
                <div className="bg-[#DFDAD0] rounded-full h-10 w-10 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14 flex items-center justify-center">
                    <button
                        onClick={handleClick}
                        aria-label={favorito ? "Remove from favorites" : "Add to favorites"}
                        className="cursor-pointer"
                    >
                        <Image
                            src={favorito ? "/favoritos/coracaoPrenchido.png" : "/favoritos/coracaoVazio.png"}
                            alt={favorito ? "Coração Cheio" : "Coração Vazio"}
                            width={30}
                            height={30}
                            className="w-[20px] h-[16px] lg:w-[20px] lg:h-[16px] xl:w-[22.5px] xl:h-[18px] 2xl:w-[30px] 2xl:h-[24px]"
                        />
                    </button>
                </div>
            </div>

            {mostrarMensagem && (
                <div className="absolute inset-0 flex items-center justify-center z-30 bg-black bg-opacity-50 rounded-t-[12px]">
                    <div className="bg-[#DFDAD0] p-4 rounded-lg text-center shadow-md max-w-xs">
                        <p className="mb-4 text-gray-800 font-semibold">
                            {favorito ? "Deseja remover o imóvel dos favoritos?" : "Deseja favoritar este imóvel?"}
                        </p>
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-4 rounded disabled:opacity-50"
                                onClick={confirmarAcao}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Processando...' : 'Confirmar'}
                            </button>
                            <button
                                className="bg-[#702632] hover:bg-[#802b39] text-white font-bold py-1 px-4 rounded disabled:opacity-50"
                                onClick={cancelarAcao}
                                disabled={isLoading}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}