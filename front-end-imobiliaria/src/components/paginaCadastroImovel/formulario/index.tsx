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
    id: number
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
}

interface InputDadosImovelProps {
    onComplete?: () => void;
}

export function Formulario({ onComplete }: InputDadosImovelProps) {
    const { register: registerImovel, handleSubmit: handleSubmitImovel } = useForm<ImovelProps>();
    const { register: registerEndereco, handleSubmit: handleSubmitEndereco } = useForm<EnderecoImovelProps>();
    const [selectedVenda, setSelectedVenda] = useState(false)
    const [selectedLocacao, setSelectedLocacao] = useState(false)
    const [showForm, setShowForm] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [lastAddedImovel, setLastAddedImovel] = useState<ImovelProps | null>(null)
    const [lastAddedEndereco, setLastAddedEndereco] = useState<EnderecoImovelProps | null>(null)

    const addEndereco = async (data: EnderecoImovelProps) => {
        try {
            const response = await request("POST", "http://localhost:9090/endereco/create", data);
            if (response.status === 201) {
                return response.data;
            }
            throw new Error('Falha ao criar o endereço');
        } catch (error) {
            console.error("Erro ao adicionar endereço:", error);
            throw error;
        }
    };


    const deleteEndereco = async (enderecoId: number): Promise<void> => {
        try {
            await request('DELETE', `http://localhost:9090/endereco/delete/${enderecoId}`);
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            throw error;
        }
    };


    const addImovel = async (data: ImovelProps) => {
        try {
            const response = await request("POST", "http://localhost:9090/imovel/create", data)
            return response
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error)
            throw error
        }
    }

    const deleteImovel = async (imoveId: number): Promise<void> => {
        try {
            await request('DELETE', `http://localhost:9090/imovel/delete/${imoveId}`)
        } catch (error) {
            console.error("Erro ao deletar usuário:", error)
            throw error;
        }
    }

    const onSubmit = async (data: ImovelProps) => {
        try {
            // Valide os dados do endereço antes de fazer a requisição
            if (!data.endereco.rua || !data.endereco.cep || !data.endereco.numero 
                || !data.endereco.bairro || !data.endereco.cidade || !data.endereco.uf) {
                console.error("Faltando dados obrigatórios do endereço!");
                return;
            }
    
            const addedEnderecoImovel = await addEndereco(data.endereco);
    
            // Continuar com o processo depois de adicionar o endereço
    
            setShowForm(false);
            setShowModal(true);
            setLastAddedEndereco(addedEnderecoImovel);
    
            if (onComplete) {
                onComplete();
            }
    
            setTimeout(() => {
                setShowModal(false);
            }, 5000);
        } catch (error) {
            console.error("Erro ao submeter formulário:", error);
        }
    };
    

    const onSubmitDelete = async () => {
        if (lastAddedImovel && lastAddedEndereco) {
            await deleteImovel(lastAddedImovel.id)
            await deleteEndereco(lastAddedEndereco.id)
            setShowModal(false)
            setLastAddedImovel(null)
            setLastAddedEndereco(null)
            if (onComplete) {
                onComplete()
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
                        <Botao onClick={handleSubmitImovel(onSubmit)} texto="Salvar cadastro" />
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
                            <Botao onClick={handleSubmitImovel(onSubmit)} texto="Salvar cadastro" />
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

