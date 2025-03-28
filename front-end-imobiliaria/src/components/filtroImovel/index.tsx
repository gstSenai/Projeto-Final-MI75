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
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const range = useRef<HTMLDivElement>(null);

    const getPercent = (value: number) => {
        const percent = ((value - min) / (max - min)) * 100;
        return Math.max(0, Math.min(100, percent));
    };

    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
            range.current.style.transition = 'all 0.1s ease-in-out';
        }
    }, [minVal, maxVal]);

    return (
        <div className={`relative w-full h-5 ${className}`}>
            <div className="absolute w-full h-1 bg-gray-200 rounded-lg">
                <div
                    ref={range}
                    className="absolute h-full bg-vermelho rounded-lg"
                />
            </div>
            <div className="absolute w-full flex">
                <div className="w-full relative">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        {...register(name)}
                        value={minVal}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            setMinVal(value);
                            onChange(value, maxVal);
                        }}
                        className="absolute h-5 bg-transparent pointer-events-auto appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-vermelho [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:shadow-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-vermelho [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-none"
                    />
                </div>
                <div className="w-full relative">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        {...register(name)}
                        value={maxVal}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            setMaxVal(value);
                            onChange(minVal, value);
                        }}
                        className="absolute h-5 bg-transparent pointer-events-auto appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-vermelho [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:shadow-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-vermelho [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-none"
                    />
                </div>
            </div>
            <div className="absolute w-full flex justify-between mt-4">
                <span className="text-sm text-gray-600">R$ {minVal.toLocaleString('pt-BR')}</span>
                <span className="text-sm text-gray-600">R$ {maxVal.toLocaleString('pt-BR')}</span>
            </div>
        </div>
    );
} 