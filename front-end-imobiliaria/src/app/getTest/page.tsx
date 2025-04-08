"use client"

import { Card } from "@/components/cardImovel";
import { useState, useEffect } from "react";

interface Imovel {
    id: number;
    titulo: string;
    cidade: string;
    qtdDormitorios: number;
    qtdSuite: number;
    qtdBanheiros: number;
    preco: number;
    codigo: number;
}


export function GetTest() {
    const [imoveis, setImoveis] = useState<Imovel[]>([]);

    useEffect(() => {
        fetch("http://localhost:9090/imovel")
            .then((res) => res.json())
            .then((data) => setImoveis(data))
            .catch((err) => console.error("Erro ao buscar imoveis ", err));
    }, []);

    return (
        <>
            <div>
                <h1>Lista de Imoveis</h1>
                {imoveis.map((imovel, index) => (
                    <Card
                        key={index}
                        titulo={imovel.titulo}
                        cidade={imovel.cidade}
                        qtdDormitorios={imovel.qtdDormitorios}
                        qtdSuite={imovel.qtdSuite}
                        qtdBanheiros={imovel.qtdBanheiros}
                        preco={imovel.preco}
                        codigo={imovel.codigo}
                    />
                ))}
            </div>
        </>
    );
}