"use client"
import Image from 'next/image';

interface CardHorarioProps {
    tipo: 'realizado' | 'cancelado' | 'pendente';
    horario: string;
    codigo: string;
    corretor: string;
}

export function CardHorario({ tipo, horario, codigo, corretor }: CardHorarioProps) {
    return (
        <div className='pt-14'>
            <div className='bg-[#702632] text-white p-4 px-8 rounded-lg shadow-md flex justify-between items-center text-xl'>
                <div className='font-medium'>{horario}</div>


                <div className='flex items-center gap-14 text-xl'>

                    <p>Código: <span>{codigo}</span></p>
                    <p>Corretor: <span>{corretor}</span></p>

                    <div className='flex items-center gap-4 text-xl'>
                        {tipo === 'realizado' && (
                            <span className='bg-green-500 px-14 py-1 rounded-full'>Realizado</span>
                        )}

                        {tipo === 'cancelado' && (
                            <span className='bg-red-500 px-[52px] py-1 rounded-full'>Cancelado</span>
                        )}

                        {tipo === 'pendente' && (
                            <span className='bg-yellow-500 px-14 py-1 rounded-full'>Pendente</span>
                        )}


                    </div>

                    <Image
                        src="/verIformacoes.png"
                        alt="Ícone de informações"
                        width={32}
                        height={30}
                        className='hover:opacity-80 cursor-pointer'
                    />

                </div>
            </div>
        </div>
    );
}