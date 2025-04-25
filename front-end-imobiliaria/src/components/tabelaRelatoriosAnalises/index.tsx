"use client";

import { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

// Extend jsPDF with autoTable
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

interface DataItem {
  mes: string;
  valor: number;
}

export default function TabelaRelatoriosAnalises({ tipo }: { tipo: string }) {
  // Dados mockados para exemplo - substituir por dados reais da API
  const [data] = useState<DataItem[]>([
    { mes: 'Janeiro', valor: 50000 },
    { mes: 'Fevereiro', valor: 45000 },
    { mes: 'Março', valor: 60000 },
    // Adicione mais meses conforme necessário
  ]);

  const getTitulo = () => {
    switch (tipo) {
      case 'RelatorioAnalise':
        return 'Relatório de Vendas';
      case 'EstatisticaUsuarios':
        return 'Estatísticas de Usuários';
      case 'ServicosCorretores':
        return 'Serviços de Corretores';
      default:
        return '';
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, getTitulo());
    XLSX.writeFile(wb, `${getTitulo()}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF() as jsPDFWithAutoTable;
    const titulo = getTitulo();
    
    doc.text(titulo, 14, 15);
    
    const tableColumn = ['Mês', 'Valor (R$)'];
    const tableRows = data.map(item => [
      item.mes,
      item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3,
        halign: 'center'
      },
      headStyles: {
        fillColor: [112, 38, 50],
        textColor: 255
      }
    });

    doc.save(`${titulo}.pdf`);
  };

  return (
    <div className="mb-8">
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-[#702632] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Mês</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{item.mes}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex gap-4">
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Exportar para Excel
        </button>
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Exportar para PDF
        </button>
      </div>
    </div>
  );
}