"use client";

import { useState, useEffect } from "react";
import { Map, Marker, NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FiMapPin } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface Imovel {
    id?: number;
    codigo?: number;
    lng?: number;
    lat?: number;
    nome_propriedade: string;
    tipo_transacao: string;
    valor_venda: number;
    id_endereco: {
        cep: string;
        rua: string;
        numero: string;
        bairro: string;
        cidade: string;
        uf: string;
        complemento?: string;
    };
}

interface ResponseProps {
    content: Imovel[];
}

interface ImovelMapProps {
    markersId?: number;
    onMarkerClick?: (id: number) => void;
}

export function ImovelMap({ markersId, onMarkerClick }: ImovelMapProps) {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [markers, setMarkers] = useState<ResponseProps | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [hoveredMarkerId, setHoveredMarkerId] = useState<number | null>(null)
    const router = useRouter()

    async function geocodeAddress(cep: string, numero: string, rua: string, cidade: string, uf: string): Promise<{ lat: number; lng: number }> {
        const address = `${rua}, ${numero}, ${cidade} - ${uf}, ${cep}`

        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}`
        );

        if (!response.ok) throw new Error('Erro ao buscar coordenadas');

        const data = await response.json();
        if (data.features.length === 0) throw new Error('Endereço não encontrado');

        const [lng, lat] = data.features[0].center;
        return { lat, lng };
    }

    const getAllImoveis = async () => {
        try {
            const response = await fetch("http://localhost:9090/imovel/getAll");
            const imoveis = await response.json();

            const imoveisComCoords = await Promise.all(
                imoveis.content.map(async (imovel: Imovel) => {
                    if (imovel.lat != null && imovel.lng != null) return imovel;

                    const coords = await geocodeAddress(
                        imovel.id_endereco.cep,
                        imovel.id_endereco.numero,
                        imovel.id_endereco.rua,
                        imovel.id_endereco.cidade,
                        imovel.id_endereco.uf
                    );

                    if (!coords) return imovel;

                    return {
                        ...imovel,
                        lat: coords.lat,
                        lng: coords.lng,
                    };
                })
            );

            return imoveisComCoords;
        } catch (error) {
            console.error("Erro ao buscar imóveis:", error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchImoveis = async () => {
            setIsLoading(true);
            try {
                const response = await getAllImoveis();

                if (!response || !Array.isArray(response)) {
                    throw new Error("Formato de dados inválido da API");
                }

                const imoveisMap = response.map((imovel: Imovel) => ({
                    ...imovel,
                    id: imovel.id || Math.floor(Math.random() * 10000),
                    codigo: imovel.codigo || 0,
                    nome_propriedade: imovel.nome_propriedade || "Imóvel sem nome",
                    tipo_transacao: imovel.tipo_transacao || "Venda",
                    valor_venda: imovel.valor_venda || 0,
                    id_endereco: {
                        cep: imovel.id_endereco.cep || "00000-000",
                        rua: imovel.id_endereco.rua || "Rua não informada",
                        numero: imovel.id_endereco.numero || "SN",
                        bairro: imovel.id_endereco.bairro || "Bairro não informado",
                        cidade: imovel.id_endereco.cidade || "Jaraguá do Sul",
                        uf: imovel.id_endereco.uf || "SC",
                        complemento: imovel.id_endereco.complemento || "",
                    },
                }));

                setMarkers({ content: imoveisMap });
                setError(null);
            } catch (error) {
                console.error("Erro ao carregar imóveis:", error);
                setError("Erro ao carregar imóveis. Tente recarregar a página.");
                setMarkers({ content: [] });
            } finally {
                setIsLoading(false);
            }
        };

        fetchImoveis();
    }, []);

    function handleMarkerClick(id: number) {
        if (onMarkerClick) {
            onMarkerClick(id);
        } else {
            router.push(`/imovel/${id}`);
        }
    }

    return (
        <main className="w-full min-h-screen bg-[#DFDAD0]">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-6 text-vermelho">
                    Imóveis em Jaraguá do Sul
                </h1>

                {isLoading && (
                    <div className="w-full h-[600px] flex items-center justify-center bg-white rounded-lg">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vermelho"></div>
                    </div>
                )}

                {error && (
                    <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                {!isLoading && !error && (
                    <div className="w-full h-[550px] rounded-lg overflow-hidden border border-gray-200 relative">
                        <Map
                            mapboxAccessToken={mapboxToken}
                            mapStyle="mapbox://styles/mapbox/streets-v12"
                            initialViewState={{
                                latitude: -26.4827,
                                longitude: -49.0667,
                                zoom: 4,
                            }}
                            maxZoom={18}
                            minZoom={10}
                        >
                            <NavigationControl position="top-left" />
                            <GeolocateControl position="top-left" />

                            {markers?.content.map((marker) => (
                                <Marker
                                    key={marker.id}
                                    longitude={marker.lng!}
                                    latitude={marker.lat!}
                                    anchor="bottom"
                                >
                                    <div
                                        className="relative group cursor-pointer"
                                        onMouseEnter={() => setHoveredMarkerId(marker.id || null)}
                                        onMouseLeave={() => setHoveredMarkerId(null)}
                                        onClick={() => handleMarkerClick(marker.id!)}
                                    >
                                        <div className="relative flex flex-col items-center group cursor-pointer">
                                            <div className="bg-vermelho p-2 rounded-full shadow-md hover:bg-[#8a2e3d] transition-colors">
                                                <FiMapPin className="text-white w-5 h-5" />
                                            </div>

                                            {hoveredMarkerId === marker.id && ( 
                                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white text-vermelho px-4 py-2 rounded-lg shadow-lg text-sm w-52 z-10 animate-fade-in">
                                                    <div className="font-semibold">{marker.nome_propriedade}</div>
                                                    <div className="text-xs mt-1">
                                                        {marker.valor_venda.toLocaleString('pt-BR', {
                                                            style: 'currency',
                                                            currency: 'BRL',
                                                            minimumFractionDigits: 2,
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Marker>
                            ))}
                        </Map>
                    </div>
                )}

                <div className="mt-6 text-sm text-gray-600">
                    {markers?.content.length ? (
                        <p>
                            Exibindo {markers.content.length} imóveis disponíveis
                            <span className="ml-2 text-xs bg-vermelho text-white px-2 py-1 rounded-full">
                                {new Date().toLocaleDateString('pt-BR')}
                            </span>
                        </p>
                    ) : (
                        !isLoading && <p>Nenhum imóvel encontrado na região</p>
                    )}
                </div>
            </div>
        </main>
    );
}
