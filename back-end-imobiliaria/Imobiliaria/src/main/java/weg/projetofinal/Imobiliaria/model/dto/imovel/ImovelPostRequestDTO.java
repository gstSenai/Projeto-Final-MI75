package weg.projetofinal.Imobiliaria.model.dto.imovel;

import weg.projetofinal.Imobiliaria.model.entity.CaracteristicaImovel;
import weg.projetofinal.Imobiliaria.model.entity.Endereco;
import weg.projetofinal.Imobiliaria.model.entity.Proprietario;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;

public record ImovelPostRequestDTO(
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
        String descricao,
        Endereco id_endereco,
        CaracteristicaImovel id_caracteristicasImovel,
        Proprietario id_proprietario,
        Usuario id_usuario
) {
}
