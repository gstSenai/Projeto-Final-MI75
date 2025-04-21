"use client"

import { useState, useEffect } from "react"
import { Home, Eye } from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Imovel {
  codigo: string
  nome: string
  acessos: number
}

interface EstatisticaUsuario {
  nome: string
  email: string
  imoveisVendidos: number
  imoveisAlugados: number
  totalComissao: number
}

interface ServicoCorretor {
  corretor: string
  cliente: string
  imovel: string
  data: string
  status: string
}

interface MetricasDashboard {
  totalImoveis: number
  percentualImoveis: number
  imoveisMaisAcessados: number
  percentualAcessos: number
  visualizacoesPorImovel: number
  percentualVisualizacoes: number
}

export default function TabelaRelatoriosAnalises({ tipo }: { tipo: string }) {
  const [activeView, setActiveView] = useState<"grafico" | "tabela">("grafico")
  const [timeRange, setTimeRange] = useState<string>("1M")
  const [imoveis, setImoveis] = useState<Imovel[]>([])
  const [estatisticasUsuarios, setEstatisticasUsuarios] = useState<EstatisticaUsuario[]>([])
  const [servicosCorretores, setServicosCorretores] = useState<ServicoCorretor[]>([])
  const [metricas, setMetricas] = useState<MetricasDashboard>({
    totalImoveis: 0,
    percentualImoveis: 0,
    imoveisMaisAcessados: 0,
    percentualAcessos: 0,
    visualizacoesPorImovel: 0,
    percentualVisualizacoes: 0,
  })
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Visualizações",
        data: [],
        borderColor: "#702632",
        backgroundColor: "rgba(112, 38, 50, 0.5)",
        tension: 0.1,
      },
    ],
  })
  const [loading, setLoading] = useState(true)

  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ]

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          callback: (value) => {
            if (value === 0) return "0"
            if (value === 1000) return "1.000"
            if (value === 10000) return "10.000"
            if (value === 30000) return "30.000"
            return ""
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        borderWidth: 2,
      },
    },
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (tipo === "RelatorioAnalise") {
          // Buscar dados de imóveis
          const response = await fetch(`http://localhost:9090/imovel/getAll?page=0&size=10`)
          if (response.ok) {
            const data = await response.json()

            // Processar dados dos imóveis
            const imoveisData = data.content.map((imovel) => ({
              codigo: imovel.codigo?.toString(),
              nome: imovel.nome_propriedade,
              acessos: imovel.visualizacoes || 0, // Assumindo que há um campo de visualizações
            }))
            setImoveis(imoveisData)

            // Buscar métricas do dashboard
            const metricasResponse = await fetch(`http://localhost:9090/imovel/metricas`)
            if (metricasResponse.ok) {
              const metricasData = await metricasResponse.json()
              setMetricas({
                totalImoveis: metricasData.totalImoveis || 0,
                percentualImoveis: metricasData.percentualImoveis || 0,
                imoveisMaisAcessados: metricasData.imoveisMaisAcessados || 0,
                percentualAcessos: metricasData.percentualAcessos || 0,
                visualizacoesPorImovel: metricasData.visualizacoesPorImovel || 0,
                percentualVisualizacoes: metricasData.percentualVisualizacoes || 0,
              })
            }

            // Buscar dados do gráfico
            const chartResponse = await fetch(`http://localhost:9090/imovel/estatisticas/mensal`)
            if (chartResponse.ok) {
              const chartDataResponse = await chartResponse.json()
              setChartData({
                labels: meses,
                datasets: [
                  {
                    label: "Visualizações",
                    data: chartDataResponse.visualizacoes || [],
                    borderColor: "#702632",
                    backgroundColor: "rgba(112, 38, 50, 0.5)",
                    tension: 0.1,
                  },
                ],
              })
            }
          }
        } else if (tipo === "EstatisticaUsuarios") {
          // Buscar dados de usuários/corretores
          const response = await fetch(`http://localhost:9090/usuario/corretores`)
          if (response.ok) {
            const data = await response.json()

            // Buscar estatísticas de desempenho para cada corretor
            const estatisticasPromises = data.map(async (corretor) => {
              const estatisticaResponse = await fetch(`http://localhost:9090/usuario/estatisticas/${corretor.id}`)
              if (estatisticaResponse.ok) {
                const estatisticaData = await estatisticaResponse.json()
                return {
                  nome: corretor.username,
                  email: corretor.email,
                  imoveisVendidos: estatisticaData.imoveisVendidos || 0,
                  imoveisAlugados: estatisticaData.imoveisAlugados || 0,
                  totalComissao: estatisticaData.totalComissao || 0,
                }
              }
              return null
            })

            const estatisticas = (await Promise.all(estatisticasPromises)).filter(Boolean)
            setEstatisticasUsuarios(estatisticas)
          }
        } else if (tipo === "ServicosCorretores") {
          // Buscar dados de agendamentos
          const response = await fetch(`http://localhost:9090/agendamento/getAll`)
          if (response.ok) {
            const data = await response.json()

            // Transformar os dados para o formato necessário
            const servicos = data.map((agendamento) => ({
              corretor: agendamento.corretor?.username,
              cliente: agendamento.usuario?.username,
              imovel: agendamento.imovel?.nome_propriedade,
              data: agendamento.data,
              status: agendamento.status,
            }))
            setServicosCorretores(servicos)
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tipo, timeRange])

  const renderTable = () => {
    if (tipo === "RelatorioAnalise") {
      return (
        <div className="bg-[#f5f0e8] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-3 px-4 text-center font-medium">CODIGO</th>
                <th className="py-3 px-4 text-center font-medium">NOME</th>
                <th className="py-3 px-4 text-center font-medium">ACESSOS</th>
              </tr>
            </thead>
            <tbody>
              {imoveis.map((imovel, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-center">{imovel.codigo}</td>
                  <td className="py-3 px-4 text-center">{imovel.nome}</td>
                  <td className="py-3 px-4 text-center">{imovel.acessos.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else if (tipo === "EstatisticaUsuarios") {
      return (
        <div className="bg-[#f5f0e8] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-3 px-4 text-center font-medium">CORRETOR</th>
                <th className="py-3 px-4 text-center font-medium">EMAIL</th>
                <th className="py-3 px-4 text-center font-medium">IMÓVEIS VENDIDOS</th>
                <th className="py-3 px-4 text-center font-medium">IMÓVEIS ALUGADOS</th>
                <th className="py-3 px-4 text-center font-medium">COMISSÃO TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {estatisticasUsuarios.map((estatistica, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-center">{estatistica.nome}</td>
                  <td className="py-3 px-4 text-center">{estatistica.email}</td>
                  <td className="py-3 px-4 text-center">{estatistica.imoveisVendidos}</td>
                  <td className="py-3 px-4 text-center">{estatistica.imoveisAlugados}</td>
                  <td className="py-3 px-4 text-center">R$ {estatistica.totalComissao.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    } else if (tipo === "ServicosCorretores") {
      return (
        <div className="bg-[#f5f0e8] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-3 px-4 text-center font-medium">CORRETOR</th>
                <th className="py-3 px-4 text-center font-medium">CLIENTE</th>
                <th className="py-3 px-4 text-center font-medium">IMÓVEL</th>
                <th className="py-3 px-4 text-center font-medium">DATA</th>
                <th className="py-3 px-4 text-center font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {servicosCorretores.map((servico, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-center">{servico.corretor}</td>
                  <td className="py-3 px-4 text-center">{servico.cliente}</td>
                  <td className="py-3 px-4 text-center">{servico.imovel}</td>
                  <td className="py-3 px-4 text-center">{servico.data}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        servico.status === "CONFIRMADO"
                          ? "bg-green-100 text-green-800"
                          : servico.status === "CANCELADO"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {servico.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    return null
  }

  const renderMetricsCards = () => {
    if (tipo === "RelatorioAnalise") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#702632] text-white rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-sm">Número de imóveis cadastrados</p>
              <p className="text-2xl font-bold">{metricas.totalImoveis.toLocaleString()}</p>
            </div>
            <div className="bg-[#5A1F2A] p-2 rounded-lg">
              <Home className="h-6 w-6" />
            </div>
            <div className="text-green-400 text-sm">{metricas.percentualImoveis.toFixed(3)}%</div>
          </div>

          <div className="bg-[#702632] text-white rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-sm">Imóveis mais acessados</p>
              <p className="text-2xl font-bold">{metricas.imoveisMaisAcessados.toLocaleString()}</p>
            </div>
            <div className="bg-[#5A1F2A] p-2 rounded-lg">
              <Home className="h-6 w-6" />
            </div>
            <div className="text-green-400 text-sm">{metricas.percentualAcessos.toFixed(3)}%</div>
          </div>

          <div className="bg-[#702632] text-white rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-sm">Visualizações por imóvel</p>
              <p className="text-2xl font-bold">{metricas.visualizacoesPorImovel.toLocaleString()}</p>
            </div>
            <div className="bg-[#5A1F2A] p-2 rounded-lg">
              <Eye className="h-6 w-6" />
            </div>
            <div className="text-green-400 text-sm">{metricas.percentualVisualizacoes.toFixed(3)}%</div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="mb-10">
      <div className="flex justify-end items-center mb-4">
        <div className="flex space-x-1">
          <button
            onClick={() => setTimeRange("1D")}
            className={`px-2 py-1 text-sm ${timeRange === "1D" ? "text-[#702632] font-bold" : "text-gray-500"}`}
          >
            1D
          </button>
          <button
            onClick={() => setTimeRange("5D")}
            className={`px-2 py-1 text-sm ${timeRange === "5D" ? "text-[#702632] font-bold" : "text-gray-500"}`}
          >
            5D
          </button>
          <button
            onClick={() => setTimeRange("1M")}
            className={`px-2 py-1 text-sm ${timeRange === "1M" ? "text-[#702632] font-bold" : "text-gray-500"}`}
          >
            1M
          </button>
          <button
            onClick={() => setTimeRange("6M")}
            className={`px-2 py-1 text-sm ${timeRange === "6M" ? "text-[#702632] font-bold" : "text-gray-500"}`}
          >
            6M
          </button>
          <button
            onClick={() => setTimeRange("1Y")}
            className={`px-2 py-1 text-sm ${timeRange === "1Y" ? "text-[#702632] font-bold" : "text-gray-500"}`}
          >
            1Y
          </button>
          <button
            onClick={() => setTimeRange("MAX")}
            className={`px-2 py-1 text-sm ${timeRange === "MAX" ? "text-[#702632] font-bold" : "text-gray-500"}`}
          >
            MAX
          </button>
        </div>
      </div>

      {loading ? (
        <div className="h-80 flex items-center justify-center bg-[#f5f0e8] rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#702632]"></div>
        </div>
      ) : (
        <>
          {activeView === "grafico" ? (
            <div className="h-80 bg-[#f5f0e8] rounded-lg p-4">
              <Line data={chartData} options={chartOptions} />
            </div>
          ) : (
            renderTable()
          )}

          {renderMetricsCards()}
        </>
      )}
    </div>
  )
}
