package weg.projetofinal.Imobiliaria.model.dto.enderecoProprietario;

import weg.projetofinal.Imobiliaria.model.dto.proprietario.ProprietarioEnderecoResponseDTO;

public record EnderecoProprietarioGetResponseDTO(
        Integer id,
        String cep,
        String rua,
        String tipo_residencia,
        Integer numero_imovel,
        Integer numero_apartamento,
        String bairro,
        String cidade,
        String uf,
        ProprietarioEnderecoResponseDTO proprietario
) {
}
