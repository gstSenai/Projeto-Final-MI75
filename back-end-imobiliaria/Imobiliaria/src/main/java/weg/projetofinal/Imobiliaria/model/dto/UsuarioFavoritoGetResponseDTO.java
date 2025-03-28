package weg.projetofinal.Imobiliaria.model.dto;

import java.util.Date;

public record UsuarioFavoritoGetResponseDTO(
        Integer id,
        String nome,
        String sobrenome,
        String cpf,
        String tipo_conta,
        String telefone,
        Date data_nascimento,
        String email,
        String senha,
        String imagem_usuario
) {
}
