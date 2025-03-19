package weg.projetofinal.Imobiliaria.model.dto;

public record CaracteristicaImovelGetResponseDTO(
        Integer id,
        Integer numero_quartos,
        Integer numero_banheiros,
        Integer numero_suites,
        Integer numero_vagas,
        boolean piscina,
        Integer numero_salas
) {
}
