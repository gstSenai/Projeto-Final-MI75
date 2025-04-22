package weg.projetofinal.Imobiliaria.model.dto.agendamento;

import weg.projetofinal.Imobiliaria.model.entity.enums.StatusAgendamento;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendamentoPostRequestDTO(
        LocalDate data,
        LocalTime horario,
        Integer idImovel,
        Integer idUsuario,
        Integer idCorretor,
        StatusAgendamento status
) {}