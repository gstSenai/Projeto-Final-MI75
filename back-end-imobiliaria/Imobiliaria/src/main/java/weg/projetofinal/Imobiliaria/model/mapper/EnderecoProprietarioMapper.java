package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import weg.projetofinal.Imobiliaria.model.dto.enderecoProprietario.EnderecoProprietarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.enderecoProprietario.EnderecoProprietarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.EnderecoProprietario;

@Mapper
public interface EnderecoProprietarioMapper {

    EnderecoProprietarioMapper INSTANCE = Mappers.getMapper(EnderecoProprietarioMapper.class);

    @Mapping(target = "proprietario", source = "proprietario")
    EnderecoProprietarioGetResponseDTO enderecoProprietarioToEnderecoProprietarioGetResponseDTO(EnderecoProprietario enderecoProprietario);

    EnderecoProprietario enderecoProprietarioPostRequestDTOToEnderecoProprietario(EnderecoProprietarioPostRequestDTO enderecoProprietarioPostRequestDTO);
}
