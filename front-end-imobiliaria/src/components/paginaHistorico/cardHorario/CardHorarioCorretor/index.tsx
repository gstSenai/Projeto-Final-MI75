import { useState } from 'react';
import Image from 'next/image';
import { CardCasa } from '../../cardCasa';

interface CardHorarioProps {
    tipo: 'realizado' | 'cancelado' | 'pendente';
    horario: string;
    codigo: string;
    cliente: string;
}

export function CardHorario({ tipo, horario, codigo, cliente }: CardHorarioProps) {
    const [mostrarCardCasa, setMostrarCardCasa] = useState(false);

    return (
        <div className='pt-6 grid justify-center md:justify-center lg:justify-normal'>
            <div className='bg-[#702632] w-44 sm:w-44 md:w-44 lg:w-auto text-white py-3 sm:py-3 md:py-3 lg:py-3 px-6 rounded-lg shadow-md flex flex-col md:flex-col lg:flex-row justify-between items-center text-xs md:text-sm lg:text-base gap-3'>
                <div className='font-medium'>{horario}</div>

                <div className='flex flex-col md:flex-col lg:flex-row items-center gap-4 md:gap-4 lg:gap-8 text-xs md:text-sm lg:text-base'>
                    <p>Código: <span>{codigo}</span></p>
                    <p>Cliente: <span>{cliente}</span></p>

                    <div className='flex items-center gap-3 text-xs md:text-sm lg:text-base'>
                        {tipo === 'realizado' && (
                            <span className='bg-green-500 px-3 md:px-4 lg:px-5 py-[0.5px] rounded-full text-xs'>Realizado</span>
                        )}

                        {tipo === 'cancelado' && (
                            <span className='bg-red-500 px-3 md:px-4 lg:px-5 py-[0.5px] rounded-full text-xs'>Cancelado</span>
                        )}

                        {tipo === 'pendente' && (
                            <span className='bg-yellow-500 px-3 md:px-4 lg:px-5 py-[0.5px] rounded-full text-xs'>Pendente</span>
                        )}
                    </div>

                    <Image
                        src="/verIformacoes.png"
                        alt="Ícone de informações"
                        width={24}
                        height={24}
                        onClick={() => setMostrarCardCasa(true)}
                        className='hover:opacity-80 cursor-pointer'
                    />
                </div>
            </div>

            {mostrarCardCasa && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative">
                        <button 
                            onClick={() => setMostrarCardCasa(false)}
                            className="absolute -top-8 -right-8 bg-[#DFDAD0] rounded-full p-2 shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#702632]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <CardCasa codigo={codigo} />
                    </div>
                </div>
            )}
        </div>
    );
}