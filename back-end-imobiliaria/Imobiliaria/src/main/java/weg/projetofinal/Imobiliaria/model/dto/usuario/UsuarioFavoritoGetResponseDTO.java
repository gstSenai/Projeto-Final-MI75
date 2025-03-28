package weg.projetofinal.Imobiliaria.model.dto.usuario;


public record UsuarioFavoritoGetResponseDTO(
        Integer id,
        String nome,
        String tipo_conta,
        String email,
        String senha,
        String imagem_usuario
) {
}
