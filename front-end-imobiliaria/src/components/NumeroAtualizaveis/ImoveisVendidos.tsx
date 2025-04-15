"use client";
import { useEffect, useState, useCallback } from "react"
import request from "@/routes/request"

interface ApiResponse {
    content?: any[];
    totalElements?: number;
}

export function ImoveisVendidos() {
    const [isLoading, setIsLoading] = useState(false)
    const [totalImoveisVendidos, setTotalImoveisVendidos] = useState(0)

    const getImoveisVendidos = useCallback(async () => {
        setIsLoading(true);
        try {
            // Opção 1: Se você tiver um endpoint específico para imóveis alugados
            // const response = await request("GET", `http://localhost:9090/imovel/alugados`) as ApiResponse;
            
            // Opção 2: Se você puder filtrar pelo endpoint existente
            const response = await request("GET", `http://localhost:9090/imovel/getAll/vendidos`) as ApiResponse;
            
            if (response && typeof response === 'object') {
                if ('content' in response && Array.isArray(response.content)) {
                    setTotalImoveisVendidos(response.content.length);
                }
                else if ('totalElements' in response && typeof response.totalElements === 'number') {
                    setTotalImoveisVendidos(response.totalElements);
                }
            }
        } catch (error) {
            console.error("Erro ao buscar imóveis alugados:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getImoveisVendidos();
    }, [getImoveisVendidos]);

    return (
        <div className="font-semibold tracking-[7%] text-3xl">
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <p>{totalImoveisVendidos.toString().padStart(5, '0')}</p>
            )}
        </div>
    );
}