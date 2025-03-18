"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { EnderecoSection } from "../formulario/endereco-section"
import { DadosImovelSection } from "./dados-imovel-section"
import request from "@/routes/request"
import { Botao } from "@/components/botao"

interface ImovelProps {
    id: number
    codigo?: number
    nome_propriedade: string
    tipo_transacao: string
    valor_venda: number
    tipo_imovel: string
    status_imovel: string
    valor_promocional: number
    test_destaque?: string
    test_visibilidade?: string
    destaque: boolean
    visibilidade: boolean
    valor_iptu: number
    condominio: number
    area_construida: number
    area_terreno: number
    descricao?: string
}

interface ImovelCaracteristicas {
    id: number
    numero_quartos: number
    numero_banheiros: number
    numero_suites: number
    numero_vagas: number
    test_piscina?: string
    piscina: boolean
    numero_salas: number
}

interface EnderecoImovelProps {
    id: number
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    complemento?: string
}

interface InputDadosImovelProps {
    onComplete?: () => void;
}

export function Formulario({ onComplete }: InputDadosImovelProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<{ imovel: ImovelProps; imovelCaracteristicas: ImovelCaracteristicas; endereco: EnderecoImovelProps }>();
    const [showForm, setShowForm] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [lastAddedImovel, setLastAddedImovel] = useState<ImovelProps | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [enderecoId, setEnderecoId] = useState<number>();
    const [imovelId, setImovelId] = useState<number>();

    const addEndereco = async (data: EnderecoImovelProps) => {
        try {
            console.log("Sending address data:", data);

            if (!data.cep || !data.rua || !data.numero || !data.bairro || !data.cidade || !data.uf) {
                throw new Error('Todos os campos obrigatórios devem ser preenchidos');
            }

            const response = await request("POST", "http://localhost:9090/endereco/create", data);

            if (response && response.id) {
                setEnderecoId(response.id)
                return response;
            }

            console.error("Resposta do servidor:", response);
            throw new Error(`Falha ao criar o endereço: ${response.status}`);
        } catch (error) {
            console.error("Erro ao adicionar endereço:", error);
            throw error;
        }
    };

    const addImovel = async (data: ImovelProps) => {
        try {

            console.log("Sending address data:", data);

            const response = await request("POST", "http://localhost:9090/imovel/create", data)
            return response
        } catch (error) {
            console.error("Erro ao adicionar imóvel:", error)
            throw error
        }
    }

    const addCaracteristicasImovel = async (data: ImovelCaracteristicas) => {
        try {
            console.log("Carac Imovel", data)

            const response = await request("POST", "http://localhost:9090/caracteristicaImovel/create", data)

            return response
        } catch (error) {
            console.error("Erro ao adicionar imóvel:", error)
            throw error
        }
    }

    const deleteImovel = async (imoveId: number): Promise<void> => {
        try {
            await request('DELETE', `http://localhost:9090/imovel/delete/${imoveId}`)
        } catch (error) {
            console.error("Erro ao deletar imóvel:", error)
            throw error;
        }
    }



    const onSubmitImovel = async (data: { imovel: ImovelProps; imovelCaracteristicas: ImovelCaracteristicas; endereco: EnderecoImovelProps }) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            console.log("Dados recebidos para validação:", data);

            const { imovel, endereco, imovelCaracteristicas } = data;

            console.log("Dados do Endereço:", endereco);
            console.log("Dados do Imóvel:", imovel);
            console.log("Dados do Imóvel:", imovelCaracteristicas);

            const responseCaracImovel = await addCaracteristicasImovel(imovelCaracteristicas)
            const responseEndereco = await addEndereco(endereco);

            const immobileData = {
                id: imovel.id,
                codigo: imovel.codigo || imovel.valor_venda,
                nome_propriedade: imovel.nome_propriedade,
                tipo_transacao: imovel.tipo_transacao,
                valor_venda: imovel.valor_venda || 0,
                tipo_imovel: imovel.tipo_imovel,
                status_imovel: imovel.status_imovel,
                valor_promocional: imovel.valor_promocional || 0,
                destaque: imovel.test_destaque === "Sim",
                visibilidade: imovel.test_visibilidade === "Público",
                valor_iptu: imovel.valor_iptu || 0,
                condominio: imovel.condominio || 0,
                area_construida: imovel.area_construida || 0,
                area_terreno: imovel.area_terreno || 0,
                descricao: imovel.descricao || "",
                idEndereco: responseEndereco,
                id_caracteristicaImovel: responseCaracImovel,
            };

            console.log("Dados do imóvel a serem enviados:", immobileData);
            const response = await addImovel(immobileData);

            if (response && response.id) {
                setImovelId(response.id);
            } else {
                throw new Error("Erro ao criar imóvel, id não retornado.");
            }
            console.log("Resposta do servidor:", response);


            if (onComplete) onComplete();

        } catch (error) {
            console.error("Erro ao salvar Endereço:", error);
            alert(`Erro ao salvar endereço: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmitDelete = async () => {
        if (lastAddedImovel) {
            if (lastAddedImovel.id) {
                await deleteImovel(lastAddedImovel.id)
                setShowModal(false)
                setLastAddedImovel(null)
            }
            if (onComplete) {
                onComplete();
            }
        }
    }


    return (
        <>
            {showForm && (
                <>
                    <EnderecoSection register={register} />

                    <DadosImovelSection register={register} />

                    <div className="flex items-center gap-16 mt-10">
                        <div className="flex max-sm:gap-12 max-lg:gap-36 gap-[40rem] w-full">
                            <Botao className="max-lg:text-base" onClick={() => console.log()} texto="Cancelar" />
                            <Botao className="max-lg:text-base" onClick={handleSubmit(onSubmitImovel)} texto="Salvar cadastro" />
                        </div>
                    </div>
                </>
            )}

            {showModal && lastAddedImovel && (
                <div className="w-full bottom-16 pl-10 items-center relative">
                    <div className='bg-vermelho w-72 flex gap-1 p-3 rounded-[20px] text-white'>
                        <p>Adicionado com Sucesso!</p>
                        <button
                            onClick={onSubmitDelete}
                            className='underline'>
                            Desfazer
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
