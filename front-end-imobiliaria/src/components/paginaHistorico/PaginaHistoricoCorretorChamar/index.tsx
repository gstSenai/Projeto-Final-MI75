"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CardHorario } from "../cardHorario/CardHorarioCorretor/index";
import DayCarousel from "../../paginaInicial/carrossel/dayCarousel/index";
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
    tipo_transacao: string;
    valor_venda: number;
    tipo_imovel: string;
    status_imovel: string;
    valor_promocional: number;
    destaque: string;
    visibilidade: boolean;
    valor_iptu: number;
    condominio: number;
    area_construida: number;
    area_terreno: number;
    descricao: string;
  };
  usuarioDTO: {
    id: number;
    username: string;
    sobrenome: string | null;
    tipo_conta: string;
    email: string;
    password: string;
    ativo: boolean;
    imagem_usuario: string;
  };
  corretorDTO: {
    id: number;
    username: string;
    sobrenome: string | null;
    tipo_conta: string;
    email: string;
    password: string;
    ativo: boolean;
    imagem_usuario: string;
  };
}

// Convertendo o nome do mês para número (0-11)
const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
];

export function PaginaHistoricoCorretorChamar() {
  const { register, watch } = useForm<FormData>({
    defaultValues: {
      mes: monthNames[new Date().getMonth()]
    }
  });
  const selectedMonthName = watch("mes");
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(false);

  // Convertendo o nome do mês para número (0-11)
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
          
          const response = await request('GET', `http://localhost:9090/agendamento/corretor/data/${formattedDate}`);
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

  const getStatus = (status: string) => {
    switch (status) {
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
      ) : (
        <p className="text-gray-400">Selecione um dia para ver os horários.</p>
      )}
    </>
  );
}