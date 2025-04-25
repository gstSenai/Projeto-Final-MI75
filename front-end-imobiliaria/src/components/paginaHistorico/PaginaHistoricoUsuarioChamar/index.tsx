"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CardHorario } from "../cardHorario";
import DayCarousel from "../../PaginaInicial/carrossel/dayCarousel";
import request from "@/routes/request";
import { useAuth } from '@/components/context/AuthContext';

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
  corretorDTO: {
    username: string;
    sobrenome: string | null;
  };
}

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
];

export function PaginaHistoricoUsuarioChamar() {
  const { register, watch } = useForm<FormData>({
    defaultValues: {
      mes: monthNames[new Date().getMonth()]
    }
  });
  const selectedMonthName = watch("mes");
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(false);
  const { role } = useAuth();

  const selectedMonth = monthNames.indexOf(selectedMonthName || "Janeiro");

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
  };

  useEffect(() => {
    const fetchAgendamentos = async () => {
      if (selectedDay !== null) {
        try {
          setLoading(true);
          const currentYear = new Date().getFullYear();
          const formattedDate = `${currentYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`;
          
          const endpoint = role?.toUpperCase() === 'CORRETOR'
            ? `http://localhost:9090/agendamento/corretor/data/${formattedDate}`
            : `http://localhost:9090/agendamento/usuario/data/${formattedDate}`;

          console.log('Role atual:', role);
          console.log('Endpoint usado:', endpoint);

          const token = localStorage.getItem('token');
          if (!token) {
            console.error('Token não encontrado');
            return;
          }

          const response = await request('GET', endpoint, undefined, {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }) as Agendamento[];

          console.log('Agendamentos recebidos:', JSON.stringify(response, null, 2));
          setAgendamentos(response);
        } catch (error) {
          console.error('Erro ao buscar agendamentos:', error);
          setAgendamentos([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAgendamentos();
  }, [selectedDay, selectedMonth, role]);

  const getTipo = (status: string): 'realizado' | 'cancelado' | 'pendente' => {
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
    <>
      <div className="mb-6">
        <DayCarousel
          onDaySelect={handleDaySelect}
          externalMonth={selectedMonth}
        />
      </div>

      <div className="border-t-2 border-[#702632] mt-1 mb-4"></div>

      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : selectedDay ? (
        <div>
          {agendamentos.length > 0 ? (
            agendamentos.map(agendamento => {
              const pessoa = role?.toUpperCase() === 'CORRETOR'
                ? agendamento.usuarioDTO
                : agendamento.corretorDTO;

              const nomePessoa = pessoa
                ? `${pessoa.username} ${pessoa.sobrenome || ''}`
                : 'Nome não disponível';

              return (
                <CardHorario 
                  key={agendamento.id}
                  tipo={getTipo(agendamento.status)}
                  horario={agendamento.horario}
                  codigo={agendamento.imovelDTO.codigo.toString()}
                  corretor={nomePessoa}
                />
              );
            })
          ) : (
            <p className="text-gray-400">Nenhum agendamento encontrado para este dia.</p>
          )}
        </div>
      ) : (
        <p className="text-gray-400">Selecione um dia para ver os horários.</p>
      )}
    </>
  );
}