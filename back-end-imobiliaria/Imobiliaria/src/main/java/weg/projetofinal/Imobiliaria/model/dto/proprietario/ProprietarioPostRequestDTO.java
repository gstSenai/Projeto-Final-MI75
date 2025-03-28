package weg.projetofinal.Imobiliaria.model.dto.proprietario;

import weg.projetofinal.Imobiliaria.model.entity.EnderecoProprietario;

import java.util.Date;

public record ProprietarioPostRequestDTO(
        String nome,
        String sobrenome,
        String cpf,
        String telefone,
        String celular,
        Date data_nascimento,
        String email,
        String imagem_proprietario,
        EnderecoProprietario enderecoProprietario
) {
}
