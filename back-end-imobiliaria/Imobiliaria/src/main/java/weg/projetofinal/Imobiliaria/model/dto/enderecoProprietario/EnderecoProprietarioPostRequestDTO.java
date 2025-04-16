package weg.projetofinal.Imobiliaria.model.dto.enderecoProprietario;

public record EnderecoProprietarioPostRequestDTO(
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
