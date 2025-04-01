"use client"
import { UseFormRegister } from "react-hook-form"
import { FormularioInput } from "../formularioInput"
import { Descricao } from "../descricao"
import { FormularioImagem } from "../formularioImagem"

interface DadosImovelSectionProps {
    register: UseFormRegister<any>
    errors: any
    onImagesChange?: (files: File[]) => void;
}

export function DadosImovelSection({ register, errors, onImagesChange }: DadosImovelSectionProps) {
    return (
        <div className="flex flex-col">
           
            
            <div className="mt-1">
                <div className="font-inter flex flex-col justify-between max-lg:justify-center">
                    <div className="flex flex-row items-center max-lg:justify-center">
                        <p className="text-2xl xl:text-4xl font-semibold mt-10 mb-8 max-lg:hidden">Dados Imóvel</p>
                    </div>

                    <hr className="mb-5  w-full h-2 rounded-2xl bg-vermelho max-lg:h-3"></hr>

                </div>

                <div className="flex max-lg:flex-col  max-lg:gap-4 gap-10 mt-4 whitespace-nowrap">
                    <div className="flex flex-col gap-4">
                        <FormularioInput
                            placeholder="Área Construída (m²):"
                            name="imovel.area_construida"
                            interName="Ex: 12"
                            register={register}
                            icon={{ type: "areaCT" }}
                            customizacaoClass="lg:w-full"
                            required
                            errors={errors?.imovel?.area_construida}
                        />

                        <FormularioInput
                            placeholder="Número de Quartos:"
                            name="imovelCaracteristicas.numero_quartos"
                            interName="Ex: 4"
                            register={register}
                            icon={{ type: "dormitorio" }}
                            customizacaoClass="lg:w-full"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_quartos}
                        />
                        <FormularioInput
                            placeholder="Número de Suítes:"
                            name="imovelCaracteristicas.numero_suites"
                            interName="Ex: 2"
                            register={register}
                            icon={{ type: "suite" }}
                            customizacaoClass="lg:w-full"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_suites}
                        />
                        <FormularioInput
                            placeholder="Contém Piscina:"
                            name="imovelCaracteristicas.test_piscina"
                            register={register}
                            icon={{ type: "praia" }}
                            customizacaoClass="lg:w-full"
                            options={["Sim", "Não"]}
                            required
                            errors={errors?.imovelCaracteristicas?.test_piscina}
                        />
                    </div>

                    <div className="flex flex-col max-lg:flex-col gap-4">
                        <FormularioInput
                            placeholder="Área do Terreno (m²):"
                            name="imovel.area_terreno"
                            interName="Ex: 12"
                            register={register}
                            icon={{ type: "areaCT" }}
                            customizacaoClass="lg:w-full"
                            required
                            errors={errors?.imovel?.area_terreno}
                        />
                        <FormularioInput
                            placeholder="Número de Banheiros:"
                            name="imovelCaracteristicas.numero_banheiros"
                            interName="Ex: 1"
                            register={register}
                            icon={{ type: "banheiro" }}
                            customizacaoClass="lg:w-full"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_banheiros}
                        />
                        <FormularioInput
                            placeholder="Vagas de Garagem:"
                            name="imovelCaracteristicas.numero_vagas"
                            interName="Ex: 2"
                            register={register}
                            icon={{ type: "garagem" }}
                            customizacaoClass="lg:w-full"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_vagas}
                        />
                        <FormularioInput
                            placeholder="Número de Salas:"
                            name="imovelCaracteristicas.numero_salas"
                            interName="Ex: 3"
                            register={register}
                            icon={{ type: "sala" }}
                            customizacaoClass="lg:w-[full]"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_salas}
                        />
                    </div>

                    <div className="flex flex-col justify-end gap-4 w-full 2xl:w-full">
                        <FormularioImagem onImagesChange={onImagesChange || (() => {})} />
                    </div>
                </div>
            </div>

            <div className="flex items-center max-sm:gap-2 gap-10 w-full mt-10">
                <Descricao
                    placeholder="Descrição"
                    name="imovel.descricao"
                    register={register}
                    className="w-full h-40" />
            </div>
        </div>
    )
}

