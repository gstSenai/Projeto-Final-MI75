package weg.projetofinal.Imobiliaria.model.dto;

public record CaracteristicasImovelPutRequestDTO(
        Integer idImovel,
        Integer numero_quartos,
        Integer numero_banheiros,
        Integer numero_suites,
        Integer numero_vagas,
        boolean piscina,
        Integer numero_salas
) {
}
