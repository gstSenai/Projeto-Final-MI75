"use client"
import { UseFormRegister } from "react-hook-form"
import { FormularioInput } from "../formularioInput"
import { Descricao } from "../descricao"
import { FormularioImagem } from "../formularioImagem"

interface tipo_transacaoProps {
    register: UseFormRegister<any>
    errors: any
    onImagesChange?: (files: File[]) => void;
}

export function tipo_transacao({ register, errors, onImagesChange }: tipo_transacaoProps) {
    return (
        <div className="flex flex-col">
            <div className="font-inter flex max-lg:justify-center">
                <div className="flex flex-row items-center max-lg:justify-center">
                    <p className="text-2xl xl:text-3xl font-semibold my-10 max-lg:hidden">Tipo de Transação:</p>
                </div>
            </div>

            <hr className="mb-10 w-full h-2 rounded-2xl bg-vermelho"></hr>

            <div className="flex flex-col lg:gap-6">
                <div className="flex max-lg:flex-col max-lg:gap-4 gap-10">
                    <FormularioInput
                        placeholder="Nome da Propriedade:"
                        name="imovel.nome_propriedade"
                        interName='Ex: Casa Alto Padrão'
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.imovel?.nome_propriedade}
                    />
                    <FormularioInput
                        placeholder="Tipo do imóvel:"
                        name="imovel.tipo_imovel"
                        interName=''
                        register={register}
                        required
                        customizacaoClass="w-full"
                        options={["Casa", "Apartamento", "Terreno"]}
                        errors={errors?.imovel?.tipo_imovel}
                    />
                    <FormularioInput
                        placeholder="Tipo de transação:"
                        name="imovel.tipo_transacao"
                        interName=''
                        register={register}
                        required
                        customizacaoClass="w-full"
                        options={["Venda", "Locação", "Venda e Locação"]}
                        errors={errors?.imovel?.tipo_transacao}
                    />
                </div>
                <div className="flex max-lg:flex-col max-lg:gap-4 max-lg:pt-4 gap-10">
                    <FormularioInput
                        placeholder="Valor de Venda (R$):"
                        name="imovel.valor_venda"
                        interName="Ex: R$100000,00"
                        required
                        register={register}
                        customizacaoClass="w-full"
                        errors={errors?.imovel?.valor_venda}
                    />
                    <FormularioInput
                        placeholder="Valor do Preço Promocional (R$):"
                        name="imovel.valor_promocional"
                        interName="Ex: R$100000,00"
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.imovel?.valor_promocional}
                    />
                    <FormularioInput
                        placeholder="Permitir destaque:"
                        name="imovel.test_destaque"
                        register={register}
                        required
                        customizacaoClass="w-full"
                        options={["Sim", "Não"]}
                        errors={errors?.imovel?.test_destaque}
                    />
                </div>

                <div className="flex max-lg:flex-col max-lg:gap-4 max-lg:pt-4 gap-10">
                    <FormularioInput
                        placeholder="Valor do IPTU (R$):"
                        name="imovel.valor_iptu"
                        interName="Ex: R$100000,00"
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.imovel?.valor_iptu}
                    />
                    <FormularioInput
                        placeholder="Taxa de Condomínio (R$):"
                        name="imovel.condominio"
                        interName="Ex: R$100000,00"
                        register={register}
                        required
                        customizacaoClass="lg:w-full"
                        errors={errors?.imovel?.condominio}
                    />
                    <FormularioInput
                        placeholder="Status do imóvel:"
                        name="imovel.status_imovel"
                        register={register}
                        required
                        customizacaoClass="w-full"
                        options={["Vendido", "Disponivel"]}
                        errors={errors?.imovel?.status_imovel}
                    />
                </div>

                <div className="flex max-lg:flex-col max-lg:gap-4 max-lg:pt-4 gap-10">
                    <FormularioInput
                        placeholder="Visibilidade:"
                        name="imovel.test_visibilidade"
                        register={register}
                        required
                        customizacaoClass="w-full"
                        options={["Público", "Privado"]}
                        errors={errors?.imovel?.test_visibilidade}
                    />
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

