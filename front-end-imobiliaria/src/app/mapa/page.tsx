'use client';
import MapComponent from '@/components/map/MapComponent';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect } from 'react';

interface Imovel {
    id?: number;
    longitude: number;
    latitude: number;
    nome_propriedade: string;
    valor_venda: number;
    id_endereco: {
        cep: string;
        rua: string;
        numero: string;
        bairro: string;
        cidade: string;
        uf: string;
        complemento?: string;
    }
}

interface MapMarker {
    id: number;
    lng: number;
    lat: number;
    nome_propriedade: string;
    valor_venda: number;
    id_endereco: {
        cep: string;
        rua: string;
        numero: string;
        bairro: string;
        cidade: string;
        uf: string;
        complemento?: string;
    }
}

export default function MapPage() {
    const [markers, setMarkers] = useState<MapMarker[]>([]);

    const getAllImoveis = async () => {
        const response = await fetch('http://localhost:9090/imovel/getAll');
        if (!response.ok) {
            throw new Error('Failed to fetch imóveis');
        }
        const data = await response.json();
        console.log('API Response:', data);
        return data;
    }

    useEffect(() => {
        const fetchImoveis = async () => {
            const longitude = -49.0667;
            const latitude = -26.4827;
            try {
                const imoveis = await getAllImoveis();
                console.log('Raw imoveis data:', imoveis);
                
                const imoveisArray = Array.isArray(imoveis) ? imoveis : 
                    (imoveis.data || imoveis.imoveis || imoveis.result || []);
                
                if (!Array.isArray(imoveisArray)) {
                    console.error('Could not find array in response:', imoveis);
                    return;
                }

                const imoveisMap = imoveisArray.map((imovel: Imovel) => ({
                    id: imovel.id || 0,
                    lng: longitude,
                    lat: latitude,
                    nome_propriedade: imovel.nome_propriedade,
                    valor_venda: imovel.valor_venda,
                    id_endereco: imovel.id_endereco,
                }));
                setMarkers(imoveisMap);
            } catch (error) {
                console.error('Error fetching imóveis:', error);
            }
        };
        fetchImoveis();
    }, []);

    const handleMarkerClick = (markerId: string) => {
        console.log('Marker clicked:', markerId);
    };

    return (
        <div className="w-full min-h-screen bg-[#DFDAD0]">
            <div className="w-[1000px] mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold mb-6">Imóveis em Jaraguá do Sul</h1>
                <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-200 relative">
                    <MapComponent 
                        markers={markers}
                        onMarkerClick={handleMarkerClick}
                    />
                </div>
            </div>
        </div>
    );
} 