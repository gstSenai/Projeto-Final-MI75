"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { EnderecoSection } from "./formulario/endereco-section"
import { DadosUsuarioSection } from "./formulario/dados-imovel-section"
import request from "@/routes/request"
import { Botao } from "@/components/botao"

interface UsuarioProps {
    id: number;
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

interface EnderecoUsuarioProps {
    id?: number
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    complemento?: string
}

interface InputDadosUsuarioProps {
    onComplete?: () => void;
}

export function Formulario({ onComplete }: InputDadosUsuarioProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<{ imovel: UsuarioProps; endereco: EnderecoUsuarioProps }>();
    const [showForm, setShowForm] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [lastAddedImovel, setLastAddedImovel] = useState<UsuarioProps | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [enderecoId, setEnderecoId] = useState<number>();

    const addEndereco = async (data: EnderecoUsuarioProps) => {
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

    const addImovel = async (data: UsuarioProps) => {
        try {

            console.log("Sending address data:", data);

            const response = await request("POST", "http://localhost:9090/imovel/create", data)
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

    const onSubmitImovel = async (data: { imovel: UsuarioProps; endereco: EnderecoUsuarioProps }) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            console.log("Dados recebidos para validação:", data);

            const { imovel, endereco } = data;

            console.log("Dados do Endereço:", endereco);
            console.log("Dados do Imóvel:", imovel);

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
                id_endereco: responseEndereco,
            };

            console.log("Dados do imóvel a serem enviados:", immobileData);

            const response = await addImovel(immobileData);
            console.log("Resposta do servidor:", response);
            if (response) {
                setLastAddedImovel(response);
                setShowForm(false);
                setShowModal(true);
            } else {
                console.error("Erro: Resposta inválida ao adicionar imóvel.");
            }

            if (onComplete) onComplete();

            setTimeout(() => setShowModal(false), 5000);
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

                    <DadosUsuarioSection register={register} />

                    <div className="flex items-center gap-16 mt-10">
                        <div className="flex gap-[30rem] w-full">
                            <Botao onClick={() => console.log()} texto="Cancelar" />
                            <Botao onClick={handleSubmit(onSubmitImovel)} texto="Salvar cadastro" />
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
