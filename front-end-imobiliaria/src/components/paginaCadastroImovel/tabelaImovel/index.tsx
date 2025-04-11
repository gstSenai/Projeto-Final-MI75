"use client"
import { useState, useEffect } from "react"
import MapComponent from "@/components/map/MapComponent"
import "mapbox-gl/dist/mapbox-gl.css"

interface Imovel {
  id?: number
  codigo?: number
  lng: number
  lat: number
  nome_propriedade: string
  tipo_transacao: string
  valor_venda: number
  id_endereco: {
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    complemento?: string
  }
  id_caracteristicasImovel: {
    id: number
    numero_quartos: number
    numero_banheiros: number
    numero_suites: number
    numero_vagas: number
  }
  id_proprietario: {
    id: number
    nome: string
    email: string
    telefone: string
  }
  id_usuario: {
    id: number
    nome: string
    email: string
    telefone: string
  }
}

// Update the MapMarker interface to include the new fields
interface MapMarker {
  id: number
  lng: number
  lat: number
  nome_propriedade: string
  valor_venda: number
  tipo_transacao: string
  codigo?: number
  id_endereco: {
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    complemento?: string
  }
}

export default function MapPage() {
  const [markers, setMarkers] = useState<MapMarker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getAllImoveis = async () => {
    try {
      const response = await fetch("http://localhost:9090/imovel/getAll")
      if (!response.ok) {
        throw new Error("Erro ao buscar imóveis")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching Imoveis:", error)
      throw error
    }
  }

  useEffect(() => {
    const fetchImoveis = async () => {
      setIsLoading(true)
      try {
        const imoveis = await getAllImoveis()

        if (!imoveis || !Array.isArray(imoveis.content)) {
          throw new Error("Dados inválidos recebidos da API.")
        }

        const imoveisMap = imoveis.content.map((imovel: Imovel) => ({
          ...imovel,
          id: imovel.id || Math.floor(Math.random() * 10000),
          lng: imovel.lng || -49.0667,
          lat: imovel.lat || -26.4827,
          nome_propriedade: imovel.nome_propriedade || "Imóvel",
          valor_venda: imovel.valor_venda || 0,
          tipo_transacao: imovel.tipo_transacao || "Venda",
          codigo: imovel.codigo || 0,
          id_endereco: imovel.id_endereco,
        }))

        console.log("Processed imoveis array:", imoveisMap)
        setMarkers(imoveisMap)
        setError(null)
      } catch (error) {
        console.error("Error fetching imóveis:", error)
        setError("Não foi possível carregar os imóveis. Por favor, tente novamente mais tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchImoveis()
  }, [])

  const handleMarkerClick = (markerId: string) => {
    console.log("Marker clicked:", markerId)
    // You can add navigation to property details page here
    // router.push(`/imovel/${markerId}`);
  }

  return (
    <div className="w-full min-h-screen bg-[#DFDAD0]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6 text-[#702632]">Imóveis em Jaraguá do Sul</h1>

        {isLoading && (
          <div className="w-full h-[600px] flex items-center justify-center bg-white rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#702632]"></div>
          </div>
        )}

        {error && <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

        {!isLoading && !error && (
          <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-200 relative">
            <MapComponent markers={markers} onMarkerClick={handleMarkerClick} />
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          {markers.length > 0 ? (
            <p>Exibindo {markers.length} imóveis disponíveis</p>
          ) : (
            !isLoading && <p>Nenhum imóvel encontrado</p>
          )}
        </div>
      </div>
    </div>
  )
}
