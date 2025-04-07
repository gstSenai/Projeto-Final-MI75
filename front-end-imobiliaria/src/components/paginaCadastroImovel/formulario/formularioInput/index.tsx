"use client"

import Image from "next/image"
import type React from "react"
import type { UseFormRegister, FieldError } from "react-hook-form"
import { FormData } from "../index"

interface FormularioInputProps {
  placeholder?: string
  interName?: string
  name: string
  value?: string
  showOptions?: boolean
  onChange?: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  customizacaoClass: string
  options?: string[]
  register: UseFormRegister<FormData>
  errors?: FieldError | undefined | string
  required?: boolean
  disabled?: boolean
  icon?: {
    type: "areaCT" | "sala" | "banheiro" | "dormitorio" | "suite" | "garagem" | "praia"
  }
  iconCaneta?: boolean
  maxLength?: number
}

export function FormularioInput({
  placeholder,
  interName,
  name,
  value,
  showOptions = false,
  customizacaoClass,
  options,
  register,
  errors,
  required = false,
  disabled = false,
  icon,
  onChange,
  iconCaneta,
  maxLength,
}: FormularioInputProps) {
  const getIconPath = () => {
    switch (icon?.type) {
      case "areaCT":
        return "/iconsImoveis/iconAreaCT.png"
      case "sala":
        return "/iconsImoveis/iconSala.png"
      case "banheiro":
        return "/imagensImovel/imagemBanheiro.png"
      case "dormitorio":
        return "/imagensImovel/imagemDormitorio.png"
      case "suite":
        return "/imagensImovel/imagemSuite.png"
      case "garagem":
        return "/iconsImoveis/iconGaragem.png"
      case "praia":
        return "/iconsImoveis/iconPraia.png"
      default:
        return null
    }
  }

  const iconPath = getIconPath()

  return (
    <div className="w-full">
      {placeholder && <label className="block text-lg">{placeholder}</label>}
      <div
        className={`relative ${customizacaoClass} p-2 gap-2 flex items-center w-full rounded-lg bg-white border ${errors ? "border-red-500" : "border-gray-500"
          }`}
      >
        {iconCaneta && <Image src="/iconsForms/canetaEditar.png" alt="Editar" className="h-6 ml-4" width={20} height={20} />}
        {iconPath && <Image src={iconPath} alt={`Ícone ${icon?.type}`} className="h-6 lg:h-6" width={20} height={20} />}

        {options ? (
          <select
            {...register(name as keyof FormData, { required })}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full bg-transparent outline-none text-gray-900 disabled:opacity-50"
          >
            <option value="" disabled>
              {interName} {required ? "*" : ""}
            </option>
            {options.map((option: string, index: number) => (
              <option key={index} value={option} className="text-black">
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            placeholder={`${interName} ${required ? "*" : ""}`} 
            {...register(name as keyof FormData , { required })}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full outline-none text-gray-900 disabled:opacity-50"
            maxLength={maxLength}
          />
        )}

        {showOptions && <Image src="/iconsForms/botaoOpcoes.png" alt="Botão Opções" className="ml-auto mr-4 lg:h-6" width={20} height={20} />}
      </div>
      {errors && <span className="text-red-500 text-sm">{typeof errors === 'string' ? errors : errors.message}</span>}
    </div>
  )
}
