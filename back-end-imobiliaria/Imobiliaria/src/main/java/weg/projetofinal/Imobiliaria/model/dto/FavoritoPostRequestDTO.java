package weg.projetofinal.Imobiliaria.model.dto;

import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;

public record FavoritoPostRequestDTO(
        Integer id,
        Usuario id_Usuario,
        Imovel id_Imovel
) {
}
