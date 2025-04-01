"use client";
import { useState, useEffect, useCallback } from "react";
import { Montserrat } from "next/font/google";
import PlaceFilter from "@/components/PaginaInicial/botaoselecao";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "800"],
    display: "swap",
});

export function FiltroImoveis() {
    const [minValue, setMinValue] = useState(100000);
    const [maxValue, setMaxValue] = useState(500000);
    const [activeSlider, setActiveSlider] = useState<"min" | "max" | null>(null);
    const minRange = 100000;
    const maxRange = 2000000;
    const step = 10000;

    const snapToStep = (value: number) => {
        return Math.round(value / step) * step;
    };

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (!activeSlider) return;

            const slider = document.getElementById("range-slider");
            if (!slider) return;

            const rect = slider.getBoundingClientRect();
            const percentage = (event.clientX - rect.left) / rect.width;
            const newValue = snapToStep(minRange + percentage * (maxRange - minRange));

            if (activeSlider === "min") {
                // Verifica se o valor mínimo não ultrapassa o valor máximo
                setMinValue(Math.min(Math.max(newValue, minRange), maxValue - step));
            } else if (activeSlider === "max") {
                // Verifica se o valor máximo não ultrapassa o valor mínimo
                setMaxValue(Math.max(Math.min(newValue, maxRange), minValue + step));
            }
        },
        [activeSlider, minValue, maxValue]
    );

    const handleMouseUp = useCallback(() => {
        setActiveSlider(null);
    }, []);

    useEffect(() => {
        if (activeSlider) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [activeSlider, handleMouseMove, handleMouseUp]);

    return (
        <div className={` flex items-center justify-center absolute duration-300 z-[10]`}>
            <div className={`${montserrat.className} bg-[#702632] p-6 rounded-3xl w-[320px]`}>
                <div className="bg-[#702632] w-[650px] xl:w-[800px] pt-6 pr-16 pb-6 rounded-3xl text-white">
                    <div>
                        <div className="py-4">
                            <p className="font-medium lg:text-lg">Faixa de Preço:</p>
                            <div id="range-slider" className="relative w-full mt-2">
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-[#DFDAD0] rounded-full"></div>

                                <div
                                    className="absolute top-1/2 w-6 h-6 bg-[#DFDAD0] border-2 border-[#702632] rounded-full z-30 cursor-grab active:cursor-grabbing"
                                    style={{
                                        left: `${((minValue - minRange) / (maxRange - minRange)) * 100}%`,
                                        transform: "translate(-50%, -50%)",
                                    }}
                                    onMouseDown={() => setActiveSlider("min")}
                                ></div>

                                <div
                                    className="absolute top-1/2 w-6 h-6 bg-[#DFDAD0] border-2 border-[#702632] rounded-full z-30 cursor-grab active:cursor-grabbing"
                                    style={{
                                        left: `${((maxValue - minRange) / (maxRange - minRange)) * 100}%`,
                                        transform: "translate(-50%, -50%)",
                                    }}
                                    onMouseDown={() => setActiveSlider("max")}
                                ></div>
                            </div>

                            <div className="flex justify-between mt-3">
                                <span>R$ {minValue.toLocaleString()}</span>
                                <span>R$ {maxValue.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="py-4 flex flex-col lg:flex-row 2xl:flex-row justify-between gap-4">
                            <PlaceFilter tipo="TipoLocal" texto="Tipo Local:" />
                            <PlaceFilter tipo="NumLocal" texto="Quant. de Quartos:" />
                        </div>
                        <div className="py-4 flex flex-col lg:flex-row 2xl:flex-row justify-between gap-4">
                            <PlaceFilter tipo="NumLocal" texto="Quant. de Garagem:" />
                            <PlaceFilter tipo="NumLocal" texto="Quant. de Banheiros:" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
