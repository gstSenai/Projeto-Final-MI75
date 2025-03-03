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

export function GenericTable({ headers, data, isPropertyTable }: TableProps & { isPropertyTable: boolean }) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  return (
    <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row 2xl:flex-row'>
      <div className='bg-[#F4ECE4] shadow-lg rounded-[20px] overflow-hidden basis-5/6'>
        <div className='overflow-x-auto max-h-[500px]'>
          <table className='w-full border-separate border-spacing-0'>
            <thead>
              <tr className='bg-[#702632] text-white sticky top-0 z-10'>
                {headers.map((header, index) => (
                  <th key={index} className='p-4 text-center font-bold border border-[#E0D6CE]'>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className='bg-[#FAF6ED] hover:bg-[#702632] hover:bg-opacity-30 cursor-pointer border-b border-[#E0D6CE]'
                  onClick={() => setSelectedRow(rowIndex)}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`p-4 text-center border border-[#E0D6CE] ${selectedRow === rowIndex ? 'bg-[#702632] bg-opacity-50' : ''}`}
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

const propertyHeaders = ['Código', 'Nome da Propriedade', 'Tipo de imóvel', 'Visibilidade', 'Estado'];
const propertyData = [
  ['4356AA353', 'Casa de Guaramirim', 'Venda', 'Permitida', 'Promoção'],
  ['6541e9v564', 'Casa de João Pessoa', 'Locação', 'Bloqueada', 'Alugado'],
  ['4356AA353', 'Casa de Guaramirim', 'Venda', 'Permitida', 'Promoção'],
  ['6541e9v564', 'Casa de João Pessoa', 'Locação', 'Bloqueada', 'Alugado'],
  ['4356AA353', 'Casa de Guaramirim', 'Venda', 'Permitida', 'Promoção'],
  ['6541e9v564', 'Casa de João Pessoa', 'Locação', 'Bloqueada', 'Alugado'],
  ['4356AA353', 'Casa de Guaramirim', 'Venda', 'Permitida', 'Promoção'],
  ['6541e9v564', 'Casa de João Pessoa', 'Locação', 'Bloqueada', 'Alugado'],
  ['4356AA353', 'Casa de Guaramirim', 'Venda', 'Permitida', 'Promoção'],
  ['6541e9v564', 'Casa de João Pessoa', 'Locação', 'Bloqueada', 'Alugado']
];

const userHeaders = ['Nome', 'E-mail', 'Endereço', 'CPF', 'Telefone'];
const userData = [
  ['Rodrigo', 'Rodrigo2023amandoDacunha@gmail.com', '89454700', '09312312323', '47 94931-2912'],
  ['Matheus', 'MatheusLucas@gmail.com', '89266500', '21312244451', '47 99942-2913'],
  ['Rodrigo', 'Rodrigo2023amandoDacunha@gmail.com', '89454700', '09312312323', '47 94931-2912'],
  ['Matheus', 'MatheusLucas@gmail.com', '89266500', '21312244451', '47 99942-2913'],
  ['Rodrigo', 'Rodrigo2023amandoDacunha@gmail.com', '89454700', '09312312323', '47 94931-2912'],
  ['Matheus', 'MatheusLucas@gmail.com', '89266500', '21312244451', '47 99942-2913'],
  ['Rodrigo', 'Rodrigo2023amandoDacunha@gmail.com', '89454700', '09312312323', '47 94931-2912'],
  ['Matheus', 'MatheusLucas@gmail.com', '89266500', '21312244451', '47 99942-2913'],
  ['Rodrigo', 'Rodrigo2023amandoDacunha@gmail.com', '89454700', '09312312323', '47 94931-2912'],
  ['Matheus', 'MatheusLucas@gmail.com', '89266500', '21312244451', '47 99942-2913']
];

export default function Tabela({ isPropertyTable }: { isPropertyTable: boolean }) {
  return (
    <GenericTable 
      headers={isPropertyTable ? propertyHeaders : userHeaders} 
      data={isPropertyTable ? propertyData : userData} 
      isPropertyTable={isPropertyTable}
    />
  );
}
