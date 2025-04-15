"use client"

import { useState, useEffect } from "react"
import type React from "react"
import type { UseFormRegister, FieldError } from "react-hook-form"
import type { FormData } from "../index"
import { PatternFormat } from 'react-number-format'
import Image from "next/image"

interface FormularioEditarInputProps {
  placeholder: string
  name: `proprietario.${keyof FormData['proprietario']}`
  showOptions?: boolean
  custumizacaoClass: string
  register: UseFormRegister<FormData>
  options?: string[]
  errors?: FieldError | undefined
  required?: boolean
  value?: string | number | Date
  icon?: {
    type: "areaCT" | "sala" | "banheiro" | "dormitorio" | "suite" | "garagem" | "praia"
  }
  label?: string
}

export function FormularioEditarInput({
  placeholder,
  name,
  showOptions,
  custumizacaoClass,
  register,
  options,
  errors,
  required,
  value,
  icon,
  label,
}: FormularioEditarInputProps) {
  const [inputValue, setInputValue] = useState<string>(formatValue(value))
  const { onChange, ...registerProps } = register(name, { 
    required: required ? `${placeholder} é obrigatório` : false 
  })

  useEffect(() => {
    const formattedValue = formatValue(value)
    setInputValue(formattedValue)
    
    if (formattedValue) {
      const event = {
        target: {
          name,
          value: formattedValue
        }
      } as React.ChangeEvent<HTMLInputElement>
      onChange(event)
    }
  }, [value, name, onChange])

  const handleChange = (newValue: string) => {
    if (newValue) {
      setInputValue(newValue)
      onChange({
        target: {
          name,
          value: newValue
        }
      } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  return (
    <>
      {label && <label className="block text-lg mb-2">{label}</label>}
      <div className={`relative ${custumizacaoClass}`}>
        <div className="flex items-center w-full rounded-lg">
          {getIconPath() && (
            <Image 
              src={getIconPath() || "/placeholder.svg"} 
              alt={`Ícone ${icon?.type}`} 
              className="h-5 mr-2" 
              width={20} 
              height={20} 
            />
          )}

          {renderInput()}

          {showOptions && (
            <Image 
              src="/iconsForms/botaoOpcoes.png" 
              alt="Botão Opções" 
              className="h-5 ml-auto" 
              width={20} 
              height={20} 
            />
          )}
        </div>
      </div>
      {errors && <span className="text-red-500 text-sm">{errors.message}</span>}
    </>
  )

  function formatValue(val: string | number | Date | undefined): string {
    if (!val) return ''
    const strValue = val.toString()
    
    switch (name) {
      case "proprietario.cpf":
        const cpfNumbers = strValue.replace(/\D/g, '')
        if (cpfNumbers.length === 11) {
          return cpfNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        }
        return strValue

      case "proprietario.telefone":
      case "proprietario.celular":
        const phoneNumbers = strValue.replace(/\D/g, '')
        if (phoneNumbers.length === 11) {
          return phoneNumbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
        }
        return strValue

      case "proprietario.data_nascimento":
        const dateMatch = strValue.match(/^(\d{4})-(\d{2})-(\d{2})/)
        if (dateMatch) {
          const [, year, month, day] = dateMatch
          return `${day}/${month}/${year}`
        }
        if (strValue.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
          return strValue
        }
        const date = new Date(strValue)
        if (!isNaN(date.getTime())) {
          const day = String(date.getDate()).padStart(2, '0')
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const year = date.getFullYear()
          return `${day}/${month}/${year}`
        }
        return strValue

      default:
        return strValue
    }
  }

  function getFormatProps() {
    switch (name) {
      case "proprietario.cpf":
        return {
          format: "###.###.###-##",
          mask: "_",
          placeholder: "___.___.___-__"
        }
      case "proprietario.telefone":
      case "proprietario.celular":
        return {
          format: "(##) #####-####",
          mask: "_",
          placeholder: "(__)_____-____"
        }
      case "proprietario.data_nascimento":
        return {
          format: "##/##/####",
          mask: "_",
          placeholder: "__/__/____"
        }
      default:
        return null
    }
  }

  function getIconPath() {
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

  function renderInput() {
    if (options) {
      return (
        <select
          {...registerProps}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
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
      )
    }

    const formatProps = getFormatProps()
    if (formatProps) {
      return (
        <PatternFormat
          {...formatProps}
          value={inputValue}
          onValueChange={(values) => handleChange(values.formattedValue)}
          className="w-full outline-none text-gray-900"
        />
      )
    }

    return (
      <input
        type="text"
        placeholder={`${placeholder} ${required ? "*" : ""}`}
        {...registerProps}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full outline-none text-gray-900"
      />
    )
  }
}