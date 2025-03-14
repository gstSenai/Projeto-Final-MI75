"use client"

import type React from "react"
import type { UseFormRegister } from "react-hook-form"

interface FormularioInputProps {
  placeholder?: string
  interName?: string
  name: string
  showOptions?: boolean
  onChange?: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  custumizacaoClass: string
  options?: string[]
  register: UseFormRegister<any>
  errorMessage?: string
  required?: boolean
  icon?: {
    type: "areaCT" | "sala" | "banheiro" | "dormitorio" | "suite" | "garagem" | "praia"
  }
  iconCaneta?: boolean
}

export function FormularioInput({
  placeholder,
  interName,
  name,
  showOptions = false,
  custumizacaoClass,
  options,
  register,
  errorMessage,
  required = false,
  icon,
  onChange,
  iconCaneta
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
    <>
      <div className="w-full">
        <label className="block text-lg">
          {placeholder}
        </label>
        <div
          className={`relative ${custumizacaoClass} p-2 flex items-center w-full rounded-lg bg-white border ${errorMessage ? "border-red-500" : "border-gray-500"} max-lg:bg-transparent max-lg:border-transparent max-lg:p-0`}
        >
          {iconCaneta && <img src="/iconsForms/canetaEditar.png" alt="Editar" className="h-6 ml-4" />}
          {iconPath && <img src={iconPath || "/placeholder.svg"} alt={`Ícone ${icon?.type}`} className="h-6 lg:h-9" />}


          {options ? (
            <>
              <select
                {...register(name, { required: required ? `${placeholder} é obrigatório` : false })}
                onChange={onChange}
                defaultValue=""
                className="w-full bg-transparent outline-none text-gray-900"
              >

                <option value="" disabled className=""> {required ? "*" : ""}
                </option>
                {options.map((option, index) => (
                  <option key={index} value={option} className="text-black">
                    {option}
                  </option>

                ))}
              </select>
            </>
          ) : (
            <input
              type="text"
              placeholder={`${interName} ${required ? "*" : ""}`}
              {...register(name, { required: required ? `${placeholder} é obrigatório` : false })}
              onChange={onChange}
              className="w-full outline-none text-gray-900"
            />

          )}


          {showOptions && <img src="/iconsForms/botaoOpcoes.png" alt="Botão Opções" className="ml-auto mr-4 lg:h-6" />}
        </div>
        {errorMessage && <span className="text-red-500 text-sm absolute -bottom-5 left-0">{errorMessage}</span>}
      </div>
    </>
  )
}
