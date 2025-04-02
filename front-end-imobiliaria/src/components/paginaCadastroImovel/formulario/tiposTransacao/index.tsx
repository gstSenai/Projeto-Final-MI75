"use client"
import { UseFormRegister } from "react-hook-form"
import { FormularioInput } from "../formularioInput"

interface TipoImovelTransacaoProps {
    register: UseFormRegister<any>
    errors: any
}

export function TipoImovelTransacao({ register, errors }: TipoImovelTransacaoProps) {
    return (
        <div className="flex flex-col">           

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
                        placeholder="Preço Promocional (R$):"
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

        </div>
    )
}

