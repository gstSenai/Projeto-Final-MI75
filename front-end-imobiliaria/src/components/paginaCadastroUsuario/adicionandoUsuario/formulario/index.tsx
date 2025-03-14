"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { EnderecoSection } from "../formulario/endereco-section"
import { DadosUsuarioSection } from "./dados-imovel-section"
import request from "@/routes/request"
import { Botao } from "@/components/botao"

interface UsuarioProps {
    id: number
    nome: string
    sobrenome: string
    cpf: string
    tipo_conta: string
    telefone: string
    data_nascimento: string
    email: string
    senha: string
}

interface EnderecoImovelProps {
    id: number
    cep: string
    rua: string
    tipo_residencia: string
    numero_imovel: number
    numero_apartamento: number
    bairro: string
    cidade: string
    uf: string
}

interface InputDadosUsuarioProps {
    onComplete?: () => void;
}

export function Formulario({ onComplete }: InputDadosUsuarioProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<{ usuario: UsuarioProps; endereco: EnderecoImovelProps }>();
    const [showForm, setShowForm] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [lastAddedUsuario, setLastAddedUsuario] = useState<UsuarioProps | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [enderecoId, setEnderecoId] = useState<number>();

    const addEndereco = async (data: EnderecoImovelProps) => {
        try {
            console.log("Sending address data:", data);

            if (!data.cep || !data.rua || !data.tipo_residencia
                || !data.numero_imovel || !data.numero_apartamento
                || !data.bairro || !data.cidade || !data.uf) {
                throw new Error('Todos os campos obrigatórios devem ser preenchidos');
            }

            const response = await request("POST", "http://localhost:9090/enderecoUsuario/create", data);

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

    const addUsuario = async (data: UsuarioProps) => {
        try {

            console.log("Sending address data:", data);

            const response = await request("POST", "http://localhost:9090/usuario/create", data)
            return response
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error)
            throw error
        }
    }

    const deleteUsuario = async (userId: number): Promise<void> => {
        try {
            await request('DELETE', `http://localhost:9090/usuario/delete/${userId}`)
        } catch (error) {
            console.error("Erro ao deletar imóvel:", error)
            throw error;
        }
    }

    const onSubmitUsuario = async (data: { usuario: UsuarioProps; endereco: EnderecoImovelProps }) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            console.log("Dados recebidos para validação:", data);

            const { usuario, endereco } = data;

            console.log("Dados do Endereço:", endereco);
            console.log("Dados do Usuário:", usuario);

            const responseEndereco = await addEndereco(endereco);

            const usuarioAdd = {
                id: usuario.id,
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                cpf: usuario.cpf,
                tipo_conta: usuario.tipo_conta,
                telefone: usuario.telefone,
                data_nascimento: usuario.data_nascimento,
                email: usuario.email,
                senha: usuario.senha,
                idEnderecoUsuario: enderecoId,
            };

            console.log("Dados do imóvel a serem enviados:", usuarioAdd);

            const response = await addUsuario(usuarioAdd);
            console.log("Resposta do servidor:", response);
            if (response) {
                setLastAddedUsuario(response);
                setShowForm(false);
                setShowModal(true);
            } else {
                console.error("Erro: Resposta inválida ao adicionar usuário.");
            }

            if (onComplete) onComplete();

            setTimeout(() => setShowModal(false), 5000);
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
            alert(`Erro ao salvar usuário: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmitDelete = async () => {
        if (lastAddedUsuario) {
            if (lastAddedUsuario.id) {
                await deleteUsuario(lastAddedUsuario.id)
                setShowModal(false)
                setLastAddedUsuario(null)
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
                    <DadosUsuarioSection register={register} />

                    <EnderecoSection register={register} />

                    <div className="flex items-center gap-16 mt-10">
                        <div className="flex gap-[40rem] w-full">
                            <Botao onClick={() => console.log()} texto="Cancelar" />
                            <Botao onClick={handleSubmit(onSubmitUsuario)} texto="Salvar cadastro" />
                        </div>
                    </div>
                </>
            )}

            {showModal && lastAddedUsuario && (
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
