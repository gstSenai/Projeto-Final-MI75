'use client';
import MapComponent from '@/components/map/MapComponent';
import 'mapbox-gl/dist/mapbox-gl.css';

const exampleMarkers = [
    {
        id: '1',
        lng: -49.0667,
        lat: -26.4827,
        title: 'Apartamento Vila Lenzi',
        price: 'R$ 450.000',
        image: '/imagemPropriedadesMapa/casa.png'
    },
    {
        id: '2',
        lng: -49.0697,
        lat: -26.4897,
        title: 'Residencial Vila Nova',
        price: 'R$ 850.000',
        image: '/imoveis/residencial-vila-nova.jpg'
    },
    {
        id: '3',
        lng: -49.0627,
        lat: -26.4757,
        title: 'Apartamento Centro',
        price: 'R$ 650.000',
        image: '/imoveis/apartamento-centro.jpg'
    },
    {
        id: '4',
        lng: -49.0747,
        lat: -26.4857,
        title: 'Casa Jaraguá Esquerdo',
        price: 'R$ 550.000',
        image: '/imoveis/casa-jaragua.jpg'
    },
    {
        id: '5',
        lng: -49.0587,
        lat: -26.4917,
        title: 'Condomínio Boa Vista',
        price: 'R$ 750.000',
        image: '/imoveis/condominio-boa-vista.jpg'
    },
    {
        id: '6',
        lng: -49.0557,
        lat: -26.4787,
        title: 'Apartamento Czerniewicz',
        price: 'R$ 480.000',
        image: '/imoveis/apartamento-czerniewicz.jpg'
    },
    {
        id: '7',
        lng: -49.0717,
        lat: -26.4937,
        title: 'Casa Vila Nova',
        price: 'R$ 920.000',
        image: '/imoveis/casa-vila-nova.jpg'
    }
];

export default function MapPage() {
    const handleMarkerClick = (markerId: string) => {
        console.log('Marker clicked:', markerId);
        // Aqui você pode adicionar a lógica para navegar para a página do imóvel
    };

    return (
        <div className="w-full min-h-screen bg-[#DFDAD0]">
            <div className="w-[1000px] mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold mb-6">Imóveis em Jaraguá do Sul</h1>
                <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-200 relative">
                    <MapComponent 
                        markers={exampleMarkers}
                        onMarkerClick={handleMarkerClick}
                    />
                </div>
            </div>
        </div>
    );
} 