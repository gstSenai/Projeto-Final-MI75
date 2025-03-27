package weg.projetofinal.Imobiliaria.model.dto.endereco;

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
