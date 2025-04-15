"use client"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { FormularioInput } from "../formularioInput"
import { FormData } from "../index"

interface TipoImovelTransacaoProps {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
}

const formatarValor = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  const limitedNumbers = numbers.slice(0, 9);
  const formatted = limitedNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formatted}`;
};

const formatarArea = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  const limitedNumbers = numbers.slice(0, 7);
  const formatted = limitedNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formatted}`;
};

export function TipoImovelTransacao({ register, errors }: TipoImovelTransacaoProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:gap-6">
        <div className="flex max-lg:flex-col max-lg:gap-4 gap-10">
          <FormularioInput
            placeholder="Nome da Propriedade:"
            name={"imovel.nome_propriedade"}
            interName=""
            register={register}
            required
            customizacaoClass="w-full"
            errors={errors?.imovel?.nome_propriedade}
          />
          <FormularioInput
            placeholder="Tipo do imóvel:"
            name={"imovel.tipo_imovel"}
            interName=""
            register={register}
            required
            customizacaoClass="w-full"
            options={["Casa", "Apartamento", "Terreno"]}
            errors={errors?.imovel?.tipo_imovel}
          />
          <FormularioInput
            placeholder="Tipo de transação:"
            name={"imovel.tipo_transacao"}
            interName=""
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
            name={"imovel.valor_venda"}
            interName="R$ "
            required
            register={register}
            customizacaoClass="w-full"
            errors={errors?.imovel?.valor_venda}
            onChange={(e) => {
              e.target.value = formatarValor(e.target.value);
            }}
          />
          <FormularioInput
            placeholder="Preço Promocional (R$):"
            name={"imovel.valor_promocional"}
            interName="R$ "
            register={register}
            required
            customizacaoClass="w-full"
            errors={errors?.imovel?.valor_promocional}
            onChange={(e) => {
              e.target.value = formatarValor(e.target.value);
            }}
          />
          <FormularioInput
            placeholder="Permitir destaque:"
            name={"imovel.test_destaque"}
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
            name={"imovel.valor_iptu"}
            interName="R$ "
            register={register}
            required
            customizacaoClass="w-full"
            errors={errors?.imovel?.valor_iptu}
            onChange={(e) => {
              e.target.value = formatarValor(e.target.value);
            }}
          />
          <FormularioInput
            placeholder="Taxa de Condomínio (R$):"
            name={"imovel.condominio"}
            interName="R$ "
            register={register}
            required
            customizacaoClass="lg:w-full"
            errors={errors?.imovel?.condominio}
            onChange={(e) => {
              e.target.value = formatarValor(e.target.value);
            }}
          />
          <FormularioInput
            placeholder="Status do imóvel:"
            name={"imovel.status_imovel"}
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
            name={"imovel.test_visibilidade"}
            register={register}
            required
            customizacaoClass="w-full"
            options={["Público", "Privado"]}
            errors={errors?.imovel?.test_visibilidade}
          />
          <FormularioInput
            placeholder="Área construída:"
            name={"imovel.area_construida"}
            icon={{ type: "areaCT" }}
            interName="Ex: 120"
            register={register}
            required
            customizacaoClass="w-full"
            errors={errors?.imovel?.area_construida}
            onChange={(e) => {
              e.target.value = formatarArea(e.target.value);
            }}
          />
          <FormularioInput
            placeholder="Área do terreno:"
            name={"imovel.area_terreno"}
            icon={{ type: "areaCT" }}
            interName="Ex: 90"
            register={register}
            required
            customizacaoClass="w-full"
            errors={errors?.imovel?.area_terreno}
            onChange={(e) => {
              e.target.value = formatarArea(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  )
}
