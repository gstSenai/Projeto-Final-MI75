package weg.projetofinal.Imobiliaria.model.dto.usuario;

import java.util.Date;

public record UsuarioAgendamento2GetResponseDTO(
        Integer id,
        String nome,
        String tipo_conta,
        String email,
        String senha,
        String imagem_usuario
) {
}
