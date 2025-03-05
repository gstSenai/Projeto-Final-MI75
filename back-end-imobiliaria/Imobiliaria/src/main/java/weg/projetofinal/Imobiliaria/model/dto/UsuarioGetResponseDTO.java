package weg.projetofinal.Imobiliaria.model.dto;

import weg.projetofinal.Imobiliaria.model.entity.Imovel;

import java.util.Date;
import java.util.List;

public record UsuarioGetResponseDTO(
        Integer id,
        String nome,
        String sobrenome,
        String cpf,
        String tipo_conta,
        String telefone,
        Date data_nascimento,
        String email,
        String senha,
        List<ImovelUsuarioGetResponseDTO> imovel
) {
}
