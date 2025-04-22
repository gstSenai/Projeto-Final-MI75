import { useState } from 'react';
import Image from 'next/image';
import { CardCasa } from '../cardCasa';

interface CardHorarioProps {
    tipo: 'realizado' | 'cancelado' | 'pendente';
    horario: string;
    codigo: string;
    corretor: string;
}

export function CardHorario({ tipo, horario, codigo, corretor }: CardHorarioProps) {
    const [mostrarCardCasa, setMostrarCardCasa] = useState(false);

    return (
        <div className='pt-12 grid justify-center md:justify-center lg:justify-normal '>
            <div className='bg-[#702632] w-44 sm:w-44 md:w-44 lg:w-auto text-white py-4 sm:py-4 md:py-4 lg:py-4 px-8 rounded-lg shadow-md flex flex-col md:flex-col lg:flex-row justify-between items-center text-sm md:text-base lg:text-lg gap-4'>
                <div className='font-medium'>{horario}</div>

                <div className='flex flex-col md:flex-col lg:flex-row items-center gap-7 md:gap-7 lg:gap-14 text-sm md:text-base lg:text-lg'>
                    <p>Código: <span>{codigo}</span></p>
                    <p>Corretor: <span>{corretor}</span></p>

                    <div className='flex items-center gap-4  text-sm md:text-base lg:text-lg'>
                        {tipo === 'realizado' && (
                            <span className='bg-green-500 px-5 md:px-6 lg:px-7 py-[0.5px] rounded-full'>Realizado</span>
                        )}

                        {tipo === 'cancelado' && (
                            <span className='bg-red-500  px-5 md:px-6 lg:px-6 py-[0.5px] rounded-full'>Cancelado</span>
                        )}

                        {tipo === 'pendente' && (
                            <span className='bg-yellow-500  px-5 md:px-6 lg:px-7 py-[0.5px] rounded-full'>Pendente</span>
                        )}
                    </div>

                    <Image
                        src="/verIformacoes.png"
                        alt="Ícone de informações"
                        width={32}
                        height={30}
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
                            className="absolute -top-10 -right-10 bg-[#DFDAD0] rounded-full p-2 shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#702632]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <CardCasa />
                    </div>
                </div>
            )}
        </div>
    );
}