import { Card } from "@/components/CardImovel"
import { Header } from "../components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <Card titulo="GEMINADO / VENDE-SE" cidade="Jaraguá do Sul, Centro"
            qtdDormitorios={2} qtdSuite={1} qtdBanheiros={2} preco="R$799.000,00" codigo={54698}  />
    </div>
  );
}
