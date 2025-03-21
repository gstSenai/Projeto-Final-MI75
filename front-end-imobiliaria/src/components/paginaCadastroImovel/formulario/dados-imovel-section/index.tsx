"use client"
import { useForm, UseFormRegister } from "react-hook-form"
import { FormularioInput } from "../formularioInput"
import { ImageUpload } from "../image-upload"
import { Descricao } from "../descricao"

interface DadosImovelSectionProps {
    register: UseFormRegister<any>
    errors: any
}

export function DadosImovelSection({ register, errors }: DadosImovelSectionProps) {

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
                        errors={errors?.imovel?.nome_propriedade?.message}
                    />
                    <FormularioInput
                        placeholder="Tipo do imóvel:"
                        name="imovel.tipo_imovel"
                        interName=''
                        register={register}
                        required
                        customizacaoClass="w-full"
                        options={["Casa", "Apartamento", "Terreno"]}
                        errors={errors?.imovel?.tipo_imovel?.message}
                    />
                    <FormularioInput
                        placeholder="Tipo de transação:"
                        name="imovel.tipo_transacao"
                        interName=''
                        register={register}
                        required
                        customizacaoClass="w-full"
                        options={["Venda", "Locação", "Venda e Locação"]}
                        errors={errors?.imovel?.tipo_transacao?.message}
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
                        errors={errors?.imovel?.valor_venda?.message}
                    />
                    <FormularioInput
                        placeholder="Valor do Preço Promocional (R$):"
                        name="imovel.valor_promocional"
                        interName="Ex: R$100000,00"
                        register={register}
                        required
                        customizacaoClass="w-full"
                        errors={errors?.imovel?.valor_promocional?.message}
                    />
                    <FormularioInput
                        placeholder="Permitir destaque:"
                        name="imovel.test_destaque"
                        register={register}
                        required
                        customizacaoClass="w-full"
                        options={["Sim", "Não"]}
                        errors={errors?.imovel?.test_destaque?.message}
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
                        errors={errors?.imovel?.valor_iptu?.message}
                    />
                    <FormularioInput
                        placeholder="Taxa de Condomínio (R$):"
                        name="imovel.condominio"
                        interName="Ex: R$100000,00"
                        register={register}
                        required
                        customizacaoClass="lg:w-full"
                        errors={errors?.imovel?.condominio?.message}
                    />
                    <FormularioInput
                        placeholder="Status do imóvel:"
                        name="imovel.status_imovel"
                        register={register}
                        required
                        customizacaoClass="w-full"
                        options={["Vendido", "Disponivel"]}
                        errors={errors?.imovel?.status_imovel?.message}
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
                        errors={errors?.imovel?.test_visibilidade?.message}
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
                            customizacaoClass="lg:w-full"
                            required
                            errors={errors?.imovel?.area_construida?.message}
                        />

                        <FormularioInput
                            placeholder="Número de Quartos:"
                            name="imovelCaracteristicas.numero_quartos"
                            interName="Ex: 4"
                            register={register}
                            icon={{ type: "dormitorio" }}
                            customizacaoClass="lg:w-full"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_quartos?.message}
                        />
                        <FormularioInput
                            placeholder="Número de Suítes:"
                            name="imovelCaracteristicas.numero_suites"
                            interName="Ex: 2"
                            register={register}
                            icon={{ type: "suite" }}
                            customizacaoClass="lg:w-full"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_suites?.message}
                        />
                        <FormularioInput
                            placeholder="Contém Piscina:"
                            name="imovelCaracteristicas.test_piscina"
                            register={register}
                            icon={{ type: "praia" }}
                            customizacaoClass="lg:w-full"
                            options={["Sim", "Não"]}
                            required
                            errors={errors?.imovelCaracteristicas?.test_piscina?.message}
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
                            errors={errors?.imovel?.area_terreno?.message}
                        />
                        <FormularioInput
                            placeholder="Número de Banheiros:"
                            name="imovelCaracteristicas.numero_banheiros"
                            interName="Ex: 1"
                            register={register}
                            icon={{ type: "banheiro" }}
                            customizacaoClass="lg:w-full"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_banheiros?.message}
                        />
                        <FormularioInput
                            placeholder="Vagas de Garagem:"
                            name="imovelCaracteristicas.numero_vagas"
                            interName="Ex: 2"
                            register={register}
                            icon={{ type: "garagem" }}
                            customizacaoClass="lg:w-full"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_vagas?.message}
                        />
                        <FormularioInput
                            placeholder="Número de Salas:"
                            name="imovelCaracteristicas.numero_salas"
                            interName="Ex: 3"
                            register={register}
                            icon={{ type: "sala" }}
                            customizacaoClass="lg:w-[full]"
                            required
                            errors={errors?.imovelCaracteristicas?.numero_salas?.message}
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

