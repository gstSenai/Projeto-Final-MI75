"use client";

import { useState } from 'react';

export function PesquisaPaginaInicial() {
    const [avancado, setAvancado] = useState(false);

    return (
        <div className="bg-[#702632] p-10 rounded-lg w-full max-w-3xl mx-auto">
            <div className='flex flex-row text-2xl gap-4 mb-6'>
                <button className="text-white font-bold border-b-2 border-transparent hover:border-white pb-1">Comprar</button>
                <button className="text-white font-bold border-b-2 border-transparent hover:border-white pb-1">Aluguel</button>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-white">Código:</label>
                    <input type="text" placeholder="Busca por Código" className="p-2 rounded bg-white w-full" />
                </div>
                <div className="flex flex-col">
                    <label className="text-white">Localização:</label>
                    <input type="text" placeholder="Busca por Localização" className="p-2 rounded bg-white w-full" />
                </div>
                <button 
                    className="text-white underline mt-2" 
                    onClick={() => setAvancado(!avancado)}
                >
                    {avancado ? 'Ocultar' : 'Avançado'}
                </button>
                {avancado && (
                    <div className="space-y-4 mt-4 transition-all duration-300 ease-in-out">
                        <div className="flex flex-col">
                            <label className="text-white">Min Valor:</label>
                            <input type="text" placeholder="Busca por Valor Mínimo" className="p-2 rounded bg-white w-full" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white">Max Valor:</label>
                            <input type="text" placeholder="Busca por Valor Máximo" className="p-2 rounded bg-white w-full" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white">Categoria:</label>
                            <div className="flex gap-2">
                                <button className="p-2 bg-white rounded">🏠</button>
                                <button className="p-2 bg-white rounded">🏢</button>
                                <button className="p-2 bg-white rounded">🏔️</button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white">Quant. de Quartos:</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4].map(num => (
                                    <button key={num} className="p-2 bg-white rounded">{num}+</button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white">Quant. de Banheiros:</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4].map(num => (
                                    <button key={num} className="p-2 bg-white rounded">{num}+</button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white">Quant. de Garagem:</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4].map(num => (
                                    <button key={num} className="p-2 bg-white rounded">{num}+</button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
