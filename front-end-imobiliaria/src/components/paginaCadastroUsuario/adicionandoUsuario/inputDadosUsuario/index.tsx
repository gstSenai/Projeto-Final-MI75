"use client"
import React, { useState, useEffect } from 'react';
import { InputEnderecoPropriedade } from '../inputEnderecoPropriedade';
import { Botao } from '@/components/botao';

interface FormularioInputProps {
    placeholder: string;
    name: string;
    showOptions?: boolean;
    custumizacaoClass: string;
    options?: string[];
    onChange?: (value: string) => void;
    value?: string;
}

function FormularioInput({ placeholder, name, showOptions = false, custumizacaoClass, options, onChange, value }: FormularioInputProps) {
    return (
        <form action="text" className={`flex items-center lg:h-[50px] max-lg:justify-center gap-6 xl:py-4 2xl:py-6 py-3.5 bg-white border border-black rounded-2xl max-lg:bg-transparent max-lg:border-transparent max-lg:p-0 ${custumizacaoClass}`}>
            <img src="/iconsForms/canetaEditar.png" alt="Editar" className="lg:h-6 ml-4" />
            {options ? (
                <select
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    className="appearance-none text-[#5C5C5C]/80 max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full bg-transparent"
                >
                    <option value="" disabled className="text-gray-400">{name}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option} className="text-black">{option}</option>
                    ))}
                </select>
            ) : (
                <input
                    type="text"
                    placeholder={placeholder}
                    name={name}
                    className="text-black max-sm:text-lg max-md:text-2xl max-lg:text-3xl lg:text-xl max-lg:text-black outline-none w-full"
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                />
            )}
            {showOptions && <img src="/iconsForms/botaoOpcoes.png" alt="Botão Opções" className="ml-auto mr-4 lg:h-6" />}
        </form>
    );
}

const noOp = () => { };

const request = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    body?: any
): Promise<any> => {
    try {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Falha na requisição: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
        throw error;
    }
};

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
    ultimo_acesso?: string
    imovel: string;
}

interface ResponseProps {
    content: UsuarioProps[]
}

export function InputDadosUsuario() {
    const [newUser, setNewUser] = useState<UsuarioProps>({
        id: 0, nome: '', sobrenome: '', cpf: '', tipo_conta: '',
        telefone: '', data_nascimento: new Date(), email: '',
        senha: '', confirmar_senha: '', ultimo_acesso: '',
        imovel: ''
    });

    const [users, setUsers] = useState<ResponseProps | null>(null);

    const getUsers = async () => {
        const usersGet = await request('GET', 'http://localhost:9090/users/getAll')
        setUsers(usersGet)
    };

    const addUser = async () => {
        await request('POST', 'http://localhost:9090/users/add', newUser);
        getUsers();
    };


    useEffect(() => {
        getUsers()
        addUser()
    }, []);

    return (
        <div className="flex flex-col lg:gap-10">
            <div className="flex lg:gap-16">
                <FormularioInput
                    placeholder="Nome:"
                    name="Nome:"
                    value={newUser.nome}
                    custumizacaoClass="lg:w-[20%]"
                />
                <FormularioInput
                    placeholder="Sobrenome:"
                    name="Sobrenome:"
                    value={newUser.sobrenome}
                    custumizacaoClass="lg:w-[45.5%]"
                />
                <FormularioInput
                    placeholder="CPF:"
                    name="CPF"
                    value={newUser.cpf}
                    custumizacaoClass="lg:w-[32.5%]"
                />
            </div>
            <div className="flex lg:gap-16">
                <FormularioInput placeholder="Email:" name="Email" value={newUser.email} custumizacaoClass="lg:w-1/3" />
                <FormularioInput placeholder="Senha:" name="Senha" value={newUser.senha} custumizacaoClass="lg:w-1/3" />
                <FormularioInput placeholder="Confirmação de senha:" value={newUser.confirmar_senha} name="Confirmação de senha" custumizacaoClass="lg:w-1/3" />
            </div>
            <div className="flex lg:gap-16">
                <FormularioInput placeholder="Telefone:" name="Telefone" value={newUser.telefone} custumizacaoClass="lg:w-1/3" />
                <FormularioInput placeholder="Data de Nascimento:" name="Data de Nascimento" value={newUser.data_nascimento ? newUser.data_nascimento.toISOString().split('T')[0] : ''} custumizacaoClass="lg:w-[50%]" />
                <FormularioInput placeholder="Último acesso:" name="Último acesso" value={newUser.telefone} custumizacaoClass="lg:w-[50%]" />
            </div>

            <div className="flex items-center gap-16 mt-10">
                <div className='flex gap-[30rem] w-full'>
                    <Botao onClick={noOp} texto="Cancelar" />
                    <Botao onClick={addUser} texto="Salvar cadastro" />
                </div>
            </div>
        </div>
    );
}
