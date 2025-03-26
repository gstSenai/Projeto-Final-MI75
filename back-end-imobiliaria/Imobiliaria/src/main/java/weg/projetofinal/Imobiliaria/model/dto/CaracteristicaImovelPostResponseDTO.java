package weg.projetofinal.Imobiliaria.model.dto;

import weg.projetofinal.Imobiliaria.model.entity.CaracteristicaImovel;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;

public record CaracteristicaImovelPostResponseDTO(
        Integer idImovel,
        Integer numero_quartos,
        Integer numero_banheiros,
        Integer numero_suites,
        Integer numero_vagas,
        boolean piscina,
        Integer numero_salas
) {



}
