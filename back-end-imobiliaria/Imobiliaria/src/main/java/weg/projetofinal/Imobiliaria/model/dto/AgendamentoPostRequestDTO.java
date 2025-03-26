package weg.projetofinal.Imobiliaria.model.dto;

import weg.projetofinal.Imobiliaria.model.entity.Imovel;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;

import java.time.LocalDate;

public record AgendamentoPostRequestDTO(
        Integer id,
        LocalDate data,
        Imovel id_Imovel,
        Usuario id_Usuario
) {
}
