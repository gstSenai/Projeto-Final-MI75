package weg.projetofinal.Imobiliaria.model.dto.agendamento;
import com.fasterxml.jackson.annotation.JsonFormat;

import weg.projetofinal.Imobiliaria.model.entity.enums.StatusAgendamento;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendamentoPostRequestDTO(
        LocalDate data,
        @JsonFormat(pattern = "HH:mm:ss")
        LocalTime horario,
        Integer idImovel,
        Integer idUsuario,
        Integer idCorretor,
        StatusAgendamento status
) {}