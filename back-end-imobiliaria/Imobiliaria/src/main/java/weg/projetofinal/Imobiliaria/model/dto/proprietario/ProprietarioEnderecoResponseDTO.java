package weg.projetofinal.Imobiliaria.model.dto.proprietario;

import java.util.Date;

public record ProprietarioEnderecoResponseDTO(
        Integer id,
        String nome,
        String sobrenome,
        String cpf,
        String telefone,
        String celular,
        Date data_nascimento,
        String email,
        String imagem_proprietario
){
}
