package weg.projetofinal.Imobiliaria.model.dto;

import weg.projetofinal.Imobiliaria.model.entity.Endereco;
import weg.projetofinal.Imobiliaria.model.entity.Imovel;
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
        Usuario id_usuario) {

    public Imovel convert(){
        return Imovel.builder().codigo(codigo).nome_propriedade(nome_propriedade).
                tipo_transacao(tipo_transacao).valor_venda(valor_venda).tipo_imovel(tipo_imovel).
                status_imovel(status_imovel).valor_promocional(valor_promocional).destaque(destaque).
                visibilidade(visibilidade).valor_iptu(valor_iptu).condominio(condominio).
                area_construida(area_construida).area_terreno(area_terreno).descricao(descricao).
                id_endereco(id_endereco).id_usuario(id_usuario).build();
    }
}
