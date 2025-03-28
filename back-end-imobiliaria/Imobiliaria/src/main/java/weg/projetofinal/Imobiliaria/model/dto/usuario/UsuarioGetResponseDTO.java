package weg.projetofinal.Imobiliaria.model.dto.usuario;

public record UsuarioGetResponseDTO(
        Integer id,
        String nome,
        String sobrenome,
        String tipo_conta,
        String email,
        String senha,
        boolean ativo,
        String imagem_usuario
) {
}
