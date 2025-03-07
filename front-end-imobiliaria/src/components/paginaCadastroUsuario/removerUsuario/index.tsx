"use client"
import React, { useState } from 'react';
import { Botao } from '@/components/botao';
import { useForm } from 'react-hook-form';
import request from '@/routes/request';

interface FormularioInputProps {
    placeholder: string
    name: string
    showOptions?: boolean
    custumizacaoClass: string
    options?: string[]
    register: any
    errorMessage?: string
}

function FormularioInput({
    placeholder,
    name,
    showOptions = false,
    custumizacaoClass,
    options,
    register,
    errorMessage,
}: FormularioInputProps) {
    return (
        <div
            className={`flex items-center lg:h-[50px] max-lg:justify-center gap-6 xl:py-4 2xl:py-6 py-3.5 bg-white border border-black rounded-2xl max-lg:bg-transparent max-lg:border-transparent max-lg:p-0 ${custumizacaoClass}`}
        >
            <img src="/iconsForms/canetaEditar.png" alt="Editar" className="lg:h-6 ml-4" />
            {options ? (
                <select
                    defaultValue=""
                    {...register(name)}
                    className="appearance-none text-black max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full bg-transparent"
                >
                    <option value="" disabled className="text-gray-400">
                        {placeholder}
                    </option>
                    {options.map((option, index) => (
                        <option key={index} value={option} className="text-black">
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type="text"
                    placeholder={placeholder}
                    {...register(name)}
                    className="text-black max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full"
                />
            )}
            {showOptions && <img src="/iconsForms/botaoOpcoes.png" alt="Botão Opções" className="ml-auto mr-4 lg:h-6" />}
            {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
        </div>
    )
}

interface UsuarioProps {
    id: number
    nome: string
    sobrenome: string
    cpf: string
    tipo_conta: string
    telefone: string
    data_nascimento: Date
    email: string
    senha: string
    confirmar_senha?: string
    ultimo_acesso?: string
    imovel: string
}



interface RemoveUsuarioProps {
    onComplete?: () => void;
}

export function RemoveUsuario({ onComplete }: RemoveUsuarioProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UsuarioProps>()
    const [showForm, setShowForm] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [lastAddedUser, setLastAddedUser] = useState<UsuarioProps | null>(null)

    const tiposConta = ['Usuario', 'Corretor', 'Administrador', 'Editor'];

    const addUser = async (data: UsuarioProps) => {
        try {
            const response = await request('POST', 'http://localhost:9090/users/create', data);
            setLastAddedUser(response);
            return response;
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
            throw error;
        }
    };

    const deleteUser = async (userId: number): Promise<void> => {
        try {
            await request('DELETE', `http://localhost:9090/users/delete/${userId}`);
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            throw error;
        }
    };

    const onSubmitDelete = async () => {
        if (lastAddedUser) {
            await deleteUser(lastAddedUser.id);
            setShowModal(false);
            setLastAddedUser(null);
            if (onComplete) {
                onComplete();
            }
        }
    }

    const onSubmit = async (data: UsuarioProps) => {
        try {
            const addedUser = await addUser(data);
            setShowForm(false);
            setShowModal(true);
            setLastAddedUser(addedUser);
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

    return (
        <>
            {showForm && (
                <div className="2xl:px-20 xl:px-20 lg:px-10 px-10">
                    <div className="flex flex-col max-lg:justify-center">
                        <p className="text-2xl xl:text-4xl font-semibold max-lg:hidden">Dados do usuário</p>
                        <hr className="mt-4 mb-10 w-40 h-1 rounded-2xl bg-vermelho "></hr>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:gap-10">
                        <div className="flex lg:gap-16">
                            <FormularioInput
                                placeholder="Nome:"
                                name="nome"
                                register={register}
                                errorMessage={errors.nome?.message}
                                custumizacaoClass="lg:w-[20%]"
                            />
                            <FormularioInput
                                placeholder="Sobrenome:"
                                name="sobrenome"
                                register={register}
                                custumizacaoClass="lg:w-[45.5%]"
                            />
                            <FormularioInput placeholder="CPF:" name="cpf" register={register} custumizacaoClass="lg:w-[32.5%]" />
                        </div>
                        <div className="flex lg:gap-16">
                            <FormularioInput placeholder="Email:" name="email" register={register} custumizacaoClass="lg:w-1/3" />
                            <FormularioInput placeholder="Senha:" name="senha" register={register} custumizacaoClass="lg:w-1/3" />
                            <FormularioInput
                                placeholder="Confirmação de senha:"
                                name="confirmar_senha"
                                register={register}
                                custumizacaoClass="lg:w-1/3"
                            />
                        </div>
                        <div className="flex lg:gap-16">
                            <FormularioInput
                                placeholder="Telefone:"
                                name="telefone"
                                register={register}
                                custumizacaoClass="lg:w-1/3"
                            />
                            <FormularioInput
                                placeholder="Data de Nascimento:"
                                name="data_nascimento"
                                register={register}
                                custumizacaoClass="lg:w-[50%]"
                            />
                            <FormularioInput
                                placeholder="Tipo Conta:"
                                name="tipo_conta"
                                register={register}
                                showOptions
                                custumizacaoClass="lg:w-[50%]"
                                options={tiposConta}
                            />
                        </div>

                        <div className="flex items-center gap-16 mt-10">
                            <div className="flex gap-[30rem] w-full">
                                <Botao onClick={() => console.log()} texto="Cancelar" />
                                <Botao onClick={handleSubmit(onSubmit)} texto="Salvar cadastro" />
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {showModal && lastAddedUser && (
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
    );
}
