"use client";
import { useEffect, useState, useCallback } from "react"
import request from "@/routes/request"

interface ApiResponse {
    content?: any[];
    totalElements?: number;
}

export function ImoveisAlugados() {
    const [isLoading, setIsLoading] = useState(false)
    const [totalImoveisAlugados, setTotalImoveisAlugados] = useState(0)

    const getImoveisAlugados = useCallback(async () => {
        setIsLoading(true);
        try {
        
            const response = await request("GET", `http://localhost:9090/imovel/getAll/alugados`) as ApiResponse;
            
            if (response && typeof response === 'object') {
                if ('content' in response && Array.isArray(response.content)) {
                    setTotalImoveisAlugados(response.content.length);
                }
                else if ('totalElements' in response && typeof response.totalElements === 'number') {
                    setTotalImoveisAlugados(response.totalElements);
                }
            }
        } catch (error) {
            console.error("Erro ao buscar imóveis alugados:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getImoveisAlugados();
    }, [getImoveisAlugados]);

    return (
        <div className="font-semibold tracking-[7%] text-3xl">
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <p>{totalImoveisAlugados.toString().padStart(5, '0')}</p>
            )}
        </div>
    );
}