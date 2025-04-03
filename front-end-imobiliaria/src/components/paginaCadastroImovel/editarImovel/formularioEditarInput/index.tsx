"use client"

import { useState } from "react"
import type React from "react"
import type { UseFormRegister } from "react-hook-form"
import type { FieldError } from "react-hook-form"

interface FormularioEditarInputProps {
  placeholder: string
  name: string
  label?: string
  showOptions?: boolean
  onChange?: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  custumizacaoClass: string
  register: UseFormRegister<any>
  options?: string[]
  errors?: FieldError | undefined
  required?: boolean
  value?: string | number
  icon?: {
    type: "areaCT" | "sala" | "banheiro" | "dormitorio" | "suite" | "garagem" | "praia"
  }
}

export function FormularioEditarInput({
  placeholder,
  name,
  label,
  showOptions = false,
  custumizacaoClass,
  register,
  options,
  errors,
  required = false,
  value = "",
  icon,
  onChange,
}: FormularioEditarInputProps) {
  const [inputValue, setInputValue] = useState<string | number>(value)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setInputValue(event.target.value)
    if (onChange) {
      onChange(event)
    }
  }

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
    <>
      {label && <label className="block text-lg mb-2">{label}</label>}
      <div className={`relative ${custumizacaoClass}`}>
        <div className="flex items-center w-full rounded-lg">
          {iconPath && (
            <img 
              src={iconPath} 
              alt={`Ícone ${icon?.type}`} 
              className="h-5 mr-2" 
            />
          )}

          {options ? (
            <select
              {...register(name, { 
                required: required ? `${placeholder} é obrigatório` : false 
              })}
              onChange={handleChange}
              value={inputValue}
              className="w-full bg-transparent outline-none text-gray-900"
            >
              <option value="" disabled className="text-gray-400">
                {placeholder} {required ? "*" : ""}
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
              placeholder={`${placeholder} ${required ? "*" : ""}`}
              {...register(name, { 
                required: required ? `${placeholder} é obrigatório` : false 
              })}
              value={inputValue}
              onChange={handleChange}
              className="w-full outline-none text-gray-900"
            />
          )}

          {showOptions && (
            <img 
              src="/iconsForms/botaoOpcoes.png" 
              alt="Botão Opções" 
              className="h-5 ml-auto" 
            />
          )}
        </div>
      </div>
      {errors && (
        <span className="text-red-500 text-sm mt-1 block">
          {errors.message}
        </span>
      )}
    </>
  )
}