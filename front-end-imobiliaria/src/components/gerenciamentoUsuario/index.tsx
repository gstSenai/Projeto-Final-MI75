"use client";

import { useState } from "react";

export function PageUsuarios() {
  const [usuarios, setUsuarios] = useState([
    { nome: "Rodrigo", email: "Rodrigo2023amandoDacunh..", status: "Ativa", tipo: "Cliente" },
    { nome: "Matheus", email: "MatheusLucas@gmail.com", status: "Inativa", tipo: "Cliente" },
    { nome: "Kauan", email: "KauanPedroSodaSilva@gmail.com", status: "Bloqueado", tipo: "Corretor" },
    { nome: "Luana", email: "LuanaSantana@gmail.com", status: "Desativada", tipo: "Editor" },
    { nome: "Gustavo", email: "dalsantoGustavo@gmail.com", status: "Ativa", tipo: "Administrador" },
    { nome: "José", email: "JoseAmado@gmail.com", status: "Bloqueada", tipo: "Cliente" },
  ]);

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Gerenciamento de Usuários</h1>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-4">
          <input type="text" placeholder="Nome" className="border p-2 rounded w-1/3" />
          <input type="text" placeholder="Email" className="border p-2 rounded w-1/3" />
          <select className="border p-2 rounded w-1/6">
            <option>Tipo da conta</option>
            <option>Cliente</option>
            <option>Administrador</option>
            <option>Corretor</option>
          </select>
          <select className="border p-2 rounded w-1/6">
            <option>Status da conta</option>
            <option>Ativa</option>
            <option>Inativa</option>
            <option>Bloqueada</option>
          </select>
          <button className="bg-red-600 text-white px-4 py-2 rounded">🔍 Pesquisar</button>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-red-800 text-white">
                <th className="border p-2">Nome</th>
                <th className="border p-2">E-mail</th>
                <th className="border p-2">Status de conta</th>
                <th className="border p-2">Tipo da Conta</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{user.nome}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.status}</td>
                  <td className="border p-2">{user.tipo}</td>
                  <td className="border p-2">
                    {user.status === "Bloqueado" || user.status === "Bloqueada" ? (
                      <button className="bg-green-600 text-white px-4 py-1 rounded">Desbloquear</button>
                    ) : (
                      <button className="bg-red-600 text-white px-4 py-1 rounded">Bloquear</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-2 mt-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded">➕ Adicionar</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded">🗑️ Remover</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded">✏️ Editar</button>
          <button className="bg-black text-white px-4 py-2 rounded">💬 Mensagem</button>
        </div>
      </div>
    </div>
  );
}
