"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CardHorario } from "../cardHorario/CardHorarioCorretor";
import HistoryCalendar from "../../Calendario/HistoryCalendar";
import request from "@/routes/request";

interface FormData {
  mes: string;
}

interface Agendamento {
  id: number;
  data: string;
  horario: string;
  status: string;
  imovelDTO: {
    id: number;
    codigo: number;
    nome_propriedade: string;
  };
  usuarioDTO: {
    username: string;
    sobrenome: string | null;
  };
}

// Convertendo o nome do mês para número (0-11)
const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
];

export function PaginaHistoricoCorretorChamar() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        setLoading(true);
        const response = await request('GET', `http://localhost:9090/agendamento/corretor/data/${selectedDate}`) as Agendamento[];
        console.log('Agendamentos recebidos:', JSON.stringify(response, null, 2));
        setAgendamentos(response);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, [selectedDate]);

  const getStatus = (status: string): 'realizado' | 'cancelado' | 'pendente' => {
    if (!status) {
      console.warn('Status não definido, usando PENDENTE como padrão');
      return 'pendente';
    }

    console.log('Status recebido do banco:', status);
    
    switch (status) {
      case 'CONFIRMADO':
        return 'realizado';
      case 'CANCELADO':
        return 'cancelado';
      case 'PENDENTE':
        return 'pendente';
      default:
        console.warn('Status desconhecido:', status);
        return 'pendente';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6">
      <div className="lg:w-1/2">
        <HistoryCalendar 
          onDateChange={(date) => setSelectedDate(date)}
          className="scale-75 max-w-[500px] max-h-[550px] mx-auto"
        />
      </div>

      <div className="lg:w-1/2">
        <div className="bg-white rounded-xl p-6 shadow-sm h-full">
          <h2 className="text-xl font-semibold mb-4 text-[#702632]">
            Agendamentos do dia {new Date(selectedDate).toLocaleDateString('pt-BR')}
          </h2>
          
          <div className="border-t-2 border-[#702632] mt-1 mb-4"></div>

          {loading ? (
            <p className="text-gray-400">Carregando...</p>
          ) : (
            <div className="space-y-4">
              {agendamentos.length > 0 ? (
                agendamentos.map(agendamento => (
                  <CardHorario 
                    key={agendamento.id}
                    tipo={getStatus(agendamento.status)}
                    horario={agendamento.horario}
                    codigo={agendamento.imovelDTO.codigo.toString()}
                    cliente={`${agendamento.usuarioDTO.username} ${agendamento.usuarioDTO.sobrenome || ''}`}
                  />
                ))
              ) : (
                <p className="text-gray-400">Nenhum agendamento encontrado para este dia.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}