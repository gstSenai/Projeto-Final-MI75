import { UseFormRegister } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';

interface FiltroImovelProps {
    min: number;
    max: number;
    onChange: (min: number, max: number) => void;
    className?: string;
    name: string;
    register: UseFormRegister<any>;
}

export function FiltroImovel({ min, max, onChange, className = "", name, register }: FiltroImovelProps) {
    const [minVal, setMinVal] = useState<number | null>(null);
    const [maxVal, setMaxVal] = useState(max);
    const range = useRef<HTMLDivElement>(null);
    const priceGap = 2000;

    // Função para validar os valores de entrada
    const validateValues = (newMin: number | null, newMax: number) => {
        if (newMin === null) return { newMin: null, newMax };
        if (newMin < 0) newMin = 0;
        if (newMax > max) newMax = max;
        if (newMax - newMin < priceGap && newMin !== 0) {
            if (newMin === min) {
                newMax = newMin + priceGap;
            } else {
                newMin = newMax - priceGap;
            }
        }
        return { newMin, newMax };
    };

    useEffect(() => {
        if (range.current) {
            const minPercent = minVal === null ? 0 : ((minVal - min) / (max - min)) * 100;
            const maxPercent = ((maxVal - min) / (max - min)) * 100;
            
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, maxVal, min, max]);

    return (
        <div className={`w-full rounded-lg ${className}`}>
            <div className="mb-6">
                <div className="flex justify-between gap-4 mb-6">
                    <div className="flex-1">
                        <span className="text-sm text-gray-600">Valor Mínimo</span>
                        <input
                            type="number"
                            value={minVal === null ? '' : minVal}
                            onChange={(e) => {
                                const value = e.target.value === '' ? null : Number(e.target.value);
                                const { newMin, newMax } = validateValues(value, maxVal);
                                setMinVal(newMin);
                                onChange(newMin || 0, newMax);
                            }}
                            className="w-full px-3 py-2 bg-gray-100 rounded-lg"
                        />
                    </div>
                    <div className="flex-1">
                        <span className="text-sm text-gray-600">Valor Máximo</span>
                        <input
                            type="number"
                            value={maxVal}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                const { newMin, newMax } = validateValues(minVal, value);
                                setMaxVal(newMax);
                                onChange(newMin || 0, newMax);
                            }}
                            className="w-full px-3 py-2 bg-gray-100 rounded-lg"
                        />
                    </div>
                </div>

                <div className="relative h-1">
                    <div className="absolute w-full h-1 bg-gray-200 rounded-lg">
                        <div
                            ref={range}
                            className="absolute h-full bg-vermelho rounded-lg"
                        />
                    </div>
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={minVal === null ? min : minVal}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            const { newMin, newMax } = validateValues(value, maxVal);
                            setMinVal(newMin);
                            onChange(newMin || 0, newMax);
                        }}
                        className="absolute w-full h-5 bg-transparent appearance-none pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-vermelho [&::-webkit-slider-thumb]:cursor-pointer z-10"
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={maxVal}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            const { newMin, newMax } = validateValues(minVal, value);
                            setMaxVal(newMax);
                            onChange(newMin || 0, newMax);
                        }}
                        className="absolute w-full h-5 bg-transparent appearance-none pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-vermelho [&::-webkit-slider-thumb]:cursor-pointer z-10"
                    />
                </div>
            </div>
        </div>
    );
} 