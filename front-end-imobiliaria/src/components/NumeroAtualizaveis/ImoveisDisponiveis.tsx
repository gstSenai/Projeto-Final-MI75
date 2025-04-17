"use client";
import { useEffect, useState, useCallback } from "react"
import request from "@/routes/request"
import { useLanguage } from '@/components/context/LanguageContext';

interface ApiResponse {
    content?: any[];
    totalElements?: number;
    // Outras propriedades da resposta, se necessário
}

export function ImoveisDisponiveis() {
    const [totalImoveis, setTotalImoveis] = useState<number>(0);
    const { translate } = useLanguage();

    const fetchTotalImoveis = useCallback(async () => {
        try {
            const response = await request.get<ApiResponse>('/imoveis');
            if (response.data && response.data.totalElements !== undefined) {
                setTotalImoveis(response.data.totalElements);
            }
        } catch (error) {
            console.error('Erro ao buscar total de imóveis:', error);
        }
    }, []);

    useEffect(() => {
        fetchTotalImoveis();
    }, [fetchTotalImoveis]);

    return (
        <div className="text-white">
            <h3 className="text-2xl font-bold">{totalImoveis}</h3>
            <p className="text-sm">{translate('imoveis_cadastrados')}</p>
        </div>
    );
}