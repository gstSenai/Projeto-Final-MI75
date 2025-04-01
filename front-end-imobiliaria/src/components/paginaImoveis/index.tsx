"use client";

import { useEffect, useState } from "react";
import { Card } from "../cardImovel";
import { Montserrat } from "next/font/google";
import { FiltroImoveis } from "./botaoFiltro";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "800"],
    display: "swap",
})


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
    tipo_transacao: string;
}

export function ListaImoveis() {
    const [imoveis, setImoveis] = useState<Imovel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ultimoId, setUltimoId] = useState<number | null>(null);
    const [tipoTransacao, setTipoTransacao] = useState<string>("Todos");
    const [mostrarFiltros, setMostrarFiltros] = useState<boolean>(false);

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
                codigo: imovel.codigo || 0,
                tipo_transacao: imovel.tipo_transacao || "Indefinido",
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

    const imoveisFiltrados = tipoTransacao === "Todos"
        ? imoveis
        : imoveis.filter(imovel => imovel.tipo_transacao === tipoTransacao);

    return (
        <>
            <div className={`${montserrat.className}`}>

                <div className="flex justify-center mt-[8rem]">
                    <h1 className="font-bold text-[40px]">Propriedades</h1>
                </div>
                <div className="flex justify-center">
                    <div className="w-[15.75rem] h-[3px] bg-vermelho"></div>
                </div>

                <div className="flex justify-center gap-10 mt-[29.5px]">
                    <button onClick={() => setTipoTransacao("Todos")}>
                        <p className={` ${tipoTransacao === "Todos" ? "text-vermelho font-bold" : ""}`}>Todos</p>
                    </button>
                    <button onClick={() => setTipoTransacao("Venda")}>
                        <p className={`${tipoTransacao === "Venda" ? "text-vermelho font-bold" : ""}`}>Comprar</p>
                    </button>
                    <button onClick={() => setTipoTransacao("Locação")}>
                        <p className={` ${tipoTransacao === "Locação" ? "text-vermelho font-bold" : ""}`}>Alugar</p>
                    </button>
                </div>

                <div className="flex justify-center mt-[30px]">
                    <button
                        className="bg-vermelho text-white px-6 py-2 rounded-lg transition duration-300 hover:opacity-"
                        onClick={() => setMostrarFiltros(!mostrarFiltros)}
                    >
                        {mostrarFiltros ? "Ocultar Filtros" : "Filtrar"}
                    </button>
                </div>

                {mostrarFiltros && (
                    <div className="flex justify-center mt-6">
                        <FiltroImoveis />
                    </div>
                )}

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
                        {imoveisFiltrados.length > 0 ? (
                            imoveisFiltrados.map((imovel) => (
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
        </>
    );
}

export default ListaImoveis;
