package weg.projetofinal.Imobiliaria.model.dto.favorito;

public record FavoritoPostRequestDTO(
        Boolean favorito,
        Integer usuarioId,
        Integer imovelId
) {
}


