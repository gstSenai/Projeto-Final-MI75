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

const formatarNumero = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 2);
};

export function DadosImovelSection({ register, errors, onImagesChange }: DadosImovelSectionProps) {
    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto">
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-4">
                        <FormularioInput
                            placeholder="Número de Quartos:"
                            name="imovelCaracteristicas.numero_quartos"
                            interName="Ex: 4"
                            register={register}
                            icon={{ type: "dormitorio" }}
                            customizacaoClass="w-full"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_quartos}
                            onChange={(e) => {
                                e.target.value = formatarNumero(e.target.value);
                            }}
                        />
                        <FormularioInput
                            placeholder="Número de Suítes:"
                            name="imovelCaracteristicas.numero_suites"
                            interName="Ex: 2"
                            register={register}
                            icon={{ type: "suite" }}
                            customizacaoClass="w-full"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_suites}
                            onChange={(e) => {
                                e.target.value = formatarNumero(e.target.value);
                            }}
                        />
                    </div>

                    <div className="space-y-4">
                        <FormularioInput
                            placeholder="Número de Banheiros:"
                            name="imovelCaracteristicas.numero_banheiros"
                            interName="Ex: 1"
                            register={register}
                            icon={{ type: "banheiro" }}
                            customizacaoClass="w-full"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_banheiros}
                            onChange={(e) => {
                                e.target.value = formatarNumero(e.target.value);
                            }}
                        />
                        <FormularioInput
                            placeholder="Vagas de Garagem:"
                            name="imovelCaracteristicas.numero_vagas"
                            interName="Ex: 2"
                            register={register}
                            icon={{ type: "garagem" }}
                            customizacaoClass="w-full"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_vagas}
                            onChange={(e) => {
                                e.target.value = formatarNumero(e.target.value);
                            }}
                        />
                    </div>

                    <div className="space-y-4">
                        <FormularioInput
                            placeholder="Número de Salas:"
                            name="imovelCaracteristicas.numero_salas"
                            interName="Ex: 3"
                            register={register}
                            icon={{ type: "sala" }}
                            customizacaoClass="w-full"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_salas}
                            onChange={(e) => {
                                e.target.value = formatarNumero(e.target.value);
                            }}
                        />
                        <FormularioInput
                            placeholder="Contém Piscina:"
                            name="imovelCaracteristicas.test_piscina"
                            register={register}
                            icon={{ type: "praia" }}
                            customizacaoClass="w-full"
                            options={["Sim", "Não"]}
                            required
                            errors={errors?.imovelCaracteristicas?.test_piscina}
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <FormularioImagem onImagesChange={onImagesChange || (() => {})} />
                </div>
            </div>

            <div className="mt-8">
                <Descricao
                    placeholder="Descrição"
                    name="imovel.descricao"
                    register={register}
                    className="w-full h-40" />
            </div>
        </div>
    )
}

