package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import weg.projetofinal.Imobiliaria.model.dto.EnderecoGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.EnderecoPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Endereco;

@Mapper
public interface EnderecoMapper {

    EnderecoMapper INSTANCE = Mappers.getMapper(EnderecoMapper.class);

    @Mapping(target = "imovel", source = "imovel")
    EnderecoGetResponseDTO enderecoToEnderecoGetResponseDTO(Endereco endereco);

    Endereco enderecoPostRequestDTOToEndereco(EnderecoPostRequestDTO enderecoPostRequestDTO);


}
