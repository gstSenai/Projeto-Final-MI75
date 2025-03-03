"use client";

import React, { useState } from 'react';
import { Montserrat } from 'next/font/google';
import { Header } from '../header';
import { InputDadosUsuario } from '../paginaCadastroUsuario/adicionandoUsuario/inputDadosUsuario';
import { InputEnderecoPropriedade } from '../paginaCadastroUsuario/adicionandoUsuario/inputEnderecoPropriedade';
import { InputEditandoDadosUsuario } from '../paginaCadastroUsuario/editandoUsuario/inputEditarDadosUsuario';
import { Botao } from '../botao';

interface TableProps {
  headers: string[];
  data: (string | number)[][];
}

// Carregando a fonte Montserrat
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '800'],
  display: 'swap',
});

export function GenericTable({ headers, data, isPropertyTable }: TableProps & { isPropertyTable: boolean }) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<(string | number)[] | null>(null);
  const [adicionar, setAdicionar] = useState(false);
  const [remover, setRemover] = useState(false);
  const [editar, setEditar] = useState(false);

  return (
    <>
      <div className='flex flex-col mb-20 sm:flex-col md:flex-col lg:flex-row 2xl:flex-row'>
        <div className='bg-[#F4ECE4] shadow-lg rounded-[20px] overflow-hidden basis-5/6'>
          <div className='overflow-x-auto max-h-[500px]'>
            <table className='w-full border-separate border-spacing-0'>
              <thead>
                <tr className='bg-[#702632] text-white sticky top-0 z-10'>
                  {headers.map((header, index) => (
                    <th key={index} className='p-4 text-center font-bold border border-[#E0D6CE]'>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className='bg-[#FAF6ED] hover:bg-[#702632] hover:bg-opacity-30 cursor-pointer border-b border-[#E0D6CE]'
                    onClick={() => {
                      setSelectedRow(rowIndex)
                      setSelectedData(row)
                    }}

                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`p-4 text-center border border-[#E0D6CE] ${selectedRow === rowIndex ? 'bg-[#702632] bg-opacity-50' : ''}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='flex flex-col basis-1/6 justify-center items-center pt-11 sm:pt-11 md:pt-14 lg:pt-0 w-full '>
          <button onClick={() => setAdicionar(!adicionar)} className='w-[181px] lg:h-[58px] xl:h-[60px] 2xl:h-[62px]  m-4 bg-[#016E2F] text-white rounded-[20px] text-center inline-block align-middle'>
            <div className='pl-5 flex items-center gap-3 justify-start '>
              <img src="./iconsForms/sinalAdd.png" alt="sinal de adição" />
              <p className='text-xl font-medium'>Adicionar</p>
            </div>
          </button>

          <button onClick={() => setRemover(!remover)} className='w-[181px] lg:h-[58px] xl:h-[60px] 2xl:h-[62px] m-4 bg-[#702632] text-white rounded-[20px] text-center inline-block align-middle'>
            <div className='pl-5 flex items-center gap-3 justify-start'>
              <img src="./iconsForms/sinalRemove.png" alt="sinal de remoção" />
              <p className='text-xl font-medium'>Remover</p>
            </div>
          </button>

          <button onClick={() => setEditar(!editar)} className='w-[181px] lg:h-[58px] xl:h-[60px] 2xl:h-[62px] m-4 bg-[#252422] text-white rounded-[20px] text-center inline-block align-middle'>
            <div className='pl-5 flex items-center gap-3 justify-start'>
              <img src="./iconsForms/canetaEditarBranco.png" alt="sinal de edição" />
              <p className='text-xl font-medium'>Editar</p>
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

          <div className="flex items-center gap-16 mt-20">
            <Botao texto="Cancelar" />
            <Botao texto="Salvar cadastro" />
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

          <div className="flex items-center gap-16 mt-20">
            <Botao texto="Cancelar" />
            <Botao texto="Salvar cadastro" />
          </div>
        </div>
      )}

      {editar && !adicionar && !remover && (
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

          <div className="flex items-center gap-16 mt-20">
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
const userData = [
  ['Rodrigo', 'Rodrigo2023amandoDacunha@gmail.com', '89454700', '09312312323', '47 94931-2912'],
  ['Matheus', 'MatheusLucas@gmail.com', '89266500', '21312244451', '47 99942-2913'],
  ['Rodrigo', 'Rodrigo2023amandoDacunha@gmail.com', '89454700', '09312312323', '47 94931-2912'],
  ['Matheus', 'MatheusLucas@gmail.com', '89266500', '21312244451', '47 99942-2913'],
  ['Rodrigo', 'Rodrigo2023amandoDacunha@gmail.com', '89454700', '09312312323', '47 94931-2912'],
  ['Matheus', 'MatheusLucas@gmail.com', '89266500', '21312244451', '47 99942-2913'],
  ['Rodrigo', 'Rodrigo2023amandoDacunha@gmail.com', '89454700', '09312312323', '47 94931-2912'],
  ['Matheus', 'MatheusLucas@gmail.com', '89266500', '21312244451', '47 99942-2913'],
  ['Rodrigo', 'Rodrigo2023amandoDacunha@gmail.com', '89454700', '09312312323', '47 94931-2912'],
  ['Matheus', 'MatheusLucas@gmail.com', '89266500', '21312244451', '47 99942-2913']
];

export default function Tabela({ isPropertyTable }: { isPropertyTable: boolean }) {
  return (
    <GenericTable
      headers={isPropertyTable ? propertyHeaders : userHeaders}
      data={isPropertyTable ? propertyData : userData}
      isPropertyTable={isPropertyTable}
    />
  );
}
