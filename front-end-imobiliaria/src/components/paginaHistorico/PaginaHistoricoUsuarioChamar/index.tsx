"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CardHorario } from "../cardHorario";
import DayCarousel from "../../paginaInicial/carrossel/dayCarousel";
import request from "@/routes/request";

interface FormData {
  mes: string;
}

interface Agendamento {
  id: number;
  data: string;
  horario: string;
  status: string; // 'PENDENTE', 'CONFIRMADO', 'CANCELADO'
  imovel: {
    codigo: string;
    id_endereco: {
      bairro: string;
      cidade: string;
    };
  };
  corretor: {
    nome: string;
    sobrenome: string;
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

  const selectedMonth = monthNames.indexOf(selectedMonthName || "Janeiro");

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
  };

  useEffect(() => {
    const fetchAgendamentos = async () => {
      if (selectedDay !== null) {
        try {
          setLoading(true);
          // Formatar a data no formato YYYY-MM-DD
          const currentYear = new Date().getFullYear();
          const formattedDate = `${currentYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`;
          
          const response = await request('GET', `http://localhost:9090/agendamento/usuario/data/${formattedDate}`) as Agendamento[];
          console.log('Agendamentos recebidos:', response); // Log dos agendamentos recebidos
          setAgendamentos(response);
        } catch (error) {
          console.error('Erro ao buscar agendamentos:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAgendamentos();
  }, [selectedDay, selectedMonth]);

  const getTipo = (status: string): 'realizado' | 'cancelado' | 'pendente' => {
    // Log do status recebido
    console.log('Status recebido:', status);
    
    // Normalizar o status para maiúsculas para garantir a comparação
    const normalizedStatus = status.toUpperCase();
    console.log('Status normalizado:', normalizedStatus);
    
    switch (normalizedStatus) {
      case 'CONFIRMADO':
        return 'realizado';
      case 'CANCELADO':
        return 'cancelado';
      default:
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
              // Log do agendamento individual e seu status
              console.log('Renderizando agendamento:', {
                id: agendamento.id,
                status: agendamento.status,
                tipo: getTipo(agendamento.status)
              });
              
              return (
                <CardHorario 
                  key={agendamento.id}
                  tipo={getTipo(agendamento.status)}
                  horario={agendamento.horario}
                  codigo={agendamento.imovel.codigo.toString()}
                  corretor={`${agendamento.corretor.nome} ${agendamento.corretor.sobrenome}`}
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