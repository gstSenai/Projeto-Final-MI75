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

    public CaracteristicaImovel convert(Imovel imovel) {
        return CaracteristicaImovel.builder()
                .imovel(imovel)
                .numero_quartos(numero_quartos)
                .numero_banheiros(numero_banheiros)
                .numero_suites(numero_suites)
                .numero_vagas(numero_vagas)
                .piscina(piscina)
                .numero_salas(numero_salas)
                .build();
    }

}
