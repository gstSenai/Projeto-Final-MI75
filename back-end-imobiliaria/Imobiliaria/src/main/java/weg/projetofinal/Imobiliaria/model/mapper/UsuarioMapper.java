package weg.projetofinal.Imobiliaria.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioGetResponseDTO;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioPostRequestDTO;
import weg.projetofinal.Imobiliaria.model.dto.usuario.UsuarioPutRequestDTO;
import weg.projetofinal.Imobiliaria.model.entity.Usuario;

@Mapper
public interface UsuarioMapper {
    UsuarioMapper INSTANCE = Mappers.getMapper(UsuarioMapper.class);

    UsuarioGetResponseDTO usuarioToUsuarioGetResponseDTO(Usuario usuario);

    Usuario usuarioPostRequestDTOToUsuario(UsuarioPostRequestDTO usuarioPostRequestDTO);

    Usuario usuarioPutRequestDTOToUsuario(UsuarioPutRequestDTO usuarioPutRequestDTO);
}
