package weg.projetofinal.Imobiliaria.model.dto;


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
