"use client"

import { useState, useEffect, useCallback } from "react"
import { Montserrat } from "next/font/google"
import PlaceFilter from "@/components/paginaImoveis/botaoSelecaoFiltro"
import { Botao } from "@/components/botao"

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "800"],
    display: "swap",
})

interface FiltroImoveisProps {
    mostrarFiltros: boolean
    setMostrarFiltros: (value: boolean) => void
    setImoveis: (imoveis: any[]) => void
}

export function FiltroImoveis({ mostrarFiltros, setMostrarFiltros, setImoveis }: FiltroImoveisProps) {
    const [minValue, setMinValue] = useState<number | null>(0)
    const [maxValue, setMaxValue] = useState<number | null>(500000)
    const [tipoImovel, setTipoImovel] = useState<string | null>(null)
    const [activeSlider, setActiveSlider] = useState<"min" | "max" | null>(null)
    const [loading, setLoading] = useState(false)
    const [quartos, setQuartos] = useState<number | null>(null)
    const [banheiros, setBanheiros] = useState<number | null>(null)

    const minRange = 0
    const maxRange = 2000000
    const step = 10000

    const snapToStep = (value: number) => Math.round(value / step) * step

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!activeSlider) return

            const slider = document.getElementById("range-slider")
            if (!slider) return

            const rect = slider.getBoundingClientRect()
            const x = e.clientX - rect.left
            const percentage = Math.max(0, Math.min(1, x / rect.width))
            const value = snapToStep(minRange + percentage * (maxRange - minRange))

            if (activeSlider === "min" && value < (maxValue || maxRange)) {
                setMinValue(value)
            } else if (activeSlider === "max" && value > (minValue || minRange)) {
                setMaxValue(value)
            }
        },
        [activeSlider, maxValue, minValue],
    )

    const handleMouseUp = useCallback(() => {
        setActiveSlider(null)
    }, [])

    useEffect(() => {
        if (activeSlider) {
            window.addEventListener("mousemove", handleMouseMove)
            window.addEventListener("mouseup", handleMouseUp)
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }
    }, [activeSlider, handleMouseMove, handleMouseUp])

    const buscarImoveis = async () => {
        setLoading(true);
        try {

            let imoveisIds: number[] = [];
            if (quartos !== null || banheiros !== null) {
                const queryCaracteristicas = new URLSearchParams();
                if (quartos !== null) queryCaracteristicas.append("quantidade_quartos", quartos.toString());
                if (banheiros !== null) queryCaracteristicas.append("quantidade_banheiros", banheiros.toString());
            
                const response2 = await fetch(
                    `http://localhost:9090/caracteristicaImovel/filtro?${queryCaracteristicas.toString()}`
                );            

                if (!response2.ok) throw new Error("Erro ao buscar características de imóveis");

                const caracteristicasData = await response2.json();
                imoveisIds = caracteristicasData.map((item: any) => item.id_imovel);

                if (imoveisIds.length === 0) {
                    setImoveis([]);
                    setLoading(false);
                    setMostrarFiltros(false);
                    return;
                }
            }

            const queryParams = new URLSearchParams();
            if (tipoImovel) queryParams.append("tipo_imovel", tipoImovel);
            if (minValue !== null) queryParams.append("valor_min", minValue.toString());
            if (maxValue !== null) queryParams.append("valor_max", maxValue.toString());

            if (imoveisIds.length > 0) {
                queryParams.append("ids", imoveisIds.join(","));
            }

            const response = await fetch(`http://localhost:9090/imovel/filtroImovel?${queryParams.toString()}`);
            if (!response.ok) throw new Error("Erro ao buscar imóveis");

            const data = await response.json();

            const imoveisFormatados = data.map((imovel: any) => ({
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
            setMostrarFiltros(false);
        } catch (error) {
            console.error("Erro ao buscar imóveis:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                className={`${montserrat.className} fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-[10] 
                ${mostrarFiltros ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
                <div
                    className={`fixed top-0 left-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-[20] 
                    ${mostrarFiltros ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="p-6 h-full flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-vermelho">Filtros de Busca</h2>
                                <button
                                    className="bg-[#DFDAD0] px-3 py-1 rounded-full text-vermelho transition-transform duration-300 
                                    hover:scale-110 hover:bg-vermelho hover:text-white"
                                    onClick={() => setMostrarFiltros(false)}
                                >
                                    X
                                </button>
                            </div>

                            <div className="py-4">
                                <p className="font-medium lg:text-lg">Faixa de Preço:</p>
                                <div id="range-slider" className="relative w-full mt-2">
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-[#DFDAD0] rounded-full"></div>

                                    {minValue !== null && (
                                        <div
                                            className="absolute top-1/2 w-6 h-6 bg-vermelho rounded-full z-30 cursor-grab active:cursor-grabbing"
                                            style={{
                                                left: `${((minValue - minRange) / (maxRange - minRange)) * 100}%`,
                                                transform: "translate(-50%, -50%)",
                                            }}
                                            onMouseDown={() => setActiveSlider("min")}
                                        ></div>
                                    )}

                                    {maxValue !== null && (
                                        <div
                                            className="absolute top-1/2 w-6 h-6 bg-vermelho rounded-full z-30 cursor-grab active:cursor-grabbing"
                                            style={{
                                                left: `${((maxValue - minRange) / (maxRange - minRange)) * 100}%`,
                                                transform: "translate(-50%, -50%)",
                                            }}
                                            onMouseDown={() => setActiveSlider("max")}
                                        ></div>
                                    )}
                                </div>

                                <div className="flex justify-between mt-3">
                                    <span>R$ {minValue?.toLocaleString()}</span>
                                    <span>R$ {maxValue?.toLocaleString()}</span>
                                </div>
                            </div>

                            <PlaceFilter
                                tipo="NumLocal"
                                texto="Quant. de Quartos:"
                                onChange={(valor) => setQuartos(valor ? Number(valor) : null)}
                            />

                            <PlaceFilter
                                tipo="NumLocal"
                                texto="Quant. de Banheiros:"
                                onChange={(valor) => setBanheiros(valor ? Number(valor) : null)}
                            />


                            <PlaceFilter tipo="TipoLocal" texto="Tipo de Imóvel:" onChange={(valor) => setTipoImovel(valor)} />
                        </div>

                        <div className="flex gap-4 mt-10">
                            <Botao
                                texto="Limpar"
                                className="text-base bg-vermelho bg-opacity-50 hover:g-opacity-100 transition-all duration-300 ease-in-out shrink-0 text-center rounded-[20px] w-full h-10"
                                onClick={() => {
                                    setMinValue(0)
                                    setMaxValue(500000)
                                    setTipoImovel(null)
                                    setImoveis([])
                                    setMostrarFiltros(false)
                                }}
                            />
                            <div className="relative w-full">
                                <Botao
                                    texto={loading ? "Carregando..." : "Pesquisar"}
                                    className={`text-base bg-vermelho bg-opacity-50 hover:bg-opacity-100 transition-all duration-300 ease-in-out shrink-0 text-center rounded-[20px] w-full h-10 ${loading ? "opacity-50" : ""}`}
                                    onClick={buscarImoveis}
                                    disabled={loading}
                                />
                                {loading && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

