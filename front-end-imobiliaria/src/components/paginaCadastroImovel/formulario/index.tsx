"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { EnderecoSection } from "../endereco-section"
import { DadosImovelSection } from "../dados-imovel-section"
import { Checkbox } from "../checkbox"
import request from "@/routes/request"
import { Botao } from "@/components/botao"

interface ImovelProps {
    id: number
    codigo: number
    nome_propriedade: string
    tipo_transacao: string
    valor_venda: number
    tipo_imovel: string
    status_imovel: string
    valor_promocional: number
    destaque: boolean
    visibilidade: boolean
    valor_iptu: number
    condominio: number
    area_construida: number
    area_terreno: number
    descricao: string
    endereco: EnderecoImovelProps
}

interface EnderecoImovelProps {
    id?: number
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    complemento: string
}

interface InputDadosImovelProps {
    onComplete?: () => void;
}

export function Formulario({ onComplete }: InputDadosImovelProps) {
    const { register: registerImovel, handleSubmit: handleSubmitImovel } = useForm<ImovelProps>({
        defaultValues: {
            endereco: {
                cep: '',
                rua: '',
                numero: '',
                bairro: '',
                cidade: '',
                uf: '',
                complemento: ""
            }
        }
    });

    const { register: registerEndereco, handleSubmit: handleSubmitEndereco, formState: { errors: enderecoErrors } } = useForm<EnderecoImovelProps>();
    const [selectedVenda, setSelectedVenda] = useState(false)
    const [selectedLocacao, setSelectedLocacao] = useState(false)
    const [showForm, setShowForm] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [lastAddedImovel, setLastAddedImovel] = useState<ImovelProps | null>(null)
    const [lastAddedEndereco, setLastAddedEndereco] = useState<EnderecoImovelProps | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const addEndereco = async (data: EnderecoImovelProps) => {
        try {
            // Log the data being sent to help debug
            console.log("Sending address data:", data);
            
            // Make sure all required fields have values
            if (!data.cep || !data.rua || !data.numero || !data.bairro || !data.cidade || !data.uf) {
                throw new Error('Todos os campos obrigatórios devem ser preenchidos');
            }
            
            const response = await request("POST", "http://localhost:9090/endereco/create", data);
            
            if (response.status === 201) {
                return response.data;
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
            
            // Validate the data before sending
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
                <Checkbox label="Venda" checked={selectedVenda} onChange={() => setSelectedVenda(!selectedVenda)} />
                <Checkbox label="Locação" checked={selectedLocacao} onChange={() => setSelectedLocacao(!selectedLocacao)} />
            </div>

            {selectedVenda && !selectedLocacao && (
                <>
                    <DadosImovelSection register={registerImovel} />
                    <div className="flex items-center gap-16 mt-10">
                        <div className="flex gap-[30rem] w-full">
                            <Botao onClick={() => console.log()} texto="Cancelar" />
                            <Botao onClick={() => console.log()} texto="Salvar cadastro" />
                        </div>
                    </div>
                </>
            )}
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

            {!selectedVenda && selectedLocacao && <DadosImovelSection register={registerImovel} />}
        </>
    )
}
