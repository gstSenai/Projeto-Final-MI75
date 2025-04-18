"use client"

import { useEffect, useState, useRef } from "react"
import { Montserrat } from "next/font/google"
import { useRouter } from "next/navigation"
import { Bed, Bath, Ruler, Car } from "lucide-react"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapImovelById } from "@/components/map/mapImovelById"

// Configurar a chave de acesso do Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibHVhbmFuaWNoZWxhdHRpIiwiYSI6ImNtOWFqcDY3ZDA2eTkyaXE0b3Z4eW40eDUifQ.gYlUt6PtfGgkap3L2KEiow'

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "800"],
  display: "swap",
})

interface ImovelDetalhes {
  id: number
  nome_propriedade: string
  descricao: string
  valor_venda: number
  codigo: number
  tipo_transacao: string
  area_construida: number
  area_terreno: number
  id_endereco: {
    rua: string
    numero: string
    bairro: string
    cidade: string
    estado: string
    cep: string
  }
  id_caracteristicasImovel: {
    numero_quartos: number
    numero_suites: number
    numero_banheiros: number
    numero_vagas: number
  }
  imagens: {
    id: number
    nome: string
    url: string
  }[]
}

interface DetalhesImovelProps {
  imovelId: number;
}

export function DetalhesImovel({ imovelId }: DetalhesImovelProps) {
  const mapContainer = useRef(null);
  const router = useRouter();
  const [imovel, setImovel] = useState<ImovelDetalhes | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [map, setMap] = useState<mapboxgl.Map | null>(null)

  const getImovelDetalhes = async () => {
    try {
      if (typeof window === 'undefined') return;
      
      const token = localStorage.getItem("token");
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`http://localhost:9090/imovel/getById/${imovelId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 404) {
        router.push('/paginaImoveis');
        return;
      }

      if (!response.ok) {
        throw new Error('Erro ao buscar detalhes do imóvel');
      }

      const data = await response.json();
      setImovel(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do imóvel:", error);
      setError("Erro ao carregar detalhes do imóvel. Por favor, tente novamente.");
      router.push('/paginaImoveis');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!imovelId) {
      router.push('/paginaImoveis');
      return;
    }
    getImovelDetalhes();
  }, [imovelId]);

  useEffect(() => {
    if (!map && imovel && mapContainer.current) {
      const initializeMap = async () => {
        try {
          const newMap = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-46.6333, -23.5505],
            zoom: 15,
          });

          newMap.on('load', () => {
            newMap.resize();
            new mapboxgl.Marker({ color: '#702632' })
              .setLngLat([-46.6333, -23.5505])
              .addTo(newMap);
          });

          setMap(newMap);
        } catch (error) {
          console.error('Error initializing map:', error);
        }
      };

      initializeMap();
    }

    return () => {
      if (map) map.remove();
    };
  }, [map, imovel]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-vermelho"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-vermelho text-xl mb-4">{error}</p>
        <a href="/" className="text-vermelho hover:text-vermelho-escuro">
          Voltar para a página inicial
        </a>
      </div>
    )
  }

  if (!imovel) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-vermelho text-xl mb-4">Imóvel não encontrado</p>
        <a href="/" className="text-vermelho hover:text-vermelho-escuro">
          Voltar para a página inicial
        </a>
      </div>
    )
  }

  return (
    <div className={`${montserrat.className} min-h-screen bg-cinza-claro`}>

      <div className="pl-10">
        <div className=" mx-auto px-4 py-6">
          <h1 className="text-[1.7rem] font-bold text-cinza-escuro">{imovel.nome_propriedade}</h1>
          <div className="w-64 h-[2px] bg-[#702632] mt-1"></div>
          <div className="flex items-center mt-2 text-cinza-medio">
          </div>
        </div>
      </div>


      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <div className="overflow-hidden">
              {imovel.imagens && imovel.imagens.length > 0 ? (
                <div className="relative">
                  <img
                    src={imovel.imagens[currentImageIndex].url}
                    alt={imovel.nome_propriedade}
                    className="w-full h-[450px] lg:h-[605px] xl:h-[535px] 2xl:h-[510px] extra:h-[490px] object-cover rounded-lg"
                  />
                  {imovel.imagens.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                      {imovel.imagens.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full ${currentImageIndex === index ? "bg-vermelho" : "bg-white"
                            }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-[500px] bg-cinza-medio flex items-center justify-center rounded-lg">
                  <p className="text-cinza-escuro">Sem imagens disponíveis</p>
                </div>
              )}
              <div className="flex items-center justify-start gap-1 mt-4">
                <button className="flex items-center justify-center w-8 h-8 text-cinza-medio hover:text-vermelho transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
                <button className="flex items-center justify-center w-8 h-8 text-cinza-medio hover:text-vermelho transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </button>
                <button className="flex items-center justify-center w-8 h-8 text-cinza-medio hover:text-vermelho transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-vermelho">{formatCurrency(imovel.valor_venda)}</h2>
                <span className="px-4 py-1 bg-vermelho text-white rounded-full text-sm">
                  {imovel.tipo_transacao}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <img src="/imagePropriedades/quarto.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[25px] 2xl:min-w-[30px]" width={25} height={25} />
                  <div>
                    <p className="text-sm text-cinza-medio">Quartos</p>
                    <p className="font-semibold">{imovel.id_caracteristicasImovel.numero_quartos}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src="/imagePropriedades/suite.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[25px] 2xl:min-w-[30px]" width={25} height={25} />
                  <div>
                    <p className="text-sm text-cinza-medio">Suites</p>
                    <p className="font-semibold">{imovel.id_caracteristicasImovel.numero_suites}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src="/imagePropriedades/banheiro.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[25px] 2xl:min-w-[30px]" width={25} height={25} />
                  <div>
                    <p className="text-sm text-cinza-medio">Banheiros</p>
                    <p className="font-semibold">{imovel.id_caracteristicasImovel.numero_banheiros}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src="/imagePropriedades/carro.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[25px] 2xl:min-w-[30px]" width={25} height={25} />
                  <div>
                    <p className="text-sm text-cinza-medio">Vagas</p>
                    <p className="font-semibold">{imovel.id_caracteristicasImovel.numero_vagas}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src="/imagePropriedades/regua.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[25px] 2xl:min-w-[30px]" width={25} height={25} />
                  <div>
                    <p className="text-sm text-cinza-medio">Área total</p>
                    <p className="font-semibold">{imovel.area_terreno}m²</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src="/imagePropriedades/regua.png" alt="Imagem Suite" className="min-w-[20px] max-w-[40px] lg:min-w-[25px] 2xl:min-w-[30px]" width={25} height={25} />
                  <div>
                    <p className="text-sm text-cinza-medio">Área Construída</p>
                    <p className="font-semibold">{imovel.area_construida}m²</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                <p className="text-cinza-mediom text-[1rem]">{imovel.descricao}</p>
              </div>

              <button className="w-full bg-vermelho text-white py-2 rounded-lg font-semibold hover:bg-vermelho-escuro transition-colors">
                Agendar Visita
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 ">
          <div className="flex gap-2">
            <img src="/imagePropriedades/localizacao.png" alt="localizacao" className="w-5 h-6 mt-1 " />
            <h3 className="text-[1.4rem] font-semibold mb-4">Localização</h3>
          </div>
          <div className="mb-4">
            <p className="text-cinza-medio">
              {imovel.id_endereco.rua}, {imovel.id_endereco.numero} - {imovel.id_endereco.bairro}, {imovel.id_endereco.cidade} - {imovel.id_endereco.estado}, CEP: {imovel.id_endereco.cep}
            </p>
          </div>
          <div className="flex max-md:flex-col gap-6">
            <div className="w-3/5 max-md:w-full">
              <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
                <MapImovelById markersId={imovelId} />
              </div>
            </div>
            <div className="w-2/5 max-md:w-full">
              <div className="bg-white rounded-lg shadow-lg p-10">
                <h4 className="text-xl font-bold mb-4">Corretor Responsável</h4>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#702632] flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">JV</span>
                  </div>
                  <div>
                    <p className="text-xl font-bold">Jessica Vieira</p>
                    <p className="text-gray-600">CRECI: 123456-SP</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="font-bold mb-1">Email:</p>
                    <p className="text-gray-600">jessica.vieira@gmail.com</p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">Telefone:</p>
                    <p className="text-gray-600">(11) 98765-4321</p>
                  </div>
                </div>
                <button className="w-full mt-6 bg-[#702632] text-white py-3 rounded font-bold hover:bg-opacity-90 transition-colors">
                  Falar com Corretor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 