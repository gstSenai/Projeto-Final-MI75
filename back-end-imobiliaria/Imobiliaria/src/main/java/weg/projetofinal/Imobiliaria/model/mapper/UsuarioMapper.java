package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import weg.projetofinal.Imobiliaria.model.dto.UsuarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.UsuarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;


@Mapper
public interface UsuarioMapper {
    UsuarioMapper INSTANCE = Mappers.getMapper(UsuarioMapper.class);

    @Mapping(target = "endereco", source = "enderecoUsuario")
    UsuarioGetResponseDTO usuarioToUsuarioGetResponseDTO(Usuario usuario);

    Usuario usuarioPostRequestDTOToUsuario(UsuarioPostRequestDTO usuarioPostRequestDTO);
}
