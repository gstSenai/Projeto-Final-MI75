"use client"

import { useEffect, useState, useRef } from "react"
import { Montserrat } from "next/font/google"
import { useRouter } from "next/navigation"
import { Bed, Bath, Ruler, Car } from "lucide-react"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapImovelById } from "@/components/map/mapImovelById"
import { Card } from "../cardImovel"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

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
  id_corretor: number
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
}

interface Corretor {
  id: number
  username: string
  email: string
  telefone: string
  cpf: string
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
  const [corretor, setCorretor] = useState<Corretor | null>(null)
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const urls = [];
      let index = 0;
      let hasMoreImages = true;

      while (hasMoreImages) {
        const response = await fetch(`http://localhost:9090/imagens/download/imovel/${imovelId}/imagem/${index}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          urls.push(imageUrl);
          index++;
        } else {
          hasMoreImages = false;
        }
      }

      setImageUrls(urls);
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    }
  };

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
      await fetchImages();

      if (data.id_usuario && data.id_usuario.id) {
        getCorretor(data.id_usuario.id);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do imóvel:", error);
      setError("Erro ao carregar detalhes do imóvel. Por favor, tente novamente.");
      router.push('/paginaImoveis');
    } finally {
      setLoading(false);
    }
  };

  const getCorretor = async (corretorId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`http://localhost:9090/usuario/getById/${corretorId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar informações do corretor');
      }

      const data = await response.json();
      setCorretor(data);
    } catch (error) {
      console.error("Erro ao buscar informações do corretor:", error);
    }
  }

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
              {imageUrls.length > 0 ? (
                <div className="relative flex justify-center">
                  <div className="relative w-full">
                    <img
                      src={imageUrls[0]}
                      alt={imovel?.nome_propriedade}
                      className="w-full h-[450px] lg:h-[605px] xl:h-[535px] 2xl:h-[510px] extra:h-[490px] object-cover rounded-lg"
                      onError={(e) => {
                        console.error('Erro ao carregar imagem:', e);
                        e.currentTarget.src = '/placeholder-image.jpg';
                      }}
                    />
                    {/* Botões de navegação */}
                    {imageUrls.length > 1 && (
                      <>
                        <button
                          onClick={() => {
                            const newUrls = [...imageUrls];
                            const lastImage = newUrls.pop()!;
                            newUrls.unshift(lastImage);
                            setImageUrls(newUrls);
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            const newUrls = [...imageUrls];
                            const firstImage = newUrls.shift()!;
                            newUrls.push(firstImage);
                            setImageUrls(newUrls);
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6"/>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full h-[500px] bg-cinza-medio flex items-center justify-center rounded-lg">
                  <p className="text-cinza-escuro">Sem imagens disponíveis</p>
                </div>
              )}
            </div>

            {/* Gallery Section */}
            {imageUrls.length > 1 && (
              <div className="mt-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {imageUrls.map((url, index) => (
                    <div 
                      key={index} 
                      className="relative cursor-pointer group flex-shrink-0"
                      onClick={() => {
                        const newUrls = [...imageUrls];
                        const selectedImage = newUrls.splice(index, 1)[0];
                        newUrls.unshift(selectedImage);
                        setImageUrls(newUrls);
                      }}
                    >
                      <img
                        src={url}
                        alt={`${imovel?.nome_propriedade} - Imagem ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg transition-opacity group-hover:opacity-80"
                      />
                      {index === 0 && (
                        <div className="absolute inset-0 border-2 border-vermelho rounded-lg"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

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

              <button
                className="w-full mt-6 bg-vermelho text-white py-3 rounded font-bold hover:bg-opacity-90 transition-colors"
                onClick={() => {
                  localStorage.setItem('currentImovelId', imovel.id.toString());
                  router.push(`/paginaAgendamento?imovelId=${imovel.id}`);
                }}
              >
                Agendar sua visita
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
          <div className="flex max-md:flex-col gap-6 items-center">
            <div className="w-3/5 max-md:w-full">
              <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
                <MapImovelById markersId={imovelId} />
              </div>
            </div>
            <div className="w-2/5 max-md:w-full">
              <div className="bg-white rounded-lg shadow-lg p-10">
                <h4 className="text-xl font-bold mb-1">Corretor Responsável</h4>
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <p className="text-xl font-medium">{corretor?.username}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="font-bold mb-1">Email:</p>
                    <p className="text-gray-600">{corretor?.email}</p>
                  </div>
                </div>
                <button className="w-full mt-6 bg-vermelho text-white py-3 rounded font-bold hover:bg-opacity-90 transition-colors" onClick={() => {
                  const mensagem = `Olá, estou interessado(a) no imóvel ${imovel.nome_propriedade} (Código: ${imovel.codigo}).`;
                  window.open(`https://wa.me/5545999341270?text=${encodeURIComponent(mensagem)}`, '_blank');
                }}>
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