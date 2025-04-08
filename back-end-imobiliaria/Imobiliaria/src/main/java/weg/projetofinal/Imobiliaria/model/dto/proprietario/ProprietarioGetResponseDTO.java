package weg.projetofinal.Imobiliaria.model.dto.proprietario;

import weg.projetofinal.Imobiliaria.model.dto.enderecoProprietario.EnderecoProprietarioResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.imovel.ImovelProprietarioResponseDTO;

import java.util.Date;
import java.util.List;

public record ProprietarioGetResponseDTO(
        Integer id,
        String nome,
        String sobrenome,
        String cpf,
        String telefone,
        String celular,
        Date data_nascimento,
        String email,
        String imagem_proprietario,
        EnderecoProprietarioResponseDTO enderecoProprietarioDTO,
        List<ImovelProprietarioResponseDTO> imovelProprietarioResponseDTO
) {
}
