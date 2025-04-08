package weg.projetofinal.Imobiliaria.model.dto.imagem;

public record ImagemGetResponseDTO(
        Integer id,
        String caminho_foto,
        Integer idImovel
) {
}
