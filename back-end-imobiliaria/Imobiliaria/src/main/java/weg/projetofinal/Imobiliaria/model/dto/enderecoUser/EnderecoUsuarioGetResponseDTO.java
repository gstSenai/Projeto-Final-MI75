package weg.projetofinal.Imobiliaria.model.dto.enderecoUser;

import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioEnderecoGetResponseDTO;

public record EnderecoUsuarioGetResponseDTO(
        Integer id,
        String cep,
        String rua,
        String tipo_residencia,
        Integer numero_imovel,
        Integer numero_apartamento,
        String bairro,
        String cidade,
        String uf,
        UsuarioEnderecoGetResponseDTO usuario
) {
}
