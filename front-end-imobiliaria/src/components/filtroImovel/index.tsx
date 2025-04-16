import { useEffect, useState, useCallback } from 'react';

interface FiltroImovelProps {
    onChange: (min: number, max: number) => void;
    className?: string;
}

export function FiltroImovel({ onChange, className = "" }: FiltroImovelProps) {
    const [minValue, setMinValue] = useState<number | null>(0);
    const [maxValue, setMaxValue] = useState<number | null>(2000000);
    const [activeSlider, setActiveSlider] = useState<"min" | "max" | null>(null);

    const minRange = 0;
    const maxRange = 2000000;
    const step = 10000;

    const snapToStep = (value: number) => Math.round(value / step) * step;

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!activeSlider) return;

        const slider = document.getElementById('range-slider');
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const value = snapToStep(minRange + percentage * (maxRange - minRange));

        if (activeSlider === "min" && value < (maxValue || maxRange)) {
            setMinValue(value);
            onChange(value, maxValue || maxRange);
        } else if (activeSlider === "max" && value > (minValue || minRange)) {
            setMaxValue(value);
            onChange(minValue || minRange, value);
        }
    }, [activeSlider, maxValue, minValue, onChange]);

    const handleMouseUp = useCallback(() => {
        setActiveSlider(null);
    }, []);

    useEffect(() => {
        if (activeSlider) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [activeSlider, handleMouseMove, handleMouseUp]);

    return (
        <div className={`w-full rounded-lg ${className}`}>
            <div className="mb-6">
                <div className="flex justify-between gap-4 mb-6">
                    <div className="flex-1">
                        <span className="text-sm text-gray-600">Valor Mínimo</span>
                        <input
                            type="number"
                            value={minValue === null ? '' : minValue}
                            onChange={(e) => {
                                const value = e.target.value === '' ? null : Number(e.target.value);
                                setMinValue(value);
                                onChange(value || 0, maxValue || maxRange);
                            }}
                            className="w-full px-3 py-2 bg-gray-100 rounded-lg"
                        />
                    </div>
                    <div className="flex-1">
                        <span className="text-sm text-gray-600">Valor Máximo</span>
                        <input
                            type="number"
                            value={maxValue === null ? '' : maxValue}
                            onChange={(e) => {
                                const value = e.target.value === '' ? null : Number(e.target.value);
                                setMaxValue(value);
                                onChange(minValue || minRange, value || maxRange);
                            }}
                            className="w-full px-3 py-2 bg-gray-100 rounded-lg"
                        />
                    </div>
                </div>

                <div className="relative px-3">
                    <div id="range-slider" className="relative w-full h-1 bg-gray-200 rounded-full">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full"></div>

                        {minValue !== null && (
                            <div
                                className="absolute left-6 top-1/2 w-6 h-6 bg-vermelho rounded-full z-30 cursor-grab active:cursor-grabbing"
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
            </div>
        </div>
    );
} 