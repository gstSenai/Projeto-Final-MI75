"use client"
import type { UseFormRegister } from "react-hook-form"

interface FormularioInputProps {
  placeholder: string
  name: string
  showOptions?: boolean
  custumizacaoClass: string
  options?: string[]
  register: UseFormRegister<any>
  errorMessage?: string
  icon?: {
    type: "areaCT" | "sala" | "banheiro" | "dormitorio" | "suite" | "garagem" | "praia"
  }
}

export function FormularioInput({
  placeholder,
  name,
  showOptions = false,
  custumizacaoClass,
  options,
  register,
  errorMessage,
  icon,
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
    <div
      className={`flex items-center lg:h-[50px] max-lg:justify-center gap-6 xl:py-4 2xl:py-6 py-3.5 bg-white border border-black rounded-2xl max-lg:bg-transparent max-lg:border-transparent max-lg:p-0 ${custumizacaoClass}`}
    >
      <img src="/iconsForms/canetaEditar.png" alt="Editar" className="lg:h-6 ml-4" />
      {iconPath && <img src={iconPath || "/placeholder.svg"} alt={`Ícone ${icon?.type}`} className="h-6 lg:h-9 ml-4" />}

      {options ? (
        <select
          defaultValue=""
          {...register(name)}
          className="appearance-none text-black max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full bg-transparent"
        >
          <option value="" disabled className="text-gray-400">
            {placeholder}
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
          placeholder={placeholder}
          {...register(name)}
          className="text-black max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full"
        />
      )}
      {showOptions && <img src="/iconsForms/botaoOpcoes.png" alt="Botão Opções" className="ml-auto mr-4 lg:h-6" />}
      {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
    </div>
  )
}

