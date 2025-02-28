package weg.projetofinal.Imobiliaria.model.dto;

import weg.projetofinal.Imobiliaria.model.entity.Imovel;

public record EnderecoGetResponseDTO(
        Integer id,
        String rua,
        String cep,
        String numero,
        String bairro,
        String cidade,
        String uf,
        String complemento,
        ImovelEnderecoGetResponseDTO imovel
) {
}
