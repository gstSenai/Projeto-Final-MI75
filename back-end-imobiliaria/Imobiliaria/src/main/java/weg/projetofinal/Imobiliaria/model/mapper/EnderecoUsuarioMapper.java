package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import weg.projetofinal.Imobiliaria.model.dto.EnderecoUsuarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.EnderecoUsuarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Endereco;
import weg.projetofinal.Imobiliaria.model.entity.EnderecoUsuario;

@Mapper
public interface EnderecoUsuarioMapper {

    EnderecoUsuarioMapper INSTANCE = Mappers.getMapper(EnderecoUsuarioMapper.class);

    @Mapping(target = "usuario", source = "usuario")
    EnderecoUsuarioGetResponseDTO enderecoToEnderecoUsuarioGetResponseDTO(EnderecoUsuario enderecoUsuario);

    EnderecoUsuario enderecoUsuarioPostRequestDTOToEnderecoUsuario(EnderecoUsuarioPostRequestDTO enderecoUsuarioPostRequestDTO);
}
