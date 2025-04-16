package weg.projetofinal.Imobiliaria.model.dto.endereco;


import weg.projetofinal.Imobiliaria.model.dto.imovel.ImovelEnderecoGetResponseDTO;

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
