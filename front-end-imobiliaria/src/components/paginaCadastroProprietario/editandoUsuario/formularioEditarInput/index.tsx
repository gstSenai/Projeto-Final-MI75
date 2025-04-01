"use client"

import { useState, useEffect } from "react"
import type React from "react"
import type { UseFormRegister, FieldError } from "react-hook-form"
import type { FormData } from "../index"

const formatarCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
};

const formatarTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').slice(0, 15);
};

const formatarData = (value: string | Date) => {
    if (value instanceof Date) {
        const dia = String(value.getDate()).padStart(2, '0');
        const mes = String(value.getMonth() + 1).padStart(2, '0');
        const ano = value.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
    
    const numbers = value.replace(/\D/g, '');
    let formattedDate = numbers;
    if (numbers.length > 2) formattedDate = numbers.replace(/^(\d{2})/, '$1/');
    if (numbers.length > 4) formattedDate = numbers.replace(/^(\d{2})(\d{2})/, '$1/$2/');
    if (numbers.length > 8) formattedDate = numbers.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3');
    return formattedDate.slice(0, 10);
};

type FormDataKeys = `proprietario.${keyof FormData['proprietario']}`

interface FormularioEditarInputProps {
  placeholder: string
  name: FormDataKeys
  showOptions?: boolean
  onChange?: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  custumizacaoClass: string
  register: UseFormRegister<FormData>
  options?: string[]
  errors?: FieldError | undefined
  required?: boolean
  value?: string | number | Date
  mask?: string
  icon?: {
    type: "areaCT" | "sala" | "banheiro" | "dormitorio" | "suite" | "garagem" | "praia"
  }
}

export function FormularioEditarInput({
  placeholder,
  name,
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
  const [inputValue, setInputValue] = useState<string>(value ? value.toString() : '')

  useEffect(() => {
    if (value) {
      let formattedValue = value.toString();
      
      if (name.includes('cpf')) {
        formattedValue = formatarCPF(formattedValue);
      } else if (name.includes('telefone') || name.includes('celular')) {
        formattedValue = formatarTelefone(formattedValue);
      } else if (name.includes('data_nascimento')) {
        formattedValue = formatarData(value);
      }
      
      setInputValue(formattedValue);
    }
  }, [value, name]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    let newValue = event.target.value;
    if (name.includes('cpf')) {
      newValue = formatarCPF(newValue);
    } else if (name.includes('telefone') || name.includes('celular')) {
      newValue = formatarTelefone(newValue);
    } else if (name.includes('data_nascimento')) {
      newValue = formatarData(newValue);
    }

    setInputValue(newValue);
    if (onChange) {
      onChange(event);
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
      <div className={`relative  ${custumizacaoClass}`}>
        <div className="flex items-center w-full rounded-lg">
          {iconPath && <img src={iconPath || "/placeholder.svg"} alt={`Ícone ${icon?.type}`} className="h-5 mr-2" />}

          {options ? (
            <select
              {...register(name, { required: required ? `${placeholder} é obrigatório` : false })}
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
              {...register(name, { required: required ? `${placeholder} é obrigatório` : false })}
              value={inputValue}
              onChange={handleChange}
              className="w-full outline-none text-gray-900"
              maxLength={
                name.includes('cpf') ? 14 :
                name.includes('telefone') || name.includes('celular') ? 15 :
                name.includes('data_nascimento') ? 10 : undefined
              }
            />
          )}

          {showOptions && <img src="/iconsForms/botaoOpcoes.png" alt="Botão Opções" className="h-5 ml-auto" />}
        </div>
      </div>
      {errors && <span className="text-red-500 text-sm">{errors.message}</span>}
    </>
  )
}