"use client"
import { useForm, UseFormRegister } from "react-hook-form"
import { FormularioInput } from "../formularioInput"
import { ImageUpload } from "../image-upload"
import { Descricao } from "../descricao"

interface DadosImovelSectionProps {
    register: UseFormRegister<any>
}

export function DadosImovelSection({ register }: DadosImovelSectionProps) {

    return (
        <div className="flex flex-col">

            <hr className="mb-10  w-full h-2 rounded-2xl bg-vermelho max-lg:h-3"></hr>

            <div className="flex flex-col lg:gap-10">
                <div className="flex lg:gap-10">
                    <FormularioInput
                        placeholder="Nome da Propriedade:"
                        name="imovel.nome_propriedade"
                        register={register}
                        custumizacaoClass="lg:w-1/3"
                    />
                    <FormularioInput
                        placeholder="Tipo do imóvel:"
                        name="imovel.tipo_imovel"
                        showOptions
                        register={register}
                        custumizacaoClass="lg:w-1/3"
                        options={["Casa", "Apartamento", "Terreno"]}
                    />
                    <FormularioInput
                        placeholder="Tipo de transação:"
                        name="imovel.tipo_transacao"
                        showOptions
                        register={register}
                        custumizacaoClass="lg:w-1/3"
                        options={["Venda", "Locação", "Venda e Locação"]}
                    />
                </div>
                <div className="flex lg:gap-10">
                    <FormularioInput
                        placeholder="Valor de Venda (R$):"
                        name="imovel.valor_venda"
                        register={register}
                        custumizacaoClass="lg:w-[40%]"
                    />
                    <FormularioInput
                        placeholder="Valor do Preço Promocional (R$):"
                        name="imovel.valor_promocional"
                        register={register}
                        custumizacaoClass="lg:w-[40%]"
                    />
                    <FormularioInput
                        placeholder="Permitir destaque:"
                        name="imovel.test_destaque"
                        showOptions
                        register={register}
                        custumizacaoClass="lg:w-[35%]"
                        options={["Sim", "Não"]}
                    />

                    <FormularioInput
                        placeholder="Visibilidade:"
                        name="imovel.test_visibilidade"
                        showOptions
                        register={register}
                        custumizacaoClass="lg:w-[25%]"
                        options={["Público", "Privado"]}
                    />
                </div>
                <div className="flex lg:gap-10">
                    <FormularioInput
                        placeholder="Valor do IPTU (R$):"
                        name="imovel.valor_iptu"
                        register={register}
                        custumizacaoClass="lg:w-[63%]"
                    />
                    <FormularioInput
                        placeholder="Taxa de Condomínio Caso tenha (R$):"
                        name="imovel.condominio"
                        register={register}
                        custumizacaoClass="lg:w-full"
                    />
                    <FormularioInput
                        placeholder="Status do imóvel:"
                        name="imovel.status_imovel"
                        showOptions
                        register={register}
                        custumizacaoClass="lg:w-[25%]"
                        options={["Vendido", "Disponivel"]}
                    />
                </div>
            </div>

            <div className="mt-10">
                <div className="font-inter flex flex-col justify-between max-lg:justify-center">
                    <div className="flex flex-row items-center max-lg:justify-center">
                        <p className="text-2xl xl:text-4xl font-semibold mt-10 mb-8 max-lg:hidden">Dados Imóvel</p>
                    </div>

                    <hr className="mb-5  w-full h-2 rounded-2xl bg-vermelho max-lg:h-3"></hr>

                </div>
                <div className="flex lg:gap-10 mt-4">
                    <div className="flex flex-col lg:gap-10">
                        <FormularioInput
                            placeholder="Área Construída (m²):"
                            name="imovel.area_construida"
                            register={register}
                            icon={{ type: "areaCT" }}
                            custumizacaoClass="lg:w-full"
                        />
                    </div>

                    <div className="flex flex-col lg:gap-10">
                        <FormularioInput
                            placeholder="Área do Terreno (m²):"
                            name="imovel.area_terreno"
                            register={register}
                            icon={{ type: "areaCT" }}
                            custumizacaoClass="lg:w-full"
                        />
                    </div>

                    <div className="flex flex-col justify-end lg:gap-10 lg:w-[40%] 2xl:w-full">
                        <ImageUpload title="Fotos do Imóvel" className="h-full" />
                    </div>
                </div>
            </div>

            <div className="flex items-center lg:gap-10 w-full mt-10">
                <Descricao 
                placeholder="Descrição"
                name="imovel.descricao"
                register={register} 
                className="w-full h-80" />
                <ImageUpload title="Fotos do Imóvel" className="w-[55%] h-80" />
            </div>
        </div>
    )
}

