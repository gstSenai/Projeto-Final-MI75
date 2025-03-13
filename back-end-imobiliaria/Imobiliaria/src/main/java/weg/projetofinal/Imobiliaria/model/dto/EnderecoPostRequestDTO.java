package weg.projetofinal.Imobiliaria.model.dto;

public record EnderecoPostRequestDTO(
        String rua,
        String cep,
        String numero,
        String bairro,
        String cidade,
        String uf,
        String complemento,
        Integer idUsuario ) {
}
