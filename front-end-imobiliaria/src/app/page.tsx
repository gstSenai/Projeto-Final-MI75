import Card from "../components/CardImovel/Card";
import Botao from "../components/Botao";
import Link from "next/link";
import { GenericTable } from "@/components/tabela";
import Tabela from "@/components/tabela/tabelaBeta";


export default function Home() {


  return (
    <div className="bg-[#DFDAD0] min-h-screen p-10">
      <Card />
      <Botao texto="Gerenciar" />
      <div className="mt-4">
        <Link href='../principalEditor' className="text-blue-600 underline">
          Página Editor
        </Link>
        <br />
        <Link href='../principalAdministrador' className="text-blue-600 underline">
          Página Administrador
        </Link>
      </div>

      {/* Renderize a tabela genérica */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-[#702632] mb-6">Tabela de Propriedades</h2>
        <Tabela />
      </div>
    </div>
  );
}