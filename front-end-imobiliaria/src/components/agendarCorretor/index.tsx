"use client";

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '800'],
    display: 'swap',
});

import { Botao } from "../botao/index";
import { useEffect, useState, useCallback } from "react"
import request from "@/routes/request"
import Image from 'next/image';

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

    const getCorretor = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await request("GET", `http://localhost:9090/usuario/getById/${id}`);
            console.log("Resposta da API:", response);
            setCorretor(response as Corretor);
        } catch (error) {
            console.error("Erro ao buscar corretor:", error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        getCorretor();
    }, [getCorretor]);

    return (
        <div className={`flex flex-col gap-4 py-4 w-72 ${montserrat.className}`}>
            <div>
                {isLoading ? (
                    <p>Carregando...</p>
                ) : (
                    <>
                        {corretor && (
                            <div className="flex flex-col items-center justify-center px-1 text-center">
                                <Image
                                    src={`http://localhost:9090/usuario/imagem/${corretor.imagem_usuario}`}
                                    alt={`Foto de ${corretor.nome}`}
                                    className="w-40 h-40 rounded-full object-cover"
                                    width={100}
                                    height={100}
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

            <div className="flex flex-col items-center gap-12">
                <Botao type="button" className='bg-vermelho h-10' texto="Falar com corretor" />
                <Botao type="button" className='bg-vermelho h-10' texto="Agendar sua visita" />
            </div>
        </div>
    )
}