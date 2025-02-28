"use client";

import React, { useState } from 'react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';

interface TableProps {
  headers: string[];
  data: (string | number)[][];
}

// Carregando a fonte Montserrat
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '800'],
  display: 'swap',
});

export function GenericTable({ headers, data }: TableProps) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  return (
    <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row 2xl:flex-row  '>
      <div className={`${montserrat.className} bg-[#F4ECE4] shadow-[5px_20px_100px_rgba(0,0,0,0.1)] rounded-[20px] overflow-hidden basis-5/6`}>
        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#702632] text-white sticky top-0 z-10">
                {headers.map((header, index) => (
                  <th key={index} className="p-4 sm:p-4 lg:p-6 text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl text-center font-bold border border-[#E0D6CE]">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-[#FAF6ED] hover:bg-[#702632] hover:bg-opacity-30 transition-all cursor-pointer border-b border-[#E0D6CE]"
                  onClick={() => setSelectedRow(rowIndex)}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`p-4 text-center text-xs sm:text-xs md:text-sm lg:text-base 2xl:text-lg text-black border border-[#E0D6CE] ${selectedRow === rowIndex ? 'bg-[#702632] bg-opacity-50' : ''
                        }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex flex-col basis-1/6 justify-center items-center pt-11 sm:pt-11 md:pt-14 lg:pt-0 '>
        <button className='w-[181px] h-16 m-4 bg-[#016E2F] text-white rounded-[20px] text-center inline-block align-middle'>
          <div className='pl-5 flex items-center gap-3 justify-start '>
            <img src="./iconsForms/sinalAdd.png" alt="sinal de adição" />
            <p className='text-xl font-medium'>Adicionar</p>
          </div>
        </button>

        <button className='w-[181px] h-16 m-4 bg-[#702632] text-white rounded-[20px] text-center inline-block align-middle'>
          <div className='pl-5 flex items-center gap-3 justify-start'>
            <img src="./iconsForms/sinalRemove.png" alt="sinal de remoção" />
            <p className='text-xl font-medium'>Remover</p>
          </div>
        </button>

        <button className='w-[181px] h-16 m-4 bg-[#252422] text-white rounded-[20px] text-center inline-block align-middle'>
          <div className='pl-5 flex items-center gap-3 justify-start'>
            <img src="./iconsForms/canetaEditarBranco.png" alt="sinal de edição" />
            <p className='text-xl font-medium'>Editar</p>
          </div>
        </button>
      </div>
    </div>
  );
}
//sm: md: lg: 2xl: