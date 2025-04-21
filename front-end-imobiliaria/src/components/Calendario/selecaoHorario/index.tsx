"use client"

import Image from "next/image"
import type React from "react"
import type { 
  UseFormRegister, 
  FieldError, 
  FieldValues, 
  Path, 
  Control,
  UseControllerProps
} from "react-hook-form"
import { Controller } from "react-hook-form"

interface FormularioInputProps<T extends FieldValues = FieldValues> {
  placeholder?: string
  interName?: string
  name: Path<T>
  value?: string | number | object
  showOptions?: boolean
  onChange?: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  customizacaoClass: string
  options?: any[] // Aceita qualquer tipo de array
  register?: UseFormRegister<T>
  control?: Control<T>
  errors?: FieldError | undefined
  required?: boolean
  disabled?: boolean
  optionLabel?: (option: any) => string // Função para extrair o label de opções complexas
  optionValue?: (option: any) => string // Função para extrair o valor de opções complexas
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
  control,
  errors,
  required = false,
  disabled = false,
  onChange,
  optionLabel = (option) => String(option), // Padrão para strings simples
  optionValue = (option) => String(option), // Padrão para strings simples
}: FormularioInputProps<T>) {
  
  // Se for um campo de seleção com opções
  if (options) {
    // Se tiver control (para objetos complexos)
    if (control) {
      return (
        <div className="w-full">
          {placeholder && <label className="block text-lg">{placeholder}</label>}
          <div
            className={`relative ${customizacaoClass} p-2 flex items-center w-full rounded-lg border ${
              errors ? "border-red-500" : "border-gray-500"
            }`}
          >
            <Controller
              name={name}
              control={control}
              rules={{ required }}
              render={({ field }) => (
                <select
                  {...field}
                  disabled={disabled}
                  className="w-full bg-transparent outline-none disabled:opacity-50"
                  onChange={(e) => {
                    const selectedOption = options.find(
                      opt => optionValue(opt) === e.target.value
                    )
                    field.onChange(selectedOption)
                  }}
                  value={field.value ? optionValue(field.value) : ""}
                >
                  <option value="" disabled>
                    {interName} {required ? "*" : ""}
                  </option>
                  {options.map((option, index) => (
                    <option 
                      key={index} 
                      value={optionValue(option)} 
                      className="text-black"
                    >
                      {optionLabel(option)}
                    </option>
                  ))}
                </select>
              )}
            />
            
            {showOptions && <Image src="/iconsForms/botaoOpcoes.png" alt="Botão Opções" width={24} height={24} className="ml-auto mr-4 lg:h-6" />}
          </div>

          {errors && <span className="text-red-500 text-sm">{errors.message}</span>}
        </div>
      )
    }
    
    // Se tiver register (para strings simples)
    if (register) {
      return (
        <div className="w-full">
          {placeholder && <label className="block text-lg">{placeholder}</label>}
          <div
            className={`relative ${customizacaoClass} p-2 flex items-center w-full rounded-lg border ${
              errors ? "border-red-500" : "border-gray-500"
            }`}
          >
            <select
              {...register(name, { required })}
              value={value as string}
              onChange={onChange}
              disabled={disabled}
              className="w-full bg-transparent outline-none disabled:opacity-50"
            >
              <option value="" disabled>
                {interName} {required ? "*" : ""}
              </option>
              {options.map((option, index) => (
                <option key={index} value={optionValue(option)} className="text-black">
                  {optionLabel(option)}
                </option>
              ))}
            </select>
            
            {showOptions && <Image src="/iconsForms/botaoOpcoes.png" alt="Botão Opções" width={24} height={24} className="ml-auto mr-4 lg:h-6" />}
          </div>

          {errors && <span className="text-red-500 text-sm">{errors.message}</span>}
        </div>
      )
    }
  }

  // Campo de input padrão (texto)
  return (
    <div className="w-full">
      {placeholder && <label className="block text-lg">{placeholder}</label>}
      <div
        className={`relative ${customizacaoClass} p-2 flex items-center w-full rounded-lg border ${
          errors ? "border-red-500" : "border-gray-500"
        }`}
      >
        <input
          type="text"
          placeholder={`${interName} ${required ? "*" : ""}`}
          {...(register ? register(name, { required }) : {})}
          value={value as string}
          onChange={onChange}
          disabled={disabled}
          className="w-full outline-none text-gray-900 disabled:opacity-50"
        />

        {showOptions && <Image src="/iconsForms/botaoOpcoes.png" alt="Botão Opções" width={24} height={24} className="ml-auto mr-4 lg:h-6" />}
      </div>

      {errors && <span className="text-red-500 text-sm">{errors.message}</span>}
    </div>
  )
}