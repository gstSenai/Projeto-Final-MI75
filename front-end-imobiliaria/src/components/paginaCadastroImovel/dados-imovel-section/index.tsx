"use client"
import type { UseFormRegister } from "react-hook-form"
import { FormularioInput } from "../formularioInput"
import { ImageUpload } from "../image-upload"
import { Descricao } from "../descricao"
import { Botao } from "@/components/botao"
import request from "@/routes/request"

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
                        name="nome_propriedade"
                        register={register}
                        custumizacaoClass="lg:w-1/3"
                    />
                    <FormularioInput
                        placeholder="Tipo do imóvel:"
                        name="tipo_imovel"
                        showOptions
                        register={register}
                        custumizacaoClass="lg:w-1/3"
                        options={["Casa", "Apartamento", "Terreno"]}
                    />
                    <FormularioInput
                        placeholder="Estado do imóvel:"
                        name="Estado do imóvel"
                        showOptions
                        register={register}
                        custumizacaoClass="lg:w-1/3"
                        options={["Novo", "Usado", "Em construção", "Reformado"]}
                    />
                </div>
                <div className="flex lg:gap-10">
                    <FormularioInput
                        placeholder="Valor do Preço Promocional (R$):"
                        name="valor_promocional"
                        register={register}
                        custumizacaoClass="lg:w-[40%]"
                    />
                    <FormularioInput
                        placeholder="Permitir destaque:"
                        name="destaque"
                        showOptions
                        register={register}
                        custumizacaoClass="lg:w-[35%]"
                        options={["Sim", "Não"]}
                    />
                    <FormularioInput
                        placeholder="Visibilidade:"
                        name="visibilidade"
                        showOptions
                        register={register}
                        custumizacaoClass="lg:w-[25%]"
                        options={["Público", "Privado", "Administrador"]}
                    />
                </div>
                <div className="flex lg:gap-10">
                    <FormularioInput
                        placeholder="Valor do IPTU (R$):"
                        name="valor_iptu"
                        register={register}
                        custumizacaoClass="lg:w-[63%]"
                    />
                    <FormularioInput
                        placeholder="Taxa de Condomínio Caso tenha (R$):"
                        name="condominio"
                        register={register}
                        custumizacaoClass="lg:w-full"
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
                            name="Área Construída (m²):"
                            register={register}
                            icon={{ type: "areaCT" }}
                            custumizacaoClass="lg:w-full"
                        />
                        <FormularioInput
                            placeholder="Número de Quartos:"
                            name="Número de Quartos"
                            register={register}
                            showOptions
                            icon={{ type: "dormitorio" }}
                            custumizacaoClass="lg:w-full"
                            options={["Nenhum Quarto", "1 Quarto", "2 Quartos", "3 Quartos", "4+ Quartos"]}
                        />
                        <FormularioInput
                            placeholder="Número de Suítes:"
                            name="Número de Suítes"
                            register={register}
                            showOptions
                            icon={{ type: "suite" }}
                            custumizacaoClass="lg:w-full"
                            options={["Nenhuma Suíte", "1 Suíte", "2 Suítes", "3 Suítes", "4+ Suítes"]}
                        />
                        <FormularioInput
                            placeholder="Número de piscina:"
                            name="Número de piscina"
                            register={register}
                            showOptions
                            icon={{ type: "praia" }}
                            custumizacaoClass="lg:w-full"
                            options={["Nenhuma Piscina", "1 Piscina", "2 Piscinas", "3 Piscinas", "4+ Piscinas"]}
                        />
                    </div>

                    <div className="flex flex-col lg:gap-10">
                        <FormularioInput
                            placeholder="Área do Terreno (m²):"
                            name="Área do Terreno (m²):"
                            register={register}
                            icon={{ type: "areaCT" }}
                            custumizacaoClass="lg:w-full"
                        />
                        <FormularioInput
                            placeholder="Número de Banheiros:"
                            name="Número de Banheiros"
                            register={register}
                            showOptions
                            icon={{ type: "banheiro" }}
                            custumizacaoClass="lg:w-full"
                            options={["Nenhum Banheiro", "1 Banheiro", "2 Banheiros", "3 Banheiros", "4+ Banheiros"]}
                        />
                        <FormularioInput
                            placeholder="Vagas de Garagem:"
                            name="Vagas de Garagem"
                            register={register}
                            showOptions
                            icon={{ type: "garagem" }}
                            custumizacaoClass="lg:w-full"
                            options={["Nenhuma Garagem", "1 Garagem", "2 Garagens", "3 Garagens", "4+ Garagens"]}
                        />
                        <FormularioInput
                            placeholder="Número de Salas:"
                            name="Número de salas"
                            register={register}
                            showOptions
                            icon={{ type: "sala" }}
                            custumizacaoClass="lg:w-[full]"
                            options={["Nenhuma Sala", "1 Sala", "2 Salas", "3 Salas", "4+ Salas"]}
                        />
                    </div>

                    <div className="flex flex-col justify-end lg:gap-10 lg:w-[40%] 2xl:w-full">
                        <ImageUpload title="Fotos do Imóvel" className="h-full" />
                    </div>
                </div>
            </div>

            <div className="flex items-center lg:gap-10 w-full mt-10">
                <Descricao className="w-full h-80" />
                <ImageUpload title="Fotos do Imóvel" className="w-[55%] h-80" />
            </div>
        </div>
    )
}

