package weg.projetofinal.Imobiliaria.model.dto.agendamento;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;
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