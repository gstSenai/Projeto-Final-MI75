package weg.projetofinal.Imobiliaria.model.dto.usuario;


public record UsuarioFavoritoGetResponseDTO(
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
