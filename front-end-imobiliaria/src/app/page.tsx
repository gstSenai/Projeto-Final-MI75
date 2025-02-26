import Card from "../components/CardImovel/Card"
import Botao from "../components/Botao"
import Link from "next/link"

export default function Home() {
  return (
    <div className="bg-[#DFDAD0]">
      <Card />
      <Botao texto="Gerenciar" />
      <Link href='../principalEditor'>
        Pagina Editor
      </Link>
    </div>

  ) }
