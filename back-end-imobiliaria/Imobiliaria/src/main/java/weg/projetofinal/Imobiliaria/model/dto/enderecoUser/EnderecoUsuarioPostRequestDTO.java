package weg.projetofinal.Imobiliaria.model.dto.enderecoUser;

public record EnderecoUsuarioPostRequestDTO(
        String cep,
        String rua,
        String tipo_residencia,
        Integer numero_imovel,
        Integer numero_apartamento,
        String bairro,
        String cidade,
        String uf
) {
}
