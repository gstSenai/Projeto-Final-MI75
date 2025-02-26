"use client";

const { useState } = require("react");

export function CheckBoxComponent() {
    const [checked, setChecked] = useState(false)

    return (
        <label className="flex items-center mx-5 cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="hidden"
            />
            <div
                className={`w-6 h-6 border-2 rounded-md flex items-center justify-center ${checked ? "bg-black" : "border-gray-400"
                    }`}
            >
                {checked && (
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24">
                        <path
                        />
                    </svg>
                )}
            </div>
        </label>
    );
}