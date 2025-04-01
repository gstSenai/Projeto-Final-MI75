"use client";

import { useEffect, useState } from "react";
import { Header } from "../header";
import { Card } from "../cardImovel";
import { Footer } from "../footer";

interface Imovel {
    id: number;
    titulo: string;
    cidade: string;
    qtdDormitorios: number;
    qtdSuite: number;
    qtdBanheiros: number;
    preco: number;
    codigo: number;
    imagemNome?: string;
}

export function ListaImoveis() {
    const [imoveis, setImoveis] = useState<Imovel[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ultimoId, setUltimoId] = useState<number | null>(null);

    const fetchImoveis = async () => {
        try {
            const response = await fetch("http://localhost:9090/imovel/getAll", {
                cache: "no-store",
                headers: {
                    "Cache-Control": "no-cache",
                    "Pragma": "no-cache",
                    "Expires": "0",
                }
            });

            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const imoveisArray = data.content || [];

            if (imoveisArray.length === 0) {
                setImoveis([]);
                return;
            }

            const maiorId = Math.max(...imoveisArray.map((imovel: any) => imovel.id));
            if (ultimoId !== null && maiorId === ultimoId) {
                return;
            }

            const imoveisFormatados = imoveisArray.map((imovel: any) => ({
                id: imovel.id || 0,
                titulo: imovel.nome_propriedade || "Sem título",
                cidade: imovel.id_endereco?.cidade || "Cidade não informada",
                qtdDormitorios: imovel.id_caracteristicasImovel?.numero_quartos || 0,
                qtdSuite: imovel.id_caracteristicasImovel?.numero_suites || 0,
                qtdBanheiros: imovel.id_caracteristicasImovel?.numero_banheiros || 0,
                preco: imovel.valor_venda || 0,
                codigo: imovel.codigo || 0
            }));

            setImoveis(imoveisFormatados);
            setUltimoId(maiorId);

        } catch (error) {
            console.error("Erro ao buscar imóveis:", error);
            setError("Erro ao carregar imóveis. Por favor, tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const refreshData = () => {
        setImoveis([])
        fetchImoveis();
    }

    useEffect(() => {
        refreshData()
    }, []);

    return (
        <>
            <Header/>
            <div>

                <div className="flex justify-center mt-[8rem]">
                    <h1 className="font-bold text-[40px]">Propriedades</h1>
                </div>
                <div className="flex justify-center">
                    <div className="w-[15.75rem] h-[3px] bg-vermelho"></div>
                </div>

                {error && (
                    <div className="flex justify-center mt-4">
                        <p className="text-red-500">{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center mt-10">
                        <p className="text-xl font-semibold">Carregando imóveis...</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                        {imoveis.length > 0 ? (
                            imoveis.map((imovel) => (
                                <Card
                                    key={imovel.id}
                                    titulo={imovel.titulo}
                                    cidade={imovel.cidade}
                                    qtdDormitorios={imovel.qtdDormitorios}
                                    qtdSuite={imovel.qtdSuite}
                                    qtdBanheiros={imovel.qtdBanheiros}
                                    preco={imovel.preco}
                                    codigo={imovel.codigo}
                                />
                            ))
                        ) : (
                            <p className="text-xl font-semibold text-center">Nenhum imóvel encontrado.</p>
                        )}
                    </div>
                )}

            </div>
            <Footer />
        </>
    );
}

export default ListaImoveis;
