package weg.projetofinal.Imobiliaria.model.dto;

public record EnderecoImovelGetResponseDTO(
        Integer id,
        String rua,
        String cep,
        String numero,
        String bairro,
        String cidade,
        String uf,
        String complemento
) {
}
