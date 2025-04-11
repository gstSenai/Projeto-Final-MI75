import { MAPBOX_ACCESS_TOKEN } from '@/config/mapbox';

export interface GeocodingResult {
    lng: number;
    lat: number;
}

export async function geocodeAddress(cep: string, numero: string, rua: string, cidade: string, uf: string): Promise<GeocodingResult> {
    try {
        // Format the address string
        const address = `${rua} ${numero}, ${cidade}, ${uf}, ${cep}`;
        
        // Encode the address for the URL
        const encodedAddress = encodeURIComponent(address);
        
        // Make the request to Mapbox Geocoding API
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
        );
        
        if (!response.ok) {
            throw new Error('Failed to geocode address');
        }
        
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;
            return { lng, lat };
        } else {
            throw new Error('No results found for the given address');
        }
    } catch (error) {
        console.error('Error geocoding address:', error);
        throw error;
    }
} 