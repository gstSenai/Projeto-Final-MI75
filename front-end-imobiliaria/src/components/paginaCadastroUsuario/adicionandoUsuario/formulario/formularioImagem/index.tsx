"use client"

import { useState } from "react"
import type { UseFormRegister } from "react-hook-form"
import PanZoom from "react-easy-panzoom"

interface FormularioImagemProps {
    register: UseFormRegister<any>
    onImageUpload?: (file: File) => void
}

export function FormularioImagem({ register, onImageUpload }: FormularioImagemProps) {
    const [preview, setPreview] = useState<string | null>(null)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]
            const imageUrl = URL.createObjectURL(file)
            setPreview(imageUrl)
            onImageUpload?.(file)

            if (onImageUpload) {
                onImageUpload(file)
            }
        }
    }

    return (
        <div className="flex items-center justify-center">
            <label className="cursor-pointer bg-slate-500/70 h-[14rem] w-[14rem] rounded-full flex items-center justify-center overflow-hidden">
                {preview ? (
                    <PanZoom>
                        <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                    </PanZoom>
                ) : (
                    <div className="text-gray-300">+</div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    {...register("imagem")}
                    onChange={(event) => {
                        register("imagem").onChange(event)
                        handleImageChange(event)
                    }}
                    className="hidden"
                />
            </label>
        </div>
    )
}