'use client';

import React, { useState } from 'react';

export const PesquisaPaginaInicial = () => {
  const [tipoImovel, setTipoImovel] = useState('todos');
  const [tipoNegocio, setTipoNegocio] = useState('comprar');
  const [localizacao, setLocalizacao] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica de pesquisa
    console.log({ tipoImovel, tipoNegocio, localizacao });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-4">
          {/* Tipo de Negócio */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quero
            </label>
            <select
              value={tipoNegocio}
              onChange={(e) => setTipoNegocio(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="comprar">Comprar</option>
              <option value="alugar">Alugar</option>
            </select>
          </div>

          {/* Tipo de Imóvel */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Imóvel
            </label>
            <select
              value={tipoImovel}
              onChange={(e) => setTipoImovel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="todos">Todos os tipos</option>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>

          {/* Localização */}
          <div className="flex-[2] min-w-[300px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Onde?
            </label>
            <input
              type="text"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              placeholder="Digite um bairro ou cidade"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Botão de Busca */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Buscar Imóveis
          </button>
        </div>
      </form>
    </div>
  );
};

export default PesquisaPaginaInicial; 