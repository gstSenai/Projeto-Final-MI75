"use client"
import React, { useState, useEffect } from 'react';
import { Botao } from '@/components/botao';
import { useForm } from 'react-hook-form';
import request from '@/routes/request';

interface FormularioInputProps {
    placeholder: string;
    name: string;
    showOptions?: boolean;
    custumizacaoClass: string;
    options?: string[];
    register: any;
    errorMessage?: string
}

function FormularioInput({ placeholder, name, showOptions = false, custumizacaoClass, options, register, errorMessage }: FormularioInputProps) {
    return (
        <div className={`flex items-center lg:h-[50px] max-lg:justify-center gap-6 xl:py-4 2xl:py-6 py-3.5 bg-white border border-black rounded-2xl max-lg:bg-transparent max-lg:border-transparent max-lg:p-0 ${custumizacaoClass}`}>
            <img src="/iconsForms/canetaEditar.png" alt="Editar" className="lg:h-6 ml-4" />
            {options ? (
                <select
                    {...register(name)}
                    className="appearance-none text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full bg-transparent"
                >
                    <option value="" disabled className="text-gray-400">{placeholder}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option} className="text-black">{option}</option>
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
    );
}

interface UsuarioProps {
    id: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    tipo_conta: string;
    telefone: string;
    data_nascimento: Date;
    email: string;
    senha: string;
    confirmar_senha?: string;
    ultimo_acesso?: string;
    imovel: string;}

export function InputDadosUsuario() {
    const { register, handleSubmit, formState: { errors } } = useForm<UsuarioProps>({
        defaultValues: {
            tipo_conta: '',
        }
    });
    const [users, setUsers] = useState<UsuarioProps[]>([]);

    

    const getUsers = async () => {
        const usersGet = await request('GET', 'http://localhost:9090/users/getAll');
        setUsers(usersGet);
    };

    const addUser  = async (data: UsuarioProps) => {
        await request('POST', 'http://localhost:9090/users/create', data);
        getUsers();
    };

    const onSubmit = (data: UsuarioProps) => {
        addUser(data);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:gap-10">
            <div className="flex lg:gap-16">    
                <FormularioInput
                    placeholder="Nome:"
                    name='nome'
                    register={register}
                    errorMessage={errors.nome?.message}
                    custumizacaoClass="lg:w-[20%]"
                />
                <FormularioInput
                    placeholder="Sobrenome:"
                    name='sobrenome'
                    register={register}
                    custumizacaoClass="lg:w-[45.5%]"
                />
                <FormularioInput
                    placeholder="CPF:"
                    name='cpf'
                    register={register} 
                    custumizacaoClass="lg:w-[32.5%]"
                />
            </div>
            <div className="flex lg:gap-16">
                <FormularioInput
                    placeholder="Email:"
                    name='email'
                    register={register}
                    custumizacaoClass="lg:w-1/3"
                />
                <FormularioInput
                    placeholder="Senha:"
                    name='senha'
                    register={register}
                    custumizacaoClass="lg:w-1/3"
                />
                <FormularioInput
                    placeholder="Confirmação de senha:"
                    name='confirmar_senha'
                    register={register}
                    custumizacaoClass="lg:w-1/3"
                />
            </div>
            <div className="flex lg:gap-16">
                <FormularioInput
                    placeholder="Telefone:"
                    name='telefone'
                    register={register}
                    custumizacaoClass="lg:w-1/3"
                />
                <FormularioInput
                    placeholder="Data de Nascimento:"
                    name='data_nascimento'
                    register={register}
                    custumizacaoClass="lg:w-[50%]"
                />
                <FormularioInput
                    placeholder="Tipo Conta:"
                    name='tipo_conta'
                    register={register} 
                    custumizacaoClass="lg:w-[50%]"
                />
            </div>

            <div className="flex items-center gap-16 mt-10">
                <div className='flex gap-[30rem] w-full'>
                    <Botao onClick={() => console.log()} texto="Cancelar" />
                    <Botao onClick={handleSubmit(onSubmit)} texto="Salvar cadastro" />
                </div>
            </div>
        </form>
    );
}