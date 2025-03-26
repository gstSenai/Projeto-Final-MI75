package weg.projetofinal.Imobiliaria.model.dto;

public record FavoritoGetResponseDTO (
    Integer id,
    UsuarioAgendamentoGetResponseDTO usuarioDto,
    ImovelAgendamentoGetResponseDTO imovelDto
){
}
