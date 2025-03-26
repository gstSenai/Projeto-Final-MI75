package weg.projetofinal.Imobiliaria.model.dto;

import java.time.LocalDate;

public record AgendamentoGetResponseDTO(
        Integer id,
        LocalDate data,
        ImovelAgendamentoGetResponseDTO imovelDTO,
        UsuarioAgendamentoGetResponseDTO usuarioDTO
) {
}
