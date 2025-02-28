import { Card } from "@/components/CardImovel"
import { Header } from "../components/header";
import { Footer } from "@/components/Footer"
import Botao from "../components/Botao";
import Link from "next/link";
import GenericTable from "../components/tabela"; // Certifique-se de que o caminho está correto

export default function Home() {
  // Defina os cabeçalhos e dados da tabela
  const headers = ['Código', 'Nome da Propriedade', 'Tipo de imóvel', 'Visibilidade', 'Estado'];
  const data = [
    ['4356AA353', 'Casa de Guaramirim', 'Venda', 'Permitida', 'Promoção'],
    ['6541e9v564', 'Casa de João pessoa', 'Locação', 'bloqueada', 'Alugado'],
    ['3567e943', 'Casa do Amizade', 'Locação', 'Permitida', 'Livre'],
    ['4356av01', 'Casa do Bau', 'Locação', 'Permitida', 'Livre'],
    ['3242x322a', 'Casa de Três rios', 'Venda', 'Permitida', 'Vendido'],
    ['23we2433', 'Casa de Nereu Ramos', 'Venda', 'bloqueada', 'A venda'],
    ['4356AA353', 'Casa de Guaramirim', 'Venda', 'Permitida', 'Promoção'],
    ['6541e9v564', 'Casa de João pessoa', 'Locação', 'bloqueada', 'Alugado'],
    ['3567e943', 'Casa do Amizade', 'Locação', 'Permitida', 'Livre'],
    ['4356av01', 'Casa do Bau', 'Locação', 'Permitida', 'Livre'],
    ['3242x322a', 'Casa de Três rios', 'Venda', 'Permitida', 'Vendido'],
    ['23we2433', 'Casa de Nereu Ramos', 'Venda', 'bloqueada', 'A venda']
  ];

  return (
    <div className="bg-[#DFDAD0] min-h-screen p-10">
      <Botao texto="Gerenciar" />
      <div className="mt-4">
        <Link href='../principalEditor' className="text-blue-600 underline">
          Página Editor
        </Link>
        <br />
        <Link href='../principalAdministrador' className="text-blue-600 underline">
          Página Administrador
        </Link>
        <Link href='../footer'>Footer</Link>
      </div>

      {/* Renderize a tabela genérica */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-[#702632] mb-6">Tabela de Propriedades</h2>
        <GenericTable  headers={headers} data={data} />
      </div>
    </div>
  );
}