'use client';
import { useEffect, useState } from 'react';
import EditProfile from '@/components/perfil/EditProfile';

interface MarketData {
    id: number;
    name: string;
    // Adicione outros campos necessários aqui
}

export default function MarketPage({ params }: { params: { id: string } }) {
    const [marketData, setMarketData] = useState<MarketData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/market/${params.id}`);
                if (!response.ok) {
                    throw new Error('Erro ao carregar dados do mercado');
                }
                const data = await response.json();
                setMarketData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
            } finally {
                setLoading(false);
            }
        };

        fetchMarketData();
    }, [params.id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!marketData) {
        return <div>Mercado não encontrado</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <EditProfile marketId={marketData.id} />
        </div>
    );
} 