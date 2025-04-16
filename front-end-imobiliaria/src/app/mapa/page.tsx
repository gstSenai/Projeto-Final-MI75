'use client'

import { useEffect, useState } from 'react';
import { ImovelMap } from '@/components/map';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LoadingWrapper } from '@/components/loading/loadingServer';

interface Imovel {
  id: number;
}

const getAllImoveis = async () => {
  try {
    const response = await fetch("http://localhost:9090/imovel/getAll");
    if (!response.ok) {
      throw new Error("Erro ao buscar imóveis");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    throw error;
  }
};

export default function MapPage() {
  const [markers, setMarkers] = useState<Imovel[]>([]);

  useEffect(() => {
    const fetchImoveis = async () => {
      const imoveis = await getAllImoveis();
      setMarkers(imoveis);
    };
    fetchImoveis();
  }, []);

  const markerId = markers.length > 0 ? markers[0].id : 0;

  return (
    <LoadingWrapper>
      <Header />
      <div className='mt-10 mb-20'>
        <ImovelMap markersId={markerId} />
      </div>
      <Footer />
    </LoadingWrapper>
  );
}


