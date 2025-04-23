"use client";

import { useState, useEffect } from "react";
import { CardHorario } from "../cardHorario/CardHorarioCorretor";
import HistoryCalendar from "../../Calendario/HistoryCalendar";
import request from "@/routes/request";

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

export function PaginaHistoricoCorretorChamar() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        setLoading(true);
        console.log('Buscando agendamentos para a data:', selectedDate);
        
        // Pegando o token do localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          console.error('Token não encontrado');
          return;
        }

        const response = await request(
          'GET', 
          `http://localhost:9090/agendamento/corretor/data/${selectedDate}`,
          undefined,
          {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        ) as Agendamento[];

        console.log('Agendamentos recebidos:', response);
        setAgendamentos(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        setAgendamentos([]);
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6">
      <div className="lg:w-1/2">
        <HistoryCalendar 
          onDateChange={(date) => {
            console.log('Nova data selecionada:', date);
            setSelectedDate(date);
          }}
        />
      </div>

      <div className="lg:w-1/2">
        <div className="bg-white rounded-xl p-6 shadow-sm h-full">
          <h2 className="text-xl font-semibold mb-4 text-[#702632]">
            Agendamentos do dia {formatDate(selectedDate)}
          </h2>
          
          <div className="border-t-2 border-[#702632] mt-1 mb-4"></div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#702632]"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {agendamentos && agendamentos.length > 0 ? (
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
                <p className="text-gray-400 text-center py-4">Nenhum agendamento encontrado para este dia.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}