package weg.projetofinal.Imobiliaria.model.dto;

public record EnderecoUsuarioGetResponseDTO(
        Integer id,
        String cep,
        String rua,
        String tipo_residencia,
        Integer numero_imovel,
        Integer numero_apartamento,
        String bairro,
        String cidade,
        String estado,
        UsuarioEnderecoGetResponseDTO usuario
) {
}
