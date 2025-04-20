"use client"

import Image from "next/image"
import type React from "react"
import type { UseFormRegister, FieldError, FieldValues, Path } from "react-hook-form"

interface FormularioInputProps<T extends FieldValues = FieldValues> {
  placeholder?: string
  interName?: string
  name: string | Path<T>
  value?: string
  showOptions?: boolean
  onChange?: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  customizacaoClass: string
  options?: string[]
  register: UseFormRegister<T>
  errors?: FieldError | undefined
  required?: boolean
  disabled?: boolean
}



export function FormularioInput<T extends FieldValues = FieldValues>({
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
  onChange,
}: FormularioInputProps<T>) {
  return (
    <div className="w-full">
      {placeholder && <label className="block text-lg">{placeholder}</label>}
      <div
        className={`relative ${customizacaoClass} p-2 flex items-center w-full rounded-lg border ${
          errors ? "border-red-500" : "border-gray-500"
        }`}
      >
        {options ? (
          <select
            {...register(name as Path<T>, { required })}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full bg-transparent outline-none disabled:opacity-50"
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
            {...register(name as Path<T>, { required })}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full outline-none text-gray-900 disabled:opacity-50"
          />
        )}

        {showOptions && <Image src="/iconsForms/botaoOpcoes.png" alt="Botão Opções" width={24} height={24} className="ml-auto mr-4 lg:h-6" />}
      </div>

      {errors && <span className="text-red-500 text-sm">{errors.message}</span>}
    </div>
  )
}

