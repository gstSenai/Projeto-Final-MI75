package weg.projetofinal.Imobiliaria.model.dto.favorito;

import weg.projetofinal.Imobiliaria.model.dto.imovel.ImovelAgendamentoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioAgendamentoGetResponseDTO;

public record FavoritoGetResponseDTO (
    Integer id,
    Boolean favorito,
    UsuarioAgendamentoGetResponseDTO usuarioDto,
    ImovelAgendamentoGetResponseDTO imovelDto
){
}
