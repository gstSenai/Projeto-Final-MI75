"use client"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { EnderecoSection } from "../formulario/endereco-section"
import { DadosImovelSection } from "./dados-imovel-section"
import request from "@/routes/request"
import { Botao } from "@/components/botao"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const ImovelProps = z.object({
    id: z.number().optional(),
    codigo: z.coerce.number().optional(),
    nome_propriedade: z.string().min(1, { message: "Nome da propriedade é obrigatório" }),
    tipo_transacao: z.string().min(1, { message: "Tipo de transação é obrigatório" }),
    valor_venda: z.coerce.number().min(1, { message: "Valor de venda é obrigatório" }),
    tipo_imovel: z.string().min(1, { message: "Tipo de imóvel é obrigatório" }),
    status_imovel: z.string().min(1, { message: "Status do imóvel é obrigatório" }),
    valor_promocional: z.coerce.number().min(1, { message: "Valor promocional é obrigatório" }),
    test_destaque: z.string().optional(),
    test_visibilidade: z.string().optional(),
    destaque: z.boolean().default(false),
    visibilidade: z.boolean().default(false),
    valor_iptu: z.coerce.number().min(1, { message: "Valor do IPTU é obrigatório" }),
    condominio: z.coerce.number().min(1, { message: "Valor do condomínio é obrigatório" }),
    area_construida: z.coerce.number().min(1, { message: "Área construída é obrigatória" }),
    area_terreno: z.coerce.number().min(1, { message: "Área do terreno é obrigatória" }),
    descricao: z.string().optional(),
})

const ImovelCaracteristicas = z.object({
    id: z.number().optional(),
    numero_quartos: z.coerce.number().min(1, { message: "Número de quartos é obrigatório" }),
    numero_banheiros: z.coerce.number().min(1, { message: "Número de banheiros é obrigatório" }),
    numero_suites: z.coerce.number().min(1, { message: "Número de suítes é obrigatório" }),
    numero_vagas: z.coerce.number().min(1, { message: "Número de vagas é obrigatório" }),
    test_piscina: z.string().optional(),
    piscina: z.boolean().default(false),
    numero_salas: z.coerce.number().min(1, { message: "Número de salas é obrigatório" }),
})

const EnderecoImovelProps = z.object({
    id: z.number().optional(),
    cep: z.string().min(1, { message: "CEP é obrigatório" }),
    rua: z.string().min(1, { message: "Rua é obrigatória" }),
    numero: z.string().min(1, { message: "Número é obrigatório" }),
    bairro: z.string().min(1, { message: "Bairro é obrigatório" }),
    cidade: z.string().min(1, { message: "Cidade é obrigatória" }),
    uf: z.string().min(1, { message: "UF é obrigatória" }),
    complemento: z.string().optional(),
})

const FormSchema = z.object({
    imovel: ImovelProps,
    imovelCaracteristicas: ImovelCaracteristicas,
    endereco: EnderecoImovelProps
})

type ImovelProps = z.infer<typeof ImovelProps>
type ImovelCaracteristicas = z.infer<typeof ImovelCaracteristicas>
type EnderecoImovelProps = z.infer<typeof EnderecoImovelProps>
type FormData = z.infer<typeof FormSchema>

interface InputDadosImovelProps {
    onComplete?: () => void;
}

export function Formulario({ onComplete }: InputDadosImovelProps) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            imovel: {
                tipo_imovel: "",
                codigo: 0,
                tipo_transacao: "",
                test_destaque: "",
                status_imovel: "",
                test_visibilidade: "",
                destaque: false,
                visibilidade: false
            },
            imovelCaracteristicas: {
                test_piscina: "",
                piscina: false
            },
            endereco: {
                uf: ""
            }
        },
    })
    const [showForm] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [lastAddedImovel, setLastAddedImovel] = useState<ImovelProps | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const addEndereco = async (data: EnderecoImovelProps) => {
        try {
            console.log("Sending address data:", data);

            if (!data.cep || !data.rua || !data.numero || !data.bairro || !data.cidade || !data.uf) {
                throw new Error('Todos os campos obrigatórios devem ser preenchidos');
            }

            const response = await request("POST", "http://localhost:9090/endereco/create", data);

            if (response && response.id) {
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
                codigo: imovel.valor_venda,
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
                console.log("Imóvel criado com sucesso:", response);
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

    useEffect(() => {
        console.log("Errors", errors)
    }, [errors])
    return (
        <>
            {showForm && (
                <>
                    <EnderecoSection register={register} errors={errors} setValue={setValue} />

                    <DadosImovelSection register={register} errors={errors} />

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
