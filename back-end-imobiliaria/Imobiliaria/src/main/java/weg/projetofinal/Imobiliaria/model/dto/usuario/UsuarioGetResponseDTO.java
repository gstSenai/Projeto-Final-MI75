package weg.projetofinal.Imobiliaria.model.dto.usuario;

import weg.projetofinal.Imobiliaria.model.dto.imovel.ImovelUsuarioGetResponseDTO;

import java.util.List;

public record UsuarioGetResponseDTO(
        Integer id,
        String nome,
        String sobrenome,
        String tipo_conta,
        String email,
        String senha,
        boolean ativo,
        String imagem_usuario,
        List<ImovelUsuarioGetResponseDTO> imovel
) {
}
