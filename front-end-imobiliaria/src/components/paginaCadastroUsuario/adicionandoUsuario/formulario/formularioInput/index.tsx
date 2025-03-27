"use client"

import type React from "react"
import type { UseFormRegister, FieldError } from "react-hook-form"

interface FormularioInputProps {
  placeholder?: string
  interName?: string
  name: string
  value?: string
  showOptions?: boolean
  onChange?: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  customizacaoClass: string
  options?: string[]
  register: UseFormRegister<any>
  errors?: FieldError | undefined
  required?: boolean
  disabled?: boolean
  icon?: {
    type: "areaCT" | "sala" | "banheiro" | "dormitorio" | "suite" | "garagem" | "praia"
  }
  iconCaneta?: boolean
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
        className={`relative ${customizacaoClass} p-2 flex items-center w-full rounded-lg bg-white border ${
          errors ? "border-red-500" : "border-gray-500"
        }`}
      >
        {iconCaneta && <img src="/iconsForms/canetaEditar.png" alt="Editar" className="h-6 ml-4" />}
        {iconPath && <img src={iconPath} alt={`Ícone ${icon?.type}`} className="h-6 lg:h-9" />}

        {options ? (
          <select
            {...register(name, { required })}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full bg-transparent outline-none text-gray-900 disabled:opacity-50"
          >
            <option value="" disabled>
              {interName} {required ? "*" : ""}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option} className="text-black">
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            placeholder={`${interName} ${required ? "*" : ""}`}
            {...register(name, { required })}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full outline-none text-gray-900 disabled:opacity-50"
          />
        )}

        {showOptions && <img src="/iconsForms/botaoOpcoes.png" alt="Botão Opções" className="ml-auto mr-4 lg:h-6" />}
      </div>

      {errors && <span className="text-red-500 text-sm">{errors.message}</span>}
    </div>
  )
}
