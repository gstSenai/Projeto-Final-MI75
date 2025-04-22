"use client";

import { useState, useEffect } from "react";
import { Map, Marker, NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FiMapPin, FiHome, FiBook, FiShoppingBag, FiDroplet, FiHeart } from "react-icons/fi";

interface Imovel {
    id: number;
    lat: number | null;
    lng: number | null;
    nome_propriedade: string;
    valor_venda: number;
    id_endereco: {
        cep: string;
        rua: string;
        numero: string;
        cidade: string;
        uf: string;
    };
}

interface PontoInteresse {
    id: string;
    lat: number;
    lng: number;
    nome: string;
    tipo: string;
}

export function MapImovelById({ markersId }: { markersId?: number }) {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [imovel, setImovel] = useState<Imovel | null>(null);
    const [pontosInteresse, setPontosInteresse] = useState<PontoInteresse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function geocodeAddress(cep: string, numero: string, rua: string, cidade: string, uf: string): Promise<{ lat: number; lng: number }> {
        const address = `${rua}, ${numero}, ${cidade} - ${uf}, ${cep}`;
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}`
        );
        const data = await response.json();
        const [lng, lat] = data.features[0].center;
        return { lat, lng };
    }

    async function buscarPontosInteresse(lat: number, lng: number) {
        const pontos: PontoInteresse[] = [];

        try {
            // Busca todos os POIs próximos de uma vez
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/poi.json?` + 
                `proximity=${lng},${lat}&` +
                `bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&` +
                `limit=10&` +
                `language=pt&` +
                `types=poi&` +
                `access_token=${mapboxToken}`
            );

            const data = await response.json();
            
            if (data.features) {
                data.features.forEach((feature: any) => {
                    // Tenta identificar o tipo do POI pelo nome
                    let tipo = 'outro';
                    const nome = feature.text.toLowerCase();

                    if (nome.includes('farmácia') || nome.includes('farmacia') || nome.includes('droga')) {
                        tipo = 'farmacia';
                    } else if (nome.includes('escola') || nome.includes('colégio') || nome.includes('colegio')) {
                        tipo = 'escola';
                    } else if (nome.includes('mercado') || nome.includes('super') || nome.includes('mart')) {
                        tipo = 'supermercado';
                    } else if (nome.includes('hospital') || nome.includes('clínica') || nome.includes('clinica')) {
                        tipo = 'hospital';
                    } else if (nome.includes('restaurante') || nome.includes('rest.') || nome.includes('bar')) {
                        tipo = 'restaurante';
                    }

                    pontos.push({
                        id: `${tipo}-${feature.id}`,
                        lat: feature.center[1],
                        lng: feature.center[0],
                        nome: feature.text,
                        tipo
                    });
                });
            }

            console.log("Pontos encontrados:", pontos);
            return pontos;
        } catch (error) {
            console.error("Erro ao buscar pontos de interesse:", error);
            return [];
        }
    }

    useEffect(() => {
        const fetchImovel = async () => {
            try {
                const response = await fetch(`http://localhost:9090/imovel/getById/${markersId}`);
                const data = await response.json();

                if (!data.lat || !data.lng) {
                    const coords = await geocodeAddress(
                        data.id_endereco.cep,
                        data.id_endereco.numero,
                        data.id_endereco.rua,
                        data.id_endereco.cidade,
                        data.id_endereco.uf
                    );
                    data.lat = coords.lat;
                    data.lng = coords.lng;
                }

                setImovel(data);
                
                // Buscar pontos de interesse após definir o imóvel
                const pontos = await buscarPontosInteresse(data.lat, data.lng);
                setPontosInteresse(pontos);
            } catch (error) {
                console.error("Erro ao carregar imóvel:", error);
                setError("Erro ao carregar imóvel. Tente recarregar a página.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchImovel();
    }, [markersId]);

    const getIconByTipo = (tipo: string) => {
        switch (tipo) {
            case 'school':
                return <FiBook className="text-white w-5 h-5" />;
            case 'pharmacy':
                return <FiDroplet className="text-white w-5 h-5" />;
            case 'supermarket':
                return <FiShoppingBag className="text-white w-5 h-5" />;
            case 'hospital':
                return <FiHeart className="text-white w-5 h-5" />;
            default:
                return <FiMapPin className="text-white w-5 h-5" />;
        }
    };

    return (
        <div className="w-full h-[550px] rounded-lg overflow-hidden border border-gray-200 relative">
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vermelho"></div>
                </div>
            ) : error ? (
                <div className="w-full h-full flex items-center justify-center text-red-500">
                    {error}
                </div>
            ) : imovel && (
                <Map
                    mapboxAccessToken={mapboxToken}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    initialViewState={{
                        latitude: imovel.lat!,
                        longitude: imovel.lng!,
                        zoom: 15,
                    }}
                >
                    <NavigationControl position="top-left" />
                    <GeolocateControl position="top-left" />
                    
                    {/* Marcador do imóvel */}
                    <Marker
                        longitude={imovel.lng!}
                        latitude={imovel.lat!}
                        anchor="bottom"
                    >
                        <div className="bg-vermelho p-2 rounded-full shadow-md">
                            <FiHome className="text-white w-5 h-5" />
                        </div>
                    </Marker>

                    {/* Marcadores dos pontos de interesse */}
                    {pontosInteresse.map((ponto) => (
                        <Marker
                            key={ponto.id}
                            longitude={ponto.lng}
                            latitude={ponto.lat}
                            anchor="bottom"
                        >
                            <div className="bg-vermelho p-2 rounded-full shadow-md">
                                {getIconByTipo(ponto.tipo)}
                            </div>
                        </Marker>
                    ))}
                </Map>
            )}
        </div>
    );
}
