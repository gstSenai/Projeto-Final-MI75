'use client';

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { mes: 'janeiro', valor: 1000 },
  { mes: 'fevereiro', valor: 5000 },
  { mes: 'março', valor: 15000 },
  { mes: 'abril', valor: 20000 },
  { mes: 'maio', valor: 12000 },
  { mes: 'junho', valor: 8000 },
  { mes: 'julho', valor: 17000 },
  { mes: 'agosto', valor: 11000 },
  { mes: 'setembro', valor: 9000 },
  { mes: 'outubro', valor: 13000 },
  { mes: 'novembro', valor: 16000 },
  { mes: 'dezembro', valor: 19000 },
];

export function RelatoriosAnalises() {
  const [periodo, setPeriodo] = useState('MAX');

  const dadosFiltrados = useMemo(() => {
    switch (periodo) {
      case '1D': return data.slice(-1);
      case '5D': return data.slice(-5);
      case '1M': return data.slice(-3);
      case '6M': return data.slice(-6);
      case '1Y': return data;
      default: return data;
    }
  }, [periodo]);

  return (
    <div className="bg-[#F4F0E7] p-6 rounded-lg shadow-lg max-w-[100%] mx-auto">
      <div className="flex justify-end space-x-2 mt-4">
        {['1D', '5D', '1M', '6M', '1Y', 'MAX'].map((item) => (
          <button
            key={item}
            className={`px-3 py-1 text-sm font-medium border rounded ${periodo === item ? 'bg-gray-800 text-white' : 'bg-gray-200'
              }`}
            onClick={() => setPeriodo(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dadosFiltrados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" stroke="#000000" />
          <YAxis stroke="#000000" />
          <Tooltip contentStyle={{ backgroundColor: '#f9fafb', borderColor: '#000000', color: '#000000' }} />
          <Line type="monotone" dataKey="valor" stroke="#8b5cf6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
