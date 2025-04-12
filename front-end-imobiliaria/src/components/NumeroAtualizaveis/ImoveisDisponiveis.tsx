"use client";
import { useEffect, useState, useCallback } from "react"
import request from "@/routes/request"


export function ImoveisDisponiveis() {
    const [isLoading, setIsLoading] = useState(false)


    const getImoveisDisponiveis = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await request("GET", `http://localhost:9090/imovel/getAll`);
            const total = response.size();
        } catch (error) {
            console.error("Erro ao buscar barra de status:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getImoveisDisponiveis();
    }, [getImoveisDisponiveis]);


    return (
        <div className="font-semibold tracking-[7%] text-3xl">
            <p>00000</p>
        </div>


    );

}
