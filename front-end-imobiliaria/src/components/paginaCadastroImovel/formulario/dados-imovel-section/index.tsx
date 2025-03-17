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
                        custumizacaoClass="w-full"
                    />
                    <FormularioInput
                        placeholder="Tipo do imóvel:"
                        name="imovel.tipo_imovel"
                        interName='Casa'
                        register={register}
                        required
                        custumizacaoClass="w-full"
                        options={["Casa", "Apartamento", "Terreno"]}
                    />
                    <FormularioInput
                        placeholder="Tipo de transação:"
                        name="imovel.tipo_transacao"
                        interName=''
                        register={register}
                        required
                        custumizacaoClass="w-full"
                        options={["Venda", "Locação", "Venda e Locação"]}
                    />
                </div>
                <div className="flex max-lg:flex-col max-lg:gap-4 max-lg:pt-4 gap-10">
                    <FormularioInput
                        placeholder="Valor de Venda (R$):"
                        name="imovel.valor_venda"
                        interName="Ex: R$100000,00"
                        required
                        register={register}
                        custumizacaoClass="w-full"
                    />
                    <FormularioInput
                        placeholder="Valor do Preço Promocional (R$):"
                        name="imovel.valor_promocional"
                        interName="Ex: R$100000,00"
                        register={register}
                        required
                        custumizacaoClass="w-full"
                    />
                    <FormularioInput
                        placeholder="Permitir destaque:"
                        name="imovel.test_destaque"
                        register={register}
                        required
                        custumizacaoClass="w-full"
                        options={["Sim", "Não"]}
                    />
                </div>

                <div className="flex max-lg:flex-col max-lg:gap-4 max-lg:pt-4 gap-10">
                    <FormularioInput
                        placeholder="Valor do IPTU (R$):"
                        name="imovel.valor_iptu"
                        interName="Ex: R$100000,00"
                        register={register}
                        required
                        custumizacaoClass="w-full"
                    />
                    <FormularioInput
                        placeholder="Taxa de Condomínio (R$):"
                        name="imovel.condominio"
                        interName="Ex: R$100000,00"
                        register={register}
                        required
                        custumizacaoClass="lg:w-full"
                    />
                    <FormularioInput
                        placeholder="Status do imóvel:"
                        name="imovel.status_imovel"
                        register={register}
                        required
                        custumizacaoClass="w-full"
                        options={["Vendido", "Disponivel"]}
                    />
                </div>

                <div className="flex max-lg:flex-col max-lg:gap-4 max-lg:pt-4 gap-10">
                    <FormularioInput
                        placeholder="Visibilidade:"
                        name="imovel.test_visibilidade"
                        register={register}
                        required
                        custumizacaoClass="w-full"
                        options={["Público", "Privado"]}
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

                <div className="flex max-lg:flex-col max-lg:gap-4 gap-10 mt-4 whitespace-nowrap">
                    <div className="flex flex-col gap-4">
                        <FormularioInput
                            placeholder="Área Construída (m²):"
                            name="imovel.area_construida"
                            interName="Ex: 12"
                            register={register}
                            icon={{ type: "areaCT" }}
                            custumizacaoClass="lg:w-full"
                        />

                        <FormularioInput
                            placeholder="Número de Quartos:"
                            name="imovelCaracteristicas.numero_quartos"
                            interName="Ex: 4"
                            register={register}
                            icon={{ type: "dormitorio" }}
                            custumizacaoClass="lg:w-full"
                        />
                        <FormularioInput
                            placeholder="Número de Suítes:"
                            name="imovelCaracteristicas.numero_suites"
                            interName="Ex: 2"
                            register={register}
                            icon={{ type: "suite" }}
                            custumizacaoClass="lg:w-full"
                        />
                        <FormularioInput
                            placeholder="Contém Piscina:"
                            name="imovelCaracteristicas.test_piscina"
                            register={register}
                            icon={{ type: "praia" }}
                            custumizacaoClass="lg:w-full"
                            options={["Sim", "Não"]}
                        />
                    </div>

                    <div className="flex flex-col max-lg:flex-col gap-4">
                        <FormularioInput
                            placeholder="Área do Terreno (m²):"
                            name="imovel.area_terreno"
                            interName="Ex: 12"
                            register={register}
                            icon={{ type: "areaCT" }}
                            custumizacaoClass="lg:w-full"
                        />
                        <FormularioInput
                            placeholder="Número de Banheiros:"
                            name="imovelCaracteristicas.numero_banheiros"
                            interName="Ex: 1"
                            register={register}
                            icon={{ type: "banheiro" }}
                            custumizacaoClass="lg:w-full"
                        />
                        <FormularioInput
                            placeholder="Vagas de Garagem:"
                            name="imovelCaracteristicas.numero_vagas"
                            interName="Ex: 2"
                            register={register}
                            icon={{ type: "garagem" }}
                            custumizacaoClass="lg:w-full"
                        />
                        <FormularioInput
                            placeholder="Número de Salas:"
                            name="imovelCaracteristicas.numero_salas"
                            interName="Ex: 3"
                            register={register}
                            icon={{ type: "sala" }}
                            custumizacaoClass="lg:w-[full]"
                        />
                    </div>

                    <div className="flex flex-col justify-end gap-4 w-full 2xl:w-full">
                        <ImageUpload title="Fotos do Imóvel" className="h-full" />
                    </div>
                </div>
            </div>

            <div className="flex items-center max-sm:gap-2 gap-10 w-full mt-10">
                <Descricao
                    placeholder="Descrição"
                    name="imovel.descricao"
                    register={register}
                    className="w-full h-80" />
                <ImageUpload title="Fotos do Imóvel" className="h-80 lg:w-96" />
            </div>
        </div>
    )
}

