"use client";

import React, { useState } from 'react';

interface TableProps {
  headers: string[];
  data: (string | number)[][];
}

const GenericTable: React.FC<TableProps> = ({ headers, data }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  return (
    <div className="bg-white shadow-[5px_20px_100px_rgba(0,0,0,0.1)] rounded-[20px] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-[#702632] text-white">
            {headers.map((header, index) => (
              <th key={index} className="p-4 text-center text-sm font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full">
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  selectedRow === rowIndex 
                    ? 'bg-[#702632] bg-opacity-20 border border-[#702632]'  // Fica vermelho quando selecionado
                    : 'bg-[#FAF6ED]'  // Mantém o padrão quando não está selecionado
                } 
                hover:bg-[#702632] hover:bg-opacity-30 transition-all cursor-pointer`}
                onClick={() => setSelectedRow(rowIndex)}
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-4 text-left text-sm text-black">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenericTable;
