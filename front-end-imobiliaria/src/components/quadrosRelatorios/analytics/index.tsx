'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface AnalyticsData {
  valorTotalImoveis: number;
  totalImoveis: number;
  valorMedioImoveis: number;
  imoveisPorMes: number[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [vendasResponse, mensalResponse] = await Promise.all([
          fetch('http://localhost:9090/imovel/analytics/vendas'),
          fetch('http://localhost:9090/imovel/analytics/mensal')
        ]);

        if (!vendasResponse.ok || !mensalResponse.ok) {
          throw new Error('Erro ao buscar dados de analytics');
        }

        const vendasData = await vendasResponse.json();
        const mensalData = await mensalResponse.json();

        const meses = [
          'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ];

        const imoveisPorMes = mensalData.map((quantidade: number, index: number) => ({
          mes: meses[index],
          quantidade
        }));

        setAnalyticsData({
          ...vendasData,
          imoveisPorMes
        });
      } catch (err) {
        setError('Erro ao carregar dados de analytics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const exportToExcel = () => {
    if (!analyticsData) return;

    const ws = XLSX.utils.json_to_sheet([
      { Métrica: 'Valor Total de Imóveis', Valor: analyticsData.valorTotalImoveis },
      { Métrica: 'Total de Imóveis', Valor: analyticsData.totalImoveis },
      { Métrica: 'Valor Médio de Imóveis', Valor: analyticsData.valorMedioImoveis }
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Analytics');
    XLSX.writeFile(wb, 'analytics.xlsx');
  };

  const exportToPDF = () => {
    if (!analyticsData) return;

    const doc = new jsPDF();
    doc.text('Relatório de Analytics', 14, 15);

    const tableColumn = ['Métrica', 'Valor'];
    const tableRows = [
      ['Valor Total de Imóveis', analyticsData.valorTotalImoveis.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })],
      ['Total de Imóveis', analyticsData.totalImoveis.toString()],
      ['Valor Médio de Imóveis', analyticsData.valorMedioImoveis.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })]
    ];

    (doc as any).autoTable({
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

    doc.save('analytics.pdf');
  };

  if (loading) {
    return <div className="text-center p-4">Carregando dados...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (!analyticsData) {
    return <div className="text-center p-4">Nenhum dado disponível</div>;
  }

  const valorData = [
    { name: 'Valor Total', value: analyticsData.valorTotalImoveis },
    { name: 'Valor Médio', value: analyticsData.valorMedioImoveis }
  ];

  return (
    <div className="bg-[#F4F0E7] p-6 rounded-lg shadow-lg max-w-[100%] mx-auto space-y-8">
      <div className="flex justify-end space-x-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-lg:grid-cols-1">
        {/* Gráfico de Pizza - Valor Total vs Médio */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Distribuição de Valores</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={valorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
                >
                  {valorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cards com Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Valor Total de Imóveis</h3>
          <p className="text-2xl font-bold text-[#702632]">
            {analyticsData.valorTotalImoveis.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total de Imóveis</h3>
          <p className="text-2xl font-bold text-[#702632]">{analyticsData.totalImoveis}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Valor Médio</h3>
          <p className="text-2xl font-bold text-[#702632]">
            {analyticsData.valorMedioImoveis.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </p>
        </div>
      </div>
    </div>
  );
} 