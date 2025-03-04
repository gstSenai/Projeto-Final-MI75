"use client";

import React, { use, useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import { Header } from '../../header';
import { InputDadosUsuario } from '../../paginaCadastroUsuario/adicionandoUsuario/inputDadosUsuario';
import { InputEnderecoPropriedade } from '../../paginaCadastroUsuario/adicionandoUsuario/inputEnderecoPropriedade';
import { InputEditandoDadosUsuario } from '../../paginaCadastroUsuario/editandoUsuario/inputEditarDadosUsuario';
import { Botao } from '../../botao';


// Carregando a fonte Montserrat
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '800'],
  display: 'swap',
});

interface TableProps {
  headers: string[];
  data: (string | number)[][];
}

interface ImovelProps {
  id: number;
  nome_propriedade: string;
  tipo_transacao: string;
  valor_venda: number;
  tipo_imovel: string;
  status_imovel: string;
  valor_promocional: number;
  destaque?: boolean;
  visibilidade: boolean;
  condominio: number;
  area_construida: number;
  area_terreno: number;
  descricao: string;
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
  imovel: string;
}

interface ResponseProps {
  content: UsuarioProps[]
}


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


export default function GenericTable() {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<(string | number)[] | null>(null);
  const [dataUser, setDataUser] = useState<ResponseProps | null>(null);
  const [adicionar, setAdicionar] = useState(false);
  const [remover, setRemover] = useState(false);
  const [editar, setEditar] = useState(false);


  const getUsers = async (): Promise<ResponseProps> => {
    return request('GET', 'http://localhost:9090/users/getAll');
  };

  const addUser = async (newUser: { name: string; email: string; address: string }): Promise<ResponseProps> => {
    return request('POST', 'http://localhost:9090/users/add', newUser);
  };

  const deleteUser = async (userId: number): Promise<ResponseProps> => {
    return request('DELETE', `http://localhost:9090/users/delete/${userId}`);
  };

  const updateUser = async (userId: number, updatedUser: { name: string; email: string; address: string }): Promise<ResponseProps> => {
    return request('PUT', `http://localhost:9090/users/update/${userId}`, updatedUser);
  };




  return (
    <>
      <div className='flex flex-col mb-20 sm:flex-col md:flex-col lg:flex-row 2xl:flex-row'>
        <div className='bg-[#F4ECE4] shadow-lg rounded-[20px] overflow-hidden basis-5/6'>
          <div className='overflow-x-auto max-h-[500px]'>
            <table className='w-full border-separate border-spacing-0'>
              <thead>
                <tr className='bg-[#702632] text-white sticky top-0 z-10'>
                  <th className='p-4 text-center font-bold border border-[#E0D6CE]'>
                    <p>Nome</p>
                  </th>
                  <th className='p-4 text-center font-bold border border-[#E0D6CE]'>
                    <p>E-mail</p>
                  </th>
                  <th className='p-4 text-center font-bold border border-[#E0D6CE]'>
                    <p>Telefone</p>
                  </th>
                  <th className='p-4 text-center font-bold border border-[#E0D6CE]'>
                    <p>CPF</p>
                  </th>
                  <th className='p-4 text-center font-bold border border-[#E0D6CE]'>
                    <p>Tipo da Conta</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataUser?.content?.map(user => (
                  <tr key={user.id} className='bg-[#FAF6ED] hover:bg-[#702632] hover:bg-opacity-30 cursor-pointer border-b border-[#E0D6CE]'>
                    <td className={`p-4 text-center border border-[#E0D6CE] 'bg-[#702632] bg-opacity-50' : ''}`}>
                      {user.nome}
                    </td>
                    <td className={`p-4 text-center border border-[#E0D6CE] 'bg-[#702632] bg-opacity-50' : ''}`}>
                      {user.email}
                    </td>
                    <td className={`p-4 text-center border border-[#E0D6CE] 'bg-[#702632] bg-opacity-50' : ''}`}>
                      {user.telefone}
                    </td>
                    <td className={`p-4 text-center border border-[#E0D6CE] 'bg-[#702632] bg-opacity-50' : ''}`}>
                      {user.cpf}
                    </td>
                    <td className={`p-4 text-center border border-[#E0D6CE] 'bg-[#702632] bg-opacity-50' : ''}`}>
                      {user.tipo_conta}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='flex flex-col basis-1/6 justify-center items-center pt-11 sm:pt-11 md:pt-14 lg:pt-0 w-full '>
          <button onClick={() => setAdicionar(!adicionar)} className='w-36 lg:h-[50px]  m-4 bg-[#016E2F] text-white rounded-[20px] text-center inline-block align-middle'>
            <div className='pl-5 flex items-center gap-3 justify-start '>
              <img src="./iconsForms/sinalAdd.png" alt="sinal de adição" className='lg:w-4' />
              <p className='text-lg font-medium'>Adicionar</p>
            </div>
          </button>

          <button onClick={() => setRemover(!remover)} className='w-36 lg:h-[50px] m-4 bg-[#702632] text-white rounded-[20px] text-center inline-block align-middle'>
            <div className='pl-5 flex items-center gap-3 justify-start'>
              <img src="./iconsForms/sinalRemove.png" alt="sinal de remoção" className='lg:w-4' />
              <p className='text-lg font-medium'>Remover</p>
            </div>
          </button>

          <button onClick={() => setEditar(!editar)} className='w-36 lg:h-[50px] m-4 bg-[#252422] text-white rounded-[20px] text-center inline-block align-middle'>
            <div className='pl-5 flex items-center gap-3 justify-start'>
              <img src="./iconsForms/canetaEditarBranco.png" alt="sinal de edição" className='lg:w-4' />
              <p className='text-lg font-medium'>Editar</p>
            </div>
          </button>
        </div>
      </div>


      {adicionar && !editar && (
        <div>
          <div className="flex flex-col max-lg:justify-center">
            <p className="text-2xl xl:text-4xl font-semibold max-lg:hidden">Dados do usuário</p>

            <hr className="mt-4 mb-10 w-40 h-1 rounded-2xl bg-[#702632] "></hr>
          </div>

          <InputDadosUsuario />

          <div className="flex flex-col mt-20 max-lg:justify-center">
            <p className="text-2xl xl:text-4xl font-semibold max-lg:hidden">Endereço do proprietário</p>

            <hr className="mt-4 mb-10 w-40 h-1 rounded-2xl bg-[#702632] "></hr>
          </div>

          <InputEnderecoPropriedade />

          <div className="flex items-center gap-16 mt-10">
            <div className='flex gap-[30rem] w-full'>
              <Botao texto="Cancelar" />
              <Botao texto="Salvar cadastro" />
            </div>
          </div>
        </div>
      )}

      {remover && !adicionar && !editar && (
        <div>
          <div className="flex flex-col max-lg:justify-center">
            <p className="text-2xl xl:text-4xl font-semibold max-lg:hidden">Dados do usuário</p>

            <hr className="mt-4 mb-10 w-40 h-1 rounded-2xl bg-[#702632] "></hr>
          </div>

          <InputDadosUsuario />

          <div className="flex flex-col mt-20 max-lg:justify-center">
            <p className="text-2xl xl:text-4xl font-semibold max-lg:hidden">Endereço do proprietário</p>

            <hr className="mt-4 mb-10 w-40 h-1 rounded-2xl bg-[#702632] "></hr>
          </div>

          <InputEnderecoPropriedade />

          <div className="flex items-center gap-16 mt-10">
            <Botao texto="Cancelar" />
            <Botao texto="Salvar cadastro" />
          </div>
        </div>
      )}

      {selectedData && editar && !adicionar && !remover && (
        <InputEditandoDadosUsuario selectedData={selectedData} />
      )}
    </>
  );
}

const propertyHeaders = ['Código', 'Nome da Propriedade', 'Tipo de imóvel', 'Visibilidade', 'Estado'];
const propertyData = [
  ['4356AA353', 'Casa de Guaramirim', 'Venda', 'Permitida', 'Promoção'],
  ['6541e9v564', 'Casa de João Pessoa', 'Locação', 'Bloqueada', 'Alugado'],
  ['4356AA353', 'Casa de Guaramirim', 'Venda', 'Permitida', 'Promoção'],
  ['6541e9v564', 'Casa de João Pessoa', 'Locação', 'Bloqueada', 'Alugado'],
  ['4356AA353', 'Casa de Guaramirim', 'Venda', 'Permitida', 'Promoção'],
  ['6541e9v564', 'Casa de João Pessoa', 'Locação', 'Bloqueada', 'Alugado'],
  ['4356AA353', 'Casa de Guaramirim', 'Venda', 'Permitida', 'Promoção'],
  ['6541e9v564', 'Casa de João Pessoa', 'Locação', 'Bloqueada', 'Alugado'],
  ['4356AA353', 'Casa de Guaramirim', 'Venda', 'Permitida', 'Promoção'],
  ['6541e9v564', 'Casa de João Pessoa', 'Locação', 'Bloqueada', 'Alugado']
];

const userHeaders = ['Nome', 'E-mail', 'Endereço', 'CPF', 'Telefone'];

