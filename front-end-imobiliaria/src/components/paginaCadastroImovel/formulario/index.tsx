"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { EnderecoSection } from "../endereco-section"
import { DadosImovelSection } from "../dados-imovel-section"
import { Checkbox } from "../checkbox"
import request from "@/routes/request"
import { Botao } from "@/components/botao"
import { useQuery } from "@tanstack/react-query"

interface ImovelProps {
    id?: number
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
    id_endereco: EnderecoImovelProps 
    id_usuario?: EnderecoImovelProps
}

interface EnderecoImovelProps {
    id?: number
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
    const { register: registerImovel, handleSubmit: handleSubmitImovel } = useForm<ImovelProps>();

    const { register: registerEndereco, handleSubmit: handleSubmitEndereco, formState: { errors: enderecoErrors } } = useForm<EnderecoImovelProps>();
    const [showForm, setShowForm] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [lastAddedImovel, setLastAddedImovel] = useState<ImovelProps | null>(null)
    const [lastAddedEndereco, setLastAddedEndereco] = useState<EnderecoImovelProps | null>(null);
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

    const deleteEndereco = async (enderecoId: number): Promise<void> => {
        try {
            await request('DELETE', `http://localhost:9090/endereco/delete/${enderecoId}`);
        } catch (error) {
            console.error("Erro ao deletar endereço:", error);
            throw error;
        }
    };

    const addImovel = async (data: ImovelProps) => {
        try {
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


    const onSubmit = async (data: EnderecoImovelProps) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            if (!data.cep || !data.rua || !data.numero || !data.bairro || !data.cidade || !data.uf) {
                alert('Por favor, preencha todos os campos obrigatórios do endereço');
                setIsSubmitting(false);
                return;
            }

            console.log("Submitting address data:", data);

            const response = await addEndereco(data);

            console.log("Server response:", response);

            setShowForm(false);
            setShowModal(true);
            setLastAddedEndereco(response);

            if (onComplete) onComplete();

            setTimeout(() => setShowModal(false), 5000);
        } catch (error) {
            console.error("Erro ao salvar Endereço:", error);
            alert(`Erro ao salvar endereço: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmitImovel = async (data: ImovelProps) => {
        if (isSubmitting) return;
    
        try {
            setIsSubmitting(true);
    
            // Verifica se todos os campos obrigatórios estão preenchidos
            console.log("Dados recebidos para validação:", data);
            
            if (!data.codigo || !data.nome_propriedade || !data.tipo_transacao
                || !data.valor_venda || !data.tipo_imovel || !data.status_imovel
                || !data.valor_promocional || !data.destaque || !data.visibilidade
                || !data.valor_iptu || !data.condominio || !data.area_construida
                || !data.area_terreno || !data.descricao || !data.id_endereco) {  // Verifica se id_endereco está preenchido
                console.log("Campos obrigatórios não preenchidos:", data);
                alert('Por favor, preencha todos os campos obrigatórios do imóvel');
                setIsSubmitting(false);
                return;
            }
    
            const immobileData = {
                codigo: data.codigo,
                nome_propriedade: data.nome_propriedade,
                tipo_transacao: data.tipo_transacao,
                valor_venda: data.valor_venda, 
                tipo_imovel: data.tipo_imovel,
                status_imovel: data.status_imovel,
                valor_promocional: data.valor_promocional,
                destaque: data.test_destaque === "Sim",
                visibilidade: data.test_visibilidade === "Público",
                valor_iptu: data.valor_iptu,
                condominio: data.condominio,
                area_construida: data.area_construida,
                area_terreno: data.area_terreno,
                descricao: data.descricao,
                id_endereco: {
                    id: data.id_endereco.id,  // Certifique-se de que data.id_endereco é um objeto com essas propriedades
                    cep: data.id_endereco.cep,
                    rua: data.id_endereco.rua,
                    numero: data.id_endereco.numero,
                    bairro: data.id_endereco.bairro,
                    cidade: data.id_endereco.cidade,
                    uf: data.id_endereco.uf,
                    complemento: data.id_endereco.complemento // Se tiver complemento
                }
            };
            
    
            console.log("Dados do imóvel a serem enviados:", immobileData);
    
            const response = await addImovel(immobileData);
            console.log("Resposta do servidor:", response);
    
            setShowForm(false);
            setShowModal(true);
            setLastAddedEndereco(response.data);
    
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
        if (lastAddedImovel && lastAddedEndereco) {
            try {
                if (lastAddedImovel.id) {
                    await deleteImovel(lastAddedImovel.id);
                }
                if (lastAddedEndereco.id) {
                    await deleteEndereco(lastAddedEndereco.id);
                }
                setShowModal(false);
                setLastAddedImovel(null);
                setLastAddedEndereco(null);
                if (onComplete) {
                    onComplete();
                }
            } catch (error) {
                console.error("Erro ao desfazer:", error);
                alert("Erro ao desfazer a operação");
            }
        }
    }

    return (
        <>
            <EnderecoSection register={registerEndereco} />

            <div className="font-inter flex max-lg:justify-center">
                <div className="flex flex-row items-center max-lg:justify-center">
                    <p className="text-2xl xl:text-3xl font-semibold my-10 max-lg:hidden">Tipo de Transação:</p>
                </div>
                <div className="flex items-center gap-16 mt-10">
                    <div className="flex gap-[30rem] w-full">
                        <Botao onClick={() => console.log()} texto="Cancelar" />
                        <Botao
                            onClick={handleSubmitEndereco(onSubmit)}
                            texto={isSubmitting ? "Salvando..." : "Salvar cadastro"}
                        />
                    </div>
                </div>
            </div>

            <DadosImovelSection register={registerImovel} />

            <div className="flex items-center gap-16 mt-10">
                <div className="flex gap-[30rem] w-full">
                    <Botao onClick={() => console.log()} texto="Cancelar" />
                    <Botao onClick={handleSubmitImovel(onSubmitImovel)} texto="Salvar cadastro" />
                </div>
            </div>

            {showModal && lastAddedEndereco && (
                <div className="w-full bottom-16 pl-10 items-center relative">
                    <div className='bg-vermelho/80 w-72 flex gap-1 p-3 rounded-[20px] text-white'>
                        <p>Adicionado com Sucesso!</p>
                        <button
                            onClick={onSubmitDelete}
                            className='underline '>
                            Desfazer
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
