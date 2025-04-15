"use client";
import { useEffect, useState, useCallback } from "react"
import request from "@/routes/request"

interface ApiResponse {
    content?: any[];
    totalElements?: number;
    // Outras propriedades da resposta, se necessário
}

export function ImoveisDisponiveis() {
    const [isLoading, setIsLoading] = useState(false)
    const [totalImoveis, setTotalImoveis] = useState(0)

    const getImoveisDisponiveis = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await request("GET", `http://localhost:9090/imovel/getAll`) as ApiResponse;
            
            if (response && typeof response === 'object') {
                // Verifica se tem propriedade content que é um array
                if ('content' in response && Array.isArray(response.content)) {
                    setTotalImoveis(response.content.length);
                }
                // Ou se tem totalElements (que parece ser o total real)
                else if ('totalElements' in response && typeof response.totalElements === 'number') {
                    setTotalImoveis(response.totalElements);
                }
            }
        } catch (error) {
            console.error("Erro ao buscar imóveis disponíveis:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getImoveisDisponiveis();
    }, [getImoveisDisponiveis]);

    return (
        <div className="font-semibold tracking-[7%] text-3xl">
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <p>{totalImoveis.toString().padStart(5, '0')}</p>
            )}
        </div>
    );
}