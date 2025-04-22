"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { DetalhesImovel } from '@/components/paginaDetalhesImovel';

export default function ImovelDetalhes() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [imovelId, setImovelId] = useState<number | null>(null);

    useEffect(() => {
        const id = localStorage.getItem('currentImovelId');
        if (!id) {
            router.push('/paginaImoveis');
            return;
        }
        
        setImovelId(Number(id));
        setLoading(false);
    }, [router]);

    if (loading || !imovelId) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <Header />
            <div className="min-h-screen">
                <DetalhesImovel imovelId={imovelId} />
            </div>
            <Footer />
        </>
    );
} 