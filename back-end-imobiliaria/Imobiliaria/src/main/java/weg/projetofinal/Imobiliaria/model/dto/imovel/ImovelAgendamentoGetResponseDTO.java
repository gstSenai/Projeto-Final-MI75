package weg.projetofinal.Imobiliaria.model.dto.imovel;

public record ImovelAgendamentoGetResponseDTO(
        Integer id,
        Integer codigo,
        String nome_propriedade,
        String tipo_transacao,
        Double valor_venda,
        String tipo_imovel,
        String status_imovel,
        Double valor_promocional,
        Boolean destaque,
        Boolean visibilidade,
        Double valor_iptu,
        Double condominio,
        Double area_construida,
        Double area_terreno,
        String descricao
) {
}
