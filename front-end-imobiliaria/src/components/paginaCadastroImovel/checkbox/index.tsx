"use client"
import React from 'react';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: () => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
    return (
        <div className="flex items-center">
            <label className="flex items-center mx-3 cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="hidden"
                />
                <div className={`w-8 h-8 border-2 bg-white rounded-[5px] flex items-center justify-center`}>
                    {checked && <div className="w-5 h-5 bg-black"></div>}
                </div>
            </label>
            <p className="text-xl xl:text-2xl font-semibold my-10 max-lg:hidden">{label}</p>
        </div>
    );
}
