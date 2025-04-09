'use client';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE, DEFAULT_CENTER, DEFAULT_ZOOM } from '@/config/mapbox';

interface MapComponentProps {
    markers?: Array<{
        id: string;
        lng: number;
        lat: number;
        title: string;
        price: string;
        image: string;
    }>;
    onMarkerClick?: (markerId: string) => void;
}

export default function MapComponent({ markers = [], onMarkerClick }: MapComponentProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const popupRef = useRef<mapboxgl.Popup | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

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
                markers.forEach(marker => {
                    const el = document.createElement('div');
                    el.className = 'marker';
                    el.style.width = '30px';
                    el.style.height = '30px';
                    el.style.backgroundColor = '#702632';
                    el.style.borderRadius = '50%';
                    el.style.border = '2px solid white';
                    el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
                    el.style.cursor = 'pointer';
                    el.style.position = 'relative';

                    // Adiciona um ponto interno branco
                    const innerDot = document.createElement('div');
                    innerDot.style.width = '8px';
                    innerDot.style.height = '8px';
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
                            <img src="${marker.image}" alt="${marker.title}" class="w-full h-40 object-cover"/>
                            <div class="p-4">
                                <h3 class="font-semibold text-lg text-gray-800">${marker.title}</h3>
                                <p class="text-[#702632] font-medium mt-2">${marker.price}</p>
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
                            onMarkerClick(marker.id);
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
    }, [markers, onMarkerClick]);

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