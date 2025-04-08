package weg.projetofinal.Imobiliaria.model.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendamentoGetResponseDTO(
        Integer id,
        LocalDate data,
        LocalTime horario,
        ImovelAgendamentoGetResponseDTO imovelDTO,
        UsuarioAgendamentoGetResponseDTO usuarioDTO
) {
}
