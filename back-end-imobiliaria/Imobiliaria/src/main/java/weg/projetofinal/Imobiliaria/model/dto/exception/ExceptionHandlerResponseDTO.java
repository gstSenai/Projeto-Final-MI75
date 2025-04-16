package weg.projetofinal.Imobiliaria.model.dto.exception;

import java.time.LocalDateTime;

public record ExceptionHandlerResponseDTO(
        String mensagem,
        LocalDateTime horario)
{
}
