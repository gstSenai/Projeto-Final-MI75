"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LoadingWrapper } from "@/components/loading/loadingServer";
import Calendario from "@/components/Calendario/index";
import ListaCompromissos, { Compromisso } from "@/components/listaCompromissos";
import { useEffect, useState } from "react";
import request from '@/routes/request';

interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  complemento?: string;
}

interface Imovel {
  id: number;
  codigo: number;
  nome_propriedade: string;
  id_endereco: Endereco;
}

export default function PaginaAgendaCorretor() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [compromissos, setCompromissos] = useState<Compromisso[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    if (date) {
      fetchAgendamentosPorData(date);
    }
  };

  const getEnderecoImovel = async (imovelId: number) => {
    try {
      const imovel = await request('GET', `http://localhost:9090/imovel/getById/${imovelId}`) as Imovel;
      if (imovel && imovel.id_endereco) {
        return imovel.id_endereco;
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar endereço do imóvel:', error);
      return null;
    }
  };

  const fetchAgendamentosPorData = async (data: string) => {
    try {
      setLoading(true);
      const response = await request('GET', `http://localhost:9090/agendamento/corretor/data/${data}`);
      console.log('Dados recebidos:', response);
      
      if (Array.isArray(response)) {
        const compromissosPromises = response.map(async (item: any) => {
          const endereco = await getEnderecoImovel(item.imovelDTO.id);

          return {
            hora: item.horario.substring(0, 5),
            codigo: `Código: ${item.imovelDTO?.codigo ?? "N/A"}`,
            nomeImovel: item.imovelDTO?.nome_propriedade ?? "N/A",
            endereco: endereco ? `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}` : 'Endereço não disponível',
            cidadeUF: endereco ? `${endereco.cidade}/${endereco.uf}` : 'Localização não disponível',
            cliente: item.usuarioDTO?.username ?? "Desconhecido"
          };
        });

        const compromissosFormatados = await Promise.all(compromissosPromises);
        setCompromissos(compromissosFormatados);
      } else {
        console.error('Resposta não é um array:', response);
        setCompromissos([]);
      }
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      setCompromissos([]);
    } finally {
      setLoading(false);
    }
  };

  const compromissosFiltrados = compromissos;

  return (
    <>
      <LoadingWrapper>
        <header>
          <Header />
        </header>
        <div className="pt-10 px-6 max-lg:px-6 lg:px-20 xl:px-16">
          <div className="flex-1">
            <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Agenda do Corretor</h1>
            <div className="border-t-2 border-[#702632] w-[130px] mt-1 mb-4"></div>
          </div>
          <section className="flex flex-col lg:flex-row gap-8 pb-9 lg:pb-10 xl:pb-14 2xl:pb-16">
            <div className="flex-1">
              <Calendario className="scale-75 max-w-[500px] max-h-[550px] mx-auto" onDateChange={handleDateChange} />
            </div>

            <div className="flex-1">
              <ListaCompromissos 
                compromissos={compromissosFiltrados} 
                selectedDate={selectedDate}
                className="bg-[#F4F1EA] p-6 rounded-lg shadow-md" 
              />
            </div>
          </section>
        </div>
        <footer>
          <Footer />
        </footer>
      </LoadingWrapper>
    </>
  );
}
