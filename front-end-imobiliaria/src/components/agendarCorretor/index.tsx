"use client"

import { Botao } from "../botao"
import { useEffect, useState } from "react"
import request from "@/routes/request"

interface Corretor {
    id: number;
    nome: string;
    email: string;
    sobrenome: string;
    imagem_usuario: string
}


export default function AgendarCorretor({ id }: { id: number }) {
    const [isLoading, setIsLoading] = useState(false)
    const [corretor, setCorretor] = useState<Corretor | null>(null)

    const getCorretor = async () => {
        setIsLoading(true);
        try {
            const response = await request("GET", `http://localhost:9090/usuario/getById/${id}`);
            console.log("Resposta da API:", response);
            setCorretor(response);
        } catch (error) {
            console.error("Erro ao buscar corretor:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log("ID recebido:", id);
        getCorretor();
    }, [id]);


    return (
        <div className="flex flex-col gap-4 py-4">
            <div>
                {isLoading ? (
                    <p>Carregando...</p>
                ) : (
                    <>
                        {corretor && (
                            <div className="flex flex-col items-center justify-center px-1 text-center">
                                <img
                                    src={`http://localhost:9090/usuario/imagem/${corretor.imagem_usuario}`}
                                    alt={`Foto de ${corretor.nome}`}
                                    className="w-40 h-40 rounded-full object-cover"
                                />
                                <div className="pt-4">
                                    <p>Corretor {corretor.nome + " " + corretor.sobrenome}</p>
                                    <p>{corretor.email}</p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="flex flex-col items-center gap-8">
                <Botao type="button" className='bg-vermelho h-10' texto="Falar com corretor" />
                <Botao type="button" className='bg-vermelho h-10' texto="Agendar sua visita" />
            </div>
        </div>
    )
}