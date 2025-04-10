'use client';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE, DEFAULT_CENTER, DEFAULT_ZOOM } from '@/config/mapbox';
import { geocodeAddress } from '@/utils/geocoding';

interface MapComponentProps {
    markers?: Array<{
        id: number;
        lng: number;
        lat: number;
        nome_propriedade: string;
        valor_venda: number;
        id_endereco: {
            id?: number;
            cep: string;
            rua: string;
            numero: string;
            bairro: string;
            cidade: string;
            uf: string;
            complemento?: string;
        };
    }>;
    onMarkerClick?: (markerId: string) => void;
}

export default function MapComponent({ markers = [], onMarkerClick }: MapComponentProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const popupRef = useRef<mapboxgl.Popup | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);
    const [geocodedMarkers, setGeocodedMarkers] = useState<Array<{
        id: number;
        lng: number;
        lat: number;
        nome_propriedade: string;
        valor_venda: number;
        id_endereco: {
            id?: number;
            cep: string;
            rua: string;
            numero: string;
            bairro: string;
            cidade: string;
            uf: string;
            complemento?: string;
        };
    }>>([]);

    // Função para calcular o tamanho do marcador baseado no zoom
    const calculateMarkerSize = (zoom: number) => {
        // Tamanho base quando o zoom está em 13.5 (DEFAULT_ZOOM)
        const baseSize = 30;
        // Tamanho mínimo quando o zoom está em 5
        const minSize = 15;
        // Tamanho máximo quando o zoom está em 18
        const maxSize = 40;
        
        // Calcula o tamanho baseado no zoom atual
        if (zoom <= 5) return minSize;
        if (zoom >= 18) return maxSize;
        
        // Interpolação linear entre os tamanhos
        const size = baseSize + (zoom - DEFAULT_ZOOM) * 2;
        return Math.max(minSize, Math.min(maxSize, size));
    };

    // Geocodifica os endereços quando o componente é montado
    useEffect(() => {
        const geocodeMarkers = async () => {
            const geocoded = await Promise.all(
                markers.map(async (marker) => {
                    try {
                        const coordinates = await geocodeAddress(
                            marker.id_endereco.cep,
                            marker.id_endereco.numero,
                            marker.id_endereco.rua,
                            marker.id_endereco.cidade,
                            marker.id_endereco.uf
                        );
                        return {
                            ...marker,
                            lng: coordinates.lng,
                            lat: coordinates.lat
                        };
                    } catch (error) {
                        console.error(`Erro ao geocodificar endereço do imóvel ${marker.id}:`, error);
                        return marker; // Mantém as coordenadas originais em caso de erro
                    }
                })
            );
            setGeocodedMarkers(geocoded);
        };

        geocodeMarkers();
    }, [markers]);

    useEffect(() => {
        if (!mapContainer.current || geocodedMarkers.length === 0) return;

        try {
            mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

            const initializeMap = new mapboxgl.Map({
                container: mapContainer.current,
                style: MAPBOX_STYLE,
                center: [DEFAULT_CENTER.lng, DEFAULT_CENTER.lat],
                zoom: DEFAULT_ZOOM,
                attributionControl: false
            });

            map.current = initializeMap;

            initializeMap.on('load', () => {
                setMapLoaded(true);
                
                // Adiciona controles de navegação
                initializeMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
                initializeMap.addControl(new mapboxgl.AttributionControl(), 'bottom-right');

                // Adiciona marcadores
                geocodedMarkers.forEach(marker => {
                    const el = document.createElement('div');
                    el.className = 'marker';
                    const size = calculateMarkerSize(DEFAULT_ZOOM);
                    el.style.width = `${size}px`;
                    el.style.height = `${size}px`;
                    el.style.backgroundColor = '#702632';
                    el.style.borderRadius = '50%';
                    el.style.border = '2px solid white';
                    el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
                    el.style.cursor = 'pointer';
                    el.style.position = 'relative';

                    // Adiciona um ponto interno branco
                    const innerDot = document.createElement('div');
                    innerDot.style.width = `${size * 0.3}px`;
                    innerDot.style.height = `${size * 0.3}px`;
                    innerDot.style.backgroundColor = 'white';
                    innerDot.style.borderRadius = '50%';
                    innerDot.style.position = 'absolute';
                    innerDot.style.top = '50%';
                    innerDot.style.left = '50%';
                    innerDot.style.transform = 'translate(-50%, -50%)';
                    el.appendChild(innerDot);

                    // Cria o popup
                    const popup = new mapboxgl.Popup({ 
                        offset: 25,
                        closeButton: false,
                        className: 'custom-popup',
                        maxWidth: '300px'
                    })
                    .setHTML(`
                        <div class="bg-white rounded-lg overflow-hidden shadow-lg">
                            <img src="${marker.id_endereco}" alt="${marker.nome_propriedade}" class="w-full h-40 object-cover"/>
                            <div class="p-4">
                                <h3 class="font-semibold text-lg text-gray-800">${marker.nome_propriedade}</h3>
                                <p class="text-[#702632] font-medium mt-2">${marker.valor_venda}</p>
                            </div>
                        </div>
                    `);

                    // Adiciona o marcador ao mapa
                    const markerInstance = new mapboxgl.Marker({
                        element: el,
                        anchor: 'bottom'
                    })
                    .setLngLat([marker.lng, marker.lat])
                    .addTo(initializeMap);

                    markersRef.current.push(markerInstance);

                    // Adiciona eventos de hover
                    el.addEventListener('mouseenter', () => {
                        popup.setLngLat([marker.lng, marker.lat]).addTo(initializeMap);
                    });

                    el.addEventListener('mouseleave', () => {
                        popup.remove();
                    });

                    // Adiciona evento de clique
                    el.addEventListener('click', () => {
                        if (onMarkerClick) {
                            onMarkerClick(marker.id.toString());
                        }
                    });
                });

                // Atualiza o tamanho dos marcadores quando o zoom muda
                initializeMap.on('zoom', () => {
                    const currentZoom = initializeMap.getZoom();
                    markersRef.current.forEach((marker, index) => {
                        const el = marker.getElement();
                        const size = calculateMarkerSize(currentZoom);
                        el.style.width = `${size}px`;
                        el.style.height = `${size}px`;
                        
                        // Atualiza o tamanho do ponto interno
                        const innerDot = el.querySelector('div');
                        if (innerDot) {
                            innerDot.style.width = `${size * 0.3}px`;
                            innerDot.style.height = `${size * 0.3}px`;
                        }
                    });
                });
            });

            // Cleanup
            return () => {
                if (map.current) {
                    map.current.remove();
                }
            };
        } catch (error) {
            console.error('Erro ao inicializar o mapa:', error);
        }
    }, [geocodedMarkers, onMarkerClick]);

    return (
        <div className="absolute inset-0 bg-gray-100">
            <div 
                ref={mapContainer} 
                className="w-full h-full" 
                style={{ 
                    position: 'absolute',
                    backgroundColor: '#f0f0f0'
                }} 
            />
        </div>
    );
} 