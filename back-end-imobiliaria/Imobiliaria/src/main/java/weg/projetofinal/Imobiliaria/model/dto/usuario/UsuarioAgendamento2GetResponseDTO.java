package weg.projetofinal.Imobiliaria.model.dto.usuario;

import java.util.Date;

public record UsuarioAgendamento2GetResponseDTO(
        Integer id,
        String username,
        String sobrenome,
        String tipo_conta,
        String email,
        String password,
        boolean ativo,
        String imagem_usuario
) {
}
