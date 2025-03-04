package weg.projetofinal.Imobiliaria.model.dto;

import java.time.LocalDateTime;

public record ExceptionHandlerResponseDTO(
        String mensagem,
        LocalDateTime horario)
{
}
